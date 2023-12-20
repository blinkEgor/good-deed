import { useState } from 'react';

export default function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await fetch('@/app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ username, email, password }),
            });

            if(response.ok) {
                console.log('User registered!');
            } else {
                console.log('Error during registration.');
            }
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>User name:</label>
                <input
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type='submit'>Register</button>
        </form>
    )
}