import { Form } from "@remix-run/react";

export default function Index() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto text-2xl text-white mb-16">
        <Message text="Never gonna give you up" />
        <Message text="Never gonna let you down" />
        <Message text="Never gonna run around" />
        <Message text="And desert you." />
      </div>
      <div className="fixed bottom-0 w-full h-40 from-transparent to-secondary-800 bg-gradient-to-b pointer-events-none" />

      <Form method="POST">
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-4 w-full max-w-4xl mx-auto">
          <div className="flex flex-row rounded-lg justify-between items-center bg-white/25 px-4">
            <input
              className="w-full text-xl bg-transparent text-white placeholder-white/60 border-transparent focus:border-transparent focus:ring-0"
              type="text"
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
    <div className="w-full even:bg-white/5">
      <div className="flex justify-start items-start group gap-4 px-10 py-5 max-w-4xl mx-auto">
        <div className="w-8 h-8 flex-shrink-0 bg-primary-600 group-even:bg-secondary-900 rounded flex items-center justify-center max-w-4xl">
          {text[0].toUpperCase()}
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
}
