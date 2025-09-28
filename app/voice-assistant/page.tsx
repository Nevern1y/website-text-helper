"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Mic, MicOff, Play, Pause, Download, Volume2, MessageSquare, Loader2 } from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"
import { useAuthContext } from "@/components/providers/auth-context"

type VoiceOption = "female-ru" | "male-ru" | "female-en" | "male-en"
type SpeechSpeed = "slow" | "normal" | "fast"

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result
      if (typeof result === "string") {
        const [, base64] = result.split(",")
        resolve(base64 ?? "")
      } else {
        reject(new Error("Не удалось прочитать аудиофайл"))
      }
    }
    reader.onerror = () => reject(new Error("Не удалось прочитать аудиофайл"))
    reader.readAsDataURL(blob)
  })
}

export default function VoiceAssistantPage() {
  const { user } = useAuthContext()
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSynthesizing, setIsSynthesizing] = useState(false)
  const [transcribedText, setTranscribedText] = useState("")
  const [voiceText, setVoiceText] = useState("")
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>("female-ru")
  const [speechSpeed, setSpeechSpeed] = useState<SpeechSpeed>("normal")
  const [error, setError] = useState<string | null>(null)
  const [infoMessage, setInfoMessage] = useState<string | null>(null)
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null)
  const [synthesizedAudioUrl, setSynthesizedAudioUrl] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recordedAudioUrlRef = useRef<string | null>(null)
  const playbackRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop()
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop())
        mediaStreamRef.current = null
      }
      if (playbackRef.current) {
        playbackRef.current.pause()
        playbackRef.current = null
      }
      if (recordedAudioUrlRef.current) {
        URL.revokeObjectURL(recordedAudioUrlRef.current)
        recordedAudioUrlRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (recordedAudioUrlRef.current && recordedAudioUrlRef.current !== recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrlRef.current)
    }
    recordedAudioUrlRef.current = recordedAudioUrl
  }, [recordedAudioUrl])

  const startRecording = async () => {
    if (!user) {
      setError("Для распознавания речи необходимо войти в аккаунт")
      return
    }

    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError("Браузер не поддерживает запись звука")
      return
    }

    if (typeof MediaRecorder === "undefined") {
      setError("Браузер не поддерживает MediaRecorder")
      return
    }

    try {
      setError(null)
      setInfoMessage(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream
      audioChunksRef.current = []

      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }
      recorder.onerror = () => {
        setError("Ошибка при записи аудио")
        setIsRecording(false)
        setIsProcessing(false)
      }
      recorder.onstop = async () => {
        const tracks = mediaStreamRef.current?.getTracks() ?? []
        tracks.forEach((track) => track.stop())
        mediaStreamRef.current = null

        try {
          const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || "audio/webm" })
          audioChunksRef.current = []
          const url = URL.createObjectURL(blob)
          setRecordedAudioUrl(url)
          setIsProcessing(true)
          const base64 = await blobToBase64(blob)
          const response = await apiClient.transcribeAudio({ audio: base64 })
          setTranscribedText(response.transcript)
          setInfoMessage("Распознавание завершено")
          setError(null)
        } catch (err) {
          setError((err as Error).message)
        } finally {
          setIsProcessing(false)
          setIsRecording(false)
          mediaRecorderRef.current = null
        }
      }

      recorder.start()
      setIsRecording(true)
      setTranscribedText("")
      setInfoMessage("Идёт запись — нажмите, чтобы остановить")
    } catch (err) {
      setError("Не удалось получить доступ к микрофону")
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      setInfoMessage(null)
      setIsProcessing(true)
      mediaRecorderRef.current.stop()
    }
  }

  const handleDownloadTranscript = () => {
    if (!transcribedText) return
    const blob = new Blob([transcribedText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "ai-helper-transcript.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleCopyTranscript = async () => {
    if (!transcribedText) return
    try {
      await navigator.clipboard.writeText(transcribedText)
      setInfoMessage("Текст скопирован в буфер обмена")
      setError(null)
    } catch (err) {
      setError("Не удалось скопировать текст")
    }
  }

  const handleTextToSpeech = async () => {
    if (isPlaying) {
      playbackRef.current?.pause()
      playbackRef.current = null
      setIsPlaying(false)
      return
    }

    if (!voiceText.trim()) return

    try {
      setError(null)
      setInfoMessage(null)
      setIsSynthesizing(true)
      const response = await apiClient.synthesizeAudio({
        text: voiceText,
        voice: selectedVoice,
        speed: speechSpeed,
      })
      const dataUrl = `data:audio/wav;base64,${response.audio}`
      setSynthesizedAudioUrl(dataUrl)

      if (playbackRef.current) {
        playbackRef.current.pause()
        playbackRef.current = null
      }

      const audio = new Audio(dataUrl)
      playbackRef.current = audio
      audio.onended = () => {
        setIsPlaying(false)
        playbackRef.current = null
      }
      audio.onpause = () => {
        if (audio.currentTime < audio.duration) {
          setIsPlaying(false)
        }
      }

      await audio.play()
      setIsPlaying(true)
      setInfoMessage("Синтез завершён — идёт воспроизведение")
    } catch (err) {
      setError((err as Error).message)
      setIsPlaying(false)
    } finally {
      setIsSynthesizing(false)
    }
  }

  const handleDownloadSynthesized = () => {
    if (!synthesizedAudioUrl) return
    const link = document.createElement("a")
    link.href = synthesizedAudioUrl
    link.download = "ai-helper-voice.wav"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const recordingStatus = !user
    ? "Авторизуйтесь, чтобы использовать голосовой помощник"
    : isRecording
      ? "Запись..."
      : isProcessing
        ? "Обработка записи..."
        : "Нажмите, чтобы начать запись"

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
              Записывайте голосовые заметки, расшифровывайте их в текст и озвучивайте ответы без сторонних интеграций
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
                  <CardDescription>Записывайте голосовые сообщения и получайте расшифровку сразу после обработки</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <Button
                      size="lg"
                      variant={isRecording ? "destructive" : "default"}
                      onClick={isRecording ? handleStopRecording : () => void startRecording()}
                      disabled={isProcessing && !isRecording}
                      className="w-32 h-32 rounded-full text-lg"
                    >
                      {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                    </Button>
                    <p className="mt-4 text-muted-foreground">{recordingStatus}</p>
                  </div>
                  {error ? <p className="text-sm text-destructive text-center">{error}</p> : null}
                  {infoMessage ? <p className="text-sm text-muted-foreground text-center">{infoMessage}</p> : null}

                  {recordedAudioUrl ? (
                    <div className="space-y-2">
                      <Label>Последняя запись</Label>
                      <audio controls src={recordedAudioUrl} className="w-full" />
                    </div>
                  ) : null}

                  {transcribedText ? (
                    <div className="space-y-2">
                      <Label>Распознанный текст</Label>
                      <Textarea
                        value={transcribedText}
                        onChange={(e) => setTranscribedText(e.target.value)}
                        rows={6}
                        className="resize-none"
                      />
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={handleDownloadTranscript}>
                          <Download className="h-4 w-4 mr-2" />
                          Скачать текст
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => void handleCopyTranscript()}>
                          Копировать
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/content-generation">Отправить в генератор контента</Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Запишите голосовое сообщение — готовый текст появится здесь автоматически</p>
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
                  <CardDescription>Введите текст, выберите голос и скорость — система вернёт готовый аудиофайл</CardDescription>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Голос</Label>
                      <Select value={selectedVoice} onValueChange={(value) => setSelectedVoice(value as VoiceOption)}>
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
                      <Select value={speechSpeed} onValueChange={(value) => setSpeechSpeed(value as SpeechSpeed)}>
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

                  <div className="flex flex-col md:flex-row gap-3">
                    <Button
                      onClick={() => void handleTextToSpeech()}
                      disabled={(isSynthesizing && !isPlaying) || (!voiceText.trim() && !isPlaying)}
                      className="flex-1"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Остановить воспроизведение
                        </>
                      ) : isSynthesizing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Синтезируем...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Озвучить текст
                        </>
                      )}
                    </Button>
                    <Button variant="outline" disabled={!synthesizedAudioUrl} onClick={handleDownloadSynthesized}>
                      <Download className="h-4 w-4 mr-2" />
                      Скачать аудио
                    </Button>
                  </div>

                  {synthesizedAudioUrl ? (
                    <div className="space-y-2">
                      <Label>Прослушать результат</Label>
                      <audio controls src={synthesizedAudioUrl} className="w-full" />
                    </div>
                  ) : null}
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
