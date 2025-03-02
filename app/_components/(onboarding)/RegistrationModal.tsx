'use client';
import { Input, Card, Button, Fieldset } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { useState, FormEvent } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
}

const RegistrationModal = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    username: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userData = {
        ...formData,
        user_id: user?.sub,
        createdAt: new Date(),
      };

      const response = await fetch('/api/registration', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const isFormValid =
    formData.firstName && formData.lastName && formData.username;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <Card.Root className="border shadow-sm w-full max-w-md">
        <Card.Body gap={4}>
          <Fieldset.Root size="lg" invalid={true}>
            <Fieldset.Content>
              <Field
                label={<p className="text-md font-medium pb-1">First Name</p>}
              >
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="input-field"
                  size="lg"
                />
              </Field>

              <Field
                label={<p className="text-md font-medium pb-1">Last Name</p>}
              >
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="input-field"
                  size="lg"
                />
              </Field>
              <Field
                label={<p className="text-md font-medium pb-1">Username</p>}
              >
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="JohnDoe143"
                  className="input-field"
                  size="lg"
                />
              </Field>
            </Fieldset.Content>
          </Fieldset.Root>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!isFormValid}
              className={`border px-4 py-2 rounded-md max-sm:w-full ${
                !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Register
            </Button>
          </div>
        </Card.Body>
      </Card.Root>
    </form>
  );
};

export default RegistrationModal;
