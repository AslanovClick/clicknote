# Clicknote

Каталог работ Clickable Agency — https://clicknote.clickable.agency/

Фронтенд на Vue 3 (vuex, vue-router, вход через Google), сборка — Vite.
Бэкенд (API) живёт отдельно: `https://apinote.clickable.agency/api` (см. `src/store/api_url.js`).

## Запуск

```bash
npm install
npm run dev       # локально на http://localhost:5173
npm run build     # продакшн-сборка в dist/
npm run preview   # посмотреть собранный dist/
```

## Деплой

Vercel собирает проект по `vercel.json` (`npm run build` → `dist/`):

- `main` → прод (clicknote.clickable.agency)
- любая другая ветка → preview-деплой на `*.vercel.app`

## Структура

- `src/` — исходники (компоненты, store, router)
- `src/assets/scss/` — глобальные стили: `_fonts.scss`, `_base.scss` (reset, CSS-переменные тем, функция `em()`), `main.scss`
- `public/` — статика, отдаётся как есть: `img/`, `fonts/`, `video/`, favicon

`_base.scss` подключается автоматически в каждый `<style lang="scss">` компонента (см. `vite.config.js`),
поэтому функция `em(px, base = 16)` доступна везде.

## История

До ноября 2026 в репозитории лежала только собранная версия (Vue CLI). Исходники компонентов
восстановлены из source maps той сборки без изменений; глобальные стили восстановлены из
скомпилированного CSS (исходный SCSS утерян, поэтому `_base.scss` и `_fonts.scss` — это CSS, а не исходный SCSS).
