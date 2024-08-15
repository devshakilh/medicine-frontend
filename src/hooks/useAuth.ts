import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [auth, setAuth] = useState<{ token: string | null }>({ token: null });

    useEffect(() => {
        // Check for token in localStorage or handle token refresh
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            setAuth({ token: response.data.accessToken });
            localStorage.setItem('token', response.data.accessToken);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        setAuth({ token: null });
        localStorage.removeItem('token');
    };

    return { auth, login, logout };
};

export default useAuth;
