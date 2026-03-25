const TURNSTILE_VERIFY_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    res.status(500).json({ success: false, error: 'Server is missing TURNSTILE_SECRET_KEY' });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const token = body.token;
  const expectedAction = body.action;

  if (!token) {
    res.status(400).json({ success: false, error: 'Missing token' });
    return;
  }

  const remoteIp = (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim();

  const params = new URLSearchParams();
  params.set('secret', secret);
  params.set('response', token);
  if (remoteIp) {
    params.set('remoteip', remoteIp);
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();
    const actionMatches = !expectedAction || !data.action || data.action === expectedAction;

    if (!data.success || !actionMatches) {
      res.status(400).json({
        success: false,
        error: 'Verification failed',
        details: data['error-codes'] || [],
      });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Verification request failed' });
  }
};
