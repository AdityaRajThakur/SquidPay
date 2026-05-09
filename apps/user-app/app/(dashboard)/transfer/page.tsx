import prisma from "@repo/db/client";
import { AddMoneyCard } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import type {OnRampStatus} from "@prisma/client" ; 

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}
async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  console.log(session) ; 
  const trans = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return trans.map((t): {
    time: Date,
    amount: number,
    status: OnRampStatus
    provider: string
  } => {
    return {
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    };
  });
}
export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  return <>
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-12 gap-4 md:grid-cols-2 p-4">
        <div className ="">
          <AddMoneyCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
  </>
}
