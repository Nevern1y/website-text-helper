import { NextResponse } from "next/server"
import { createUser, findUserByEmail } from "@/lib/server/database"
import { createLoginSession } from "@/lib/server/auth"

function sanitizeUser(user: ReturnType<typeof createUser>) {
  const { passwordHash: _passwordHash, ...rest } = user
  return rest
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => undefined)
  if (!body || typeof body.email !== "string" || typeof body.password !== "string" || typeof body.name !== "string") {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 })
  }

  const existing = findUserByEmail(body.email)
  if (existing) {
    return NextResponse.json({ error: "Пользователь с таким email уже существует" }, { status: 400 })
  }

  if (body.password.length < 8) {
    return NextResponse.json({ error: "Пароль должен содержать минимум 8 символов" }, { status: 400 })
  }

  const user = createUser({ email: body.email, password: body.password, name: body.name })
  createLoginSession(user.id)
  return NextResponse.json({ user: sanitizeUser(user) }, { status: 201 })
}
