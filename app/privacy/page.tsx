import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Shield, Eye, Lock, Database, Users } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold mb-4 font-mono">Политика конфиденциальности</h1>
          <p className="text-muted-foreground text-lg">Последнее обновление: 15 декабря 2024 года</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Общие положения
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Настоящая Политика конфиденциальности описывает, как AI Helper ("мы", "наша компания") собирает,
                использует и защищает вашу персональную информацию при использовании нашего сервиса.
              </p>
              <p>
                Используя наш сервис, вы соглашаетесь с условиями данной Политики конфиденциальности. Если вы не
                согласны с какими-либо условиями, пожалуйста, не используйте наш сервис.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Какую информацию мы собираем
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Персональная информация:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Имя и фамилия</li>
                  <li>Адрес электронной почты</li>
                  <li>Информация о компании (при указании)</li>
                  <li>Платежная информация (обрабатывается через защищенные платежные системы)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Техническая информация:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>IP-адрес и данные о местоположении</li>
                  <li>Информация о браузере и устройстве</li>
                  <li>Данные об использовании сервиса</li>
                  <li>Файлы cookie и аналогичные технологии</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Контент:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Тексты, которые вы загружаете для анализа</li>
                  <li>Сгенерированный контент</li>
                  <li>Настройки и предпочтения</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Как мы используем информацию
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Предоставление и улучшение наших AI-сервисов</li>
                <li>• Персонализация пользовательского опыта</li>
                <li>• Обработка платежей и управление подписками</li>
                <li>• Отправка важных уведомлений о сервисе</li>
                <li>• Техническая поддержка пользователей</li>
                <li>• Анализ использования для улучшения продукта</li>
                <li>• Соблюдение правовых требований</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Защита данных
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Мы применяем современные технические и организационные меры для защиты ваших данных:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Шифрование данных при передаче и хранении</li>
                <li>• Регулярные аудиты безопасности</li>
                <li>• Ограниченный доступ к персональным данным</li>
                <li>• Резервное копирование и восстановление данных</li>
                <li>• Соответствие международным стандартам безопасности</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Передача данных третьим лицам
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением следующих случаев:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Поставщики услуг, которые помогают нам предоставлять сервис (хостинг, аналитика, поддержка)</li>
                <li>• Платежные системы для обработки транзакций</li>
                <li>• Правоохранительные органы при наличии законных требований</li>
                <li>• В случае реорганизации или продажи компании (с уведомлением пользователей)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ваши права</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                В соответствии с законодательством о защите персональных данных, вы имеете право:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Получать информацию о обработке ваших данных</li>
                <li>• Запрашивать копию ваших персональных данных</li>
                <li>• Исправлять неточные или неполные данные</li>
                <li>• Удалять ваши данные (при соблюдении определенных условий)</li>
                <li>• Ограничивать обработку данных</li>
                <li>• Переносить данные к другому поставщику услуг</li>
                <li>• Отзывать согласие на обработку данных</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Файлы cookie</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Мы используем файлы cookie и аналогичные технологии для:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Обеспечения работы сервиса</li>
                <li>• Запоминания ваших предпочтений</li>
                <li>• Анализа использования сайта</li>
                <li>• Персонализации контента</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Вы можете управлять файлами cookie через настройки вашего браузера.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Изменения в политике</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Мы можем обновлять данную Политику конфиденциальности время от времени. О существенных изменениях мы
                уведомим вас по электронной почте или через уведомления в сервисе. Дата последнего обновления указана в
                начале документа.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Если у вас есть вопросы о данной Политике конфиденциальности или обработке ваших данных, свяжитесь с
                нами:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Email: privacy@aihelper.ru</li>
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
