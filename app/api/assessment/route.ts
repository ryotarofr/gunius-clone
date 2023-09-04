import { NextResponse } from "next/server";
// import prisma from "../../../../prisma";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

// export async function main() {
//   try {
//     await prisma.$connect();
//   } catch (err) {
//     return Error("DB接続に失敗しました");
//   }
// }

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const { userId }: any = auth();
    // await main();
    const getAllAssesmentByUser = await prisma.assessment.findMany({
      where: {
        userId: userId
      }
    });
    return NextResponse.json({ message: "Success", getAllAssesmentByUser }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};