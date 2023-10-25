import type { ReactNode } from "react";

export function Hero({ children }: { children?: ReactNode }): JSX.Element {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden opacity-20 -z-10">
        <div className="left-1/8 absolute top-1/2 z-10 h-full w-1/5 animate-aurora bg-[#66bfaa] blur-3xl" />
        <div className="absolute left-1/2 top-0 z-10 h-full w-1/2 animate-aurora bg-secondary-800 blur-3xl delay-[3000ms]" />
        <div className="absolute left-3/4 top-0 z-10 h-full w-1/5 animate-aurora bg-[#66bfaa] blur-3xl delay-[6000ms]" />
        <div className="absolute left-3/4 top-0 z-10 h-full w-1/5 animate-aurora bg-[#66bfaa] blur-3xl delay-[6000ms]" />
        <div className="absolute left-1/2 top-1/2 z-10 h-full w-1/5 animate-aurora bg-[#2b504d] blur-3xl delay-[8000ms]" />
      </div>
      <div className="relative z-30">
        <div className="mx-auto w-full max-w-7xl px-safe-offset-5 lg:px-safe-offset-8">
          {children}
        </div>
      </div>
    </>
  );
}
