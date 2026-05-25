// ============================================
// js/database.js
// SISTEMA DE BANCO DE DADOS LOCAL (IndexedDB)
// Cinema Lendário - Armazenamento offline
// ============================================

class CinemaDatabase {
    constructor() {
        this.db = null;
        this.DB_NAME = 'CinemaLendarioDB';
        this.DB_VERSION = 3;
        this.ready = false;
    }

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                console.log('🗄️ Criando/Atualizando banco de dados...');
                this.createStores(db);
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                this.ready = true;
                console.log('✅ IndexedDB inicializado com sucesso!');
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error('❌ Erro ao abrir IndexedDB:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    // ============================================
    // CRIAÇÃO DAS TABELAS (Object Stores)
    // ============================================
    createStores(db) {
        // Tabela de filmes
        if (!db.objectStoreNames.contains('movies')) {
            const movieStore = db.createObjectStore('movies', { keyPath: 'id' });
            movieStore.createIndex('title', 'title', { unique: false });
            movieStore.createIndex('genre', 'genre', { unique: false });
            movieStore.createIndex('year', 'year', { unique: false });
            movieStore.createIndex('rating', 'rating', { unique: false });
        }

        // Tabela de séries
        if (!db.objectStoreNames.contains('series')) {
            const seriesStore = db.createObjectStore('series', { keyPath: 'id' });
            seriesStore.createIndex('title', 'title', { unique: false });
            seriesStore.createIndex('genre', 'genre', { unique: false });
        }

        // Tabela de episódios
        if (!db.objectStoreNames.contains('episodes')) {
            const episodeStore = db.createObjectStore('episodes', { 
                keyPath: 'id', 
                autoIncrement: true 
            });
            episodeStore.createIndex('seriesId', 'seriesId', { unique: false });
            episodeStore.createIndex('seasonNumber', 'seasonNumber', { unique: false });
        }

        // Tabela de trailers
        if (!db.objectStoreNames.contains('trailers')) {
            const trailerStore = db.createObjectStore('trailers', { keyPath: 'id' });
            trailerStore.createIndex('movieId', 'movieId', { unique: true });
            trailerStore.createIndex('seriesId', 'seriesId', { unique: true });
        }

        // Tabela de usuários
        if (!db.objectStoreNames.contains('users')) {
            const userStore = db.createObjectStore('users', { keyPath: 'contact' });
            userStore.createIndex('name', 'name', { unique: false });
        }

        // Tabela de listas do usuário
        if (!db.objectStoreNames.contains('userLists')) {
            const listStore = db.createObjectStore('userLists', { 
                keyPath: 'id', 
                autoIncrement: true 
            });
            listStore.createIndex('listType', 'listType', { unique: false });
            listStore.createIndex('title', 'title', { unique: false });
            listStore.createIndex('userContact', 'userContact', { unique: false });
        }

        // Tabela de downloads
        if (!db.objectStoreNames.contains('downloads')) {
            const downloadStore = db.createObjectStore('downloads', { 
                keyPath: 'id', 
                autoIncrement: true 
            });
            downloadStore.createIndex('title', 'title', { unique: false });
            downloadStore.createIndex('status', 'status', { unique: false });
            downloadStore.createIndex('date', 'date', { unique: false });
        }

        // Tabela de notificações
        if (!db.objectStoreNames.contains('notifications')) {
            const notifStore = db.createObjectStore('notifications', { 
                keyPath: 'id', 
                autoIncrement: true 
            });
            notifStore.createIndex('userContact', 'userContact', { unique: false });
            notifStore.createIndex('read', 'read', { unique: false });
        }

        // Tabela de sugestões
        if (!db.objectStoreNames.contains('suggestions')) {
            const sugStore = db.createObjectStore('suggestions', { 
                keyPath: 'id', 
                autoIncrement: true 
            });
            sugStore.createIndex('status', 'status', { unique: false });
            sugStore.createIndex('type', 'type', { unique: false });
        }

        // Tabela de cliques não encontrados
        if (!db.objectStoreNames.contains('notFoundClicks')) {
            const clickStore = db.createObjectStore('notFoundClicks', { 
                keyPath: 'id', 
                autoIncrement: true 
            });
            clickStore.createIndex('title', 'title', { unique: false });
            clickStore.createIndex('type', 'type', { unique: false });
        }

        // Tabela de configurações
        if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'key' });
        }

        console.log('✅ Todas as tabelas criadas com sucesso!');
    }

    // ============================================
    // MÉTODOS CRUD GENÉRICOS
    // ============================================
    
    async add(storeName, data) {
        await this.ensureReady();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async put(storeName, data) {
        await this.ensureReady();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async get(storeName, key) {
        await this.ensureReady();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getAll(storeName) {
        await this.ensureReady();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getByIndex(storeName, indexName, value) {
        await this.ensureReady();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const index = store.index(indexName);
            const request = index.getAll(value);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async delete(storeName, key) {
        await this.ensureReady();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async clearStore(storeName) {
        await this.ensureReady();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async count(storeName) {
        await this.ensureReady();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.count();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // ============================================
    // MÉTODOS ESPECÍFICOS
    // ============================================

    // --- FILMES ---
    async cacheMovie(movie) {
        movie.cachedAt = Date.now();
        return this.put('movies', movie);
    }

    async cacheMovies(movies) {
        const transaction = this.db.transaction('movies', 'readwrite');
        const store = transaction.objectStore('movies');
        for (const movie of movies) {
            movie.cachedAt = Date.now();
            store.put(movie);
        }
        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    async getMovieById(id) {
        return this.get('movies', id);
    }

    async getAllMovies() {
        return this.getAll('movies');
    }

    async getMoviesByGenre(genre) {
        return this.getByIndex('movies', 'genre', genre);
    }

    // --- SÉRIES ---
    async cacheSeries(series) {
        series.cachedAt = Date.now();
        return this.put('series', series);
    }

    async getSeriesById(id) {
        return this.get('series', id);
    }

    async getAllSeries() {
        return this.getAll('series');
    }

    // --- USUÁRIOS ---
    async saveUser(user) {
        return this.put('users', user);
    }

    async getUserByContact(contact) {
        return this.get('users', contact);
    }

    // --- LISTAS ---
    async addToList(listType, title, genre, userContact) {
        return this.add('userLists', {
            listType,
            title,
            genre,
            userContact,
            date: new Date().toISOString()
        });
    }

    async getListByType(listType, userContact) {
        const all = await this.getByIndex('userLists', 'userContact', userContact);
        return all.filter(item => item.listType === listType);
    }

    async removeFromList(listType, title, userContact) {
        const all = await this.getByIndex('userLists', 'userContact', userContact);
        const item = all.find(i => i.listType === listType && i.title === title);
        if (item) {
            return this.delete('userLists', item.id);
        }
        return null;
    }

    // --- DOWNLOADS ---
    async addDownload(data) {
        return this.add('downloads', data);
    }

    async getDownloads() {
        const downloads = await this.getAll('downloads');
        return downloads.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    async deleteDownload(id) {
        return this.delete('downloads', id);
    }

    // --- NOTIFICAÇÕES ---
    async addNotification(data) {
        return this.add('notifications', data);
    }

    async getNotificationsByUser(userContact) {
        return this.getByIndex('notifications', 'userContact', userContact);
    }

    async getUnreadNotifications(userContact) {
        const all = await this.getByIndex('notifications', 'userContact', userContact);
        return all.filter(n => !n.read);
    }

    async markNotificationRead(id) {
        const notification = await this.get('notifications', id);
        if (notification) {
            notification.read = true;
            return this.put('notifications', notification);
        }
        return null;
    }

    // --- SUGESTÕES ---
    async addSuggestion(data) {
        return this.add('suggestions', data);
    }

    async getSuggestions() {
        return this.getAll('suggestions');
    }

    async getSuggestionsByStatus(status) {
        return this.getByIndex('suggestions', 'status', status);
    }

    async updateSuggestion(id, updates) {
        const suggestion = await this.get('suggestions', id);
        if (suggestion) {
            Object.assign(suggestion, updates);
            return this.put('suggestions', suggestion);
        }
        return null;
    }

    // --- CONFIGURAÇÕES ---
    async getSetting(key) {
        const setting = await this.get('settings', key);
        return setting ? setting.value : null;
    }

    async setSetting(key, value) {
        return this.put('settings', { key, value });
    }

    // ============================================
    // UTILITÁRIOS
    // ============================================
    
    async ensureReady() {
        if (!this.ready) {
            await this.init();
        }
    }

    async getDatabaseSize() {
        if (navigator.storage && navigator.storage.estimate) {
            const estimate = await navigator.storage.estimate();
            return {
                usage: (estimate.usage / 1024 / 1024).toFixed(2) + ' MB',
                quota: (estimate.quota / 1024 / 1024).toFixed(2) + ' MB',
                percentage: ((estimate.usage / estimate.quota) * 100).toFixed(1) + '%'
            };
        }
        return null;
    }

    async exportAllData() {
        const data = {
            movies: await this.getAll('movies'),
            series: await this.getAll('series'),
            downloads: await this.getAll('downloads'),
            userLists: await this.getAll('userLists'),
            notifications: await this.getAll('notifications'),
            suggestions: await this.getAll('suggestions'),
            exportDate: new Date().toISOString()
        };
        return JSON.stringify(data, null, 2);
    }

    async importData(jsonData) {
        const data = JSON.parse(jsonData);
        for (const [storeName, items] of Object.entries(data)) {
            if (storeName === 'exportDate') continue;
            if (Array.isArray(items)) {
                for (const item of items) {
                    await this.put(storeName, item);
                }
            }
        }
    }
}

// Singleton
const cinemaDB = new CinemaDatabase();

// Inicializar
cinemaDB.init().then(() => {
    console.log('🗄️ Banco de dados pronto para uso!');
}).catch(err => {
    console.error('❌ Falha ao inicializar banco:', err);
});

// Exportar
window.cinemaDB = cinemaDB;