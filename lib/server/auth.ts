import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import {
  createSession,
  deleteSession,
  findUserByEmail,
  getSession,
  getUserById,
  verifyPassword,
} from "./database"

const SESSION_COOKIE = "ai-helper-session"

export function requireAuth(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  const session = getSession(token)
  if (!session) {
    throw new Error("UNAUTHORIZED")
  }
  const user = getUserById(session.userId)
  if (!user) {
    throw new Error("UNAUTHORIZED")
  }
  return user
}

export function readUserFromCookies(): ReturnType<typeof getUserById> {
  const store = cookies()
  const token = store.get(SESSION_COOKIE)?.value
  const session = getSession(token)
  if (!session) return undefined
  return getUserById(session.userId)
}

export function createLoginSession(userId: string) {
  const session = createSession(userId)
  const store = cookies()
  store.set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
  return session
}

export function clearLoginSession() {
  const store = cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (token) {
    deleteSession(token)
    store.delete(SESSION_COOKIE)
  }
}

export function authenticateWithCredentials(email: string, password: string) {
  const user = findUserByEmail(email)
  if (!user) return undefined
  const isValid = verifyPassword(password, user.passwordHash)
  if (!isValid) return undefined
  return user
}

export function getSessionToken(): string | undefined {
  return cookies().get(SESSION_COOKIE)?.value
}
