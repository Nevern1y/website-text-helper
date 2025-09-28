import { NextResponse } from "next/server"
import { findUserByEmail, issueResetToken } from "@/lib/server/database"

export async function POST(request: Request) {
  const body = await request.json().catch(() => undefined)
  if (!body || typeof body.email !== "string") {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 })
  }

  const user = findUserByEmail(body.email)
  if (!user) {
    // Не раскрываем существование пользователя
    return NextResponse.json({ success: true })
  }

  const token = issueResetToken(user.id)
  return NextResponse.json({ success: true, resetToken: token.token, expiresAt: token.expiresAt })
}
