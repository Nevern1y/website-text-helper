import { NextResponse } from "next/server"
import { authenticateWithCredentials, createLoginSession } from "@/lib/server/auth"
import { findUserByEmail } from "@/lib/server/database"

function sanitizeUser(user: NonNullable<ReturnType<typeof findUserByEmail>>) {
  const { passwordHash: _passwordHash, ...rest } = user
  return rest
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => undefined)
  if (!body || typeof body.email !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 })
  }

  const user = authenticateWithCredentials(body.email, body.password)
  if (!user) {
    return NextResponse.json({ error: "Неверный email или пароль" }, { status: 401 })
  }

  createLoginSession(user.id)
  return NextResponse.json({ user: sanitizeUser(user) })
}
