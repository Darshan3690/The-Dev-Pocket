interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

// Uses the Resend HTTP API directly via fetch to avoid adding a new SDK
// dependency. Falls back to logging when RESEND_API_KEY is not configured,
// so local development and CI (which have no email credentials) never fail.
export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.DIGEST_FROM_EMAIL || 'digest@devpocket.dev';

  if (!apiKey) {
    console.log(`[email:dev] Would send "${subject}" to ${to}`);
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to send email: ${res.status} ${body}`);
  }
}
