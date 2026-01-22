import { NextRequest, NextResponse } from 'next/server';
import * as brevo from '@getbrevo/brevo';

interface BrevoError {
  status?: number;
  message?: string;
  response?: {
    data?: unknown;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if Brevo API key is configured
    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Initialize Brevo API client
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    // Map service codes to readable names
    const serviceNames: Record<string, string> = {
      immigration: 'Immigration Advice',
      benefits: 'Benefits & Welfare Support',
      legal: 'Legal Documentation',
      other: 'Other'
    };

    const serviceName = serviceNames[service] || service;

    // Email content for admin notification
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1C478A; border-bottom: 2px solid #1A7EB9; padding-bottom: 10px;">
          New Consultation Request - Bimaah International
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1A7EB9; margin-top: 0;">Client Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Service Requested:</strong> ${serviceName}</p>
        </div>
        
        <div style="background-color: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1A7EB9; margin-top: 0;">Client Message</h3>
          <p style="margin: 0; color: #333; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <h4 style="color: #856404; margin-top: 0;">Next Steps</h4>
          <p style="margin: 0; color: #856404; font-size: 14px;">
            Please respond to this consultation request within 24 hours at <strong>${email}</strong>
            ${phone ? ` or call <strong>${phone}</strong>` : ''}.
          </p>
        </div>

        <div style="color: #666; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="margin: 0;">Submitted: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
        </div>
      </div>
    `;

    const adminTextContent = `
      New Consultation Request - Bimaah International
      
      Client Information:
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Service Requested: ${serviceName}
      
      Client Message:
      ${message}
      
      Next Steps:
      Please respond to this consultation request within 24 hours at ${email}${phone ? ` or call ${phone}` : ''}.
      
      Submitted: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
    `;

    // Client confirmation email content
    const clientEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1C478A; border-bottom: 2px solid #1A7EB9; padding-bottom: 10px;">
          Thank You for Contacting Bimaah International
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1A7EB9; margin-top: 0;">Dear ${name},</h3>
          <p>Thank you for reaching out to us. We have received your consultation request and one of our advisers will get back to you within 24 hours.</p>
        </div>
        
        <div style="background-color: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1A7EB9; margin-top: 0;">Your Request Summary</h3>
          <p style="margin: 5px 0;"><strong>Service:</strong> ${serviceName}</p>
          <p style="margin: 5px 0;"><strong>Your Message:</strong></p>
          <p style="margin: 5px 0; color: #666; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="background-color: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
          <h4 style="color: #155724; margin-top: 0;">What Happens Next?</h4>
          <p style="margin: 0; color: #155724; font-size: 14px;">
            1. Our team will review your request<br>
            2. An adviser will contact you within 24 hours<br>
            3. We'll schedule a free consultation at your convenience
          </p>
        </div>

        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #1C478A; margin-top: 0;">Contact Information</h4>
          <p style="margin: 5px 0; color: #666;">
            <strong>Phone:</strong> <a href="tel:+447903263491" style="color: #1A7EB9; text-decoration: none;">03334040491</a><br>
            <strong>Email:</strong> <a href="mailto:info@bimaahinternationalltd.com" style="color: #1A7EB9; text-decoration: none;">info@bimaahinternationalltd.com</a><br>
            <strong>Address:</strong> Toronto road, Tilbury RM18 7RL
          </p>
        </div>

        <div style="color: #666; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
          <p style="margin: 5px 0;"><strong>Bimaah International Ltd</strong></p>
          <p style="margin: 5px 0;">Your Rights. Your Voice. Our Support.</p>
          <p style="margin: 5px 0;">Registration Number: N202537994</p>
          <p style="margin: 15px 0 5px 0; font-size: 11px;">
            Authorised and regulated by the Immigration Advice Authority
          </p>
        </div>
      </div>
    `;

    const clientTextContent = `
      Thank You for Contacting Bimaah International
      
      Dear ${name},
      
      Thank you for reaching out to us. We have received your consultation request and one of our advisers will get back to you within 24 hours.
      
      Your Request Summary:
      Service: ${serviceName}
      Your Message: ${message}
      
      What Happens Next?
      1. Our team will review your request
      2. An adviser will contact you within 24 hours
      3. We'll schedule a free consultation at your convenience
      
      Contact Information:
      Phone: 03334040491
      Email: info@bimaahinternationalltd.com
      Address: Toronto road, Tilbury RM18 7RL
      
      Bimaah International Ltd
      Your Rights. Your Voice. Our Support.
      Registration Number: N202537994
      Authorised and regulated by the Immigration Advice Authority
    `;

    // Send confirmation email to client
    try {
      const clientEmail = new brevo.SendSmtpEmail();
      clientEmail.subject = `Consultation Request Received - Bimaah International`;
      clientEmail.htmlContent = clientEmailContent;
      clientEmail.textContent = clientTextContent;
      clientEmail.sender = { 
        name: "Bimaah International", 
        email: "info@bimaahinternationalltd.com" 
      };
      clientEmail.to = [
        { 
          email: email, 
          name: name 
        }
      ];

      await apiInstance.sendTransacEmail(clientEmail);
      console.log('Client confirmation email sent successfully');
    } catch (clientError) {
      console.error('Error sending confirmation email to client:', clientError);
      // Continue with admin notification even if client email fails
    }

    // Send notification email to admin
    try {
      const adminEmail = new brevo.SendSmtpEmail();
      adminEmail.subject = `New Consultation Request from ${name}`;
      adminEmail.htmlContent = adminEmailContent;
      adminEmail.textContent = adminTextContent;
      adminEmail.sender = { 
        email: "info@bimaahinternationalltd.com",
        name: "Bimaah International"
      };
      adminEmail.to = [
        {
          email: "info@bimaahinternationalltd.com",
          name: "Bimaah International"
        }
      ];
      adminEmail.replyTo = { 
        email: email, 
        name: name 
      };

      await apiInstance.sendTransacEmail(adminEmail);
      console.log('Admin notification sent successfully');
    } catch (adminError: unknown) {
      console.error('Brevo API error for admin notification:', adminError);
      
      // Type-safe error handling
      if (adminError && typeof adminError === 'object' && 'status' in adminError) {
        const error = adminError as BrevoError;
        console.error('Brevo error details:', {
          status: error.status,
          message: error.message,
          response: error.response?.data
        });
      }
      
      // Return error if admin email sending fails
      return NextResponse.json(
        { error: 'Failed to send admin notification. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Consultation request submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing consultation request:', error);
    return NextResponse.json(
      { error: 'Failed to submit consultation request' },
      { status: 500 }
    );
  }
}
