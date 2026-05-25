// js/database/db-core.js
// Sistema completo de IndexedDB para Cinema Lendário

class CinemaDatabase {
    constructor() {
        this.db = null;
        this.DB_NAME = 'CinemaLendarioDB';
        this.DB_VERSION = 2;
        this.ready = false;
    }

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
                console.log('✅ IndexedDB pronto!');
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error('❌ Erro ao abrir IndexedDB:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    createStores(db) {
        // Store de Filmes (cache da API TMDB + filmes lendários)
        if (!db.objectStoreNames.contains('movies')) {
            const movieStore = db.createObjectStore('movies', { keyPath: 'id' });
            movieStore.createIndex('title', 'title', { unique: false });
            movieStore.createIndex('year', 'release_date', { unique: false });
            movieStore.createIndex('rating', 'vote_average', { unique: false });
            movieStore.createIndex('genre', 'genres', { unique: false, multiEntry: true });
            movieStore.createIndex('type', 'type', { unique: false }); // 'api', 'legendary', 'public_domain'
        }

        // Store de Filmes Lendários (catálogo próprio)
        if (!db.objectStoreNames.contains('legendaryMovies')) {
            const legendaryStore = db.createObjectStore('legendaryMovies', { keyPath: 'id' });
            legendaryStore.createIndex('director', 'director', { unique: false });
            legendaryStore.createIndex('movement', 'movement', { unique: false });
            legendaryStore.createIndex('decade', 'decade', { unique: false });
        }

        // Store de Plataformas de Streaming
        if (!db.objectStoreNames.contains('streamingPlatforms')) {
            const platformStore = db.createObjectStore('streamingPlatforms', { keyPath: 'id' });
            platformStore.createIndex('name', 'name', { unique: true });
            platformStore.createIndex('type', 'type', { unique: false }); // 'free', 'subscription', 'rent'
        }

        // Store de Avaliações do Usuário
        if (!db.objectStoreNames.contains('ratings')) {
            const ratingStore = db.createObjectStore('ratings', { 
                keyPath: 'id', 
                autoIncrement: true 
            });
            ratingStore.createIndex('movieId', 'movieId', { unique: false });
            ratingStore.createIndex('userRating', 'rating', { unique: false });
        }

        // Store de Listas do Usuário
        if (!db.objectStoreNames.contains('userLists')) {
            const listStore = db.createObjectStore('userLists', { 
                keyPath: 'id', 
                autoIncrement: true 
            });
            listStore.createIndex('listType', 'listType', { unique: false }); // 'watchlist', 'watched', 'favorites'
            listStore.createIndex('movieId', 'movieId', { unique: false });
        }

        // Store de Histórico
        if (!db.objectStoreNames.contains('history')) {
            const historyStore = db.createObjectStore('history', { 
                keyPath: 'id', 
                autoIncrement: true 
            });
            historyStore.createIndex('movieId', 'movieId', { unique: false });
            historyStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // Store de Configurações
        if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'key' });
        }

        // Store de Cache de Imagens
        if (!db.objectStoreNames.contains('imageCache')) {
            const imageStore = db.createObjectStore('imageCache', { keyPath: 'url' });
            imageStore.createIndex('cachedAt', 'cachedAt', { unique: false });
        }
    }

    // ============ MÉTODOS CRUD GENÉRICOS ============
    
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

    async getAll(storeName, indexName = null, query = null) {
        await this.ensureReady();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            
            let request;
            if (indexName && query !== null) {
                const index = store.index(indexName);
                request = index.getAll(query);
            } else {
                request = store.getAll();
            }

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

    // ============ MÉTODOS ESPECÍFICOS ============

    // Filmes
    async cacheMovie(movie) {
        movie.cachedAt = Date.now();
        movie.type = movie.type || 'api';
        return this.put('movies', movie);
    }

    async cacheMovies(movies) {
        const transaction = this.db.transaction('movies', 'readwrite');
        const store = transaction.objectStore('movies');
        
        movies.forEach(movie => {
            movie.cachedAt = Date.now();
            movie.type = movie.type || 'api';
            store.put(movie);
        });

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    }

    async getCachedMovies(limit = 100) {
        const movies = await this.getAll('movies');
        return movies
            .sort((a, b) => b.cachedAt - a.cachedAt)
            .slice(0, limit);
    }

    // Listas do Usuário
    async addToList(listType, movieData) {
        return this.add('userLists', {
            listType,
            movieId: movieData.id,
            title: movieData.title,
            poster: movieData.poster_path,
            rating: movieData.vote_average,
            addedAt: Date.now()
        });
    }

    async getList(listType) {
        return this.getByIndex('userLists', 'listType', listType);
    }

    async removeFromList(listType, movieId) {
        const items = await this.getByIndex('userLists', 'listType', listType);
        const item = items.find(i => i.movieId === movieId);
        if (item) {
            return this.delete('userLists', item.id);
        }
    }

    async isInList(listType, movieId) {
        const items = await this.getByIndex('userLists', 'listType', listType);
        return items.some(i => i.movieId === movieId);
    }

    // Histórico
    async addToHistory(movieData) {
        return this.add('history', {
            movieId: movieData.id,
            title: movieData.title,
            poster: movieData.poster_path,
            timestamp: Date.now()
        });
    }

    async getHistory(limit = 50) {
        const history = await this.getAll('history');
        return history
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, limit);
    }

    // Configurações
    async getSetting(key, defaultValue = null) {
        const setting = await this.get('settings', key);
        return setting ? setting.value : defaultValue;
    }

    async setSetting(key, value) {
        return this.put('settings', { key, value });
    }

    // Estatísticas
    async getStats() {
        const totalMovies = await this.count('movies');
        const totalRated = await this.count('ratings');
        const watchlist = await this.count('userLists'); // Precisa filtrar por listType
        
        return {
            totalMoviesCached: totalMovies,
            totalRatings: totalRated,
            totalInLists: watchlist,
            databaseSize: await this.getDatabaseSize()
        };
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

    // Exportar dados
    async exportAllData() {
        const data = {
            movies: await this.getAll('movies'),
            legendaryMovies: await this.getAll('legendaryMovies'),
            ratings: await this.getAll('ratings'),
            userLists: await this.getAll('userLists'),
            history: await this.getAll('history'),
            settings: await this.getAll('settings'),
            exportDate: new Date().toISOString(),
            version: CONFIG.APP_VERSION
        };
        
        return JSON.stringify(data, null, 2);
    }

    // Importar dados
    async importData(jsonData) {
        const data = JSON.parse(jsonData);
        
        for (const [storeName, items] of Object.entries(data)) {
            if (storeName === 'exportDate' || storeName === 'version') continue;
            
            for (const item of items) {
                await this.put(storeName, item);
            }
        }
    }

    async ensureReady() {
        if (!this.ready) {
            await this.init();
        }
    }
}

// Singleton global
const cinemaDB = new CinemaDatabase();
window.cinemaDB = cinemaDB;