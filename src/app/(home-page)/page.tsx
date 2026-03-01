import { client } from "@/server/orpc/utils/orpc";
import { orpc } from "@/server/orpc/utils/orpc.server";
import { auth } from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react"

export default function Home() {
  const session = auth()
  if(!session){
    redirect("/login")
  }
  return (
    <div>hello world</div>
  );
}
