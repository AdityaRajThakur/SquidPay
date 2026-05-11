"use server";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";
import { OnRampStatus } from "@prisma/client";
import { generateToken } from "../generateToken";

export default async function createOnrampTransaction({
  provider,
  amount,
}: {
  provider: string;
  amount: number;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Access not allowed",
    };
  }
  console.log(provider + " " + amount);
  const token = generateToken(32);
  const res = await prisma.onRampTransaction.create({
    data: {
      userId: Number(session?.user?.id),
      token: token,
      status: OnRampStatus.Processing,
      amount: amount * 100,
      provider: provider,
      startTime: new Date(),
    },
  });
  console.log("successfull Done");
  return {
    Msg: "Done",
    OnRampId: res.id,
    UserID: res.userId,
  };
}
