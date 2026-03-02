import { orpc } from "@/server/orpc/utils/orpc.server";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }
  return (
    <div>hello world</div>
  );
}
