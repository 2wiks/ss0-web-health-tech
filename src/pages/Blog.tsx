import { authService } from '@/api/auth';
import Header from '@/components/Header';
import AuthenticatedHeader from '@/components/AuthenticatedHeader';

const DISCORD_INVITE_URL = 'https://discord.gg/MZMVmVpV';

const Blog = () => {
  const isAuthenticated = authService.isAuthenticated();

  return (
    <>
      {isAuthenticated ? <AuthenticatedHeader /> : <Header />}
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <a
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noreferrer"
          className="group w-full max-w-3xl rounded-3xl bg-white text-[#23272A] shadow-2xl px-8 py-10 sm:px-12 sm:py-12 md:px-16 md:py-16 transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#5865F2] text-white shadow-lg">
              <svg
                viewBox="0 0 127.14 96.36"
                aria-hidden="true"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
              >
                <path
                  fill="currentColor"
                  d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-.52,56.6,1.5,80.21a105.73,105.73,0,0,0,32.06,16.15,77.7,77.7,0,0,0,6.89-11.11,68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2,20.89,9.8,43.58,9.8,64.31,0,.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.06-16.16C130.31,52.65,123.91,28.75,107.7,8.07ZM42.45,65.69c-6.18,0-11.21-5.64-11.21-12.58S36.24,40.5,42.45,40.5c6.22,0,11.27,5.66,11.21,12.61S48.67,65.69,42.45,65.69Zm42.24,0c-6.18,0-11.21-5.64-11.21-12.58S78.48,40.5,84.69,40.5c6.22,0,11.26,5.66,11.21,12.61S90.91,65.69,84.69,65.69Z"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Comunidad de Discord
              </p>
              <p className="mt-3 text-base sm:text-lg text-[#4F545C]">
                Haz clic para unirte y conversar con la comunidad.
              </p>
              <span className="mt-6 inline-flex items-center justify-center rounded-full bg-[#5865F2] text-white px-6 py-3 text-lg font-semibold transition-colors group-hover:bg-[#4752C4]">
                Entrar ahora
              </span>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default Blog;
