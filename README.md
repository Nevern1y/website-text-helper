# Полная документация AI Helper платформы

## ️ Текущая архитектура

### Технологический стек

- **Frontend**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui компоненты
- **Типизация**: TypeScript
- **Шрифты**: Geist Sans, Manrope
- **Аналитика**: Vercel Analytics
- **Серверные маршруты**: Next.js Route Handlers (`app/api/*`) с in-memory БД

### Быстрый старт

1. Установите зависимости: `pnpm install`
2. Запустите dev-сервер: `pnpm dev`
3. По умолчанию доступны демо-учётные данные `demo@aihelper.dev` / `demo1234`
4. Все API работают локально и не требуют внешних ключей


## Журнал изменений

### Обновление инфраструктуры

- Обновлена платформа до Next.js 15.5.4. После установки зависимостей выполните `pnpm approve-builds` для разрешения скриптов `sharp`, либо укажите альтернативный адаптер изображений в `next.config.mjs`, если деплой выполняется в окружении с ограниченными правами.
- Проверено, что существующий код продолжает работать на React 18; дополнительных миграций не требуется.

### Голосовой помощник и API-клиент

- Восстановлена полноценная логика записи, распознавания и синтеза речи: компонент заново управляет `MediaRecorder`, очищает потоки и корректно обрабатывает воспроизведение аудио-ответов.
- Добавлены расширенные сообщения об ошибках и информационные уведомления для сценариев отсутствия авторизации, недоступности микрофона и завершения синтеза.
- Приведён к единому виду клиент API: убраны конфликтные блоки, возвращена работа с проектами и файлами, добавлены методы `getProject`, `updateProject`, `deleteProject`, `getFile` и `deleteFile` в одном объекте.
- README очищен от конфликтных артефактов и дополнен инструкциями по проверке голосового помощника.


## Проверка функциональности (end-to-end сценарии)

Ниже приведены ключевые пользовательские сценарии, которые можно проверить сразу после запуска dev-сервера.

### Аутентификация и сессии

1. Перейдите на `/register`, создайте нового пользователя и убедитесь, что после сабмита появляется активная сессия (кнопка «Выйти» на страницах и доступ к защищённым маршрутам).
2. Разлогиньтесь через кнопку «Выйти» и подтвердите, что защищённые страницы (`/dashboard`, `/content-generation` и т.д.) теперь отображают CTA для входа.
3. Используйте форму восстановления пароля на `/forgot-password`, чтобы получить временный токен (он отображается в UI) и завершите процесс на `/reset-password`.

### Управление проектами

1. Откройте `/projects/new`, заполните форму и отправьте — проект появится на дэшборде и в списке последних проектов.
2. Используя полученный идентификатор, можно протестировать обновление/удаление через API (`PUT/DELETE /api/projects/:id`) — состояние мгновенно меняется в UI после обновления страницы.

### AI-инструменты

1. `/content-generation` — отправьте тему, стиль и длину. Ответ появится в панели результатов и будет сохранён в истории AI-запросов.
2. `/text-analysis` — вставьте текст и выполните анализ. Метрики читаемости, уникальности и рекомендации выводятся рядом с исходным текстом.
3. `/chatbot` — ведите диалог и посмотрите, как история сообщений сохраняется между обновлениями страницы.
4. `/marketing` — сформируйте идеи для выбранных каналов. История идей хранится per-user и отображается в таблице.
5. `/image-generation` визуализирует mock-изображения и демонстрирует очередь запросов.
6. `/voice-assistant` — протестируйте оба режима:
   - Начните запись, остановите её и дождитесь появления текста; убедитесь, что проигрыватель с последней записью активен.
   - Введите текст, выберите голос и скорость, запустите синтез, затем скачайте и прослушайте результат.


### Управление моделями и файлами

1. `/ai-models` позволяет добавлять/удалять подключения к поставщикам. Валидация формы предотвращает отправку неполных данных.
2. `/settings` содержит форму профиля и загрузчик файлов — после отправки файл появляется в разделе «Последние загрузки».

### Дэшборд и аналитика

1. `/dashboard` агрегирует статистику из in-memory базы: количество проектов, историю AI-запросов и usage-квоты.
2. Кнопка обновления в шапке инициирует повторный запрос к `/api/dashboard`, демонстрируя реактивность UI.

### Структура проекта

```plaintext
app/
├── layout.tsx                 # Корневой layout с метаданными
├── page.tsx                   # Главная страница
├── globals.css                # Глобальные стили и дизайн-система
├── about/page.tsx             # О компании
├── ai-models/page.tsx         # Управление AI моделями
├── chatbot/page.tsx           # Чат-бот интерфейс
├── contact/page.tsx           # Контактная форма
├── content-generation/page.tsx # Генерация контента
├── dashboard/page.tsx         # Пользовательская панель
├── faq/page.tsx              # Часто задаваемые вопросы
├── forgot-password/page.tsx   # Восстановление пароля
├── image-generation/page.tsx  # Генерация изображений
├── login/page.tsx            # Авторизация
├── marketing/page.tsx        # Маркетинговые инструменты
├── privacy/page.tsx          # Политика конфиденциальности
├── projects/new/page.tsx     # Создание проектов
├── register/page.tsx         # Регистрация
├── settings/page.tsx         # Настройки пользователя
├── support/page.tsx          # Техподдержка
├── terms/page.tsx           # Условия использования
├── text-analysis/page.tsx    # Анализ текста
└── voice-assistant/page.tsx  # Голосовой помощник

components/
├── ui/                       # shadcn/ui компоненты (50+ компонентов)
└── theme-provider.tsx        # Провайдер темы
```

## Дизайн-система

### Цветовая палитра

- **Основной фон**: Чистый черный (`#000000`)
- **Текст**: Белый (`#ffffff`)
- **Карточки**: Темно-серый (`#111111`)
- **Границы**: Серый (`#333333`)
- **Акценты**: Белые кнопки с черным текстом

### Типографика

- **Основной шрифт**: Geist Sans
- **Дополнительный**: Manrope
- **Размеры**: От 6xl до 8xl для заголовков
- **Градиентный текст**: Белый → серый

### UI компоненты

- 50+ готовых shadcn/ui компонентов
- Современный темный дизайн
- Закругленные углы (0.75rem)
- Анимации при наведении
- Мобильная адаптивность

## Реализованные функции

### 1. Главная страница

- **Статус**: ✅ Полностью реализована
- **Функции**: Hero-секция, список функций, CTA, footer
- **Особенности**: Адаптивная навигация, мобильное меню

### 2. Аутентификация

- **Страницы**: Вход, регистрация, восстановление пароля
- **Статус**: ✅ Интегрирована с серверными маршрутами `/api/auth/*`
- **Формы**: Клиентская валидация, обработка ошибок, создание сессии через HttpOnly cookie

### 3. AI инструменты (Frontend UI)

#### Генерация контента

- Генерация текста через `/api/ai/content/generate`
- Поддержка выбора формата, тона и длины
- Копирование и выгрузка готового текста

#### Анализ текста

- Отправка текстов на `/api/ai/text/analyze`
- Отображение метрик читабельности, количества слов, предложений и уникальных слов
- Персональные рекомендации по улучшению

#### Чат-бот

- Общение с серверным `/api/ai/chat/message`
- История диалогов сохраняется в памяти на пользователя
- Отображение статуса набора сообщения

#### Генерация изображений

- Форма для промптов
- Настройки стиля и размера
- Галерея результатов

#### Голосовой помощник

- Запись с браузерного микрофона и распознавание через `/api/ai/voice/transcribe`
- Проверка наличия авторизации перед отправкой аудио и предпрослушивание записи
- Синтез речи через `/api/ai/voice/synthesize` с выбором голоса и скорости
- Воспроизведение и скачивание готового аудио ответа


#### Маркетинговые инструменты

- Генерация идей по бизнесу, аудитории и целям через `/api/ai/marketing/ideas`
- Сохранение истории предложений
- Аналитический дэшборд с фильтрами по каналам

### 4. Управление AI моделями

- **Статус**: ✅ Поддерживаются локальные и внешние подключения
- **Функции**:
  - Регистрация моделей через `/api/ai/models`
  - Управление активностью подключений и удаление моделей
  - Демонстрация доступных локальных LLM (Llama)
  - Отображение статуса провайдеров (OpenAI, Anthropic, Google, Groq, Ollama)

### 5. Пользовательская панель

- **Статус**: ✅ Получает данные из `/api/dashboard`
- **Функции**: Статистика использования, список проектов, история AI-запросов, быстрые действия
- **Требования**: Авторизация (HttpOnly сессия)

### 6. Информационные страницы

- **Статус**: ✅ Готовы
- **Страницы**: О нас, FAQ, поддержка, контакты, правовые

## Серверная реализация

Текущая версия использует in-memory хранилище (см. `lib/server/database.ts`) и набор Route Handlers в `app/api`. Ниже приведены ключевые эндпоинты и структуры данных.

### 1. Система аутентификации

```typescript
// Требуемые API endpoints
POST /api/auth/register
POST /api/auth/login  
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/me
```

**База данных - Таблица Users:**

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  subscription_plan VARCHAR(50) DEFAULT 'free',
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. AI модели и интеграции

```typescript
// API endpoints для AI
POST /api/ai/content/generate
POST /api/ai/text/analyze
POST /api/ai/image/generate
POST /api/ai/chat/message
POST /api/ai/voice/transcribe

POST /api/ai/voice/synthesize

POST /api/ai/marketing/ideas
```

**База данных - Таблица AI Models:**

```sql
CREATE TABLE ai_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  provider VARCHAR(100) NOT NULL, -- 'openai', 'anthropic', 'local_llama'
  model_name VARCHAR(255) NOT NULL,
  api_key TEXT, -- зашифрованный
  endpoint_url TEXT, -- для локальных моделей
  parameters JSONB, -- температура, max_tokens и т.д.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Система проектов

```typescript
// API endpoints
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
```

**База данных - Таблица Projects:**

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(100) NOT NULL, -- 'content', 'chatbot', 'analysis'
  settings JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. История и результаты AI

**База данных - Таблица AI Requests:**

```sql
CREATE TABLE ai_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  project_id UUID REFERENCES projects(id),
  type VARCHAR(100) NOT NULL, -- 'content_generation', 'text_analysis'
  input_data JSONB NOT NULL,
  output_data JSONB,
  model_used VARCHAR(255),
  tokens_used INTEGER,
  cost DECIMAL(10,4),
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Файловое хранилище

```typescript
// API endpoints
POST /api/files/upload
GET  /api/files/:id
DELETE /api/files/:id
```

**База данных - Таблица Files:**

```sql
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size_bytes INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 6. Система подписок и биллинга

**База данных - Таблица Subscriptions:**

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  plan_name VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL, -- 'active', 'cancelled', 'expired'
  current_period_start TIMESTAMP NOT NULL,
  current_period_end TIMESTAMP NOT NULL,
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE usage_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  period_start TIMESTAMP NOT NULL,
  period_end TIMESTAMP NOT NULL,
  requests_used INTEGER DEFAULT 0,
  requests_limit INTEGER NOT NULL,
  tokens_used BIGINT DEFAULT 0,
  tokens_limit BIGINT NOT NULL
);
```

## Внешние интеграции

### 1. AI провайдеры

- **OpenAI API**: GPT-4, DALL-E, Whisper
- **Anthropic**: Claude модели
- **Google AI**: Gemini
- **Groq**: Быстрые LLM
- **Локальные модели**: Ollama для Llama

### 2. Файловое хранилище

- **AWS S3** или **Vercel Blob** для файлов
- **CloudFront** для CDN

### 3. Платежи

- **Stripe** для обработки платежей
- **Webhooks** для обновления подписок

### 4. Мониторинг и аналитика

- **Vercel Analytics** (уже подключен)
- **Sentry** для отслеживания ошибок
- **PostHog** для пользовательской аналитики

## Рекомендуемая архитектура бэкенда

### Технологии

- **Runtime**: Node.js/Bun
- **Framework**: Next.js API Routes или Fastify
- **База данных**: PostgreSQL (Supabase/Neon)
- **ORM**: Prisma или Drizzle
- **Кэширование**: Redis (Upstash)
- **Очереди**: Bull/BullMQ для AI задач

### Структура API

```plaintext
api/
├── auth/           # Аутентификация
├── users/          # Управление пользователями  
├── projects/       # CRUD проектов
├── ai/            # AI интеграции
│   ├── content/   # Генерация контента
│   ├── text/      # Анализ текста
│   ├── image/     # Генерация изображений
│   ├── chat/      # Чат-бот
│   └── voice/     # Голосовые функции
├── files/         # Файловое хранилище
├── billing/       # Подписки и платежи
└── admin/         # Административные функции
```

### Безопасность

- JWT токены для аутентификации
- Rate limiting для API
- Шифрование API ключей
- CORS настройки
- Input validation и sanitization

Платформа готова к интеграции с бэкендом - все UI компоненты реализованы, дизайн-система настроена, остается только подключить реальные API и базу данных для полноценного функционирования.
