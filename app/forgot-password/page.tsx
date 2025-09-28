"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setMessage(null)
    try {
      const response = await apiClient.forgotPassword({ email })
      setMessage(
        response.resetToken
          ? `Ссылка для сброса (демо токен): ${response.resetToken}`
          : "Если email зарегистрирован, мы отправили инструкции по восстановлению",
      )
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            <Brain className="h-8 w-8 text-primary" />
            AI Helper
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Восстановление пароля</CardTitle>
            <CardDescription>Введите ваш email для получения ссылки на восстановление пароля</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              {message ? <p className="text-sm text-primary">{message}</p> : null}

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Отправляем..." : "Отправить ссылку"}
              </Button>
            </form>

            <div className="text-center">
              <Link href="/login" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Вернуться к входу
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
