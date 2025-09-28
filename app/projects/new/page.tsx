"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Brain, FileText, MessageSquare, Target, BarChart3, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"

const PROJECT_TYPES = [
  {
    id: "content",
    title: "Генерация контента",
    description: "Создание текстов, постов для соцсетей, email-рассылок",
    icon: FileText,
    badge: "Популярный",
    iconClass: "text-primary",
    backgroundClass: "bg-primary/10",
  },
  {
    id: "analysis",
    title: "Анализ текста",
    description: "Проверка грамматики, стиля, SEO-оптимизация",
    icon: Target,
    iconClass: "text-accent",
    backgroundClass: "bg-accent/10",
  },
  {
    id: "chatbot",
    title: "Чат-бот",
    description: "Автоматизация общения с клиентами",
    icon: MessageSquare,
    iconClass: "text-primary",
    backgroundClass: "bg-primary/10",
  },
  {
    id: "marketing",
    title: "Маркетинговые идеи",
    description: "Генерация идей и анализ эффективности",
    icon: BarChart3,
    iconClass: "text-accent",
    backgroundClass: "bg-accent/10",
  },
] as const

export default function NewProjectPage() {
  const [type, setType] = useState<typeof PROJECT_TYPES[number]["id"] | "">("content")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [industry, setIndustry] = useState("")
  const [audience, setAudience] = useState("")
  const [tone, setTone] = useState("")
  const [language, setLanguage] = useState("ru")
  const [keywords, setKeywords] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) {
      setError("Укажите название проекта")
      return
    }
    if (!type) {
      setError("Выберите тип проекта")
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      await apiClient.createProject({
        name,
        description,
        type,
        settings: {
          industry,
          audience,
          tone,
          language,
          keywords: keywords.split(",").map((item) => item.trim()).filter(Boolean),
        },
      })
      setSuccess("Проект успешно создан! Вы можете вернуться в панель управления.")
      setName("")
      setDescription("")
      setIndustry("")
      setAudience("")
      setTone("")
      setLanguage("ru")
      setKeywords("")
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground font-mono">AI Helper</span>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к панели
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 font-mono">Создать новый проект</h1>
          <p className="text-muted-foreground">Настройте проект для работы с AI-инструментами</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Project Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Тип проекта</CardTitle>
              <CardDescription>Выберите основной инструмент для вашего проекта</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {PROJECT_TYPES.map((projectType) => {
                  const Icon = projectType.icon
                  return (
                  <button
                    type="button"
                    key={projectType.id}
                    onClick={() => setType(projectType.id)}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      type === projectType.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${projectType.backgroundClass}`}>
                        <Icon className={`h-5 w-5 ${projectType.iconClass}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          {projectType.title}
                          {projectType.badge ? (
                            <Badge variant="secondary" className="uppercase text-xs">
                              {projectType.badge}
                            </Badge>
                          ) : null}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{projectType.description}</p>
                  </button>
                })}
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Детали проекта</CardTitle>
              <CardDescription>Основная информация о проекте</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Название проекта</Label>
                <Input
                  id="projectName"
                  placeholder="Например: Email-кампания 'Весенние скидки'"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDescription">Описание</Label>
                <Textarea
                  id="projectDescription"
                  placeholder="Опишите цели и задачи проекта..."
                  rows={3}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Сфера деятельности</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Выберите сферу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="education">Образование</SelectItem>
                      <SelectItem value="healthcare">Здравоохранение</SelectItem>
                      <SelectItem value="finance">Финансы</SelectItem>
                      <SelectItem value="real-estate">Недвижимость</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Целевая аудитория</Label>
                  <Select value={audience} onValueChange={setAudience}>
                    <SelectTrigger id="targetAudience">
                      <SelectValue placeholder="Выберите аудиторию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="b2b">B2B</SelectItem>
                      <SelectItem value="b2c">B2C</SelectItem>
                      <SelectItem value="b2b2c">B2B2C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Настройки проекта</CardTitle>
              <CardDescription>Дополнительные параметры для работы с AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tone">Тон общения</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Выберите тон" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Профессиональный</SelectItem>
                    <SelectItem value="friendly">Дружелюбный</SelectItem>
                    <SelectItem value="casual">Неформальный</SelectItem>
                    <SelectItem value="authoritative">Авторитетный</SelectItem>
                    <SelectItem value="creative">Креативный</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Язык контента</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Ключевые слова</Label>
                <Input
                  id="keywords"
                  placeholder="Введите ключевые слова через запятую"
                  value={keywords}
                  onChange={(event) => setKeywords(event.target.value)}
                />
                <p className="text-sm text-muted-foreground">Эти слова будут учитываться при генерации контента</p>
              </div>
            </CardContent>
          </Card>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {success ? (
            <div className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/5 px-4 py-3 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4" />
              {success}
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Отменить</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Сохраняем..." : "Создать проект"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
