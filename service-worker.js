// ============================================
// service-worker.js
// CINEMA LENDÁRIO - Service Worker PWA
// Cache offline, atualizações, notificações
// ============================================

const CACHE_NAME = 'cinema-lendario-v2';
const DYNAMIC_CACHE = 'cinema-lendario-dynamic-v2';
const IMAGE_CACHE = 'cinema-lendario-images-v2';
const VIDEO_CACHE = 'cinema-lendario-videos-v2';

// ============================================
// ARQUIVOS PARA CACHE INICIAL
// ============================================
const STATIC_ASSETS = [
    '/cinema-lendario/',
    '/cinema-lendario/index.html',
    '/cinema-lendario/admin.html',
    '/cinema-lendario/manifest.json',
    '/cinema-lendario/css/style.css',
    '/cinema-lendario/js/config.js',
    '/cinema-lendario/js/database.js',
    '/cinema-lendario/js/auth.js',
    '/cinema-lendario/js/movies.js',
    '/cinema-lendario/js/series.js',
    '/cinema-lendario/js/trailers.js',
    '/cinema-lendario/js/player.js',
    '/cinema-lendario/js/downloads.js',
    '/cinema-lendario/js/lists.js',
    '/cinema-lendario/js/explore.js',
    '/cinema-lendario/js/admin.js',
    '/cinema-lendario/js/notifications.js',
    '/cinema-lendario/js/app.js',
    '/cinema-lendario/data/movies-db.js',
    '/cinema-lendario/data/series-db.js',
    '/cinema-lendario/data/trailers-movies.js',
    '/cinema-lendario/data/trailers-series.js'
];

// ============================================
// INSTALAÇÃO
// ============================================
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Cacheando arquivos estáticos...');
                
                // Tentar cachear cada arquivo individualmente
                return Promise.allSettled(
                    STATIC_ASSETS.map(asset => {
                        return cache.add(asset).catch(err => {
                            console.warn(`⚠️ Falha ao cachear: ${asset}`, err.message);
                        });
                    })
                );
            })
            .then(() => {
                console.log('✅ Instalação concluída!');
                return self.skipWaiting();
            })
    );
});

// ============================================
// ATIVAÇÃO
// ============================================
self.addEventListener('activate', (event) => {
    console.log('🔧 Service Worker: Ativando...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => {
                        // Remover caches antigos
                        return name !== CACHE_NAME && 
                               name !== DYNAMIC_CACHE && 
                               name !== IMAGE_CACHE && 
                               name !== VIDEO_CACHE;
                    })
                    .map((name) => {
                        console.log('🗑️ Removendo cache antigo:', name);
                        return caches.delete(name);
                    })
            );
        })
        .then(() => {
            console.log('✅ Ativação concluída!');
            return self.clients.claim();
        })
    );
});

// ============================================
// FETCH - ESTRATÉGIA DE CACHE
// ============================================
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Ignorar requisições não GET
    if (request.method !== 'GET') return;
    
    // Ignorar URLs do Chrome DevTools
    if (url.pathname.startsWith('/__/')) return;
    
    // ==========================================
    // ESTRATÉGIA: Cache First para imagens
    // ==========================================
    if (request.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
        event.respondWith(cacheFirst(request, IMAGE_CACHE));
        return;
    }
    
    // ==========================================
    // ESTRATÉGIA: Network First para vídeos
    // ==========================================
    if (request.destination === 'video' || url.pathname.match(/\.(mp4|webm|ogg)$/)) {
        event.respondWith(networkFirst(request, VIDEO_CACHE));
        return;
    }
    
    // ==========================================
    // ESTRATÉGIA: Stale While Revalidate para JS/CSS
    // ==========================================
    if (request.destination === 'script' || 
        request.destination === 'style' || 
        url.pathname.match(/\.(js|css)$/)) {
        event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
        return;
    }
    
    // ==========================================
    // ESTRATÉGIA: Network First para HTML/API
    // ==========================================
    if (request.destination === 'document' || url.pathname.match(/\.(html)$/)) {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
        return;
    }
    
    // ==========================================
    // ESTRATÉGIA PADRÃO: Network First
    // ==========================================
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// ============================================
// ESTRATÉGIAS DE CACHE
// ============================================

// Cache First - Retorna do cache primeiro, fallback para rede
async function cacheFirst(request, cacheName) {
    const cached = await caches.match(request);
    if (cached) {
        // Atualizar cache em background
        updateCache(request, cacheName);
        return cached;
    }
    
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        // Retornar placeholder para imagens
        if (request.destination === 'image') {
            return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" fill="#141414"><rect width="200" height="300"/><text x="100" y="150" text-anchor="middle" fill="#D4AF37" font-size="40">🎬</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
            );
        }
        throw error;
    }
}

// Network First - Tenta rede primeiro, fallback para cache
async function networkFirst(request, cacheName) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        const cached = await caches.match(request);
        if (cached) {
            return cached;
        }
        throw error;
    }
}

// Stale While Revalidate - Retorna cache, atualiza em background
async function staleWhileRevalidate(request, cacheName) {
    const cached = await caches.match(request);
    
    const fetchPromise = fetch(request)
        .then(response => {
            if (response.ok) {
                const cache = await caches.open(cacheName);
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => cached);
    
    return cached || fetchPromise;
}

// Atualizar cache em background
async function updateCache(request, cacheName) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, response);
        }
    } catch (error) {
        // Silencioso - não atrapalhar o usuário
    }
}

// ============================================
// PUSH NOTIFICATIONS
// ============================================
self.addEventListener('push', (event) => {
    console.log('📩 Push notification recebida:', event);
    
    let data = {
        title: 'Cinema Lendário',
        body: 'Novo conteúdo disponível!',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="%23D4AF37"%3E%3Ccircle cx="32" cy="32" r="30" fill="%23141414"/%3E%3Ctext x="32" y="42" text-anchor="middle" font-size="28"%3E🎬%3C/text%3E%3C/svg%3E',
        badge: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24"%3E%3Ccircle cx="12" cy="12" r="10" fill="%23D4AF37"/%3E%3C/svg%3E',
        data: {}
    };
    
    if (event.data) {
        try {
            const payload = event.data.json();
            data = { ...data, ...payload };
        } catch (e) {
            data.body = event.data.text();
        }
    }
    
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.icon,
            badge: data.badge,
            data: data.data,
            vibrate: [200, 100, 200],
            tag: 'cinema-lendario',
            renotify: true,
            requireInteraction: false,
            actions: [
                {
                    action: 'open',
                    title: '🎬 Abrir'
                },
                {
                    action: 'close',
                    title: '❌ Fechar'
                }
            ]
        })
    );
});

// ============================================
// CLIQUE NA NOTIFICAÇÃO
// ============================================
self.addEventListener('notificationclick', (event) => {
    console.log('👆 Clique na notificação:', event);
    
    event.notification.close();
    
    if (event.action === 'close') return;
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Abrir nova janela ou focar existente
                for (const client of clientList) {
                    if (client.url.includes('/cinema-lendario/') && 'focus' in client) {
                        return client.focus();
                    }
                }
                return clients.openWindow('/cinema-lendario/index.html');
            })
    );
});

// ============================================
// SYNC (BACKGROUND SYNC)
// ============================================
self.addEventListener('sync', (event) => {
    console.log('🔄 Background sync:', event.tag);
    
    if (event.tag === 'sync-downloads') {
        event.waitUntil(syncDownloads());
    }
    
    if (event.tag === 'sync-notifications') {
        event.waitUntil(syncNotifications());
    }
});

async function syncDownloads() {
    console.log('⬇️ Sincronizando downloads pendentes...');
    // Implementar sincronização de downloads
}

async function syncNotifications() {
    console.log('🔔 Sincronizando notificações...');
    // Implementar sincronização de notificações
}

// ============================================
// MENSAGENS DO CLIENTE
// ============================================
self.addEventListener('message', (event) => {
    console.log('📨 Mensagem recebida:', event.data);
    
    if (event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data?.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(names => {
                return Promise.all(names.map(name => caches.delete(name)));
            })
        );
    }
    
    if (event.data?.type === 'UPDATE_CACHE') {
        event.waitUntil(
            caches.open(CACHE_NAME).then(cache => {
                return cache.addAll(STATIC_ASSETS);
            })
        );
    }
});

// ============================================
// LOGS
// ============================================
console.log('🎬 Cinema Lendário - Service Worker carregado!');
console.log('📦 Cache:', CACHE_NAME);
console.log('🖼️ Cache imagens:', IMAGE_CACHE);
console.log('🎥 Cache vídeos:', VIDEO_CACHE);