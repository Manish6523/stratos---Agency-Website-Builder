"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendInvitationEmailParams {
  email: string;
  agencyName: string;
  invitationToken: string;
  role: string;
}

export const sendInvitationEmail = async ({
  email,
  agencyName,
  invitationToken,
  role,
}: SendInvitationEmailParams) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const acceptUrl = `${baseUrl}/verify?token=${invitationToken}`;

  const roleDisplay = role
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  try {
    const { data, error } = await resend.emails.send({
      from: "Stratos <onboarding@resend.dev>",
      to: [email],
      subject: `You've been invited to join ${agencyName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <div style="font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                ✦ Stratos
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 20px 40px 10px;">
              <h1 style="margin: 0 0 8px; font-size: 22px; font-weight: 600; color: #ffffff; text-align: center;">
                You're Invited!
              </h1>
              <p style="margin: 0 0 24px; font-size: 15px; color: #94a3b8; text-align: center; line-height: 1.6;">
                You've been invited to join <strong style="color: #e2e8f0;">${agencyName}</strong> as a <strong style="color: #818cf8;">${roleDisplay}</strong>.
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 10px 40px 30px; text-align: center;">
              <a href="${acceptUrl}" 
                 style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 10px; letter-spacing: 0.3px; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);">
                Accept Invitation →
              </a>
            </td>
          </tr>

          <!-- Info Box -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px 20px;">
                <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.6;">
                  If you don't have an account yet, you'll be asked to create one first. After signing up, you'll automatically be added to the team.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 30px; border-top: 1px solid rgba(255,255,255,0.06);">
              <p style="margin: 0 0 8px; font-size: 12px; color: #475569; text-align: center;">
                If you didn't expect this invitation, you can safely ignore this email.
              </p>
              <p style="margin: 0; font-size: 12px; color: #334155; text-align: center;">
                Or copy this link: <span style="color: #6366f1; word-break: break-all;">${acceptUrl}</span>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    });

    if (error) {
      console.error("Resend email error:", error);
      return { success: false, error: error.message };
    }

    console.log("Invitation email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send invitation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
};
