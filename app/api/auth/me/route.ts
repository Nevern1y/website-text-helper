import { NextResponse } from "next/server"
import { readUserFromCookies } from "@/lib/server/auth"

export async function GET() {
  const user = readUserFromCookies()
  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 })
  }
  const { passwordHash: _passwordHash, ...rest } = user
  return NextResponse.json({ user: rest })
}
