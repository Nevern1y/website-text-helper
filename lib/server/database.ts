import { randomUUID, createHash } from "crypto"

type Role = "user" | "admin"

type User = {
  id: string
  email: string
  passwordHash: string
  name: string
  avatarUrl?: string
  subscriptionPlan: string
  subscriptionExpiresAt?: string | null
  createdAt: string
  updatedAt: string
  role: Role
}

type Session = {
  token: string
  userId: string
  createdAt: string
}

type Project = {
  id: string
  userId: string
  name: string
  description?: string
  type: string
  settings: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

type AIRequest = {
  id: string
  userId: string
  projectId?: string
  type: string
  inputData: Record<string, unknown>
  outputData?: Record<string, unknown>
  modelUsed?: string
  tokensUsed?: number
  cost?: number
  status: "pending" | "completed" | "failed"
  errorMessage?: string
  createdAt: string
}

type FileRecord = {
  id: string
  userId: string
  filename: string
  originalName: string
  mimeType: string
  sizeBytes: number
  storagePath: string
  createdAt: string
}

type Subscription = {
  id: string
  userId: string
  planName: string
  status: "active" | "cancelled" | "expired"
  currentPeriodStart: string
  currentPeriodEnd: string
  createdAt: string
}

type UsageLimit = {
  id: string
  userId: string
  periodStart: string
  periodEnd: string
  requestsUsed: number
  requestsLimit: number
  tokensUsed: number
  tokensLimit: number
}

type ResetToken = {
  token: string
  userId: string
  expiresAt: string
}

type AIModel = {
  id: string
  userId: string
  provider: string
  modelName: string
  apiKey?: string
  endpointUrl?: string
  parameters: Record<string, unknown>
  isActive: boolean
  createdAt: string
}

type ChatMessage = {
  id: string
  userId: string
  role: "user" | "assistant"
  content: string
  createdAt: string
}

type MarketingIdea = {
  id: string
  userId: string
  topic: string
  channel: string
  idea: string
  createdAt: string
}

type DashboardSnapshot = {
  projects: number
  contentGenerated: number
  textAnalyzed: number
  chatMessages: number
  marketingIdeas: number
  usage: UsageLimit
  lastUpdated: string
}

type DatabaseState = {
  users: Map<string, User>
  sessions: Map<string, Session>
  projects: Map<string, Project>
  aiRequests: Map<string, AIRequest>
  files: Map<string, FileRecord>
  subscriptions: Map<string, Subscription>
  usageLimits: Map<string, UsageLimit>
  resetTokens: Map<string, ResetToken>
  aiModels: Map<string, AIModel>
  chatMessages: Map<string, ChatMessage[]>
  marketingIdeas: Map<string, MarketingIdea[]>
}

declare global {
  // eslint-disable-next-line no-var
  var __inMemoryDb: DatabaseState | undefined
}

function createInitialState(): DatabaseState {
  const now = new Date().toISOString()
  const defaultUserId = randomUUID()
  const subscription: Subscription = {
    id: randomUUID(),
    userId: defaultUserId,
    planName: "pro",
    status: "active",
    currentPeriodStart: now,
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: now,
  }

  const usage: UsageLimit = {
    id: randomUUID(),
    userId: defaultUserId,
    periodStart: now,
    periodEnd: subscription.currentPeriodEnd,
    requestsUsed: 0,
    requestsLimit: 1000,
    tokensUsed: 0,
    tokensLimit: 500000,
  }

  const defaultUser: User = {
    id: defaultUserId,
    email: "demo@aihelper.dev",
    passwordHash: hashPassword("demo1234"),
    name: "Demo User",
    avatarUrl: undefined,
    subscriptionPlan: "pro",
    subscriptionExpiresAt: subscription.currentPeriodEnd,
    createdAt: now,
    updatedAt: now,
    role: "user",
  }

  return {
    users: new Map([[defaultUser.id, defaultUser]]),
    sessions: new Map(),
    projects: new Map(),
    aiRequests: new Map(),
    files: new Map(),
    subscriptions: new Map([[subscription.id, subscription]]),
    usageLimits: new Map([[usage.id, usage]]),
    resetTokens: new Map(),
    aiModels: new Map(),
    chatMessages: new Map([[defaultUser.id, []]]),
    marketingIdeas: new Map([[defaultUser.id, []]]),
  }
}

export const db: DatabaseState = global.__inMemoryDb ?? createInitialState()

if (!global.__inMemoryDb) {
  global.__inMemoryDb = db
}

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex")
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

export function createUser(params: { email: string; password: string; name: string }): User {
  const now = new Date().toISOString()
  const id = randomUUID()
  const user: User = {
    id,
    email: params.email.toLowerCase(),
    passwordHash: hashPassword(params.password),
    name: params.name,
    subscriptionPlan: "free",
    subscriptionExpiresAt: null,
    createdAt: now,
    updatedAt: now,
    role: "user",
  }
  db.users.set(id, user)

  const usage: UsageLimit = {
    id: randomUUID(),
    userId: id,
    periodStart: now,
    periodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    requestsUsed: 0,
    requestsLimit: 500,
    tokensUsed: 0,
    tokensLimit: 250000,
  }
  db.usageLimits.set(usage.id, usage)

  return user
}

export function findUserByEmail(email: string): User | undefined {
  const lower = email.toLowerCase()
  for (const user of db.users.values()) {
    if (user.email === lower) {
      return user
    }
  }
  return undefined
}

export function getUserById(id: string): User | undefined {
  return db.users.get(id)
}

export function updateUser(id: string, updates: Partial<Omit<User, "id" | "createdAt" | "passwordHash">> & { password?: string }): User | undefined {
  const user = db.users.get(id)
  if (!user) return undefined
  const now = new Date().toISOString()
  if (updates.email) {
    user.email = updates.email.toLowerCase()
  }
  if (updates.name) {
    user.name = updates.name
  }
  if (updates.subscriptionPlan) {
    user.subscriptionPlan = updates.subscriptionPlan
  }
  if ("subscriptionExpiresAt" in updates) {
    user.subscriptionExpiresAt = updates.subscriptionExpiresAt ?? null
  }
  if (updates.avatarUrl !== undefined) {
    user.avatarUrl = updates.avatarUrl
  }
  if (updates.password) {
    user.passwordHash = hashPassword(updates.password)
  }
  user.updatedAt = now
  db.users.set(id, user)
  return user
}

export function createSession(userId: string): Session {
  const session: Session = {
    token: randomUUID(),
    userId,
    createdAt: new Date().toISOString(),
  }
  db.sessions.set(session.token, session)
  return session
}

export function getSession(token: string | undefined | null): Session | undefined {
  if (!token) return undefined
  return db.sessions.get(token)
}

export function deleteSession(token: string): void {
  db.sessions.delete(token)
}

export function createProject(
  userId: string,
  params: { name: string; description?: string; type: string; settings?: Record<string, unknown> },
): Project {
  const now = new Date().toISOString()
  const project: Project = {
    id: randomUUID(),
    userId,
    name: params.name,
    description: params.description,
    type: params.type,
    settings: params.settings ?? {},
    createdAt: now,
    updatedAt: now,
  }
  db.projects.set(project.id, project)
  return project
}

export function listProjects(userId: string): Project[] {
  return [...db.projects.values()].filter((project) => project.userId === userId)
}

export function getProject(userId: string, projectId: string): Project | undefined {
  const project = db.projects.get(projectId)
  if (!project || project.userId !== userId) return undefined
  return project
}

export function updateProject(
  userId: string,
  projectId: string,
  updates: Partial<Omit<Project, "id" | "userId" | "createdAt">>,
): Project | undefined {
  const project = getProject(userId, projectId)
  if (!project) return undefined
  const now = new Date().toISOString()
  Object.assign(project, updates)
  project.updatedAt = now
  db.projects.set(project.id, project)
  return project
}

export function deleteProject(userId: string, projectId: string): boolean {
  const project = getProject(userId, projectId)
  if (!project) return false
  return db.projects.delete(projectId)
}

export function recordAIRequest(
  params: Omit<AIRequest, "id" | "createdAt"> & { createdAt?: string },
): AIRequest {
  const now = params.createdAt ?? new Date().toISOString()
  const request: AIRequest = {
    id: randomUUID(),
    createdAt: now,
    ...params,
  }
  db.aiRequests.set(request.id, request)
  return request
}

export function listAIRequests(userId: string): AIRequest[] {
  return [...db.aiRequests.values()].filter((request) => request.userId === userId)
}

export function saveFile(record: Omit<FileRecord, "id" | "createdAt">): FileRecord {
  const file: FileRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...record,
  }
  db.files.set(file.id, file)
  return file
}

export function getFile(userId: string, fileId: string): FileRecord | undefined {
  const file = db.files.get(fileId)
  if (!file || file.userId !== userId) return undefined
  return file
}

export function deleteFile(userId: string, fileId: string): boolean {
  const file = getFile(userId, fileId)
  if (!file) return false
  return db.files.delete(fileId)
}

export function upsertAIModel(
  userId: string,
  model: Omit<AIModel, "id" | "createdAt" | "userId"> & { id?: string },
): AIModel {
  const now = new Date().toISOString()
  const id = model.id ?? randomUUID()
  const record: AIModel = {
    id,
    userId,
    provider: model.provider,
    modelName: model.modelName,
    apiKey: model.apiKey,
    endpointUrl: model.endpointUrl,
    parameters: model.parameters ?? {},
    isActive: model.isActive ?? true,
    createdAt: db.aiModels.get(id)?.createdAt ?? now,
  }
  db.aiModels.set(id, record)
  return record
}

export function listAIModels(userId: string): AIModel[] {
  return [...db.aiModels.values()].filter((model) => model.userId === userId)
}

export function deleteAIModel(userId: string, modelId: string): boolean {
  const model = db.aiModels.get(modelId)
  if (!model || model.userId !== userId) return false
  return db.aiModels.delete(modelId)
}

export function addChatMessage(
  userId: string,
  message: Omit<ChatMessage, "id" | "createdAt" | "userId"> & { role: "user" | "assistant" },
): ChatMessage[] {
  const history = db.chatMessages.get(userId) ?? []
  const entry: ChatMessage = {
    id: randomUUID(),
    userId,
    role: message.role,
    content: message.content,
    createdAt: new Date().toISOString(),
  }
  const nextHistory = [...history, entry]
  db.chatMessages.set(userId, nextHistory)
  return nextHistory
}

export function getChatHistory(userId: string): ChatMessage[] {
  return db.chatMessages.get(userId) ?? []
}

export function addMarketingIdea(
  userId: string,
  idea: Omit<MarketingIdea, "id" | "createdAt" | "userId">,
): MarketingIdea {
  const entry: MarketingIdea = {
    id: randomUUID(),
    userId,
    topic: idea.topic,
    channel: idea.channel,
    idea: idea.idea,
    createdAt: new Date().toISOString(),
  }
  const ideas = db.marketingIdeas.get(userId) ?? []
  ideas.push(entry)
  db.marketingIdeas.set(userId, ideas)
  return entry
}

export function listMarketingIdeas(userId: string): MarketingIdea[] {
  return db.marketingIdeas.get(userId) ?? []
}

export function issueResetToken(userId: string): ResetToken {
  const token: ResetToken = {
    token: randomUUID(),
    userId,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  }
  db.resetTokens.set(token.token, token)
  return token
}

export function consumeResetToken(token: string): ResetToken | undefined {
  const resetToken = db.resetTokens.get(token)
  if (!resetToken) return undefined
  if (new Date(resetToken.expiresAt).getTime() < Date.now()) {
    db.resetTokens.delete(token)
    return undefined
  }
  db.resetTokens.delete(token)
  return resetToken
}

export function getUsageForUser(userId: string): UsageLimit {
  let usage = [...db.usageLimits.values()].find((item) => item.userId === userId)
  if (!usage) {
    usage = {
      id: randomUUID(),
      userId,
      periodStart: new Date().toISOString(),
      periodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      requestsUsed: 0,
      requestsLimit: 500,
      tokensUsed: 0,
      tokensLimit: 250000,
    }
    db.usageLimits.set(usage.id, usage)
  }
  return usage
}

export function incrementUsage(userId: string, tokens: number): UsageLimit {
  const usage = getUsageForUser(userId)
  usage.requestsUsed += 1
  usage.tokensUsed += tokens
  db.usageLimits.set(usage.id, usage)
  return usage
}

export function getDashboardSnapshot(userId: string): DashboardSnapshot {
  const usage = getUsageForUser(userId)
  const projects = listProjects(userId).length
  const aiRequests = listAIRequests(userId)
  const contentGenerated = aiRequests.filter((request) => request.type === "content_generation").length
  const textAnalyzed = aiRequests.filter((request) => request.type === "text_analysis").length
  const chatMessages = getChatHistory(userId).length
  const marketingIdeas = listMarketingIdeas(userId).length
  return {
    projects,
    contentGenerated,
    textAnalyzed,
    chatMessages,
    marketingIdeas,
    usage,
    lastUpdated: new Date().toISOString(),
  }
}

export function ensureChatHistory(userId: string): void {
  if (!db.chatMessages.has(userId)) {
    db.chatMessages.set(userId, [])
  }
}
