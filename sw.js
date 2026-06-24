/* ===== PWR НОРМАТИВЫ — Service Worker v3 ===== */
const CACHE_NAME = 'pwr-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.png'
];

/* Установка: кэшируем только нужные файлы */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  /* Сразу активируемся, не ждём закрытия старых вкладок */
  self.skipWaiting();
});

/* Активация: удаляем ВСЕ старые кэши */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
  /* Берём контроль над всеми вкладками немедленно */
  self.clients.claim();
});

/* Fetch: Network First — сначала сеть, потом кэш */
self.addEventListener('fetch', e => {
  /* Пропускаем не-GET и cross-origin запросы */
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith(self.location.origin)) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        /* Обновляем кэш свежим ответом */
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

/* Сообщение от страницы: принудительное обновление */
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});
