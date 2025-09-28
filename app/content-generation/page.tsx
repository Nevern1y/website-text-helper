"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Brain, FileText, Download, Share2, Plus, Copy, RefreshCw, Sparkles, ArrowLeft, Wand2 } from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"
import { useAuthContext } from "@/components/providers/auth-context"

export default function ContentGenerationPage() {
  const { user } = useAuthContext()
  const [topic, setTopic] = useState("")
  const [contentType, setContentType] = useState("")
  const [tone, setTone] = useState("")
  const [length, setLength] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [editableContent, setEditableContent] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!topic || !contentType) return

    setIsGenerating(true)
    setError(null)
    try {
      const response = await apiClient.generateContent({ topic, contentType, tone, length })
      setGeneratedContent(response.content)
      setEditableContent(response.content)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(editableContent)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([editableContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${topic || "content"}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-background">
      {!user ? (
        <div className="bg-destructive/10 text-destructive text-center py-2 text-sm">
          Чтобы сохранять историю генераций, войдите в аккаунт
        </div>
      ) : null}
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Генерация контента</h1>
                <p className="text-sm text-muted-foreground">Создавайте тексты для любых целей</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-powered
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  Параметры генерации
                </CardTitle>
                <CardDescription>Укажите тему и настройки для создания контента</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Тема контента *</Label>
                  <Input
                    id="topic"
                    placeholder="Например: Искусственный интеллект в маркетинге"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contentType">Тип контента *</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип контента" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog-post">Блог-пост</SelectItem>
                      <SelectItem value="social-media">Пост для соцсетей</SelectItem>
                      <SelectItem value="email">Email-рассылка</SelectItem>
                      <SelectItem value="product-description">Описание товара</SelectItem>
                      <SelectItem value="press-release">Пресс-релиз</SelectItem>
                      <SelectItem value="landing-page">Текст для лендинга</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Тон общения</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тон" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Профессиональный</SelectItem>
                      <SelectItem value="friendly">Дружелюбный</SelectItem>
                      <SelectItem value="formal">Официальный</SelectItem>
                      <SelectItem value="casual">Неформальный</SelectItem>
                      <SelectItem value="persuasive">Убедительный</SelectItem>
                      <SelectItem value="informative">Информативный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="length">Длина текста</Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите длину" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Короткий (до 200 слов)</SelectItem>
                      <SelectItem value="medium">Средний (200-500 слов)</SelectItem>
                      <SelectItem value="long">Длинный (500+ слов)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!topic || !contentType || isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Генерируем контент...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Создать контент
                    </>
                  )}
                </Button>
                {error ? <p className="text-sm text-destructive">{error}</p> : null}
              </CardContent>
            </Card>

            {/* Quick Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Быстрые шаблоны</CardTitle>
                <CardDescription>Популярные варианты для быстрого старта</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    className="justify-start h-auto p-3 bg-transparent"
                    onClick={() => {
                      setTopic("Преимущества использования AI в бизнесе")
                      setContentType("blog-post")
                      setTone("professional")
                      setLength("medium")
                    }}
                  >
                    <div className="text-left">
                      <div className="font-medium">AI в бизнесе</div>
                      <div className="text-sm text-muted-foreground">Блог-пост о преимуществах</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start h-auto p-3 bg-transparent"
                    onClick={() => {
                      setTopic("Новый продукт компании")
                      setContentType("social-media")
                      setTone("friendly")
                      setLength("short")
                    }}
                  >
                    <div className="text-left">
                      <div className="font-medium">Анонс продукта</div>
                      <div className="text-sm text-muted-foreground">Пост для соцсетей</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start h-auto p-3 bg-transparent"
                    onClick={() => {
                      setTopic("Весенняя распродажа")
                      setContentType("email")
                      setTone("persuasive")
                      setLength("medium")
                    }}
                  >
                    <div className="text-left">
                      <div className="font-medium">Email-кампания</div>
                      <div className="text-sm text-muted-foreground">Рассылка о скидках</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {generatedContent ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Сгенерированный контент
                      </CardTitle>
                      <CardDescription>Отредактируйте текст по необходимости</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="h-4 w-4 mr-2" />
                        Копировать
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Скачать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Поделиться
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={editableContent}
                    onChange={(e) => setEditableContent(e.target.value)}
                    className="min-h-[400px] font-mono text-sm"
                    placeholder="Сгенерированный контент появится здесь..."
                  />

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Слов: {editableContent.split(" ").filter((word) => word.length > 0).length}</span>
                      <span>Символов: {editableContent.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleGenerate}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Переписать
                      </Button>
                      <Button size="sm" asChild>
                        <Link href="/projects/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Создать проект
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="p-4 bg-muted rounded-full mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Готовы создать контент?</h3>
                  <p className="text-muted-foreground mb-4 max-w-sm">
                    Заполните форму слева и нажмите "Создать контент" для генерации текста с помощью AI
                  </p>
                  <Badge variant="secondary">
                    <Brain className="h-3 w-3 mr-1" />
                    Powered by AI
                  </Badge>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Советы для лучших результатов</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Будьте конкретны в описании темы
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Выберите подходящий тон для вашей аудитории
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Используйте ключевые слова в теме
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Всегда проверяйте и редактируйте результат
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
