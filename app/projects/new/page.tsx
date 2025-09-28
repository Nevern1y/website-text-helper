import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Brain, FileText, MessageSquare, Target, BarChart3, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewProjectPage() {
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

        <div className="space-y-6">
          {/* Project Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Тип проекта</CardTitle>
              <CardDescription>Выберите основной инструмент для вашего проекта</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Генерация контента</h3>
                      <Badge variant="secondary" className="mt-1">
                        Популярный
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Создание текстов, постов для соцсетей, email-рассылок</p>
                </div>

                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Target className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Анализ текста</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Проверка грамматики, стиля, SEO-оптимизация</p>
                </div>

                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Чат-бот</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Автоматизация общения с клиентами</p>
                </div>

                <div className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Маркетинговые идеи</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Генерация идей и анализ эффективности</p>
                </div>
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
                <Input id="projectName" placeholder="Например: Email-кампания 'Весенние скидки'" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDescription">Описание</Label>
                <Textarea id="projectDescription" placeholder="Опишите цели и задачи проекта..." rows={3} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Сфера деятельности</Label>
                  <Select>
                    <SelectTrigger>
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
                  <Select>
                    <SelectTrigger>
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
                <Select>
                  <SelectTrigger>
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
                <Select defaultValue="ru">
                  <SelectTrigger>
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
                <Input id="keywords" placeholder="Введите ключевые слова через запятую" />
                <p className="text-sm text-muted-foreground">Эти слова будут учитываться при генерации контента</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Отменить</Link>
            </Button>
            <Button>Создать проект</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
