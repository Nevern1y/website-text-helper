import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { getDashboardSnapshot, listAIRequests, listProjects } from "@/lib/server/database"

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const snapshot = getDashboardSnapshot(user.id)
    const projects = listProjects(user.id)
    const requests = listAIRequests(user.id)

    return NextResponse.json({ snapshot, projects, requests })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
