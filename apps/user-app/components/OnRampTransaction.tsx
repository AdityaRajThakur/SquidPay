import { Card } from "@repo/ui/card";
import {OnRampStatus} from "@prisma/client" ; 

export function OnRampTransactions({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: OnRampStatus;
    provider: string;
  }[];
}): JSX.Element {
  if (transactions.length == 0) {
    return (
      <Card title={"OnRampTransaction"}>
        <div className="text-center pb-9 pt-8">No Recent Transactions</div>
      </Card>
    );
  }
  return (
    <Card title="OnRampTransaction">
      <div className="pt-2 ">
        {transactions.map((trn) => {
          return (
            <div className="flex justify-between">
              <div>
                <div className="text-sm">{trn.status==OnRampStatus.Success?"Recieved":(trn.status==OnRampStatus.Failure?"Failed" :"Processing") } INR</div>
                <div className="text-slate-600 text-xs">
                  {trn.time.toDateString()}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                {
                   trn.status==OnRampStatus.Success?<div className = "text-green-600"  > + Rs {trn.amount / 100}</div>:(trn.status==OnRampStatus.Failure?<div className = "text-red-600"  > + Rs {trn.amount / 100}</div>:(<div className = "text-yellow-600"  > + Rs {trn.amount / 100}</div>))
                }
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
