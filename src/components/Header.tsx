import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from '@/assets/hacking-health-logo.png';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
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
              onClick={() => navigate('/')}
              className="text-sm font-light text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/community')}
              className="text-sm font-light text-muted-foreground hover:text-primary transition-colors"
            >
              Community
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
              className="text-sm font-light text-muted-foreground hover:text-primary transition-colors"
            >
              Login
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
