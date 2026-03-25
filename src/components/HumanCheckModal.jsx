import { useEffect, useMemo, useRef, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const RATE_KEY = 'portfolio-human-check-rate';
const LOG_KEY = 'portfolio-human-check-log';
const TURNSTILE_SCRIPT_ID = 'cf-turnstile-script';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';
const TURNSTILE_VERIFY_URL = import.meta.env.VITE_TURNSTILE_VERIFY_URL || '/api/turnstile-verify';

const loadTurnstileScript = () =>
  new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }

    const existing = document.getElementById(TURNSTILE_SCRIPT_ID);
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Script load failed')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Script load failed'));
    document.head.appendChild(script);
  });

const readRateStore = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(RATE_KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const writeRateStore = (nextValue) => {
  try {
    localStorage.setItem(RATE_KEY, JSON.stringify(nextValue));
  } catch {
    // Ignore storage failures in private mode.
  }
};

const logAttempt = (actionKey, success) => {
  try {
    const logs = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
    const next = Array.isArray(logs) ? logs : [];
    next.push({
      action: actionKey,
      success,
      ts: Date.now(),
    });
    localStorage.setItem(LOG_KEY, JSON.stringify(next.slice(-50)));
  } catch {
    // Ignore storage failures in private mode.
  }
};

const registerFailedAttempt = (actionKey) => {
  const now = Date.now();
  const store = readRateStore();
  const previous = Array.isArray(store[actionKey]) ? store[actionKey] : [];
  const filtered = previous.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  const next = [...filtered, now];
  store[actionKey] = next;
  writeRateStore(store);
  return next.length;
};

const getRemainingLockMs = (actionKey) => {
  const now = Date.now();
  const store = readRateStore();
  const attempts = Array.isArray(store[actionKey]) ? store[actionKey] : [];
  const filtered = attempts.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (filtered.length < MAX_ATTEMPTS) {
    return 0;
  }
  const oldestRelevant = filtered[0];
  return Math.max(0, RATE_LIMIT_WINDOW_MS - (now - oldestRelevant));
};

const formatLockMinutes = (lockMs) => {
  const minutes = Math.ceil(lockMs / 60000);
  return Math.max(1, minutes);
};

const HumanCheckModal = ({
  open,
  onClose,
  onVerified,
  actionKey,
  actionLabel,
  language = 'en',
}) => {
  const [useTurnstile, setUseTurnstile] = useState(Boolean(TURNSTILE_SITE_KEY));
  const [numA, setNumA] = useState(0);
  const [numB, setNumB] = useState(0);
  const [answer, setAnswer] = useState('');
  const [token, setToken] = useState('');
  const [widgetReady, setWidgetReady] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const widgetHostRef = useRef(null);
  const widgetIdRef = useRef(null);

  const t = useMemo(() => {
    const isDe = language === 'de';
    return {
      title: isDe ? 'Kurz pruefen, ob Sie ein Mensch sind' : 'Quick human check',
      subtitle: isDe
        ? `Bitte loesen Sie die Aufgabe, um fortzufahren: ${actionLabel}`
        : `Please solve the challenge to continue: ${actionLabel}`,
      placeholder: isDe ? 'Antwort eingeben' : 'Enter answer',
      cancel: isDe ? 'Abbrechen' : 'Cancel',
      continue: isDe ? 'Fortfahren' : 'Continue',
      turnstileLoading: isDe ? 'Sicherheitspruefung wird geladen...' : 'Loading security verification...',
      turnstileRequired: isDe
        ? 'Bitte die Sicherheitspruefung zuerst abschliessen.'
        : 'Please complete the security verification first.',
      invalid: isDe ? 'Antwort ist nicht korrekt. Bitte erneut versuchen.' : 'Incorrect answer. Please try again.',
      verifyFailed: isDe ? 'Verifizierung fehlgeschlagen. Bitte erneut versuchen.' : 'Verification failed. Please try again.',
      fallbackHint: isDe ? 'Fallback-Herausforderung' : 'Fallback challenge',
      lockedPrefix: isDe ? 'Zu viele Versuche. Bitte in' : 'Too many attempts. Please retry in',
      lockedSuffix: isDe ? 'Minuten.' : 'minutes.',
    };
  }, [language, actionLabel]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setUseTurnstile(Boolean(TURNSTILE_SITE_KEY));
    setNumA(Math.floor(Math.random() * 8) + 2);
    setNumB(Math.floor(Math.random() * 8) + 2);
    setAnswer('');
    setToken('');
    setWidgetReady(false);
    setIsVerifying(false);
    setError('');
  }, [open, actionKey]);

  useEffect(() => {
    if (!open || !useTurnstile || !widgetHostRef.current) {
      return;
    }

    let isMounted = true;

    loadTurnstileScript()
      .then(() => {
        if (!isMounted || !window.turnstile || !widgetHostRef.current) {
          return;
        }

        widgetHostRef.current.innerHTML = '';
        widgetIdRef.current = window.turnstile.render(widgetHostRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          action: actionKey,
          callback: (nextToken) => {
            setToken(nextToken || '');
            setError('');
          },
          'expired-callback': () => setToken(''),
          'error-callback': () => {
            setToken('');
            setError(t.verifyFailed);
          },
          theme: 'light',
        });

        setWidgetReady(true);
      })
      .catch(() => {
        setUseTurnstile(false);
      });

    return () => {
      isMounted = false;
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [open, useTurnstile, actionKey, t.verifyFailed]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const lockMs = getRemainingLockMs(actionKey);
  const isLocked = lockMs > 0;

  const handleSubmit = () => {
    if (isLocked) {
      setError(`${t.lockedPrefix} ${formatLockMinutes(lockMs)} ${t.lockedSuffix}`);
      return;
    }

    if (useTurnstile) {
      if (!token) {
        setError(t.turnstileRequired);
        return;
      }

      setIsVerifying(true);
      fetch(TURNSTILE_VERIFY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          action: actionKey,
        }),
      })
        .then(async (response) => {
          const payload = await response.json().catch(() => ({}));
          if (!response.ok || !payload?.success) {
            throw new Error(payload?.error || 'Verification failed');
          }

          logAttempt(actionKey, true);
          onVerified();
          onClose();
        })
        .catch(() => {
          const attemptCount = registerFailedAttempt(actionKey);
          logAttempt(actionKey, false);
          if (attemptCount >= MAX_ATTEMPTS) {
            const nextLockMs = getRemainingLockMs(actionKey);
            setError(`${t.lockedPrefix} ${formatLockMinutes(nextLockMs)} ${t.lockedSuffix}`);
          } else {
            setError(t.verifyFailed);
          }

          if (window.turnstile && widgetIdRef.current !== null) {
            window.turnstile.reset(widgetIdRef.current);
          }
          setToken('');
        })
        .finally(() => {
          setIsVerifying(false);
        });
      return;
    }

    const parsed = Number(answer);
    const isCorrect = parsed === numA + numB;

    if (!isCorrect) {
      const attemptCount = registerFailedAttempt(actionKey);
      logAttempt(actionKey, false);

      if (attemptCount >= MAX_ATTEMPTS) {
        const nextLockMs = getRemainingLockMs(actionKey);
        setError(`${t.lockedPrefix} ${formatLockMinutes(nextLockMs)} ${t.lockedSuffix}`);
      } else {
        setError(t.invalid);
      }
      return;
    }

    logAttempt(actionKey, true);
    onVerified();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-[var(--border)] p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-[var(--primary)]" />
            <h3 className="text-lg font-bold text-gray-900">{t.title}</h3>
          </div>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-5">{t.subtitle}</p>

        {useTurnstile ? (
          <div className="rounded-xl bg-[var(--background)] border border-[var(--border)] p-4 mb-4">
            <p className="mono text-xs uppercase tracking-wider text-gray-500 mb-3">Turnstile Verification</p>
            {!widgetReady && (
              <p className="text-sm text-gray-600 mb-3">{t.turnstileLoading}</p>
            )}
            <div ref={widgetHostRef} className="min-h-[70px]" />
          </div>
        ) : (
          <>
            <div className="rounded-xl bg-[var(--background)] border border-[var(--border)] p-4 mb-4">
              <p className="mono text-xs uppercase tracking-wider text-gray-500 mb-2">{t.fallbackHint}</p>
              <p className="text-xl font-semibold text-gray-900">{numA} + {numB} = ?</p>
            </div>

            <input
              type="number"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder={t.placeholder}
              className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            />
          </>
        )}

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

        <div className="flex items-center justify-end gap-2 mt-6">
          <button type="button" onClick={onClose} className="btn-secondary">{t.cancel}</button>
          <button type="button" onClick={handleSubmit} disabled={isVerifying} className="btn-accent disabled:opacity-60 disabled:cursor-not-allowed">
            {isVerifying ? 'Verifying...' : t.continue}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HumanCheckModal;
