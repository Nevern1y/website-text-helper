import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { updateUser } from "@/lib/server/database"

export async function PUT(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const body = await request.json().catch(() => undefined)
    if (!body) {
      return NextResponse.json({ error: "Некорректные данные" }, { status: 400 })
    }

    const updated = updateUser(user.id, {
      name: typeof body.name === "string" ? body.name : undefined,
      email: typeof body.email === "string" ? body.email : undefined,
      avatarUrl: typeof body.avatarUrl === "string" ? body.avatarUrl : undefined,
      subscriptionPlan: typeof body.subscriptionPlan === "string" ? body.subscriptionPlan : undefined,
    })

    if (!updated) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 })
    }

    const { passwordHash: _passwordHash, ...rest } = updated
    return NextResponse.json({ user: rest })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
