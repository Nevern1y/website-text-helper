export type ApiError = {
  error: string
}

async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    credentials: "include",
  })

  const data = await response.json().catch(() => undefined)
  if (!response.ok) {
    const message = (data as ApiError | undefined)?.error ?? "Не удалось выполнить запрос"
    throw new Error(message)
  }
  return data as T
}

export const apiClient = {
  register: (payload: { name: string; email: string; password: string }) =>
    apiFetch<{ user: unknown }>("/api/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string }) =>
    apiFetch<{ user: unknown }>("/api/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  logout: () => apiFetch<{ success: boolean }>("/api/auth/logout", { method: "POST" }),
  currentUser: () => apiFetch<{ user: any }>("/api/auth/me"),
  forgotPassword: (payload: { email: string }) =>
    apiFetch<{ success: boolean; resetToken?: string }>("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  resetPassword: (payload: { token: string; password: string }) =>
    apiFetch<{ success: boolean }>("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  generateContent: (payload: Record<string, unknown>) =>
    apiFetch<{ content: string }>("/api/ai/content/generate", { method: "POST", body: JSON.stringify(payload) }),
  analyzeText: (payload: Record<string, unknown>) =>
    apiFetch<{ metrics: any; suggestions: string[] }>("/api/ai/text/analyze", { method: "POST", body: JSON.stringify(payload) }),
  chatMessage: (payload: { message: string }) =>
    apiFetch<{ messages: any[] }>("/api/ai/chat/message", { method: "POST", body: JSON.stringify(payload) }),
  generateImage: (payload: Record<string, unknown>) =>
    apiFetch<{ images: { id: string; url: string }[] }>("/api/ai/image/generate", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  transcribeAudio: (payload: { audio: string }) =>
    apiFetch<{ transcript: string }>("/api/ai/voice/transcribe", { method: "POST", body: JSON.stringify(payload) }),
  synthesizeAudio: (payload: { text: string; voice?: string; speed?: string }) =>
    apiFetch<{ audio: string; voice: string; speed: string }>("/api/ai/voice/synthesize", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  marketingIdea: (payload: Record<string, unknown>) =>
    apiFetch<{ idea: any; history: any[] }>("/api/ai/marketing/ideas", { method: "POST", body: JSON.stringify(payload) }),
  listProjects: () => apiFetch<{ projects: any[] }>("/api/projects"),
  createProject: (payload: Record<string, unknown>) =>
    apiFetch<{ project: any }>("/api/projects", { method: "POST", body: JSON.stringify(payload) }),
  dashboard: () => apiFetch<{ snapshot: any; projects: any[]; requests: any[] }>("/api/dashboard"),
  uploadFile: (payload: { filename: string; mimeType: string; content: string; originalName?: string }) =>
    apiFetch<{ file: any }>("/api/files/upload", { method: "POST", body: JSON.stringify(payload) }),
  updateProfile: (payload: Record<string, unknown>) =>
    apiFetch<{ user: any }>("/api/users/profile", { method: "PUT", body: JSON.stringify(payload) }),
  listModels: () => apiFetch<{ models: any[] }>("/api/ai/models"),
  addModel: (payload: Record<string, unknown>) =>
    apiFetch<{ model: any }>("/api/ai/models", { method: "POST", body: JSON.stringify(payload) }),
  deleteModel: (id: string) => apiFetch<{ success: boolean }>(`/api/ai/models/${id}`, { method: "DELETE" }),
}
