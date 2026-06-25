import { db } from "@/lib/db";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const [rows]: any = await db.query("SELECT * FROM recipes WHERE id = ?", [
        id,
      ]);

      return Response.json(rows[0] || null);
    }

    const [rows] = await db.query("SELECT * FROM recipes ORDER BY id DESC");

    return Response.json(rows);
  } catch (err) {
    console.error("GET ERROR:", err);
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const ingredients = formData.get("ingredients") as string;
    const instructions = formData.get("instructions") as string;
    const time_minutes = formData.get("time_minutes") as string;
    const difficulty = formData.get("difficulty") as string;
    const image = formData.get("image") as File | null;

    let imagePath = null;

    if (image && typeof image !== "string") {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${image.name}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);

      fs.writeFileSync(filePath, buffer);

      imagePath = `/uploads/${fileName}`;
    }

    await db.query(
      `INSERT INTO recipes
  (
    title,
    description,
    ingredients,
    instructions,
    image,
    time_minutes,
    difficulty
  )
  VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        ingredients,
        instructions,
        imagePath,
        Number(time_minutes),
        difficulty,
      ],
    );

    return Response.json({
      success: true,
      image: imagePath,
    });
  } catch (err) {
    console.error("POST ERROR:", err);
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
