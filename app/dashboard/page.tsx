import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Brain, FileText, MessageSquare, Plus, Settings, Bell, Clock, BarChart3, Target, Sparkles } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">AI Helper</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center pb-4">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarFallback className="text-lg">U</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">Пользователь</CardTitle>
                <CardDescription>user@example.com</CardDescription>
                <Badge variant="secondary" className="mt-2">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Pro план
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-sm text-muted-foreground">Запросов выполнено</div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Использовано в этом месяце</span>
                      <span className="font-medium">0/1000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "0%" }}></div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Настройки профиля
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Добро пожаловать!</h1>
              <p className="text-muted-foreground">Управляйте своими AI-проектами и отслеживайте прогресс</p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-muted-foreground">Контент создан</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Target className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-muted-foreground">Текстов проверено</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-muted-foreground">Чат-сообщений</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-sm text-muted-foreground">Идей для маркетинга</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Projects Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Мои проекты</CardTitle>
                    <CardDescription>Управляйте своими AI-проектами</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/projects/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Создать проект
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <div className="p-4 bg-muted rounded-full mb-4 w-fit mx-auto">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Пока нет проектов</h3>
                  <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
                    Создайте свой первый AI-проект, чтобы начать работу
                  </p>
                  <Button asChild>
                    <Link href="/projects/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Создать проект
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Последняя активность</CardTitle>
                <CardDescription>История ваших взаимодействий с AI Helper</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <div className="p-4 bg-muted rounded-full mb-4 w-fit mx-auto">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Пока нет активности</h3>
                  <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
                    Начните использовать AI-инструменты, чтобы увидеть историю активности
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Быстрые действия</CardTitle>
                <CardDescription>Начните работу с AI-инструментами</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start bg-transparent" asChild>
                    <Link href="/content-generation">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Создать контент</div>
                          <div className="text-sm text-muted-foreground">Генерация текстов и постов</div>
                        </div>
                      </div>
                    </Link>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 justify-start bg-transparent" asChild>
                    <Link href="/text-analysis">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <Target className="h-5 w-5 text-accent" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Анализ текста</div>
                          <div className="text-sm text-muted-foreground">Проверка и улучшение</div>
                        </div>
                      </div>
                    </Link>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 justify-start bg-transparent" asChild>
                    <Link href="/chatbot">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Чат-бот</div>
                          <div className="text-sm text-muted-foreground">Настройка автоответов</div>
                        </div>
                      </div>
                    </Link>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 justify-start bg-transparent" asChild>
                    <Link href="/marketing">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <BarChart3 className="h-5 w-5 text-accent" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Маркетинг</div>
                          <div className="text-sm text-muted-foreground">Идеи и аналитика</div>
                        </div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
