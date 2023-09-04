import { NextResponse } from "next/server";
import { main } from "../../route";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const { userId } = auth();
    let created_at = (req.url.split("/naisei-create-date/")[1])
    const dateObj = new Date(created_at);

    await main();

    const getNaiseiCreatedAt = await prismadb.naisei.findMany({
      where: {
        created_at: {
          gte: new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 1), // 指定した日付の日初めを取得
          lt: new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1, 1), // 指定した日付の翌日初めを取得
        },
        userId,
      }
    });

    if (!created_at || !userId) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", getNaiseiCreatedAt }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prismadb.$disconnect();
  }
};