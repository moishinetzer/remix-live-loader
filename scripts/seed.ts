import { db } from "~/utils/db.server";

async function seed() {
  let todoListNames = ["Shopping", "To-Do", "Ideas", "Work", "Home"];

  await db.todoList.createMany({
    data: todoListNames.map((name) => ({
      slug: name.toLowerCase(),
      title: name,
    })),
    skipDuplicates: true,
  });
}

// @ts-ignore - we can run this in bun 😎
await seed().then(() => {
  console.log("Done seeding");
});
