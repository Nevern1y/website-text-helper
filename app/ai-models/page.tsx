"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  Server,
  Cloud,
  Settings,
  CheckCircle,
  Cpu,
  Zap,
  Globe,
  Shield,
  Download,
  Trash2,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"
import { useAuthContext } from "@/components/providers/auth-context"

type ModelRecord = {
  id: string
  provider: string
  modelName: string
  endpointUrl?: string
  isActive: boolean
  createdAt?: string
}

type FormState = {
  provider: string
  modelName: string
  apiKey: string
  endpointUrl: string
}

const LOCAL_MODELS = [
  { name: "Llama 3.1 8B", status: "installed", size: "4.7GB", performance: "high" },
  { name: "Llama 3.1 70B", status: "available", size: "39GB", performance: "ultra" },
  { name: "Code Llama 7B", status: "installed", size: "3.8GB", performance: "medium" },
]

export default function AIModelsPage() {
  const { user } = useAuthContext()
  const [form, setForm] = useState<FormState>({ provider: "openai", modelName: "gpt-4o-mini", apiKey: "", endpointUrl: "" })
  const [models, setModels] = useState<ModelRecord[]>([])
  const [activeConnections, setActiveConnections] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const loadModels = async () => {
    if (!user) return
    setIsLoading(true)
    setError(null)
    try {
      const response = await apiClient.listModels()
      const mapped: ModelRecord[] = response.models.map((model: any) => ({
        id: model.id,
        provider: model.provider,
        modelName: model.modelName,
        endpointUrl: model.endpointUrl,
        isActive: model.isActive,
        createdAt: model.createdAt,
      }))
      setModels(mapped)
      const connections: Record<string, boolean> = {}
      mapped.forEach((model) => {
        connections[model.provider] = model.isActive
      })
      setActiveConnections(connections)
    } catch (error) {
      setError((error as Error).message)
      setModels([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadModels()
    }
  }, [user])

  const handleAddModel = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) {
      setError("Авторизуйтесь, чтобы подключать модели")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await apiClient.addModel({
        provider: form.provider,
        modelName: form.modelName,
        apiKey: form.apiKey || undefined,
        endpointUrl: form.endpointUrl || undefined,
        parameters: {},
      })
      setSuccess("Модель успешно сохранена")
      setForm({ provider: form.provider, modelName: "", apiKey: "", endpointUrl: "" })
      await loadModels()
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await apiClient.deleteModel(id)
      await loadModels()
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const activeProviders = useMemo(() => Object.keys(activeConnections).filter((key) => activeConnections[key]), [activeConnections])

  return (
    <div className="min-h-screen bg-background">
      {!user ? (
        <div className="bg-muted/40 border-b border-border text-center text-xs uppercase tracking-wide py-2">
          Авторизуйтесь, чтобы управлять подключениями AI моделей
        </div>
      ) : null}

      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground font-mono">AI Helper</span>
            </Link>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              AI Модели
            </Badge>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Панель управления</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {error ? (
          <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="mb-6 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">{success}</div>
        ) : null}

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 font-mono">Управление AI моделями</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Подключайте локальные модели и внешние API, контролируйте ключи доступа и параметры
            </p>
          </div>

          <Tabs defaultValue="local-models" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="local-models" className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                Локальные модели
              </TabsTrigger>
              <TabsTrigger value="api-connections" className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                API подключения
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Настройки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="local-models" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5" />
                    Локальные LLM модели
                  </CardTitle>
                  <CardDescription>Управляйте локально установленными моделями</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {LOCAL_MODELS.map((model) => (
                    <div key={model.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Brain className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{model.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Размер: {model.size}</span>
                            <Badge variant="secondary" className="uppercase text-xs">
                              {model.performance === "ultra"
                                ? "Ультра"
                                : model.performance === "high"
                                  ? "Высокая"
                                  : "Средняя"}{" "}
                              производительность
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {model.status === "installed" ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Установлена
                          </Badge>
                        ) : (
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Установить
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Добавить внешнюю модель</CardTitle>
                  <CardDescription>Подключите модели OpenAI, Anthropic, Groq или кастомные endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4" onSubmit={handleAddModel}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="provider">Провайдер</Label>
                        <Select value={form.provider} onValueChange={(value) => setForm((prev) => ({ ...prev, provider: value }))}>
                          <SelectTrigger id="provider">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="openai">OpenAI</SelectItem>
                            <SelectItem value="anthropic">Anthropic</SelectItem>
                            <SelectItem value="google">Google AI</SelectItem>
                            <SelectItem value="groq">Groq</SelectItem>
                            <SelectItem value="ollama">Ollama</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="modelName">Название модели</Label>
                        <Input
                          id="modelName"
                          placeholder="Например: gpt-4o-mini"
                          value={form.modelName}
                          onChange={(event) => setForm((prev) => ({ ...prev, modelName: event.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="apiKey">API ключ</Label>
                        <Input
                          id="apiKey"
                          type="password"
                          placeholder="Введите или вставьте ключ"
                          value={form.apiKey}
                          onChange={(event) => setForm((prev) => ({ ...prev, apiKey: event.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endpointUrl">Endpoint (опционально)</Label>
                        <Input
                          id="endpointUrl"
                          placeholder="https://api.example.com/v1"
                          value={form.endpointUrl}
                          onChange={(event) => setForm((prev) => ({ ...prev, endpointUrl: event.target.value }))}
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Сохраняем...
                        </>
                      ) : (
                        "Сохранить модель"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api-connections" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Активные подключения</CardTitle>
                  <CardDescription>Управляйте внешними моделями и API ключами</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoading && models.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Загрузка подключений...</div>
                  ) : models.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Пока нет подключённых моделей</div>
                  ) : (
                    models.map((model) => (
                      <div key={model.id} className="border rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold flex items-center gap-2">
                            {model.modelName}
                            {model.isActive ? (
                              <Badge variant="outline" className="border-green-500 text-green-600">
                                Активна
                              </Badge>
                            ) : null}
                          </h3>
                          <p className="text-sm text-muted-foreground">Провайдер: {model.provider}</p>
                          {model.endpointUrl ? (
                            <p className="text-xs text-muted-foreground mt-1">Endpoint: {model.endpointUrl}</p>
                          ) : null}
                        </div>
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={model.isActive}
                            onCheckedChange={(checked) =>
                              setActiveConnections((prev) => ({ ...prev, [model.provider]: checked }))
                            }
                            aria-label="Активировать модель"
                          />
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(model.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Доступные провайдеры</CardTitle>
                  <CardDescription>Список поддерживаемых платформ и их статус</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  {[
                    { provider: "OpenAI", status: activeProviders.includes("openai"), description: "Модели GPT-4o, GPT-3.5" },
                    { provider: "Anthropic", status: activeProviders.includes("anthropic"), description: "Claude 3, Claude Instant" },
                    { provider: "Google AI", status: activeProviders.includes("google"), description: "Gemini 1.5" },
                    { provider: "Groq", status: activeProviders.includes("groq"), description: "Высокая скорость ответа" },
                    { provider: "Ollama", status: activeProviders.includes("ollama"), description: "Локальные Llama модели" },
                  ].map((item) => (
                    <div key={item.provider} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{item.provider}</h3>
                        <Badge variant={item.status ? "default" : "outline"}>
                          {item.status ? "Активен" : "Отключен"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Рекомендации по безопасности</CardTitle>
                  <CardDescription>Как хранить ключи и управлять доступом</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-primary mt-1" />
                    <p>Храните ключи шифрованными и ограничивайте доступ только доверенным членам команды.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-4 w-4 text-primary mt-1" />
                    <p>Для кастомных endpoints используйте HTTPS и проверяйте сертификаты.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-4 w-4 text-primary mt-1" />
                    <p>Настройте мониторинг и лимиты запросов, чтобы избежать неожиданных расходов.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
