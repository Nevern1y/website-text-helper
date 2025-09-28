"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  MessageSquare,
  ArrowLeft,
  Send,
  Bot,
  User,
  Settings,
  Smartphone,
  MessageCircle,
  Plus,
  Copy,
  Download,
  Zap,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"
import { useAuthContext } from "@/components/providers/auth-context"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

const initialMessage: Message = {
  id: "welcome",
  type: "bot",
  content: "Привет! Я AI Helper бот. Задайте вопрос, и я помогу.",
  timestamp: new Date(),
}

export default function ChatbotPage() {
  const { user } = useAuthContext()
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return
    if (!user) {
      setError("Чтобы отправлять сообщения боту, войдите в аккаунт")
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)
    setError(null)

    try {
      const response = await apiClient.chatMessage({ message: inputMessage })
      const history: Message[] = response.messages.map((message, index) => ({
        id: message.id ?? `${Date.now()}-${index}`,
        type: message.role === "assistant" ? "bot" : "user",
        content: message.content,
        timestamp: message.createdAt ? new Date(message.createdAt) : new Date(),
      }))
      setMessages([initialMessage, ...history])
    } catch (error) {
      console.error("Chatbot response failed:", error)
      setError((error as Error).message)
    } finally {
      setIsTyping(false)
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="min-h-screen bg-background">
      {!user ? (
        <div className="bg-muted/40 border-b border-border text-center text-xs uppercase tracking-wide py-2">
          Войдите в аккаунт, чтобы вести диалог и сохранять историю
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
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Чат-бот</h1>
                <p className="text-sm text-muted-foreground">Автоматизация общения с клиентами</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              <Bot className="h-3 w-3 mr-1" />
              AI-бот
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/ai-bot-avatar.png" />
                      <AvatarFallback>
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">AI Helper Bot</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Онлайн
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Настройки
                  </Button>
                </div>
              </CardHeader>

              <Separator />

              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.type === "bot" && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[70%] rounded-lg px-3 py-2 ${
                            message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString("ru-RU", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        {message.type === "user" && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg px-3 py-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <Separator />

                <div className="p-4">
                  {error ? <p className="text-xs text-destructive mb-2">{error}</p> : null}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Введите сообщение..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Статистика бота</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-muted-foreground">Сообщений обработано</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Users className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-muted-foreground">Активных пользователей</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">0%</div>
                      <div className="text-sm text-muted-foreground">Успешных ответов</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Integrations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Интеграции</CardTitle>
                <CardDescription>Подключите бота к мессенджерам</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
                  WhatsApp Business
                  <Badge variant="secondary" className="ml-auto">
                    Подключено
                  </Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2 text-blue-600" />
                  Facebook Messenger
                  <Badge variant="outline" className="ml-auto">
                    Настроить
                  </Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Smartphone className="h-4 w-4 mr-2 text-blue-500" />
                  Telegram
                  <Badge variant="outline" className="ml-auto">
                    Настроить
                  </Badge>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить сценарий
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Copy className="h-4 w-4 mr-2" />
                  Экспорт диалогов
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Скачать отчет
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bot Configuration */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Настройка бота</CardTitle>
              <CardDescription>Управляйте поведением и ответами вашего AI-бота</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="scenarios" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="scenarios">Сценарии</TabsTrigger>
                  <TabsTrigger value="responses">Ответы</TabsTrigger>
                  <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                  <TabsTrigger value="settings">Настройки</TabsTrigger>
                </TabsList>

                <TabsContent value="scenarios" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Приветствие</CardTitle>
                        <CardDescription className="text-sm">Первое сообщение для новых пользователей</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-2">
                          "Привет! Я AI Helper бот. Как дела? Чем могу помочь?"
                        </p>
                        <Button variant="outline" size="sm">
                          Редактировать
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Часто задаваемые вопросы</CardTitle>
                        <CardDescription className="text-sm">
                          Автоматические ответы на популярные вопросы
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-2">15 настроенных сценариев</p>
                        <Button variant="outline" size="sm">
                          Управлять
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Передача оператору</CardTitle>
                        <CardDescription className="text-sm">Когда бот не может помочь</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-2">Активно в рабочие часы</p>
                        <Button variant="outline" size="sm">
                          Настроить
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Рабочие часы</CardTitle>
                        <CardDescription className="text-sm">Время активности бота</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-2">Пн-Пт: 9:00-18:00</p>
                        <Button variant="outline" size="sm">
                          Изменить
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="responses" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Вопросы о ценах</h4>
                        <p className="text-sm text-muted-foreground">Автоответ о тарифных планах</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Активно</Badge>
                        <Button variant="outline" size="sm">
                          Редактировать
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Техническая поддержка</h4>
                        <p className="text-sm text-muted-foreground">Помощь с использованием платформы</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Активно</Badge>
                        <Button variant="outline" size="sm">
                          Редактировать
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Информация о продуктах</h4>
                        <p className="text-sm text-muted-foreground">Описание AI-инструментов</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Черновик</Badge>
                        <Button variant="outline" size="sm">
                          Редактировать
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">2.3 мин</div>
                            <div className="text-sm text-muted-foreground">Среднее время ответа</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-accent/10 rounded-lg">
                            <Zap className="h-4 w-4 text-accent" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">87%</div>
                            <div className="text-sm text-muted-foreground">Решено автоматически</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <TrendingUp className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">4.8/5</div>
                            <div className="text-sm text-muted-foreground">Оценка пользователей</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Автоматические ответы</h4>
                        <p className="text-sm text-muted-foreground">Включить AI-ответы на вопросы</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Включено
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Уведомления</h4>
                        <p className="text-sm text-muted-foreground">Получать уведомления о новых сообщениях</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Настроить
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Язык бота</h4>
                        <p className="text-sm text-muted-foreground">Основной язык общения</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Русский
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
