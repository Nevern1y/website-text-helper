"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  FileText,
  MessageSquare,
  Plus,
  Settings,
  Bell,
  Clock,
  BarChart3,
  Target,
  Sparkles,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"
import { useAuthContext } from "@/components/providers/auth-context"

type DashboardResponse = Awaited<ReturnType<typeof apiClient.dashboard>>

const EMPTY_SUMMARY = {
  projects: 0,
  contentGenerated: 0,
  textAnalyzed: 0,
  chatMessages: 0,
  marketingIdeas: 0,
  usage: {
    requestsUsed: 0,
    requestsLimit: 0,
    tokensUsed: 0,
    tokensLimit: 0,
  },
  lastUpdated: "",
}

export default function DashboardPage() {
  const { user, loading } = useAuthContext()
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const summary = data?.snapshot ?? EMPTY_SUMMARY

  const loadDashboard = async () => {
    setIsLoading(true)
    try {
      const response = await apiClient.dashboard()
      setData(response)
      setError(null)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!loading && user) {
      loadDashboard()
    }
  }, [loading, user])

  const isAuthenticated = Boolean(user)
  const projects = data?.projects ?? []
  const recentRequests = useMemo(() => {
    return (data?.requests ?? []).slice(-5).reverse()
  }, [data])

  if (!loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
        <Brain className="h-12 w-12 text-primary mb-6" />
        <h1 className="text-3xl font-bold mb-2">Требуется авторизация</h1>
        <p className="text-muted-foreground max-w-md mb-6">
          Чтобы увидеть статистику и проекты, войдите в систему или создайте новый аккаунт.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/login">Войти</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/register">Создать аккаунт</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">AI Helper</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={loadDashboard} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>{user?.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {error ? (
          <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-destructive">
            Не удалось загрузить данные: {error}
          </div>
        ) : null}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center pb-4">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarFallback className="text-lg">{user?.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user?.name ?? "Пользователь"}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
                <Badge variant="secondary" className="mt-2">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {user?.subscriptionPlan ? `${user.subscriptionPlan} план` : "Free план"}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{summary.contentGenerated + summary.textAnalyzed}</div>
                    <div className="text-sm text-muted-foreground">AI запросов выполнено</div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Использовано в этом месяце</span>
                      <span className="font-medium">
                        {summary.usage.requestsUsed}/{summary.usage.requestsLimit || 1000}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, Math.round((summary.usage.requestsUsed / Math.max(1, summary.usage.requestsLimit || 1000)) * 100))}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Настройки профиля
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Добро пожаловать, {user?.name ?? "в AI Helper"}!</h1>
                <p className="text-muted-foreground">
                  Управляйте своими AI-проектами и отслеживайте прогресс в реальном времени
                </p>
              </div>
              <Badge variant="secondary">Обновлено: {summary.lastUpdated ? new Date(summary.lastUpdated).toLocaleString() : "–"}</Badge>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <StatCard
                icon={<FileText className="h-5 w-5 text-primary" />}
                label="Контент создан"
                value={summary.contentGenerated}
              />
              <StatCard
                icon={<Target className="h-5 w-5 text-accent" />}
                label="Текстов проверено"
                value={summary.textAnalyzed}
              />
              <StatCard
                icon={<MessageSquare className="h-5 w-5 text-primary" />}
                label="Чат-сообщений"
                value={summary.chatMessages}
              />
              <StatCard
                icon={<BarChart3 className="h-5 w-5 text-accent" />}
                label="Маркетинговых идей"
                value={summary.marketingIdeas}
              />
            </div>

            {/* Projects Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Мои проекты</CardTitle>
                    <CardDescription>Управляйте своими AI-проектами</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/projects/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Создать проект
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {projects.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="p-4 bg-muted rounded-full mb-4 w-fit mx-auto">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Пока нет проектов</h3>
                    <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
                      Создайте свой первый AI-проект, чтобы начать работу
                    </p>
                    <Button asChild>
                      <Link href="/projects/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Создать проект
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{project.name}</h3>
                            <p className="text-sm text-muted-foreground">Тип: {project.type}</p>
                          </div>
                          <Badge variant="outline">{new Date(project.updatedAt).toLocaleDateString()}</Badge>
                        </div>
                        {project.description ? <p className="text-sm mt-2 text-muted-foreground">{project.description}</p> : null}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Последняя активность</CardTitle>
                <CardDescription>История ваших взаимодействий с AI Helper</CardDescription>
              </CardHeader>
              <CardContent>
                {recentRequests.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="p-4 bg-muted rounded-full mb-4 w-fit mx-auto">
                      <Clock className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Пока нет активности</h3>
                    <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
                      Начните использовать AI-инструменты, чтобы увидеть историю активности
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {recentRequests.map((request) => (
                      <li key={request.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{formatRequestType(request.type)}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(request.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Статус: {request.status === "completed" ? "Выполнено" : request.status}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Быстрые действия</CardTitle>
                <CardDescription>Начните работу с инструментами</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <QuickAction title="Генерация контента" description="Создать текст" href="/content-generation" />
                  <QuickAction title="Анализ текста" description="Проверить документ" href="/text-analysis" />
                  <QuickAction title="Чат-бот" description="Побеседовать с AI" href="/chatbot" />
                  <QuickAction title="Маркетинг" description="Получить идеи" href="/marketing" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

type StatCardProps = {
  icon: ReactNode
  label: string
  value: number
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type QuickActionProps = {
  title: string
  description: string
  href: string
}

function QuickAction({ title, description, href }: QuickActionProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <Button variant="outline" size="sm" className="bg-transparent" asChild>
        <Link href={href}>Открыть</Link>
      </Button>
    </div>
  )
}

function formatRequestType(type: string) {
  switch (type) {
    case "content_generation":
      return "Генерация контента"
    case "text_analysis":
      return "Анализ текста"
    case "chat":
      return "Чат-бот"
    case "image_generation":
      return "Генерация изображений"
    case "marketing_idea":
      return "Маркетинг"
    default:
      return type
  }
}
