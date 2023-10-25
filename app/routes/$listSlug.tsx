import { NavLink as RemixNavLink, Outlet } from "@remix-run/react";

export default function Demo() {
  return (
    <div className="flex min-h-screen text-3xl">
      <div className="bg-white/10 flex flex-col p-2 gap-2">
        <p className="text-center p-6 bg -m-2 mb-2 bg-black/30 text-primary-400 font-semibold">
          TODOS+
        </p>
        <NavLink to="/shopping">Shopping</NavLink>
        <NavLink to="/to-do">To-dos</NavLink>
        <NavLink to="/ideas">Ideas</NavLink>
      </div>

      <Outlet />
    </div>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <RemixNavLink
      to={to}
      className={({ isActive }) =>
        `w-full p-4 pr-8 rounded text-secondary-200 hover:text-white/80 transition-all
        ${isActive ? "bg-white/5" : "text-opacity-30 hover:bg-white/[1%]"}`
      }
    >
      {children}
    </RemixNavLink>
  );
}
