// emails/RegistrationEmail.tsx
import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface RegistrationEmailProps {
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    germanLevel: string;
    registering: string;
    timeSession: string;
    paymentMode: string;
    paymentVia: string;
  }
  
  export const RegistrationEmail = ({
    name,
    email,
    phoneNumber,
    gender,
    germanLevel,
    registering,
    timeSession,
    paymentMode,
    paymentVia,
  }: RegistrationEmailProps) => {
    return (
      <Html>
        <Head />
        <Preview>New Registration from {name}</Preview>
        <Body style={main}>
          <Container style={container}>
            <Heading style={h1}>New Registration Received</Heading>
            <Text style={text}>A new student has registered for German classes.</Text>
  
            <Section style={section}>
              <Text style={sectionHeader}>Student Information:</Text>
              <Text style={details}>Name: {name}</Text>
              <Text style={details}>Email: {email}</Text>
              <Text style={details}>Phone: {phoneNumber}</Text>
              <Text style={details}>Gender: {gender}</Text>
            </Section>
  
            <Hr style={hr} />
  
            <Section style={section}>
              <Text style={sectionHeader}>Course Details:</Text>
              <Text style={details}>German Level: {germanLevel}</Text>
              <Text style={details}>Registering for: {registering}</Text>
              <Text style={details}>Time Session: {timeSession}</Text>
            </Section>
  
            <Hr style={hr} />
  
            <Section style={section}>
              <Text style={sectionHeader}>Payment Information:</Text>
              <Text style={details}>Payment Mode: {paymentMode}</Text>
              <Text style={details}>Payment Via: {paymentVia}</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  };
  
  const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system, "Segoe UI", sans-serif',
  };
  
  const container = {
    margin: '0 auto',
    padding: '40px 0',
    width: '560px',
  };
  
  const h1 = {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
    textAlign: 'center' as const,
  };
  
  const section = {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '5px',
    margin: '20px 0',
    padding: '20px',
  };
  
  const sectionHeader = {
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 15px',
  };
  
  const details = {
    color: '#555',
    fontSize: '14px',
    margin: '5px 0',
  };
  
  const text = {
    color: '#555',
    fontSize: '16px',
    margin: '0 0 20px',
  };
  
  const hr = {
    borderColor: '#eee',
    margin: '20px 0',
  };
  
  export default RegistrationEmail;