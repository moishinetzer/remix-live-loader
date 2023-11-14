# Remix Live Loader

## Introduction

This repo demonstrates how to use Server-Sent Events to invalidate data on other clients in real-time. It showcases a practical implementation of real-time data updates across multiple clients, ensuring that all users see the most current data as it changes.

For the best demo of this repo, how it was implemented, and how to use it, I highly recommend watching the following video:

[Server-Sent Events in Remix](https://www.youtube.com/watch?v=Dz7B7B_I6d4)

## Getting Started

To implement this functionality, incorporate the following files into your app.

- [`app/utils/emitter.server.ts`](app/utils/emitter.server.ts): Manages the event emission across various clients.

- [`app/utils/create-event-stream.server.ts`](app/utils/create-event-stream.server.ts): Sets up an event stream for listening to specific events.

- [`app/utils/use-live-loader.ts`](app/utils/use-live-loader.ts): Extends `useLoaderData` for real-time data revalidation.

## Usage

### emitter

```tsx
const emitter: EventEmitter;
```

An EventEmitter singleton used across all requests to emit events to the event stream. Example use case: Emitting a 'new-message' event when a new chat message is received.

### createEventStream

```tsx
function createEventStream(request: Request, eventName: string): EventStream;
```

This function initializes an event stream that listens for the specified event name. It sends an event with the current timestamp as data and includes cleanup logic for memory optimization.

### useLiveLoader

```tsx
function useLiveLoader<T>(): SerializeFrom<T>;
```

This function extends useLoaderData, automatically revalidating all data upon event stream triggers. Ideal for real-time data updates on pages like live chat or notifications.

Listens to events being emitted to the current path + `/stream` and revalidates the data when events are received.

## Walkthrough

1. **Stream Setup**: Create `stream.tsx` in the relevant directory. This route will manage the event stream. For example, for a `/chat` route, set up a corresponding `/chat/stream`.

2. **Event Listening**: Use `createEventStream` in the `stream` route's loader function to listen for events. For a chat application, this could be listening for new messages in a chat room.

```tsx
import type { LoaderFunctionArgs } from "@remix-run/node";
import { createEventStream } from "~/utils/create-event-stream.server";

export function loader({ request, params }: LoaderFunctionArgs) {
  // Here we are listening for events emitted to "chat" and returning an event stream
  return createEventStream(request, "chat");
}
```

3. **Data Revalidation**: Implement `useLiveLoader` in your data-serving route to automatically revalidate data with each event. In a chat application, this ensures that the chat view updates in real-time as new messages arrive.

```tsx
import { useLiveLoader } from "~/utils/use-live-loader";
import { json } from "@remix-run/node";

export async function loader() {
  let chats = await db.chats.findMany();

  return json({
    chats,
  });
}

export default function Chat() {
  // Here we are using the useLiveLoader hook to get the data from the loader function
  // and revalidate it whenever the event stream is triggered
  let { chats } = useLiveLoader<typeof loader>();

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>{chat.message}</li>
        ))}
      </ul>

      <Form method="post" action="/chat">
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </Form>
    </div>
  );
}
```

4. **Triggering Updates**: Utilize the `emitter` in routes where you want to trigger updates (like after creating a new chat message). This ensures all clients connected to the event stream receive real-time updates.

```tsx
import { emitter } from "~/utils/emitter.server";
import { json, type ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let message = formData.get("message");

  await db.chats.create({
    data: {
      message,
    },
  });

  // Here we are emitting an event to the "chat" event stream
  // which will trigger a revalidation of the data in the useLiveLoader hook
  // for all clients listening to the event stream
  emitter.emit("chat");

  return null;
}
```

## Acknowledgements

Special thanks to [Alex Anderson](https://twitter.com/ralex1993) and his [great talk](https://www.youtube.com/watch?v=cAYHw_dP-Lc) at RemixConf 2023 which inspired this repo.

Also, a shoutout to the Remix team and [Brooks Lybrand](https://twitter.com/BrooksLybrand) for hosting me and for all the support.

## Contributing

Contributions are welcome! Feel free to open issues for bugs or feature requests, or submit PRs for improvements. Please ensure your contributions are well-documented and tested.
