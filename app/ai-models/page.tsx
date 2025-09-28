"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Server, Cloud, Settings, CheckCircle, Cpu, Zap, Globe, Shield, Download } from "lucide-react"
import Link from "next/link"

export default function AIModelsPage() {
  const [localModels, setLocalModels] = useState([
    { name: "Llama 3.1 8B", status: "installed", size: "4.7GB", performance: "high" },
    { name: "Llama 3.1 70B", status: "available", size: "39GB", performance: "ultra" },
    { name: "Code Llama 7B", status: "installed", size: "3.8GB", performance: "medium" },
  ])

  const [apiKeys, setApiKeys] = useState({
    openai: "",
    anthropic: "",
    google: "",
    cohere: "",
    huggingface: "",
  })

  const [activeConnections, setActiveConnections] = useState({
    openai: true,
    anthropic: false,
    google: true,
    local: true,
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 font-mono">Управление AI моделями</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Подключайте локальные модели и внешние API для максимальной гибкости
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
                  <CardDescription>
                    Управляйте локально установленными моделями для максимальной приватности
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {localModels.map((model, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Brain className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{model.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Размер: {model.size}</span>
                            <Badge
                              variant={
                                model.performance === "ultra"
                                  ? "default"
                                  : model.performance === "high"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
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
                          <>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Установлена
                            </Badge>
                            <Button variant="outline" size="sm">
                              Обновить
                            </Button>
                            <Button variant="destructive" size="sm">
                              Удалить
                            </Button>
                          </>
                        ) : (
                          <>
                            <Badge variant="outline">
                              <Download className="h-3 w-3 mr-1" />
                              Доступна
                            </Badge>
                            <Button size="sm">Установить</Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Добавить новую модель</CardTitle>
                  <CardDescription>
                    Установите дополнительные модели из Hugging Face или других источников
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Название модели</Label>
                      <Input placeholder="microsoft/DialoGPT-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label>Источник</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите источник" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="huggingface">Hugging Face</SelectItem>
                          <SelectItem value="ollama">Ollama</SelectItem>
                          <SelectItem value="local">Локальный файл</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Установить модель
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api-connections" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      OpenAI
                    </CardTitle>
                    <CardDescription>GPT-4, GPT-3.5, DALL-E и другие модели OpenAI</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Активно</Label>
                      <Switch
                        checked={activeConnections.openai}
                        onCheckedChange={(checked) => setActiveConnections({ ...activeConnections, openai: checked })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>API ключ</Label>
                      <Input
                        type="password"
                        placeholder="sk-..."
                        value={apiKeys.openai}
                        onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      Тестировать подключение
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Anthropic
                    </CardTitle>
                    <CardDescription>Claude 3.5 Sonnet, Claude 3 Haiku и другие модели</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Активно</Label>
                      <Switch
                        checked={activeConnections.anthropic}
                        onCheckedChange={(checked) =>
                          setActiveConnections({ ...activeConnections, anthropic: checked })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>API ключ</Label>
                      <Input
                        type="password"
                        placeholder="sk-ant-..."
                        value={apiKeys.anthropic}
                        onChange={(e) => setApiKeys({ ...apiKeys, anthropic: e.target.value })}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      Тестировать подключение
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Google AI
                    </CardTitle>
                    <CardDescription>Gemini Pro, PaLM и другие модели Google</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Активно</Label>
                      <Switch
                        checked={activeConnections.google}
                        onCheckedChange={(checked) => setActiveConnections({ ...activeConnections, google: checked })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>API ключ</Label>
                      <Input
                        type="password"
                        placeholder="AIza..."
                        value={apiKeys.google}
                        onChange={(e) => setApiKeys({ ...apiKeys, google: e.target.value })}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      Тестировать подключение
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Hugging Face
                    </CardTitle>
                    <CardDescription>Доступ к тысячам открытых моделей</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Активно</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>API токен</Label>
                      <Input
                        type="password"
                        placeholder="hf_..."
                        value={apiKeys.huggingface}
                        onChange={(e) => setApiKeys({ ...apiKeys, huggingface: e.target.value })}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      Тестировать подключение
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Общие настройки</CardTitle>
                  <CardDescription>Конфигурация работы с AI моделями</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Модель по умолчанию для текста</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите модель" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4 (OpenAI)</SelectItem>
                          <SelectItem value="claude-3">Claude 3.5 Sonnet</SelectItem>
                          <SelectItem value="llama-3">Llama 3.1 8B (Локально)</SelectItem>
                          <SelectItem value="gemini">Gemini Pro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Модель для изображений</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите модель" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dall-e-3">DALL-E 3</SelectItem>
                          <SelectItem value="midjourney">Midjourney</SelectItem>
                          <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Приоритет локальных моделей</Label>
                        <p className="text-sm text-muted-foreground">Использовать локальные модели когда возможно</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Автоматические обновления</Label>
                        <p className="text-sm text-muted-foreground">Обновлять модели автоматически</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Режим экономии</Label>
                        <p className="text-sm text-muted-foreground">Использовать менее ресурсоемкие модели</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Максимальное использование GPU (%)</Label>
                    <Input type="number" defaultValue="80" min="10" max="100" />
                  </div>

                  <Button>Сохранить настройки</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
