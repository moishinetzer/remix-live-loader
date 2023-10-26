import type { DataFunctionArgs } from "@remix-run/node";
import { eventStream } from "remix-utils/sse/server";
import { emitter } from "~/utils/emitter.server";

function eventStreamListener(request: Request, eventName: string) {
  return eventStream(request.signal, (send, abort) => {
    let handler = () => {
      send({ data: Date.now().toString() });
    };

    request.signal.addEventListener("abort", abort);

    emitter.addListener(eventName, handler);
    return () => {
      emitter.removeListener(eventName, handler);
    };
  });
}

export async function loader({ request, params }: DataFunctionArgs) {
  return eventStreamListener(request, params.listSlug!);
}
