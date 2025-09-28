"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Brain, User, Bell, Shield, CreditCard, Trash2, Upload } from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"
import { useAuthContext } from "@/components/providers/auth-context"

export default function SettingsPage() {
  const { user, setUser } = useAuthContext()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      const [first = "", ...rest] = user.name.split(" ")
      setFirstName(first)
      setLastName(rest.join(" "))
      setEmail(user.email)
    }
  }, [user])

  const subscriptionLabel = useMemo(() => {
    if (!user) return "Free"
    return user.subscriptionPlan ? user.subscriptionPlan : "Free"
  }, [user])

  const handleSaveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) {
      setError("Войдите в аккаунт для обновления профиля")
      return
    }
    setIsSaving(true)
    setMessage(null)
    setError(null)
    try {
      const { user: updatedUser } = await apiClient.updateProfile({
        name: `${firstName} ${lastName}`.trim(),
        email,
        bio,
      })
      setUser(updatedUser)
      setMessage("Профиль обновлён")
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsSaving(false)
    }
  }

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
            <Link href="/dashboard">← Назад к панели</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 font-mono">Настройки профиля</h1>
          <p className="text-muted-foreground">Управляйте своим аккаунтом и предпочтениями</p>
        </div>

        <div className="space-y-6">
          {message ? (
            <div className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">{message}</div>
          ) : null}
          {error ? (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Профиль
              </CardTitle>
              <CardDescription>Основная информация о вашем аккаунте</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-6" onSubmit={handleSaveProfile}>
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/user-profile-illustration.png" />
                  <AvatarFallback className="text-lg">ИП</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Загрузить фото
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG до 2MB</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    placeholder="Ваше имя"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    placeholder="Ваша фамилия"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">О себе</Label>
                <Textarea
                  id="bio"
                  placeholder="Расскажите о себе и своем бизнесе..."
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                />
              </div>

              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Сохраняем..." : "Сохранить изменения"}
              </Button>
              </form>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Подписка
              </CardTitle>
              <CardDescription>Управление тарифным планом</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">Тариф: {subscriptionLabel}</h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Активен
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Управляйте подпиской и лимитами использования
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">₽0</div>
                  <div className="text-sm text-muted-foreground">временно</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline">Изменить план</Button>
                <Button variant="outline">История платежей</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Уведомления
              </CardTitle>
              <CardDescription>Настройте, какие уведомления вы хотите получать</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email уведомления</h4>
                  <p className="text-sm text-muted-foreground">Получать уведомления на email</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Уведомления о новых функциях</h4>
                  <p className="text-sm text-muted-foreground">Узнавайте первыми о новых возможностях</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Маркетинговые рассылки</h4>
                  <p className="text-sm text-muted-foreground">Советы и лучшие практики</p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Уведомления о лимитах</h4>
                  <p className="text-sm text-muted-foreground">Предупреждения о превышении лимитов</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Безопасность
              </CardTitle>
              <CardDescription>Настройки безопасности аккаунта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Текущий пароль</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Новый пароль</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <Button>Изменить пароль</Button>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Двухфакторная аутентификация</h4>
                  <p className="text-sm text-muted-foreground">Дополнительная защита аккаунта</p>
                </div>
                <Button variant="outline" size="sm">
                  Настроить
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                Опасная зона
              </CardTitle>
              <CardDescription>Необратимые действия с аккаунтом</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                <div>
                  <h4 className="font-medium text-destructive">Удалить аккаунт</h4>
                  <p className="text-sm text-muted-foreground">Полное удаление аккаунта и всех данных</p>
                </div>
                <Button variant="destructive" size="sm">
                  Удалить
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Changes */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">Отменить</Button>
            <Button>Сохранить изменения</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
