import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, MessageSquare, Mail, Phone, Clock, Users, BookOpen, Video } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
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
              Поддержка
            </Badge>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Панель управления</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 font-mono">Центр поддержки</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Мы здесь, чтобы помочь вам максимально эффективно использовать AI Helper
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Онлайн чат</CardTitle>
                <CardDescription>Мгновенная помощь от наших специалистов</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/chatbot">Начать чат</Link>
                </Button>
                <p className="text-sm text-muted-foreground mt-2">Доступно 24/7</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Email поддержка</CardTitle>
                <CardDescription>Подробные ответы на сложные вопросы</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="mailto:support@aihelper.ru">support@aihelper.ru</Link>
                </Button>
                <p className="text-sm text-muted-foreground mt-2">Ответ в течение 2 часов</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Phone className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Телефон</CardTitle>
                <CardDescription>Прямая связь с техническими экспертами</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="tel:+78001234567">+7 (800) 123-45-67</Link>
                </Button>
                <p className="text-sm text-muted-foreground mt-2">Пн-Пт 9:00-18:00 МСК</p>
              </CardContent>
            </Card>
          </div>

          {/* Support Resources */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  База знаний
                </CardTitle>
                <CardDescription>Подробные руководства и инструкции</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Быстрый старт</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/docs/quickstart">Читать</Link>
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Настройка AI моделей</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/docs/ai-models">Читать</Link>
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>API документация</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/docs/api">Читать</Link>
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Интеграции</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/docs/integrations">Читать</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Видеоуроки
                </CardTitle>
                <CardDescription>Пошаговые видеоинструкции</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Создание первого проекта</span>
                  <Button variant="ghost" size="sm">
                    Смотреть
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Генерация контента</span>
                  <Button variant="ghost" size="sm">
                    Смотреть
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Настройка чат-бота</span>
                  <Button variant="ghost" size="sm">
                    Смотреть
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Локальные модели</span>
                  <Button variant="ghost" size="sm">
                    Смотреть
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Plans */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Users className="h-5 w-5" />
                Планы поддержки
              </CardTitle>
              <CardDescription>Выберите уровень поддержки, подходящий для вашего бизнеса</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Базовая</h3>
                  <p className="text-muted-foreground mb-4">Для индивидуальных пользователей</p>
                  <ul className="space-y-2 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      Email поддержка
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      База знаний
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      Ответ в течение 24 часов
                    </li>
                  </ul>
                  <Badge variant="outline">Включено в план</Badge>
                </div>

                <div className="text-center p-6 border rounded-lg border-primary">
                  <h3 className="text-xl font-semibold mb-2">Профессиональная</h3>
                  <p className="text-muted-foreground mb-4">Для малого и среднего бизнеса</p>
                  <ul className="space-y-2 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      Приоритетная поддержка
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      Онлайн чат
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      Ответ в течение 2 часов
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      Видеоконсультации
                    </li>
                  </ul>
                  <Badge>Рекомендуется</Badge>
                </div>

                <div className="text-center p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Корпоративная</h3>
                  <p className="text-muted-foreground mb-4">Для крупных компаний</p>
                  <ul className="space-y-2 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      Персональный менеджер
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      Поддержка 24/7
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      Мгновенный ответ
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      Индивидуальное обучение
                    </li>
                  </ul>
                  <Badge variant="secondary">Премиум</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
