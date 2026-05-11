"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function ({
  to,
  amount,
}: {
  to: string;
  amount: number;
}): Promise<{
  Code: number;
  Msg: string;
}> {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return {
      Code: 101,
      Msg: "Not Authneticated",
    };
  }
  const res = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });
  if (!res) {
    return {
      Code: 100,
      Msg: "No, Such User found",
    };
  }
  try {
    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`;
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(userId) },
      });
      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      await tx.balance.update({
        where: { userId: Number(userId) },
        data: { amount: { decrement: amount } },
      });

      await tx.balance.update({
        where: { userId: res.id },
        data: { amount: { increment: amount } },
      });
    });
  } catch (e) {
    console.log("Failed to p2p" + e);
    return {
      Code: 401,
      Msg: "Failed to send money",
    };
  }
  return {
    Code: 200,
    Msg: "Sent Money Successfull",
  };
}
