// ============================================
// js/movies.js
// SISTEMA DE FILMES
// Renderização, busca, detalhes
// ============================================

class MoviesSystem {
    constructor() {
        this.currentCategory = 'all';
        this.categories = Object.keys(moviesDB);
        this.icons = {
            'Ação': '💥',
            'Drama': '🎭',
            'Comédia': '😂',
            'Ficção Científica': '🚀',
            'Terror': '👻',
            'Romance': '💕',
            'Animação': '🎨',
            'Aventura': '🗺️'
        };
    }

    // ============================================
    // INICIALIZAR CATEGORIAS
    // ============================================
    initCategories() {
        const scroll = document.getElementById('categoriesScroll');
        if (!scroll) return;

        let html = '<span class="category-chip active" onclick="moviesSystem.filterCategory(\'all\')">📋 Todos</span>';
        
        this.categories.forEach(cat => {
            const icon = this.icons[cat] || '🎬';
            html += `<span class="category-chip" onclick="moviesSystem.filterCategory('${cat}')">${icon} ${cat}</span>`;
        });
        
        scroll.innerHTML = html;
    }

    // ============================================
    // FILTRAR POR CATEGORIA
    // ============================================
    filterCategory(cat) {
        this.currentCategory = cat;
        
        // Atualizar chips visuais
        document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
        if (event?.target) event.target.classList.add('active');
        
        // Renderizar filmes
        this.renderMovies(cat);
    }

    // ============================================
    // RENDERIZAR FILMES
    // ============================================
    renderMovies(cat) {
        const grid = document.getElementById('moviesGrid');
        if (!grid) return;

        let movies = [];
        
        if (cat === 'all') {
            // Todos os filmes de todas as categorias
            Object.values(moviesDB).forEach(arr => movies.push(...arr));
        } else {
            movies = moviesDB[cat] || [];
        }

        if (movies.length === 0) {
            grid.innerHTML = '<p class="empty-state">Nenhum filme encontrado nesta categoria</p>';
            return;
        }

        grid.innerHTML = movies.map(movie => this.createMovieCard(movie)).join('');
    }

    // ============================================
    // CRIAR CARD DE FILME
    // ============================================
    createMovieCard(movie) {
        const posterUrl = movie.poster 
            ? CONFIG.TMDB_IMAGE_URL + movie.poster 
            : 'https://via.placeholder.com/500x750/141414/D4AF37?text=🎬';
        
        const title = this.escapeHTML(movie.title);
        const genre = this.escapeHTML(movie.genre);
        const videoUrl = movie.videoUrl || CONFIG.SUPABASE_VIDEOS.assistir[0];

        return `
        <div class="content-card" data-movie-id="${movie.id}">
            <div class="type-badge badge-movie">${genre}</div>
            <img src="${posterUrl}" 
                 alt="${title}" 
                 loading="lazy" 
                 onclick="moviesSystem.showMovieDetail(${movie.id})" 
                 onerror="this.src='https://via.placeholder.com/500x750/141414/D4AF37?text=🎬'">
            <div class="card-info" onclick="moviesSystem.showMovieDetail(${movie.id})">
                <h3 title="${title}">${title}</h3>
                <div class="card-meta">
                    <span class="rating-badge">⭐ ${movie.rating}</span>
                    <span>${movie.year}</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn-card btn-play" onclick="event.stopPropagation(); playerSystem.playVideo('${this.escapeAttr(title)}', '${videoUrl}')" title="Assistir">▶</button>
                <button class="btn-card btn-trailer" onclick="event.stopPropagation(); trailersSystem.showTrailer(${movie.id}, '${this.escapeAttr(title)}')" title="Trailer">🎬</button>
                <button class="btn-card btn-download" onclick="event.stopPropagation(); downloadsSystem.downloadFile('${this.escapeAttr(title)}', '${videoUrl}', '${genre}')" title="Baixar">⬇️</button>
                <button class="btn-card btn-list" onclick="event.stopPropagation(); listsSystem.addToLists('${this.escapeAttr(title)}', '${genre}')" title="Adicionar à Lista">📋</button>
            </div>
        </div>`;
    }

    // ============================================
    // MOSTRAR DETALHES DO FILME
    // ============================================
    showMovieDetail(movieId) {
        const movie = this.getMovieById(movieId);
        
        if (!movie) {
            // Registrar clique não encontrado
            if (window.registerNotFoundClick) {
                window.registerNotFoundClick('movie', `ID: ${movieId}`, '');
            }
            alert('Filme não encontrado no catálogo!\n\nUse a aba "Explorar" para sugerir este filme.');
            return;
        }

        const modal = document.getElementById('mainModal');
        const content = document.getElementById('modalContent');
        if (!modal || !content) return;

        const posterUrl = CONFIG.TMDB_IMAGE_ORIGINAL + movie.poster;
        const title = this.escapeHTML(movie.title);
        const genre = this.escapeHTML(movie.genre);
        const director = this.escapeHTML(movie.director);
        const desc = this.escapeHTML(movie.desc);
        const cast = movie.cast.map(a => this.escapeHTML(a)).join(', ');
        const videoUrl = movie.videoUrl || CONFIG.SUPABASE_VIDEOS.assistir[0];

        content.innerHTML = `
        <div class="detail-grid">
            <img src="${posterUrl}" 
                 alt="${title}" 
                 class="detail-poster" 
                 onerror="this.src='https://via.placeholder.com/500x750/141414/D4AF37?text=🎬'">
            <div>
                <span class="type-badge badge-movie" style="position:static; display:inline-block;">${genre}</span>
                <h2 style="font-family:'Playfair Display',serif; font-size:clamp(1.3rem,5vw,1.8rem); margin:0.5rem 0;">${title}</h2>
                <p style="color:var(--text-dim); font-size:0.85rem;">📅 ${movie.year} | ⭐ ${movie.rating}/10 | 🎬 ${director}</p>
                <p style="line-height:1.7; margin:0.8rem 0; color:var(--text-dim); font-size:0.9rem;">${desc}</p>
                <p style="color:var(--text-dim); font-size:0.8rem;"><strong>Elenco:</strong> ${cast}</p>
                <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-top:0.8rem;">
                    <button class="btn btn-red" onclick="playerSystem.playVideo('${this.escapeAttr(title)}', '${videoUrl}')">▶ Assistir</button>
                    <button class="btn btn-orange" onclick="trailersSystem.showTrailer(${movie.id}, '${this.escapeAttr(title)}')">🎬 Trailer</button>
                    <button class="btn btn-green" onclick="downloadsSystem.downloadFile('${this.escapeAttr(title)}', '${videoUrl}', '${genre}')">⬇️ Baixar</button>
                    <button class="btn btn-blue" onclick="listsSystem.addToLists('${this.escapeAttr(title)}', '${genre}'); closeModal();">📋 Lista</button>
                </div>
            </div>
        </div>
        <div class="video-container" style="margin-top:1rem;">
            <video controls poster="${posterUrl}" style="width:100%;height:100%;">
                <source src="${videoUrl}" type="video/mp4">
            </video>
        </div>`;

        modal.classList.add('active');
        modal.scrollTop = 0;
    }

    // ============================================
    // BUSCAR FILME POR ID
    // ============================================
    getMovieById(id) {
        for (const category of Object.values(moviesDB)) {
            const movie = category.find(m => m.id === id);
            if (movie) return movie;
        }
        return null;
    }

    // ============================================
    // BUSCAR FILMES POR TERMO
    // ============================================
    searchMovies(query) {
        const q = query.toLowerCase().trim();
        const results = [];
        
        for (const category of Object.values(moviesDB)) {
            for (const movie of category) {
                if (movie.title.toLowerCase().includes(q) ||
                    movie.director.toLowerCase().includes(q) ||
                    movie.cast.some(a => a.toLowerCase().includes(q)) ||
                    movie.genre.toLowerCase().includes(q) ||
                    movie.desc.toLowerCase().includes(q)) {
                    results.push({ ...movie, resultType: 'movie' });
                }
            }
        }
        
        return results;
    }

    // ============================================
    // OBTER TODOS OS FILMES
    // ============================================
    getAllMovies() {
        const all = [];
        Object.values(moviesDB).forEach(arr => all.push(...arr));
        return all;
    }

    // ============================================
    // OBTER FILMES POR CATEGORIA
    // ============================================
    getMoviesByCategory(category) {
        return moviesDB[category] || [];
    }

    // ============================================
    // OBTER TOTAL DE FILMES
    // ============================================
    getTotalMovies() {
        return this.getAllMovies().length;
    }

    // ============================================
    // UTILITÁRIOS
    // ============================================
    escapeHTML(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    escapeAttr(str) {
        if (!str) return '';
        return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
    }
}

// Singleton
const moviesSystem = new MoviesSystem();

// Exportar global
window.moviesSystem = moviesSystem;

// Compatibilidade com código existente
window.filterCategory = (cat) => moviesSystem.filterCategory(cat);
window.renderMovies = (cat) => moviesSystem.renderMovies(cat);
window.showMovieDetail = (id) => moviesSystem.showMovieDetail(id);
window.getMovieById = (id) => moviesSystem.getMovieById(id);
window.searchMovies = (query) => moviesSystem.searchMovies(query);
window.initCategories = () => moviesSystem.initCategories();
window.allCategories = moviesSystem.categories;

console.log('🎬 Sistema de filmes carregado!');
console.log('📋 Categorias:', moviesSystem.categories.join(', '));
console.log('🎥 Total de filmes:', moviesSystem.getTotalMovies());