import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, FileText, AlertTriangle, CreditCard, Shield, Gavel } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground font-mono">AI Helper</span>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">← На главную</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 font-mono">Условия использования</h1>
          <p className="text-muted-foreground text-lg">Последнее обновление: 15 декабря 2024 года</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Принятие условий
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Добро пожаловать в AI Helper! Настоящие Условия использования ("Условия") регулируют ваше использование
                нашего веб-сайта и сервисов. Используя AI Helper, вы соглашаетесь соблюдать данные Условия. Если вы не
                согласны с какими-либо условиями, пожалуйста, не используйте наш сервис.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Описание сервиса
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                AI Helper — это платформа искусственного интеллекта, которая предоставляет следующие услуги:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Генерация текстового контента с помощью AI</li>
                <li>• Анализ и проверка текстов на грамматику и стиль</li>
                <li>• Создание и настройка чат-ботов</li>
                <li>• Генерация маркетинговых идей и аналитика</li>
                <li>• Другие AI-инструменты для бизнеса</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                Права и обязанности пользователя
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Вы имеете право:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Использовать сервис в соответствии с данными Условиями</li>
                  <li>• Получать техническую поддержку</li>
                  <li>• Экспортировать созданный контент</li>
                  <li>• Отменить подписку в любое время</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Вы обязуются:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Предоставлять точную информацию при регистрации</li>
                  <li>• Не нарушать права третьих лиц</li>
                  <li>• Не использовать сервис для незаконных целей</li>
                  <li>• Соблюдать ограничения тарифного плана</li>
                  <li>• Не пытаться взломать или нарушить работу сервиса</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Запрещенное использование
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">При использовании AI Helper запрещается:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Создавать контент, нарушающий авторские права</li>
                <li>• Генерировать оскорбительный, дискриминационный или незаконный контент</li>
                <li>• Использовать сервис для спама или мошенничества</li>
                <li>• Пытаться обойти ограничения тарифного плана</li>
                <li>• Передавать свой аккаунт третьим лицам</li>
                <li>• Использовать автоматизированные средства для массовых запросов</li>
                <li>• Нарушать работу сервиса или серверов</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Оплата и подписки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Тарифные планы:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Бесплатный план с ограниченным количеством запросов</li>
                  <li>• Платные планы с расширенными возможностями</li>
                  <li>• Корпоративные планы для больших команд</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Условия оплаты:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Оплата производится заранее за период подписки</li>
                  <li>• Автоматическое продление подписки (можно отключить)</li>
                  <li>• Возврат средств в соответствии с политикой возврата</li>
                  <li>• Изменение цен с уведомлением за 30 дней</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Интеллектуальная собственность</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Права AI Helper:</h4>
                <p className="text-muted-foreground">
                  Все права на программное обеспечение, алгоритмы, дизайн и торговые марки AI Helper принадлежат нашей
                  компании и защищены законом об авторском праве.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Права на созданный контент:</h4>
                <p className="text-muted-foreground">
                  Вы сохраняете права на контент, созданный с помощью AI Helper. Мы не претендуем на права собственности
                  на ваш контент, но можем использовать его для улучшения наших алгоритмов (в обезличенном виде).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ограничение ответственности</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                AI Helper предоставляется "как есть" без каких-либо гарантий. Мы не несем ответственности за:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Точность или качество сгенерированного контента</li>
                <li>• Временные перебои в работе сервиса</li>
                <li>• Потерю данных или упущенную выгоду</li>
                <li>• Действия третьих лиц</li>
                <li>• Нарушение авторских прав в созданном контенте</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Прекращение использования</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Мы оставляем за собой право приостановить или прекратить ваш доступ к сервису в случае:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Нарушения данных Условий использования</li>
                <li>• Неуплаты за услуги</li>
                <li>• Подозрения в мошеннической деятельности</li>
                <li>• По требованию правоохранительных органов</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Вы можете прекратить использование сервиса в любое время, удалив свой аккаунт.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Изменения в условиях</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Мы можем изменять данные Условия использования время от времени. О существенных изменениях мы уведомим
                вас по электронной почте или через уведомления в сервисе за 30 дней до вступления изменений в силу.
                Продолжение использования сервиса после изменений означает ваше согласие с новыми условиями.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                По вопросам, связанным с данными Условиями использования, обращайтесь:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Email: legal@aihelper.ru</li>
                <li>• Телефон: +7 (495) 123-45-67</li>
                <li>• Адрес: г. Москва, ул. Тверская, 1, БЦ "Технопарк", офис 501</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
