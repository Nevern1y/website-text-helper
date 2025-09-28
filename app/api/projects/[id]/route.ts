import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { deleteProject, getProject, updateProject } from "@/lib/server/database"

type Params = {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const user = requireAuth(request)
    const project = getProject(user.id, params.id)
    if (!project) {
      return NextResponse.json({ error: "Проект не найден" }, { status: 404 })
    }
    return NextResponse.json({ project })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const user = requireAuth(request)
    const body = await request.json().catch(() => undefined)
    if (!body) {
      return NextResponse.json({ error: "Некорректные данные" }, { status: 400 })
    }
    const project = updateProject(user.id, params.id, body)
    if (!project) {
      return NextResponse.json({ error: "Проект не найден" }, { status: 404 })
    }
    return NextResponse.json({ project })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const user = requireAuth(request)
    const success = deleteProject(user.id, params.id)
    if (!success) {
      return NextResponse.json({ error: "Проект не найден" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
