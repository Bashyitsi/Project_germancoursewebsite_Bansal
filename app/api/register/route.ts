import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { render } from '@react-email/render';
import RegistrationEmail from 'emails/RegistrationEmail';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // Await the render function since it returns a Promise
    const emailHtml = await render(RegistrationEmail({ ...formData }));

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['christoish20@gmail.com'],
      subject: `New Registration from ${formData.name}`,
      html: emailHtml,
      replyTo: formData.email  // Changed from reply_to to replyTo
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Registration email error:', error);
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}