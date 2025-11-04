import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api/auth';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(username, password);
      toast({
        title: 'Login successful',
        description: 'Welcome back to Hacking Health',
      });
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid credentials';
      setError(errorMessage);
      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-normal text-black mb-3 tracking-tight">
              Welcome back
            </h1>
            <p className="text-base" style={{ color: '#6E6E6E' }}>
              Sign in to access your health data
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[#E5E5E5] text-black placeholder-gray-400 rounded-md hover:bg-[#F7F7F7] focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[#E5E5E5] text-black placeholder-gray-400 rounded-md hover:bg-[#F7F7F7] focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-black text-white font-normal rounded-md hover:bg-[#1A1A1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Back Link */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/')}
              className="text-sm hover:underline transition-colors"
              style={{ color: '#6E6E6E' }}
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
