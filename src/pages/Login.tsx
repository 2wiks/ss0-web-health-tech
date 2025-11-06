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
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-normal text-foreground mb-3 tracking-tight">
              Welcome back
            </h1>
            <p className="text-base text-muted-foreground">
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
                className="w-full px-4 py-3 bg-background border border-input text-foreground placeholder:text-muted-foreground rounded-md hover:bg-muted/50 focus:outline-none focus:border-primary transition-colors"
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
                className="w-full px-4 py-3 bg-background border border-input text-foreground placeholder:text-muted-foreground rounded-md hover:bg-muted/50 focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-normal rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Back Link */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/')}
              className="text-sm hover:underline transition-colors text-muted-foreground"
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
