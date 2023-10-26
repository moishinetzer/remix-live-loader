import { json } from "@remix-run/node";
import {
  NavLink as RemixNavLink,
  Outlet,
  useLoaderData,
} from "@remix-run/react";
import { db } from "~/utils/db.server";

export async function loader() {
  return json({
    todoLists: await db.todoList.findMany(),
  });
}

export default function Demo() {
  let { todoLists } = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen text-3xl">
      <div className="bg-white/10 flex flex-col p-2 gap-2">
        <p className="text-center p-6 bg -m-2 mb-2 bg-black/30 text-primary-400 font-semibold">
          TODOS+
        </p>
        {todoLists.map((list) => (
          <NavLink key={list.id} to={`/todos/${list.slug}`}>
            {list.title}
          </NavLink>
        ))}
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
