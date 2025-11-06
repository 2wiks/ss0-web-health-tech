import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { authService } from '@/api/auth';
import logo from '@/assets/hacking-health-logo.png';

const AuthenticatedHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.revokeToken();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E5E5]">
      <div className="container mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          <div 
            className="cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="Hacking Health" className="h-12 w-auto" />
          </div>
          <nav className="flex items-center gap-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="text-sm font-light text-black hover:text-black hover:bg-gray-100 transition-colors"
            >
              Dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/families')}
              className="text-sm font-light text-black hover:text-black hover:bg-gray-100 transition-colors"
            >
              Families
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/community')}
              className="text-sm font-light text-black hover:text-black hover:bg-gray-100 transition-colors"
            >
              Community
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-sm font-light text-black hover:text-black hover:bg-gray-100 transition-colors"
            >
              Logout
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;

