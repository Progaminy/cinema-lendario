// ============================================
// js/explore.js
// SISTEMA DE EXPLORAÇÃO E BUSCA
// Busca local no catálogo + Sugestões
// ============================================

class ExploreSystem {
    constructor() {
        this.searchTimeout = null;
        this.lastQuery = '';
        this.searchHistory = [];
        this.loadHistory();
    }

    // ============================================
    // BUSCA PRINCIPAL (LOCAL)
    // ============================================
    searchLocal() {
        const input = document.getElementById('searchInput');
        const grid = document.getElementById('exploreGrid');
        
        if (!input || !grid) return;

        const query = input.value.trim();

        if (!query || query.length < 2) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column:1/-1;">
                    <p style="font-size:3rem;">🔍</p>
                    <p>Digite pelo menos 2 caracteres para buscar</p>
                    <p style="font-size:0.8rem; margin-top:0.5rem;">Busque por títulos, diretores, atores ou gêneros</p>
                </div>`;
            return;
        }

        // Mostrar loading
        grid.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1;">
                <p>🔍 Buscando "${this.escapeHTML(query)}"...</p>
            </div>`;

        // Salvar no histórico
        this.addToHistory(query);

        // Pequeno delay para feedback visual
        setTimeout(() => {
            this.performSearch(query);
        }, 300);
    }

    // ============================================
    // EXECUTAR BUSCA
    // ============================================
    performSearch(query) {
        const grid = document.getElementById('exploreGrid');
        if (!grid) return;

        this.lastQuery = query;

        // Buscar filmes
        const movieResults = moviesSystem.searchMovies(query);
        
        // Buscar séries
        const seriesResults = seriesSystem.searchSeries(query);

        // Combinar resultados
        const allResults = [
            ...movieResults.map(m => ({ ...m, resultType: 'movie' })),
            ...seriesResults.map(s => ({ ...s, resultType: 'series' }))
        ];

        if (allResults.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column:1/-1;">
                    <p style="font-size:3rem;">😔</p>
                    <p>Nenhum resultado para "${this.escapeHTML(query)}"</p>
                    <p style="font-size:0.8rem; margin-top:0.5rem;">Use o formulário abaixo para sugerir este conteúdo!</p>
                </div>`;
            
            // Registrar clique não encontrado
            if (window.registerNotFoundClick) {
                window.registerNotFoundClick('search', query, '');
            }
            return;
        }

        // Ordenar: filmes primeiro, depois séries
        allResults.sort((a, b) => {
            if (a.resultType === 'movie' && b.resultType === 'series') return -1;
            if (a.resultType === 'series' && b.resultType === 'movie') return 1;
            // Por avaliação
            return (b.rating || 0) - (a.rating || 0);
        });

        // Exibir resultados
        this.displayResults(allResults, query);
    }

    // ============================================
    // EXIBIR RESULTADOS
    // ============================================
    displayResults(results, query) {
        const grid = document.getElementById('exploreGrid');
        if (!grid) return;

        const totalMovies = results.filter(r => r.resultType === 'movie').length;
        const totalSeries = results.filter(r => r.resultType === 'series').length;

        let html = '';

        // Cabeçalho de resultados
        html += `
            <div style="grid-column:1/-1; margin-bottom:0.5rem; display:flex; justify-content:space-between; align-items:center;">
                <span style="color:var(--text-dim); font-size:0.8rem;">
                    🔍 ${results.length} resultados para "${this.escapeHTML(query)}"
                    (${totalMovies} filmes, ${totalSeries} séries)
                </span>
            </div>`;

        // Cards de resultados
        results.forEach(item => {
            if (item.resultType === 'series') {
                html += this.createSeriesCard(item);
            } else {
                html += this.createMovieCard(item);
            }
        });

        grid.innerHTML = html;
    }

    // ============================================
    // CARDS DE RESULTADO
    // ============================================
    createMovieCard(movie) {
        const posterUrl = movie.poster 
            ? CONFIG.TMDB_IMAGE_URL + movie.poster 
            : 'https://via.placeholder.com/500x750/141414/D4AF37?text=🎬';
        
        const title = this.escapeHTML(movie.title);
        const genre = this.escapeHTML(movie.genre);
        const videoUrl = movie.videoUrl || CONFIG.SUPABASE_VIDEOS.assistir[0];
        const matchBadge = this.getMatchBadge(movie, this.lastQuery);

        return `
        <div class="content-card">
            ${matchBadge ? `<div class="type-badge" style="background:#FF6600; color:#FFF;">${matchBadge}</div>` : ''}
            <div class="type-badge badge-movie" style="top:${matchBadge ? '28px' : '6px'};">${genre}</div>
            <img src="${posterUrl}" 
                 alt="${title}" 
                 loading="lazy" 
                 onclick="moviesSystem.showMovieDetail(${movie.id})" 
                 onerror="this.src='https://via.placeholder.com/500x750/141414/D4AF37?text=🎬'">
            <div class="card-info" onclick="moviesSystem.showMovieDetail(${movie.id})">
                <h3>${title}</h3>
                <div class="card-meta">
                    <span class="rating-badge">⭐ ${movie.rating}</span>
                    <span>${movie.year}</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn-card btn-play" onclick="event.stopPropagation(); playerSystem.playVideo('${this.escapeAttr(title)}', '${videoUrl}')">▶</button>
                <button class="btn-card btn-trailer" onclick="event.stopPropagation(); trailersSystem.showTrailer(${movie.id}, '${this.escapeAttr(title)}')">🎬</button>
                <button class="btn-card btn-download" onclick="event.stopPropagation(); downloadsSystem.downloadFile('${this.escapeAttr(title)}', '${videoUrl}', '${genre}')">⬇️</button>
                <button class="btn-card btn-list" onclick="event.stopPropagation(); listsSystem.addToLists('${this.escapeAttr(title)}', '${genre}')">📋</button>
            </div>
        </div>`;
    }

    createSeriesCard(series) {
        const posterUrl = series.poster 
            ? CONFIG.TMDB_IMAGE_URL + series.poster 
            : 'https://via.placeholder.com/500x750/141414/9C27B0?text=📺';
        
        const title = this.escapeHTML(series.title);
        const totalSeasons = series.seasons ? series.seasons.length : 0;

        return `
        <div class="content-card">
            <div class="type-badge badge-series">📺 Série</div>
            <img src="${posterUrl}" 
                 alt="${title}" 
                 loading="lazy" 
                 onclick="seriesSystem.showSeriesDetail(${series.id})" 
                 onerror="this.src='https://via.placeholder.com/500x750/141414/9C27B0?text=📺'">
            <div class="card-info" onclick="seriesSystem.showSeriesDetail(${series.id})">
                <h3>${title}</h3>
                <div class="card-meta">
                    <span class="rating-badge">⭐ ${series.rating}</span>
                    <span>${series.year} • ${totalSeasons}T</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn-card btn-list" onclick="event.stopPropagation(); listsSystem.addToLists('${this.escapeAttr(title)}', 'Séries')">📋</button>
                <button class="btn-card btn-download" onclick="event.stopPropagation(); downloadsSystem.downloadAllSeasons('${this.escapeAttr(title)}', ${series.id})">⬇️ Tudo</button>
            </div>
        </div>`;
    }

    // ============================================
    // BADGE DE CORRESPONDÊNCIA
    // ============================================
    getMatchBadge(item, query) {
        if (!query) return null;
        const q = query.toLowerCase();

        if (item.director && item.director.toLowerCase().includes(q)) return '🎬 Diretor';
        if (item.cast && item.cast.some(a => a.toLowerCase().includes(q))) return '👤 Ator';
        if (item.genre && item.genre.toLowerCase().includes(q)) return '🎭 Gênero';
        if (item.year && item.year.toString().includes(q)) return '📅 Ano';
        
        return null;
    }

    // ============================================
    // SUGESTÃO DE CONTEÚDO
    // ============================================
    suggestContent() {
        const input = document.getElementById('suggestInput');
        const typeSelect = document.getElementById('suggestType');
        
        if (!input || !typeSelect) return;

        const title = input.value.trim();
        const type = typeSelect.value;

        if (!title || title.length < 2) {
            alert('❌ Digite um título válido com pelo menos 2 caracteres!');
            return;
        }

        if (window.userSuggest) {
            const success = window.userSuggest(title, type);
            if (success) {
                input.value = '';
                // Focar no input novamente
                input.focus();
            }
        } else {
            // Fallback
            if (window.addSuggestion) {
                window.addSuggestion(type, title, '');
                alert(`✅ Obrigado! "${title}" foi sugerido com sucesso!\n\nNossa equipe vai analisar e adicionar ao catálogo em breve.`);
                input.value = '';
                input.focus();
            }
        }
    }

    // ============================================
    // HISTÓRICO DE BUSCA
    // ============================================
    addToHistory(query) {
        // Evitar duplicatas
        this.searchHistory = this.searchHistory.filter(h => h !== query);
        this.searchHistory.unshift(query);
        
        // Limitar a 20 itens
        if (this.searchHistory.length > 20) {
            this.searchHistory = this.searchHistory.slice(0, 20);
        }
        
        this.saveHistory();
    }

    saveHistory() {
        try {
            localStorage.setItem('cinema_search_history', JSON.stringify(this.searchHistory));
        } catch (e) {
            console.error('Erro ao salvar histórico de busca:', e);
        }
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem('cinema_search_history');
            if (saved) {
                this.searchHistory = JSON.parse(saved);
            }
        } catch (e) {
            this.searchHistory = [];
        }
    }

    getHistory() {
        return this.searchHistory;
    }

    clearHistory() {
        this.searchHistory = [];
        localStorage.removeItem('cinema_search_history');
        console.log('🗑️ Histórico de busca limpo');
    }

    // ============================================
    // BUSCA RÁPIDA (NAVEGAÇÃO DIRETA)
    // ============================================
    quickSearch(query) {
        const input = document.getElementById('searchInput');
        if (input) {
            input.value = query;
        }
        
        // Navegar para a view de explorar
        if (window.navigateTo) {
            window.navigateTo('explore');
        }
        
        // Executar busca
        setTimeout(() => {
            this.searchLocal();
        }, 200);
    }

    // ============================================
    // SUGESTÕES POPULARES
    // ============================================
    getPopularSuggestions() {
        return [
            'Matrix',
            'Batman',
            'Vingadores',
            'Titanic',
            'Star Wars',
            'Harry Potter',
            'Jurassic Park',
            'O Poderoso Chefão'
        ];
    }

    renderPopularSuggestions() {
        const container = document.getElementById('popularSuggestions');
        if (!container) return;

        const suggestions = this.getPopularSuggestions();
        
        container.innerHTML = `
            <p style="color:var(--text-dim); font-size:0.8rem; margin-bottom:0.5rem;">🔥 Buscas populares:</p>
            <div style="display:flex; gap:0.3rem; flex-wrap:wrap;">
                ${suggestions.map(s => `
                    <span class="category-chip" onclick="exploreSystem.quickSearch('${s}')" 
                          style="cursor:pointer; font-size:0.75rem;">
                        🔍 ${s}
                    </span>
                `).join('')}
            </div>`;
    }

    // ============================================
    // ESTATÍSTICAS
    // ============================================
    getStats() {
        return {
            totalSearches: this.searchHistory.length,
            lastSearch: this.searchHistory[0] || 'Nenhuma',
            topSearches: this.getTopSearches(5)
        };
    }

    getTopSearches(limit = 5) {
        const counts = {};
        this.searchHistory.forEach(q => {
            counts[q] = (counts[q] || 0) + 1;
        });
        
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([query, count]) => ({ query, count }));
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
const exploreSystem = new ExploreSystem();

// Exportar global
window.exploreSystem = exploreSystem;

// Compatibilidade com código existente
window.searchLocal = () => exploreSystem.searchLocal();
window.searchMovies = (query) => exploreSystem.quickSearch(query);
window.suggestContent = () => exploreSystem.suggestContent();

// Renderizar sugestões populares ao carregar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        exploreSystem.renderPopularSuggestions();
    }, 1000);
});

console.log('🔍 Sistema de exploração carregado!');
console.log('📊 Stats:', exploreSystem.getStats());