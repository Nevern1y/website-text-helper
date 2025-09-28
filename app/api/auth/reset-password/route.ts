import { NextResponse } from "next/server"
import { consumeResetToken, updateUser } from "@/lib/server/database"

export async function POST(request: Request) {
  const body = await request.json().catch(() => undefined)
  if (!body || typeof body.token !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 })
  }

  if (body.password.length < 8) {
    return NextResponse.json({ error: "Пароль должен содержать минимум 8 символов" }, { status: 400 })
  }

  const resetToken = consumeResetToken(body.token)
  if (!resetToken) {
    return NextResponse.json({ error: "Ссылка для сброса недействительна" }, { status: 400 })
  }

  const user = updateUser(resetToken.userId, { password: body.password })
  if (!user) {
    return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
