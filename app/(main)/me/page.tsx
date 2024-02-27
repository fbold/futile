import { auth } from "@/lib/auth"

export default async function Me() {
  const session = await auth()
  return <div>{JSON.stringify(session?.user, null, 2)}</div>
}
