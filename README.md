# VOID CHAT — Deploy Guide

## Структура файлов
```
void-chat/
├── server.js
├── package.json
└── public/
    └── index.html
```

## Деплой на Railway (бесплатно, 5 минут)

1. Зайди на https://railway.app и войди через GitHub
2. New Project → Deploy from GitHub repo
3. Загрузи файлы в репозиторий GitHub (или используй Railway CLI)
4. Railway сам найдёт `package.json` и запустит `npm start`
5. Получишь URL вида `https://void-chat-xxx.railway.app`

## Деплой на Render (бесплатно)

1. Зайди на https://render.com
2. New → Web Service → Connect GitHub repo
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Готово

## Локальный запуск (для теста)

```bash
npm install
node server.js
# Открой http://localhost:3000
```

## Как пользоваться

- Все участники заходят на сайт
- Вводят одинаковый пароль комнаты → попадают в одну комнату
- Разные пароли = разные изолированные комнаты
- Никакие сообщения не хранятся
- При перезагрузке страницы история исчезает
