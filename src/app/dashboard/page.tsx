import { redirect } from "next/navigation"

const page = () => {
  redirect("/dashboard/new")
}

export default page