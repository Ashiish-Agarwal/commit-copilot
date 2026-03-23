import { createAuthClient } from "better-auth/client"
import { backendUrl } from "./api"

const authClient = createAuthClient({
    baseURL: backendUrl, // This should point to your backend
})

export const signInWithGitHub = async () => {
    const data = await authClient.signIn.social({
        provider: "github",
    })
    return data
}
