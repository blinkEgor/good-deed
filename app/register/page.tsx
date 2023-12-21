import { Metadata } from 'next';
import RegistrationForm from '@/app/ui/registration-form';
 
export const metadata: Metadata = {
  title: 'Register',
};

export default function RegistrationPage() {
  return (
    <div>
      <h1>Registration form</h1>
      <RegistrationForm />
    </div>
  );
};