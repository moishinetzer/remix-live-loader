import { Form } from "@remix-run/react";

export default function Index() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto text-2xl text-white mb-16">
        <Message text="Hey how are you?" />
        <Message text="I'm good, how are you?" />
        <Message text="I'm good, how are you?" />
        <Message text="I'm good, how are you?" />
        <Message text="I'm good, how are you?" />
        <Message text="I'm good, how are you?" />
        <Message text="I'm good, how are you?" />
        <Message text="I'm good, how are you?" />
        <Message text="I'm good, how are you?" />
        <Message text="I'm good, how are you?" />
        <Message text="I'm good, how are you?" />
      </div>
      <div className="fixed bottom-0 w-full h-40 from-transparent to-secondary-800 bg-gradient-to-b pointer-events-none" />

      <Form method="POST">
        <div className="fixed bottom-0 px-4 pb-4 w-full">
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
    <div className="flex justify-start items-start group gap-4 even:bg-white/5 px-10 py-5">
      <div className="w-8 h-8 bg-primary-600 group-even:bg-secondary-900 rounded flex items-center justify-center">
        {text[0].toUpperCase()}
      </div>
      <div>{text}</div>
    </div>
  );
}
