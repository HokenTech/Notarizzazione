import React, { useState } from 'react';
import { useSession } from '../session';

function Login() {
  const { sessionKit, session, setSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!sessionKit) {
      setError('Session kit not initialized yet. Please wait...');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { session: newSession } = await sessionKit.login();
      setSession(newSession);
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!sessionKit || !session) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await sessionKit.logout(session);
      setSession(null);
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message || 'Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  if (!sessionKit) {
    return <div className="text-sm text-gray-500">Initializing...</div>;
  }

  return (
    <div className="flex items-center gap-4">
      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}
      
      {session ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {session.actor?.toString()}
          </span>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Connecting...' : 'Login with Anchor'}
        </button>
      )}
    </div>
  );
}

export default Login;