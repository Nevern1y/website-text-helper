"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Download, Share2, Copy, Sparkles, Palette, Camera, Wand2 } from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"
import { useAuthContext } from "@/components/providers/auth-context"

export default function ImageGenerationPage() {
  const { user } = useAuthContext()
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("")
  const [size, setSize] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleDownloadImage = (image: string, index: number) => {
    const link = document.createElement("a")
    link.href = image
    link.download = `ai-helper-image-${index + 1}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCopyLink = async (image: string) => {
    try {
      await navigator.clipboard.writeText(image)
      setError(null)
    } catch (error) {
      setError("Не удалось скопировать ссылку на изображение")
    }
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    if (!user) {
      setError("Для генерации изображений необходимо войти в аккаунт")
      return
    }

    setIsGenerating(true)
    setError(null)
    try {
      const response = await apiClient.generateImage({ prompt, style, size, count: 2 })
      setGeneratedImages(response.images.map((image) => image.url))
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {!user ? (
        <div className="bg-muted/40 border-b border-border text-center text-xs uppercase tracking-wide py-2">
          Авторизуйтесь, чтобы сохранять результаты генерации изображений
        </div>
      ) : null}
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ImageIcon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground font-mono">AI Helper</span>
            </Link>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Генерация изображений
            </Badge>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Панель управления</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 font-mono">Генерация изображений с помощью AI</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Создавайте уникальные изображения для вашего контента с помощью передовых AI-технологий
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  Настройки генерации
                </CardTitle>
                <CardDescription>Опишите изображение, которое хотите создать</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Описание изображения</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Например: Современный офис с большими окнами, минималистичный дизайн, естественное освещение..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Стиль</Label>
                    <Select value={style} onValueChange={setStyle}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите стиль" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realistic">Реалистичный</SelectItem>
                        <SelectItem value="artistic">Художественный</SelectItem>
                        <SelectItem value="cartoon">Мультяшный</SelectItem>
                        <SelectItem value="minimalist">Минималистичный</SelectItem>
                        <SelectItem value="vintage">Винтажный</SelectItem>
                        <SelectItem value="futuristic">Футуристичный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Размер</Label>
                    <Select value={size} onValueChange={setSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите размер" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Квадрат (1:1)</SelectItem>
                        <SelectItem value="landscape">Альбомная (16:9)</SelectItem>
                        <SelectItem value="portrait">Портретная (9:16)</SelectItem>
                        <SelectItem value="wide">Широкая (21:9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className="w-full" size="lg">
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Генерируем изображения...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Создать изображения
                    </>
                  )}
                </Button>
                {error ? <p className="text-sm text-destructive text-center">{error}</p> : null}

                {/* Quick Templates */}
                <div className="space-y-3">
                  <Label>Быстрые шаблоны</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPrompt("Современный офис с большими окнами, минималистичный дизайн")}
                    >
                      Офис
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPrompt("Абстрактный фон для презентации, геометрические формы")}
                    >
                      Презентация
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPrompt("Логотип компании, современный стиль, минимализм")}
                    >
                      Логотип
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPrompt("Баннер для социальных сетей, яркие цвета")}
                    >
                      Баннер
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Результаты
                </CardTitle>
                <CardDescription>Сгенерированные изображения появятся здесь</CardDescription>
              </CardHeader>
              <CardContent>
                {generatedImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {generatedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Generated image ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary" onClick={() => handleDownloadImage(image, index)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => window.open(image, "_blank")}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => handleCopyLink(image)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Изображения появятся здесь после генерации</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
