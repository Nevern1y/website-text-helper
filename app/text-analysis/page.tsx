"use client"

import { useMemo, useState, type ComponentType } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Target,
  ArrowLeft,
  RefreshCw,
  FileText,
  Eye,
  BookOpen,
  Brain,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"
import { useAuthContext } from "@/components/providers/auth-context"

type AnalysisResponse = Awaited<ReturnType<typeof apiClient.analyzeText>>

type Metric = {
  label: string
  value: number | string
  icon: ComponentType<{ className?: string }>
  accent?: "primary" | "accent"
  description: string
}

export default function TextAnalysisPage() {
  const { user } = useAuthContext()
  const [inputText, setInputText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const metrics: Metric[] = useMemo(() => {
    if (!result) return []
    return [
      {
        label: "Слов",
        value: result.metrics.wordCount,
        icon: FileText,
        accent: "primary",
        description: "Количество слов помогает оценить объём материала",
      },
      {
        label: "Предложений",
        value: result.metrics.sentenceCount,
        icon: Brain,
        accent: "accent",
        description: "Чем меньше предложений при большом объёме, тем сложнее текст",
      },
      {
        label: "Минут чтения",
        value: result.metrics.readingTimeMinutes,
        icon: BookOpen,
        accent: "primary",
        description: "Оценка времени чтения при скорости 200 слов в минуту",
      },
      {
        label: "Уникальных слов",
        value: result.metrics.uniqueWords,
        icon: BarChart3,
        accent: "accent",
        description: "Чем выше разнообразие лексики, тем интереснее материал",
      },
    ]
  }, [result])

  const handleAnalyze = async () => {
    if (!inputText.trim()) return
    setIsAnalyzing(true)
    setError(null)
    try {
      const response = await apiClient.analyzeText({ text: inputText })
      setResult(response)
    } catch (error) {
      setError((error as Error).message)
      setResult(null)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {!user ? (
        <div className="bg-muted/40 border-b border-border text-center text-sm py-2">
          Войдите в аккаунт, чтобы сохранять отчёты по анализу текста
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
              <div className="p-2 bg-accent/10 rounded-lg">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Анализ текста</h1>
                <p className="text-sm text-muted-foreground">Проверка читаемости и качества контента</p>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="uppercase tracking-wide text-xs">
            AI-анализ
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Текст для анализа
                </CardTitle>
                <CardDescription>Вставьте или введите текст для проверки качества</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Вставьте ваш текст здесь..."
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                  className="min-h-[280px] resize-none"
                />

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>Слов: {inputText.trim() ? inputText.trim().split(/\s+/).length : 0}</span>
                    <span>Символов: {inputText.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>~{Math.max(1, Math.ceil((inputText.trim().split(/\s+/).length || 1) / 200))} мин чтения</span>
                  </div>
                </div>

                <Button onClick={handleAnalyze} disabled={!inputText.trim() || isAnalyzing} className="w-full" size="lg">
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Анализируем текст...
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Проанализировать текст
                    </>
                  )}
                </Button>

                {error ? (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : null}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Быстрые примеры</CardTitle>
                <CardDescription>Проверьте работу анализа на готовых текстах</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-3 bg-transparent"
                  onClick={() =>
                    setInputText(
                      "Искусственный интеллект помогает компаниям принимать решения быстрее. Алгоритмы анализируют данные в режиме реального времени и подсказывают оптимальные действия для роста бизнеса.",
                    )
                  }
                >
                  <div className="text-left">
                    <div className="font-medium">Статья об AI</div>
                    <div className="text-sm text-muted-foreground">Пример делового текста</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-3 bg-transparent"
                  onClick={() =>
                    setInputText(
                      "Добро пожаловать! Мы подготовили подборку лучших предложений недели. Выбирайте понравившиеся товары, а мы доставим заказ за 24 часа.",
                    )
                  }
                >
                  <div className="text-left">
                    <div className="font-medium">Маркетинговый текст</div>
                    <div className="text-sm text-muted-foreground">Пример продающего контента</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {result ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Ключевые метрики</CardTitle>
                    <CardDescription>
                      Сводка по тексту и рекомендации на основе внутреннего алгоритма AI Helper
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {metrics.map((metric) => {
                        const Icon = metric.icon
                        const accent = metric.accent === "accent" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                        return (
                          <div key={metric.label} className="border rounded-lg p-4 space-y-2">
                            <div className={`inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${accent}`}>
                              <Icon className="h-3.5 w-3.5" />
                              {metric.label}
                            </div>
                            <div className="text-2xl font-semibold">{metric.value}</div>
                            <p className="text-xs text-muted-foreground leading-snug">{metric.description}</p>
                          </div>
                        )
                      })}
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Рекомендации</h3>
                      <ul className="space-y-2">
                        {result.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Подробности анализа</CardTitle>
                    <CardDescription>Показатели, рассчитанные на основе вашего текста</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span>
                        Индекс читаемости: <strong>{Math.round(result.metrics.readability)}</strong>. Значение от 12 до 20 считается комфортным
                        для большинства читателей.
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-accent" />
                      <span>
                        Длина предложений: в среднем {Math.round(result.metrics.wordCount / Math.max(1, result.metrics.sentenceCount))} слов. Постарайтесь
                        избегать слишком длинных конструкций.
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>
                        Словарное разнообразие: {result.metrics.uniqueWords} уникальных слов. Это {Math.round((result.metrics.uniqueWords /
                        Math.max(1, result.metrics.wordCount)) * 100)}% от общего количества.
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Результаты появятся здесь</CardTitle>
                  <CardDescription>Запустите анализ, чтобы получить отчёт и рекомендации</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-3">
                  <p>
                    Мы измерим объём текста, оценим читаемость и предложим улучшения. Используйте инструмент перед публикацией материалов.
                  </p>
                  <p>
                    Рекомендации формируются мгновенно — вы сможете увидеть сильные стороны текста и области для доработки.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
