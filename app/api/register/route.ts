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
    
    // Log the incoming data
    console.log('Received form data:', formData);

    // Validate required fields
    if (!formData.name || !formData.email) {
      console.error('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log before rendering email
    console.log('Rendering email template...');
    const emailHtml = await render(RegistrationEmail({ ...formData }));
    console.log('Email template rendered successfully');

    // Log before sending email
    console.log('Attempting to send email...');
    
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['deutschconnecta@gmail.com'], // Make sure this email is correct
      subject: `New Registration from ${formData.name}`,
      html: emailHtml,
      replyTo: formData.email
    });

    // Log successful send
    console.log('Email sent successfully:', data);

    return NextResponse.json({
      success: true,
      message: 'Registration email sent',
      data: data
    });

  } catch (error) {
    // Enhanced error logging
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      responseData: error.response?.data,
      statusCode: error.response?.status
    });

    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process registration',
        details: error.message
      },
      { status: 500 }
    );
  }
}