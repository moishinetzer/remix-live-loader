import type { LoaderFunctionArgs } from "@remix-run/node";
import { createEventStream } from "~/utils/create-event-stream.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return createEventStream(request, "chat");
}
