import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Brain, HelpCircle, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
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
              FAQ
            </Badge>
          </div>
          <Button variant="outline" asChild>
            <Link href="/contact">Связаться с нами</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4 font-mono">Часто задаваемые вопросы</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Найдите ответы на популярные вопросы о AI Helper
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Что такое AI Helper и как он работает?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                AI Helper — это комплексная платформа для автоматизации бизнес-процессов с помощью искусственного
                интеллекта. Мы используем передовые языковые модели для генерации контента, анализа текстов, создания
                чат-ботов и маркетинговой аналитики. Платформа работает как в облаке, так и с локальными моделями для
                максимальной приватности данных.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Какие AI модели поддерживаются?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Мы поддерживаем широкий спектр моделей: OpenAI GPT-4/3.5, Anthropic Claude, Google Gemini, локальные
                модели Llama 3.1, Code Llama, а также модели с Hugging Face. Вы можете использовать как облачные API,
                так и запускать модели локально на своих серверах.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Безопасны ли мои данные?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Безопасность данных — наш приоритет. Мы используем шифрование данных в покое и при передаче, соблюдаем
                GDPR и другие стандарты защиты данных. Для максимальной приватности вы можете использовать локальные
                модели, которые обрабатывают данные только на ваших серверах.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Есть ли бесплатный план?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, мы предлагаем бесплатный план с ограниченным количеством запросов в месяц. Это позволяет
                протестировать все функции платформы. Для расширенного использования доступны платные планы с
                увеличенными лимитами и дополнительными возможностями.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Как настроить локальные модели?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Для настройки локальных моделей перейдите в раздел "AI Модели" в панели управления. Там вы можете
                установить модели Llama, настроить параметры GPU, управлять памятью и производительностью. Мы
                поддерживаем установку через Ollama, Hugging Face и прямую загрузку.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Можно ли интегрировать AI Helper с другими системами?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, мы предоставляем REST API для интеграции с вашими существующими системами. Также доступны готовые
                интеграции с популярными CRM, системами email-маркетинга, социальными сетями и мессенджерами.
                Документация API доступна в разделе для разработчиков.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Какая техническая поддержка предоставляется?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Мы предоставляем техническую поддержку 24/7 через чат, email и телефон. Для корпоративных клиентов
                доступен персональный менеджер и приоритетная поддержка. Также у нас есть обширная база знаний и
                видеоуроки для самостоятельного изучения.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Поддерживается ли русский язык?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, AI Helper полностью поддерживает русский язык. Все модели обучены работать с русскими текстами,
                включая генерацию контента, анализ грамматики, создание чат-ботов и голосовые функции. Интерфейс также
                полностью локализован на русский язык.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="mt-12">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Не нашли ответ?
              </CardTitle>
              <CardDescription>Свяжитесь с нашей службой поддержки для получения персональной помощи</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">Связаться с поддержкой</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/chatbot">Чат с AI помощником</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
