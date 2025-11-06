import logoLight from '@/assets/hacking-health-logo.png';
import logoDark from '@/assets/hacking-health-logo-dark.png';

interface LogoProps {
  className?: string;
  alt?: string;
}

export const Logo = ({ className = "h-12 w-auto", alt = "Hacking Health" }: LogoProps) => {
  return (
    <span className="inline-block">
      {/* Logo para modo claro - visible solo cuando NO hay clase dark */}
      <img 
        src={logoLight} 
        alt={alt} 
        className={`${className} dark:hidden`}
      />
      {/* Logo para modo oscuro - visible solo cuando hay clase dark */}
      <img 
        src={logoDark} 
        alt={alt} 
        className={`${className} hidden dark:block`}
      />
    </span>
  );
};

export default Logo;
