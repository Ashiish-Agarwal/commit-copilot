import { createAuthClient } from "better-auth/client"
const authClient =  createAuthClient()

export const signInWithGitHub = async () => {
    const data = await authClient.signIn.social({
        provider: "github",
    })
    return data
}