import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function () {
  const session = await getServerSession();
  // console.log("this is user in page " + session?.user) ;
  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
}
