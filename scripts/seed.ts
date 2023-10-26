import { db } from "~/utils/db.server";

async function seed() {
  let startingCreatedAt = new Date();
  await db.todoList.create({
    data: {
      slug: "wishlist",
      title: "Wishlist",
      todos: {
        createMany: {
          data: [
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
          ],
        },
      },
    },
  });

  await db.todoList.create({
    data: {
      slug: "groceries",
      title: "Groceries",
      todos: {
        createMany: {
          data: [
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
          ],
        },
      },
    },
  });

  await db.todoList.create({
    data: {
      slug: "work",
      title: "Work",
      todos: {
        createMany: {
          data: [
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
          ],
        },
      },
    },
  });
}

// @ts-ignore - we can run this in bun 😎
await seed().then(() => {
  console.log("Done seeding");
});
