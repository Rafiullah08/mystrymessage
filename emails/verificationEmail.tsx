import * as React from 'react';

interface EmailTemplateProps {
  userName: string;
  message : string
  otp: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    userName,
    message,
    otp
}) => (
  <div>
    <h3>Welcome, {userName}!</h3>
    <p> {message}!</p>
    <h2>{otp}</h2>
  </div>
);