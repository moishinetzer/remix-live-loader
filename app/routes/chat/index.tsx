import { json, type ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { emitter } from "~/utils/emitter.server";
import { useLiveLoader } from "~/utils/use-live-loader";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const message = formData.get("message");
  if (!message || typeof message !== "string") {
    throw new Error("you messed up, it's not my fault");
  }

  await db.message.create({
    data: {
      message,
    },
  });

  emitter.emit("chat");

  return null;
}

export async function loader() {
  const messages = await db.message.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return json({ messages });
}

export default function Index() {
  const { messages } = useLiveLoader<typeof loader>();

  return (
    <div className="h-screen flex flex-col">
      <div className="text-center p-8 text-4xl tracking-wide font-semibold">
        <span className="bg-primary-400/50 rounded-md p-1 text-secondary-800">
          Chat
        </span>
        <span className="pl-2">💿</span>
      </div>
      <div className="flex-1 overflow-y-auto text-2xl text-white mb-16">
        {messages.map(({ id, message }) => (
          <Message key={id} text={message} />
        ))}
      </div>
      <div className="fixed bottom-0 w-full h-40 from-transparent to-secondary-800 bg-gradient-to-b pointer-events-none" />

      <Form method="POST">
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-4 w-full max-w-4xl mx-auto">
          <div className="flex flex-row rounded-lg justify-between items-center bg-white/25 px-4">
            <input
              className="w-full text-xl bg-transparent text-white placeholder-white/60 border-transparent focus:border-transparent focus:ring-0"
              type="text"
              name="message"
              placeholder="Send a message"
            />

            <button type="submit">
              <svg
                className="stroke-white/60 w-6 h-6 fill-white/60"
                viewBox="0 0 32 32"
              >
                <path d="M4.667 26.307v-7.983l17.143-2.304-17.143-2.304v-7.983l24 10.285z" />
              </svg>
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

function Message({ text }: { text: string }) {
  return (
    <div className="w-full odd:bg-white/5">
      <div className="flex justify-start items-start group gap-4 px-10 py-5 max-w-4xl mx-auto">
        <div className="w-8 h-8 flex-shrink-0 bg-primary-600 group-even:bg-secondary-900 rounded flex items-center justify-center max-w-4xl">
          {text[0].toUpperCase()}
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
}
