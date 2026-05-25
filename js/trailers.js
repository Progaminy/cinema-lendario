// ============================================
// js/trailers.js
// SISTEMA DE TRAILERS
// Prioridade: 1º TMDB → 2º Banco Local → 3º Genérico
// NUNCA usa YouTube
// ============================================

class TrailersSystem {
    constructor() {
        // Trailers de filmes (banco local)
        this.movieTrailers = MOVIE_TRAILERS || {};
        // Trailers de séries (banco local)
        this.seriesTrailers = SERIES_TRAILERS || {};
        // Trailer genérico de fallback
        this.genericMovieTrailer = GENERIC_MOVIE_TRAILER || CONFIG.SUPABASE_VIDEOS.assistir[4];
        this.genericSeriesTrailer = GENERIC_SERIES_TRAILER || CONFIG.SUPABASE_VIDEOS.assistir[4];
    }

    // ============================================
    // MOSTRAR TRAILER (MÉTODO PRINCIPAL)
    // ============================================
    async showTrailer(movieId, title) {
        const modal = document.getElementById('mainModal');
        const content = document.getElementById('modalContent');
        if (!modal || !content) return;

        // Tela de carregamento
        content.innerHTML = `
            <h3 style="color:#FF6600; margin-bottom:1rem;">🎬 Buscando trailer...</h3>
            <div class="video-container">
                <p style="text-align:center; padding:3rem; color:var(--text-dim);">
                    ⏳ Aguarde enquanto buscamos o melhor trailer...
                </p>
            </div>`;
        modal.classList.add('active');
        modal.scrollTop = 0;

        let trailerUrl = null;
        let trailerSource = '';
        let trailerFound = false;

        // ==========================================
        // PASSO 1: Buscar na API TMDB (PRIORIDADE)
        // ==========================================
        try {
            const movie = moviesSystem.getMovieById(movieId);
            const tmdbId = movie ? movie.tmdbId : movieId;

            if (tmdbId) {
                // Buscar vídeos em português
                let res = await fetch(`${CONFIG.TMDB_BASE_URL}/movie/${tmdbId}/videos?api_key=${CONFIG.TMDB_API_KEY}&language=pt-BR`);
                let data = await res.json();
                let trailer = data.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');

                // Se não achou em PT, buscar em inglês
                if (!trailer) {
                    res = await fetch(`${CONFIG.TMDB_BASE_URL}/movie/${tmdbId}/videos?api_key=${CONFIG.TMDB_API_KEY}&language=en-US`);
                    data = await res.json();
                    trailer = data.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
                }

                if (trailer) {
                    trailerSource = '✅ TMDB (trailer oficial encontrado)';
                    trailerFound = true;
                    console.log(`🎬 Trailer TMDB encontrado para "${title}":`, trailer.key);
                    
                    // Registrar que encontrou
                    if (window.registerNotFoundClick) {
                        window.registerNotFoundClick('trailer', title, movie?.genre || '');
                    }
                }
            }
        } catch (e) {
            console.log('⚠️ TMDB indisponível:', e.message);
        }

        // ==========================================
        // PASSO 2: Buscar no banco de dados LOCAL
        // ==========================================
        if (!trailerUrl) {
            const localTrailer = this.getMovieTrailer(movieId);
            
            if (localTrailer && localTrailer !== this.genericMovieTrailer) {
                trailerUrl = localTrailer;
                trailerSource = trailerSource || '📁 Banco de dados local (trailer específico)';
                trailerFound = true;
                console.log(`📁 Trailer local encontrado para ID ${movieId}`);
            }
        }

        // ==========================================
        // PASSO 3: Fallback - Trailer genérico
        // ==========================================
        if (!trailerUrl) {
            trailerUrl = this.genericMovieTrailer;
            trailerSource = '🆘 Trailer genérico (fallback)';
            console.log(`🆘 Usando trailer genérico para "${title}"`);
        }

        // ==========================================
        // EXIBIR VÍDEO
        // ==========================================
        const safeTitle = this.escapeHTML(title);
        
        content.innerHTML = `
            <h3 style="color:#FF6600; margin-bottom:0.5rem;">🎬 ${safeTitle}</h3>
            <div class="video-container">
                <video controls autoplay playsinline style="width:100%;height:100%;" 
                       poster="${CONFIG.TMDB_IMAGE_URL}/default.jpg">
                    <source src="${trailerUrl}" type="video/mp4">
                    Seu navegador não suporta vídeo HTML5.
                </video>
            </div>
            <p style="color:var(--text-dim); font-size:0.7rem; margin-top:0.3rem;">
                ${trailerSource}
            </p>
            <div style="margin-top:0.8rem; display:flex; gap:0.4rem;">
                <button class="btn btn-green" onclick="downloadsSystem.downloadFile('Trailer - ${this.escapeAttr(safeTitle)}', '${trailerUrl}', 'Trailer')">⬇️ Baixar Trailer</button>
                <button class="btn btn-gold" onclick="closeModal()">🔙 Voltar</button>
            </div>`;
    }

    // ============================================
    // MOSTRAR TRAILER DE SÉRIE
    // ============================================
    async showSeriesTrailer(seriesId, title) {
        const modal = document.getElementById('mainModal');
        const content = document.getElementById('modalContent');
        if (!modal || !content) return;

        content.innerHTML = `
            <h3 style="color:#FF6600; margin-bottom:1rem;">🎬 Buscando trailer da série...</h3>
            <div class="video-container">
                <p style="text-align:center; padding:3rem; color:var(--text-dim);">⏳ Aguarde...</p>
            </div>`;
        modal.classList.add('active');
        modal.scrollTop = 0;

        let trailerUrl = null;
        let trailerSource = '';

        // Buscar no banco local primeiro (séries não têm TMDB ID consistente)
        const localTrailer = this.getSeriesTrailer(seriesId);
        
        if (localTrailer && localTrailer !== this.genericSeriesTrailer) {
            trailerUrl = localTrailer;
            trailerSource = '📁 Banco de dados local (trailer específico)';
        } else {
            trailerUrl = this.genericSeriesTrailer;
            trailerSource = '🆘 Trailer genérico (fallback)';
        }

        const safeTitle = this.escapeHTML(title);
        
        content.innerHTML = `
            <h3 style="color:#FF6600; margin-bottom:0.5rem;">🎬 ${safeTitle}</h3>
            <div class="video-container">
                <video controls autoplay playsinline style="width:100%;height:100%;">
                    <source src="${trailerUrl}" type="video/mp4">
                </video>
            </div>
            <p style="color:var(--text-dim); font-size:0.7rem; margin-top:0.3rem;">${trailerSource}</p>
            <button class="btn btn-gold" onclick="closeModal()" style="margin-top:0.8rem;">🔙 Voltar</button>`;
    }

    // ============================================
    // OBTER TRAILER DE FILME (BANCO LOCAL)
    // ============================================
    getMovieTrailer(movieId) {
        return this.movieTrailers[movieId] || this.genericMovieTrailer;
    }

    // ============================================
    // OBTER TRAILER DE SÉRIE (BANCO LOCAL)
    // ============================================
    getSeriesTrailer(seriesId) {
        return this.seriesTrailers[seriesId] || this.genericSeriesTrailer;
    }

    // ============================================
    // ADICIONAR TRAILER AO BANCO LOCAL
    // ============================================
    addMovieTrailer(movieId, url) {
        this.movieTrailers[movieId] = url;
        // Também salvar no localStorage para persistência
        const saved = JSON.parse(localStorage.getItem('custom_movie_trailers') || '{}');
        saved[movieId] = url;
        localStorage.setItem('custom_movie_trailers', JSON.stringify(saved));
        console.log(`✅ Trailer adicionado para o filme ID ${movieId}`);
    }

    addSeriesTrailer(seriesId, url) {
        this.seriesTrailers[seriesId] = url;
        const saved = JSON.parse(localStorage.getItem('custom_series_trailers') || '{}');
        saved[seriesId] = url;
        localStorage.setItem('custom_series_trailers', JSON.stringify(saved));
        console.log(`✅ Trailer adicionado para a série ID ${seriesId}`);
    }

    // ============================================
    // CARREGAR TRAILERS PERSONALIZADOS
    // ============================================
    loadCustomTrailers() {
        // Carregar trailers de filmes personalizados
        const customMovies = JSON.parse(localStorage.getItem('custom_movie_trailers') || '{}');
        Object.assign(this.movieTrailers, customMovies);
        
        // Carregar trailers de séries personalizados
        const customSeries = JSON.parse(localStorage.getItem('custom_series_trailers') || '{}');
        Object.assign(this.seriesTrailers, customSeries);
        
        console.log('📁 Trailers personalizados carregados');
    }

    // ============================================
    // VERIFICAR SE TRAILER EXISTE
    // ============================================
    hasMovieTrailer(movieId) {
        return !!this.movieTrailers[movieId] && this.movieTrailers[movieId] !== this.genericMovieTrailer;
    }

    hasSeriesTrailer(seriesId) {
        return !!this.seriesTrailers[seriesId] && this.seriesTrailers[seriesId] !== this.genericSeriesTrailer;
    }

    // ============================================
    // OBTER ESTATÍSTICAS
    // ============================================
    getStats() {
        const totalMovieTrailers = Object.keys(this.movieTrailers).length;
        const totalSeriesTrailers = Object.keys(this.seriesTrailers).length;
        const specificMovieTrailers = Object.values(this.movieTrailers).filter(v => v !== this.genericMovieTrailer).length;
        const specificSeriesTrailers = Object.values(this.seriesTrailers).filter(v => v !== this.genericSeriesTrailer).length;

        return {
            totalMovieTrailers,
            totalSeriesTrailers,
            specificMovieTrailers,
            specificSeriesTrailers,
            genericFallbacks: (totalMovieTrailers - specificMovieTrailers) + (totalSeriesTrailers - specificSeriesTrailers)
        };
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
const trailersSystem = new TrailersSystem();

// Carregar trailers personalizados ao iniciar
trailersSystem.loadCustomTrailers();

// Exportar global
window.trailersSystem = trailersSystem;

// Compatibilidade com código existente
window.showTrailer = (movieId, title) => trailersSystem.showTrailer(movieId, title);
window.showSeriesTrailer = (seriesId, title) => trailersSystem.showSeriesTrailer(seriesId, title);
window.getMovieTrailer = (movieId) => trailersSystem.getMovieTrailer(movieId);
window.getSeriesTrailer = (seriesId) => trailersSystem.getSeriesTrailer(seriesId);

console.log('🎬 Sistema de trailers carregado!');
console.log('📊 Prioridade: 1º TMDB → 2º Banco Local → 3º Genérico');
console.log('🚫 YouTube: NUNCA usado');
console.log('📁 Stats:', trailersSystem.getStats());