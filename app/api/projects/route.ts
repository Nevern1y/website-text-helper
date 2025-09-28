import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { createProject, listProjects } from "@/lib/server/database"

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const projects = listProjects(user.id)
    return NextResponse.json({ projects })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const body = await request.json().catch(() => undefined)
    if (!body || typeof body.name !== "string" || typeof body.type !== "string") {
      return NextResponse.json({ error: "Некорректные данные" }, { status: 400 })
    }
    const project = createProject(user.id, {
      name: body.name,
      description: typeof body.description === "string" ? body.description : undefined,
      type: body.type,
      settings: typeof body.settings === "object" && body.settings ? body.settings : {},
    })
    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
