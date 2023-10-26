import { db } from "~/utils/db.server";

async function seed() {
  let startingCreatedAt = new Date();
  const p0 = await db.todoList.create({
    data: {
      slug: "wishlist",
      title: "Wishlist",
    },
  });

  [
    {
      title: "Pet Rock",
      completed: true,
      createdAt: startingCreatedAt,
    },
    {
      title: "Crododile Slippers",
      completed: false,
      createdAt: new Date(startingCreatedAt.getTime() + 1000),
    },
    {
      title: "Remix v3",
      completed: false,
      createdAt: new Date(startingCreatedAt.getTime() + 2000),
    },
  ].forEach(async (todo) => {
    await db.todo.create({
      data: {
        listId: p0.id,
        ...todo,
      },
    });
  });

  const p1 = await db.todoList.create({
    data: {
      slug: "groceries",
      title: "Groceries",
    },
  });

  [
    {
      title: "Chocolate",
      completed: false,
      createdAt: startingCreatedAt,
    },
    {
      title: "Milk",
      completed: true,
      createdAt: new Date(startingCreatedAt.getTime() + 1000),
    },
    {
      title: "Mice Cream",
      completed: false,
      createdAt: new Date(startingCreatedAt.getTime() + 2000),
    },
  ].forEach(async (todo) => {
    await db.todo.create({
      data: {
        listId: p1.id,
        ...todo,
      },
    });
  });

  const p2 = await db.todoList.create({
    data: {
      slug: "work",
      title: "Work",
    },
  });

  [
    {
      title: "Write blog post",
      completed: false,
      createdAt: startingCreatedAt,
    },
    {
      title: "Write newsletter",
      completed: false,
      createdAt: new Date(startingCreatedAt.getTime() + 1000),
    },
    {
      title: "Write docs",
      completed: false,
      createdAt: new Date(startingCreatedAt.getTime() + 2000),
    },
  ].forEach(async (todo) => {
    await db.todo.create({
      data: {
        listId: p2.id,
        ...todo,
      },
    });
  });
}

// @ts-ignore - we can run this in bun 😎
await seed().then(() => {
  console.log("Done seeding");
});
