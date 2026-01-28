import logoLight from "@/assets/hacking-health-logo.png";
import logoDark from "@/assets/hacking-health-logo-dark.png";

export function AppIcon() {
  return (
    <div className="flex justify-center pt-12">
      <span className="inline-block">
        <img
          src={logoLight}
          alt=""
          className="h-10 w-auto dark:hidden"
          width={120}
          height={40}
        />
        <img
          src={logoDark}
          alt=""
          className="h-10 w-auto hidden dark:block"
          width={120}
          height={40}
        />
      </span>
    </div>
  );
}
