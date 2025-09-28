import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, Target, Zap, Award, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto text-center max-w-4xl relative">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20">
            О компании
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 leading-tight font-mono">
            Мы делаем <span className="text-primary">искусственный интеллект</span> доступным для каждого бизнеса
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
            AI Helper — это российская платформа, которая помогает предпринимателям и компаниям автоматизировать
            создание контента, анализ текстов и коммуникации с клиентами с помощью передовых AI-технологий.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-xl w-fit">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-mono">Наша миссия</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-pretty leading-relaxed">
                  Демократизировать доступ к AI-технологиям для российского бизнеса. Мы верим, что каждая компания,
                  независимо от размера, должна иметь возможность использовать силу искусственного интеллекта для роста
                  и развития.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-xl w-fit">
                  <Globe className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl font-mono">Наше видение</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-pretty leading-relaxed">
                  Стать ведущей AI-платформой в России и СНГ, которая помогает миллионам предпринимателей создавать
                  качественный контент, улучшать коммуникации и принимать обоснованные бизнес-решения с помощью
                  искусственного интеллекта.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance font-mono">Наши ценности</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Принципы, которые направляют нашу работу и развитие продукта
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-0 shadow-lg bg-card/50 backdrop-blur">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-xl w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-mono">Клиентоориентированность</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty">
                  Мы создаем продукт, слушая потребности наших пользователей и постоянно улучшая их опыт работы с AI.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-card/50 backdrop-blur">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-xl w-fit">
                  <Zap className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-mono">Инновации</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty">
                  Мы используем самые современные AI-технологии и постоянно исследуем новые возможности для наших
                  клиентов.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-card/50 backdrop-blur">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-xl w-fit">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-mono">Качество</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty">
                  Мы стремимся к высочайшему качеству во всем: от алгоритмов AI до пользовательского интерфейса.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance font-mono">AI Helper в цифрах</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Платформа находится в стадии развития
            </p>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-4 font-mono">В разработке</div>
            <div className="text-muted-foreground max-w-md mx-auto">
              Мы активно работаем над созданием лучшей AI-платформы для российского бизнеса. Следите за обновлениями!
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
        <div className="container mx-auto text-center max-w-3xl relative">
          <h2 className="text-4xl font-bold mb-6 text-balance font-mono">Готовы присоединиться к AI-революции?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Начните использовать AI Helper уже сегодня и откройте новые возможности для вашего бизнеса
          </p>
          <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all" asChild>
            <Link href="/register">
              Начать бесплатно
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-mono">AI Helper</span>
          </div>
          <p className="text-muted-foreground">&copy; 2024 AI Helper. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}
