import { NextResponse } from "next/server";
// import prisma from "../../../../prisma";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    // const date = req.query.created_at;
    const dateObj = new Date();
    const start = dateObj.setHours(0, 0, 0, 0); // 日付の始まり（00:00:00.000）
    const end = dateObj.setHours(23, 59, 59, 999); // 日付の終わり（23:59:59.999）

    const allNaisei = await prisma.naisei.findMany({
      // where: {
      // created_at: {
      //   gte: new Date(start),
      //   lt: new Date(end),
      // },
      // }
    });
    return NextResponse.json({ message: "Success", allNaisei }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};


export const POST = async (req: Request, res: NextResponse) => {
  console.log("POST");

  try {
    const { userId } = auth();

    const { naisei, evaluation_type } = await req.json();
    await main();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const createNaisei = await prisma.naisei.create({ data: { naisei, evaluation_type, userId } });
    return NextResponse.json({ message: "Success", createNaisei }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
