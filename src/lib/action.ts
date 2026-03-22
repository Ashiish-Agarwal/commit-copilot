"use server";
import { headers } from "next/headers";
import { auth } from "~/lib/auth"

const getSessioncheck = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session;
};

export default getSessioncheck;


// fetch('http://localhost:3001/me', {
//   credentials: 'include'
// })