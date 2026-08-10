import { type NextRequest, NextResponse } from "next/server";

const MAILERLITE_URL = "https://connect.mailerlite.com/api/subscribers";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: unknown; name?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const token = process.env.MAILERLITE_API_TOKEN;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  if (!token || !groupId) {
    console.error("[subscribe] missing MAILERLITE_API_TOKEN or MAILERLITE_GROUP_ID");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  try {
    const res = await fetch(MAILERLITE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        fields: name ? { name } : undefined,
        groups: [groupId],
      }),
    });
    if (!res.ok) {
      console.error(`[subscribe] MailerLite responded ${res.status}`);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
