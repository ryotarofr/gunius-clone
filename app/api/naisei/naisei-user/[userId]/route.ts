import { NextResponse } from "next/server";
import { main } from "../../route";
import prismadb from "@/lib/prismadb";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    let userId = (req.url.split("/naisei-user/")[1])

    await main();

    const getNaiseiByUserId = await prismadb.naisei.findMany({
      where: {
        userId
      }
    });

    if (!userId) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", getNaiseiByUserId }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prismadb.$disconnect();
  }
};