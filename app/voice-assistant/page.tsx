"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Mic, MicOff, Play, Pause, Download, Volume2, MessageSquare } from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"
import { useAuthContext } from "@/components/providers/auth-context"

export default function VoiceAssistantPage() {
  const { user } = useAuthContext()
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [transcribedText, setTranscribedText] = useState("")
  const [voiceText, setVoiceText] = useState("")
  const [selectedVoice, setSelectedVoice] = useState("female-ru")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStartRecording = () => {
    if (!user) {
      setError("Для распознавания речи необходимо войти в аккаунт")
      return
    }
    setError(null)
    setIsRecording(true)
    setIsProcessing(true)

    apiClient
      .transcribeAudio({ audio: typeof window !== "undefined" ? window.btoa("demo audio") : "" })
      .then((response) => {
        setTranscribedText(response.transcript)
      })
      .catch((error) => {
        setError((error as Error).message)
        setTranscribedText("")
      })
      .finally(() => {
        setIsRecording(false)
        setIsProcessing(false)
      })
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setIsProcessing(false)
  }

  const handleTextToSpeech = () => {
    if (!voiceText.trim()) return
    
    setIsPlaying(true)
    // TODO: Implement actual text-to-speech API
    setTimeout(() => {
      setIsPlaying(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {!user ? (
        <div className="bg-muted/40 border-b border-border text-center text-xs uppercase tracking-wide py-2">
          Авторизуйтесь, чтобы использовать голосовой помощник
        </div>
      ) : null}
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground font-mono">AI Helper</span>
            </Link>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Голосовой помощник
            </Badge>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Панель управления</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 font-mono">Голосовой AI-помощник</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Преобразование речи в текст и обратно с помощью передовых технологий распознавания голоса
            </p>
          </div>

          <Tabs defaultValue="speech-to-text" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="speech-to-text" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                Речь в текст
              </TabsTrigger>
              <TabsTrigger value="text-to-speech" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Текст в речь
              </TabsTrigger>
            </TabsList>

            <TabsContent value="speech-to-text" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Распознавание речи
                  </CardTitle>
                  <CardDescription>Подключите API для распознавания речи</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <Button
                      size="lg"
                      variant={isRecording ? "destructive" : "default"}
                      onClick={isRecording ? handleStopRecording : handleStartRecording}
                      disabled={isProcessing}
                      className="w-32 h-32 rounded-full text-lg"
                    >
                      {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                    </Button>
                    <p className="mt-4 text-muted-foreground">
                      {isRecording ? "Запись..." : isProcessing ? "Обработка..." : "Подключите API для записи"}
                    </p>
                  </div>
                  {error ? <p className="text-sm text-destructive text-center">{error}</p> : null}

                  {transcribedText ? (
                    <div className="space-y-2">
                      <Label>Распознанный текст</Label>
                      <Textarea
                        value={transcribedText}
                        onChange={(e) => setTranscribedText(e.target.value)}
                        rows={6}
                        className="resize-none"
                      />
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Скачать
                        </Button>
                        <Button variant="outline" size="sm">
                          Копировать
                        </Button>
                        <Button variant="outline" size="sm">
                          Отправить в генератор контента
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Распознанный текст появится здесь после подключения API</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="text-to-speech" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5" />
                    Синтез речи
                  </CardTitle>
                  <CardDescription>Подключите API для преобразования текста в речь</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="voice-text">Текст для озвучивания</Label>
                    <Textarea
                      id="voice-text"
                      placeholder="Введите текст, который хотите озвучить..."
                      value={voiceText}
                      onChange={(e) => setVoiceText(e.target.value)}
                      rows={6}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Голос</Label>
                      <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female-ru">Женский (Русский)</SelectItem>
                          <SelectItem value="male-ru">Мужской (Русский)</SelectItem>
                          <SelectItem value="female-en">Female (English)</SelectItem>
                          <SelectItem value="male-en">Male (English)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Скорость</Label>
                      <Select defaultValue="normal">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Медленно</SelectItem>
                          <SelectItem value="normal">Нормально</SelectItem>
                          <SelectItem value="fast">Быстро</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleTextToSpeech} disabled={!voiceText.trim() || isPlaying} className="flex-1">
                      {isPlaying ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Обработка...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Озвучить (требуется API)
                        </>
                      )}
                    </Button>
                    <Button variant="outline" disabled>
                      <Download className="h-4 w-4 mr-2" />
                      Скачать аудио
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
              <CardDescription>Популярные команды для голосового помощника</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVoiceText("Создай пост для социальных сетей о нашем новом продукте")}
                >
                  Создать пост
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVoiceText("Напиши email для клиентов о специальном предложении")}
                >
                  Email клиентам
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVoiceText("Проанализируй этот текст на грамматические ошибки")}
                >
                  Анализ текста
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVoiceText("Предложи идеи для маркетинговой кампании")}
                >
                  Маркетинг идеи
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
