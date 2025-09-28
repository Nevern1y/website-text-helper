import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Brain,
  FileText,
  MessageSquare,
  Sparkles,
  Target,
  BarChart3,
  ArrowRight,
  Menu,
  ImageIcon,
  Mic,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-xl border border-white/10">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-sans tracking-tight">AI Helper</span>
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black border-white/10">
              <nav className="flex flex-col gap-6 mt-8">
                <Link href="#features" className="text-lg font-medium text-white/70 hover:text-white transition-colors">
                  Функции
                </Link>
                <Link href="/about" className="text-lg font-medium text-white/70 hover:text-white transition-colors">
                  О нас
                </Link>
                <Link href="/contact" className="text-lg font-medium text-white/70 hover:text-white transition-colors">
                  Контакты
                </Link>
                <div className="border-t border-white/10 pt-6 mt-6">
                  <div className="flex flex-col gap-3">
                    <Button variant="ghost" asChild className="justify-start text-white hover:bg-white/10">
                      <Link href="/login">Войти</Link>
                    </Button>
                    <Button asChild className="bg-white text-black hover:bg-white/90">
                      <Link href="/register">Начать</Link>
                    </Button>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-white/70 hover:text-white transition-colors font-medium">
              Функции
            </Link>
            <Link href="/about" className="text-white/70 hover:text-white transition-colors font-medium">
              О нас
            </Link>
            <Link href="/contact" className="text-white/70 hover:text-white transition-colors font-medium">
              Контакты
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10">
              <Link href="/login">Войти</Link>
            </Button>
            <Button asChild className="bg-white text-black hover:bg-white/90 font-medium">
              <Link href="/register">Начать</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        <div className="container mx-auto text-center max-w-5xl relative">
          <Badge
            variant="secondary"
            className="mb-8 text-sm px-4 py-2 bg-white/10 text-white border-white/20 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Временно полностью бесплатно
          </Badge>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-balance mb-8 leading-[0.9] tracking-tight">
            <span className="gradient-text">AI Helper</span>
            <br />
            <span className="text-white/90 text-5xl md:text-6xl lg:text-7xl">для вашего бизнеса</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 mb-12 text-balance max-w-3xl mx-auto leading-relaxed font-light">
            Автоматизируйте создание контента, анализируйте тексты и улучшайте коммуникации с помощью передовых
            AI-технологий
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="text-lg px-10 py-6 bg-white text-black hover:bg-white/90 font-medium rounded-full"
              asChild
            >
              <Link href="/register">
                Начать бесплатно
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 bg-transparent border-white/20 text-white hover:bg-white/5 rounded-full"
              asChild
            >
              <Link href="#features">Узнать больше</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-white/50 rounded-full" />
              <span>Полностью бесплатно</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-white/50 rounded-full" />
              <span>Без регистрации</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-white/50 rounded-full" />
              <span>Все функции доступны</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance tracking-tight gradient-text">
              Мощные инструменты
            </h2>
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto text-balance font-light">
              Все необходимые AI-инструменты в одной платформе
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:bg-white/5 transition-all duration-500 border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-semibold text-white mb-3">Генерация контента</CardTitle>
                <CardDescription className="text-white/60 text-lg leading-relaxed">
                  Создавайте тексты для рассылок, соцсетей и блогов за секунды
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-white group-hover:text-black transition-all bg-transparent border-white/20 text-white/70 hover:text-black rounded-full px-6"
                  asChild
                >
                  <Link href="/content-generation">Подробнее</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:bg-white/5 transition-all duration-500 border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-semibold text-white mb-3">Анализ текста</CardTitle>
                <CardDescription className="text-white/60 text-lg leading-relaxed">
                  Проверка грамматики, стиля и оптимизация контента
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-white group-hover:text-black transition-all bg-transparent border-white/20 text-white/70 hover:text-black rounded-full px-6"
                  asChild
                >
                  <Link href="/text-analysis">Подробнее</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:bg-white/5 transition-all duration-500 border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-semibold text-white mb-3">Чат-бот</CardTitle>
                <CardDescription className="text-white/60 text-lg leading-relaxed">
                  Автоматизируйте общение с клиентами 24/7
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-white group-hover:text-black transition-all bg-transparent border-white/20 text-white/70 hover:text-black rounded-full px-6"
                  asChild
                >
                  <Link href="/chatbot">Подробнее</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:bg-white/5 transition-all duration-500 border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-semibold text-white mb-3">Маркетинговые идеи</CardTitle>
                <CardDescription className="text-white/60 text-lg leading-relaxed">
                  Генерация идей для контента и анализ эффективности
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-white group-hover:text-black transition-all bg-transparent border-white/20 text-white/70 hover:text-black rounded-full px-6"
                  asChild
                >
                  <Link href="/marketing">Подробнее</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:bg-white/5 transition-all duration-500 border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <ImageIcon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-semibold text-white mb-3">Генерация изображений</CardTitle>
                <CardDescription className="text-white/60 text-lg leading-relaxed">
                  Создавайте уникальные изображения для контента с помощью AI
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-white group-hover:text-black transition-all bg-transparent border-white/20 text-white/70 hover:text-black rounded-full px-6"
                  asChild
                >
                  <Link href="/image-generation">Подробнее</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:bg-white/5 transition-all duration-500 border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <Mic className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-semibold text-white mb-3">Голосовой помощник</CardTitle>
                <CardDescription className="text-white/60 text-lg leading-relaxed">
                  Преобразование речи в текст и голосовые команды
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-white group-hover:text-black transition-all bg-transparent border-white/20 text-white/70 hover:text-black rounded-full px-6"
                  asChild
                >
                  <Link href="/voice-assistant">Подробнее</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="container mx-auto text-center max-w-4xl relative">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-balance tracking-tight">
            <span className="gradient-text">Готовы начать?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/60 mb-12 text-balance font-light max-w-2xl mx-auto">
            Попробуйте AI Helper прямо сейчас — все функции временно доступны бесплатно
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-6 bg-white text-black hover:bg-white/90 font-medium rounded-full"
            asChild
          >
            <Link href="/register">
              Начать сейчас
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/[0.02] py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AI Helper</span>
              </div>
              <p className="text-white/60 text-pretty leading-relaxed">Умные инструменты для современного бизнеса</p>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-white">Продукт</h3>
              <ul className="space-y-3 text-white/60">
                <li>
                  <Link href="/content-generation" className="hover:text-white transition-colors">
                    Генерация контента
                  </Link>
                </li>
                <li>
                  <Link href="/text-analysis" className="hover:text-white transition-colors">
                    Анализ текста
                  </Link>
                </li>
                <li>
                  <Link href="/chatbot" className="hover:text-white transition-colors">
                    Чат-бот
                  </Link>
                </li>
                <li>
                  <Link href="/marketing" className="hover:text-white transition-colors">
                    Маркетинг
                  </Link>
                </li>
                <li>
                  <Link href="/image-generation" className="hover:text-white transition-colors">
                    Генерация изображений
                  </Link>
                </li>
                <li>
                  <Link href="/voice-assistant" className="hover:text-white transition-colors">
                    Голосовой помощник
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-white">Компания</h3>
              <ul className="space-y-3 text-white/60">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    Часто задаваемые вопросы
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Поддержка
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-white">Правовая информация</h3>
              <ul className="space-y-3 text-white/60">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Политика конфиденциальности
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Условия использования
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40">
            <p>&copy; 2025 AI Helper. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
