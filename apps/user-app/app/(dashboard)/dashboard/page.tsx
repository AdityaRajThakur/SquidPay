import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
export default async function () {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="text-xl capitalize">
        <div className="flex ">
          <div className="mr-3">Welcome</div>
          <div className="text-purple-500">{session?.user.name}</div>
        </div>
      </h1>
      This is dashboard page
    </div>
  );
}
