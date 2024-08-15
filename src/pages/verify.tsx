// pages/verify.tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const VerifyPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyEmail = async () => {
      const { token } = router.query;

      if (!token) {
        setMessage('Verification token is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify/${token}`);
        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
        } else {
          setMessage(data.message);
        }
      } catch (err) {
        setMessage('An error occurred during verification.');
      }

      setLoading(false);
    };

    verifyEmail();
  }, [router.query]);

  return (
    <div>
      <h1>Email Verification</h1>
      {loading ? <p>Loading...</p> : <p>{message}</p>}
    </div>
  );
};

export default VerifyPage;
