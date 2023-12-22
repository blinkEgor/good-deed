// import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RegistrationForm() {
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch('@/app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        router.push('@/app/dashboard');
      } else {
        console.error('Error during registration.');
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Username:</label>
            <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your username"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
                required
            />
        </div>
        <div>
            <label>Email:</label>
            <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        <div>
            <label>Password:</label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <button type="submit">Register</button>
    </form>
  );
};