"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Target,
  Eye,
  Heart,
  Lightbulb,
  Sparkles,
  ArrowLeft,
  Download,
  RefreshCw,
  Calendar,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

export default function MarketingPage() {
  const [businessType, setBusinessType] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [goals, setGoals] = useState("")
  const [ideas, setIdeas] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState("all")

  const generateIdeas = async () => {
    setIsGenerating(true)
    try {
      // TODO: Replace with actual API call to marketing ideas generation service
      // const response = await fetch('/api/generate-marketing-ideas', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ businessType, targetAudience, goals })
      // })
      // const data = await response.json()
      // setIdeas(data.ideas)

      // For now, show empty state until API is connected
      setIdeas([])
    } catch (error) {
      console.error("Marketing ideas generation failed:", error)
    } finally {
      setIsGenerating(false)
    }
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
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <h1 className="text-2xl font-bold font-mono">Маркетинговая аналитика</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Обновить
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="ideas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="ideas" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Генерация идей
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Аналитика
            </TabsTrigger>
          </TabsList>

          {/* Ideas Generation Tab */}
          <TabsContent value="ideas" className="space-y-6">
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Генератор маркетинговых идей
                </CardTitle>
                <CardDescription>
                  Получите персонализированные идеи для контента и маркетинговых кампаний на основе вашего бизнеса
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="business-type">Тип бизнеса</Label>
                      <Input
                        id="business-type"
                        placeholder="Например: IT-консалтинг, ресторан, интернет-магазин"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="target-audience">Целевая аудитория</Label>
                      <Input
                        id="target-audience"
                        placeholder="Например: предприниматели 25-45 лет"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="goals">Маркетинговые цели</Label>
                    <Textarea
                      id="goals"
                      placeholder="Опишите ваши цели: увеличение продаж, повышение узнаваемости бренда, привлечение новых клиентов..."
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                      className="mt-1 min-h-[120px]"
                    />
                  </div>
                </div>

                <Button
                  onClick={generateIdeas}
                  disabled={isGenerating || !businessType || !targetAudience}
                  className="w-full shadow-lg"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      Генерируем идеи...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="h-5 w-5 mr-2" />
                      Сгенерировать идеи
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {ideas.length > 0 ? (
              <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="font-mono">Сгенерированные идеи</CardTitle>
                  <CardDescription>Персонализированные предложения для вашего бизнеса</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {ideas.map((idea, index) => (
                      <div
                        key={index}
                        className="p-4 bg-muted/50 rounded-lg border border-border/50 hover:bg-muted/70 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <Badge variant="secondary" className="mt-1 bg-accent/10 text-accent">
                            {index + 1}
                          </Badge>
                          <p className="text-sm leading-relaxed">{idea}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button variant="outline" onClick={generateIdeas} disabled={isGenerating}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Новые идеи
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Сохранить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="p-4 bg-muted rounded-full mb-4">
                    <Lightbulb className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Готовы получить идеи?</h3>
                  <p className="text-muted-foreground mb-4 max-w-sm">
                    Заполните форму выше и нажмите "Сгенерировать идеи" для получения персонализированных предложений
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-mono">Аналитика эффективности</h2>
                <p className="text-muted-foreground">Отслеживайте результаты ваших маркетинговых кампаний</p>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все платформы</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Период
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Общий охват</p>
                      <p className="text-2xl font-bold font-mono">0</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">Подключите аналитику</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Вовлеченность</p>
                      <p className="text-2xl font-bold font-mono">0%</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">Подключите аналитику</p>
                    </div>
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Heart className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Клики</p>
                      <p className="text-2xl font-bold font-mono">0</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">Подключите аналитику</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Конверсии</p>
                      <p className="text-2xl font-bold font-mono">0</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">Подключите аналитику</p>
                    </div>
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <DollarSign className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Performance */}
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="font-mono">Производительность по платформам</CardTitle>
                <CardDescription>Сравнение эффективности различных социальных сетей</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <div className="p-4 bg-muted rounded-full mb-4 w-fit mx-auto">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Нет данных аналитики</h3>
                  <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
                    Подключите ваши социальные сети для отслеживания производительности
                  </p>
                  <Button variant="outline">Подключить аналитику</Button>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono">
                  <Target className="h-5 w-5 text-primary" />
                  Рекомендации по улучшению
                </CardTitle>
                <CardDescription>AI-анализ ваших данных и предложения по оптимизации</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <div className="p-4 bg-muted rounded-full mb-4 w-fit mx-auto">
                    <Target className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Рекомендации появятся здесь</h3>
                  <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
                    После подключения аналитики вы получите персонализированные рекомендации
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
