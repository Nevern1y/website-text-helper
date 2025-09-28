"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Target,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Save,
  FileText,
  Eye,
  BookOpen,
  Zap,
  TrendingUp,
  Users,
} from "lucide-react"
import Link from "next/link"

interface AnalysisResult {
  grammar: {
    score: number
    issues: Array<{
      type: string
      message: string
      suggestion: string
      position: number
    }>
  }
  style: {
    score: number
    readability: number
    tone: string
    suggestions: string[]
  }
  seo: {
    score: number
    keywords: string[]
    recommendations: string[]
  }
  stats: {
    words: number
    characters: number
    sentences: number
    paragraphs: number
    readingTime: number
  }
}

export default function TextAnalysisPage() {
  const [inputText, setInputText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    if (!inputText.trim()) return

    setIsAnalyzing(true)

    try {
      // TODO: Replace with actual API call to text analysis service
      // const response = await fetch('/api/analyze-text', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ text: inputText })
      // })
      // const data = await response.json()
      // setAnalysisResult(data)

      // For now, show empty state until API is connected
      setAnalysisResult(null)
    } catch (error) {
      console.error("Text analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />
    if (score >= 60) return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    return <XCircle className="h-4 w-4 text-red-600" />
  }

  return (
    <div className="min-h-screen bg-background">
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
                <p className="text-sm text-muted-foreground">Проверка грамматики, стиля и SEO</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              <Target className="h-3 w-3 mr-1" />
              AI-анализ
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Текст для анализа
                </CardTitle>
                <CardDescription>Вставьте или введите текст для проверки</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Вставьте ваш текст здесь для анализа грамматики, стиля и SEO-оптимизации..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[300px] resize-none"
                />

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>Слов: {inputText.split(" ").filter((word) => word.length > 0).length}</span>
                    <span>Символов: {inputText.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>~{Math.ceil(inputText.split(" ").length / 200)} мин чтения</span>
                  </div>
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={!inputText.trim() || isAnalyzing}
                  className="w-full"
                  size="lg"
                >
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
              </CardContent>
            </Card>

            {/* Quick Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Примеры для анализа</CardTitle>
                <CardDescription>Попробуйте анализ на готовых текстах</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto p-3 bg-transparent"
                    onClick={() =>
                      setInputText(
                        "Искусственный интеллект революционизирует современный бизнес. Компании используют AI для автоматизации процессов, улучшения клиентского сервиса и принятия более обоснованных решений. Однако внедрение AI требует тщательного планирования и понимания потенциальных рисков.",
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
                        "Добро пожаловать в наш магазин! Мы предлагаем широкий ассортимент качественных товаров по доступным ценам. Наша команда профессионалов готова помочь вам выбрать идеальный продукт. Не упустите возможность воспользоваться специальными предложениями!",
                      )
                    }
                  >
                    <div className="text-left">
                      <div className="font-medium">Маркетинговый текст</div>
                      <div className="text-sm text-muted-foreground">Пример продающего контента</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analysisResult ? (
              <>
                {/* Overall Scores */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      Общая оценка
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {getScoreIcon(analysisResult.grammar.score)}
                          <span className={`text-2xl font-bold ${getScoreColor(analysisResult.grammar.score)}`}>
                            {analysisResult.grammar.score}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">Грамматика</div>
                        <Progress value={analysisResult.grammar.score} className="mt-2" />
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {getScoreIcon(analysisResult.style.score)}
                          <span className={`text-2xl font-bold ${getScoreColor(analysisResult.style.score)}`}>
                            {analysisResult.style.score}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">Стиль</div>
                        <Progress value={analysisResult.style.score} className="mt-2" />
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {getScoreIcon(analysisResult.seo.score)}
                          <span className={`text-2xl font-bold ${getScoreColor(analysisResult.seo.score)}`}>
                            {analysisResult.seo.score}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">SEO</div>
                        <Progress value={analysisResult.seo.score} className="mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Детальный анализ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="grammar" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="grammar">Грамматика</TabsTrigger>
                        <TabsTrigger value="style">Стиль</TabsTrigger>
                        <TabsTrigger value="seo">SEO</TabsTrigger>
                        <TabsTrigger value="stats">Статистика</TabsTrigger>
                      </TabsList>

                      <TabsContent value="grammar" className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Найдено {analysisResult.grammar.issues.length} проблем</span>
                        </div>
                        {analysisResult.grammar.issues.map((issue, index) => (
                          <Alert key={index}>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              <div className="font-medium">{issue.message}</div>
                              <div className="text-sm text-muted-foreground mt-1">{issue.suggestion}</div>
                            </AlertDescription>
                          </Alert>
                        ))}
                      </TabsContent>

                      <TabsContent value="style" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Читабельность</div>
                            <div className="text-2xl font-bold">{analysisResult.style.readability}%</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Тон</div>
                            <div className="text-lg font-medium">{analysisResult.style.tone}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Рекомендации по улучшению:</h4>
                          <ul className="space-y-2">
                            {analysisResult.style.suggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>

                      <TabsContent value="seo" className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Ключевые слова:</h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {analysisResult.seo.keywords.map((keyword, index) => (
                              <Badge key={index} variant="outline">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Рекомендации:</h4>
                          <ul className="space-y-2">
                            {analysisResult.seo.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>

                      <TabsContent value="stats" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">{analysisResult.stats.words}</div>
                              <div className="text-sm text-muted-foreground">Слов</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/10 rounded-lg">
                              <BookOpen className="h-4 w-4 text-accent" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">{analysisResult.stats.sentences}</div>
                              <div className="text-sm text-muted-foreground">Предложений</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">{analysisResult.stats.characters}</div>
                              <div className="text-sm text-muted-foreground">Символов</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/10 rounded-lg">
                              <Zap className="h-4 w-4 text-accent" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">{analysisResult.stats.readingTime}</div>
                              <div className="text-sm text-muted-foreground">Мин чтения</div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Анализ завершен • Найдено {analysisResult.grammar.issues.length} проблем
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Сохранить изменения
                        </Button>
                        <Button size="sm" onClick={handleAnalyze}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Переписать текст
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="p-4 bg-muted rounded-full mb-4">
                    <Target className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Готовы проанализировать текст?</h3>
                  <p className="text-muted-foreground mb-4 max-w-sm">
                    Вставьте текст в поле слева и нажмите "Проанализировать" для получения детального анализа
                  </p>
                  <Badge variant="secondary">
                    <Target className="h-3 w-3 mr-1" />
                    AI-анализ
                  </Badge>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
