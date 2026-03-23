// components/BackendWaker.tsx
"use client"

import { useEffect } from "react"
import { backendUrl } from "~/lib/api"



export default function BackendWaker() {
  useEffect(() => {
    fetch(`${backendUrl}/health`, { credentials: "include" }).catch(() => {})
  }, [])

  return null
}