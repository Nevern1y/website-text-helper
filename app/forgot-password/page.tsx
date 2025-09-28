import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
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
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="your@email.com" className="pl-10" required />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Отправить ссылку
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
