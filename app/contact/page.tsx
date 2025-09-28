import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground font-mono">AI Helper</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/">Главная</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Начать</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 font-mono">Свяжитесь с нами</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Мы всегда готовы помочь вам с вопросами о AI Helper и поддержать ваш бизнес
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-mono">Отправить сообщение</CardTitle>
                  <CardDescription>Заполните форму, и мы свяжемся с вами в течение 24 часов</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input id="firstName" placeholder="Ваше имя" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input id="lastName" placeholder="Ваша фамилия" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Компания</Label>
                    <Input id="company" placeholder="Название компании" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема обращения *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тему" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Общие вопросы</SelectItem>
                        <SelectItem value="technical">Техническая поддержка</SelectItem>
                        <SelectItem value="billing">Вопросы по оплате</SelectItem>
                        <SelectItem value="partnership">Партнерство</SelectItem>
                        <SelectItem value="feature">Предложение функции</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea id="message" placeholder="Опишите ваш вопрос или предложение..." rows={5} required />
                  </div>

                  <Button className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Отправить сообщение
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-mono">Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg mt-1">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-sm text-muted-foreground">support@aihelper.ru</p>
                      <p className="text-sm text-muted-foreground">sales@aihelper.ru</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg mt-1">
                      <Phone className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">Телефон</h4>
                      <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
                      <p className="text-sm text-muted-foreground">Пн-Пт: 9:00-18:00 МСК</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg mt-1">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Адрес</h4>
                      <p className="text-sm text-muted-foreground">
                        г. Москва, ул. Тверская, 1<br />
                        БЦ "Технопарк", офис 501
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg mt-1">
                      <Clock className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">Часы работы</h4>
                      <p className="text-sm text-muted-foreground">
                        Пн-Пт: 9:00-18:00 МСК
                        <br />
                        Сб-Вс: выходные
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-mono">Быстрая помощь</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/faq">Часто задаваемые вопросы</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/support">База знаний</Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Онлайн-чат
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
