import { useEffect, useMemo, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const RATE_KEY = 'portfolio-human-check-rate';
const LOG_KEY = 'portfolio-human-check-log';

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
  const [numA, setNumA] = useState(0);
  const [numB, setNumB] = useState(0);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

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
      invalid: isDe ? 'Antwort ist nicht korrekt. Bitte erneut versuchen.' : 'Incorrect answer. Please try again.',
      lockedPrefix: isDe ? 'Zu viele Versuche. Bitte in' : 'Too many attempts. Please retry in',
      lockedSuffix: isDe ? 'Minuten.' : 'minutes.',
    };
  }, [language, actionLabel]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setNumA(Math.floor(Math.random() * 8) + 2);
    setNumB(Math.floor(Math.random() * 8) + 2);
    setAnswer('');
    setError('');
  }, [open, actionKey]);

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

        <div className="rounded-xl bg-[var(--background)] border border-[var(--border)] p-4 mb-4">
          <p className="mono text-xs uppercase tracking-wider text-gray-500 mb-2">Security Check</p>
          <p className="text-xl font-semibold text-gray-900">{numA} + {numB} = ?</p>
        </div>

        <input
          type="number"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder={t.placeholder}
          className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
        />

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

        <div className="flex items-center justify-end gap-2 mt-6">
          <button type="button" onClick={onClose} className="btn-secondary">{t.cancel}</button>
          <button type="button" onClick={handleSubmit} className="btn-accent">{t.continue}</button>
        </div>
      </div>
    </div>
  );
};

export default HumanCheckModal;
