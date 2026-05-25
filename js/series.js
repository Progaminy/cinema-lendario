// ============================================
// js/series.js
// SISTEMA DE SÉRIES
// Temporadas, episódios, renderização
// ============================================

class SeriesSystem {
    constructor() {
        this.currentSeries = null;
    }

    // ============================================
    // RENDERIZAR SÉRIES
    // ============================================
    renderSeries() {
        const grid = document.getElementById('seriesGrid');
        if (!grid) return;

        if (!seriesDB || seriesDB.length === 0) {
            grid.innerHTML = '<p class="empty-state">Nenhuma série disponível no momento</p>';
            return;
        }

        grid.innerHTML = seriesDB.map(series => this.createSeriesCard(series)).join('');
    }

    // ============================================
    // CRIAR CARD DE SÉRIE
    // ============================================
    createSeriesCard(series) {
        const posterUrl = series.poster 
            ? CONFIG.TMDB_IMAGE_URL + series.poster 
            : 'https://via.placeholder.com/500x750/141414/9C27B0?text=📺';
        
        const title = this.escapeHTML(series.title);
        const totalSeasons = series.seasons ? series.seasons.length : 0;

        return `
        <div class="content-card" data-series-id="${series.id}">
            <div class="type-badge badge-series">📺 Série</div>
            <img src="${posterUrl}" 
                 alt="${title}" 
                 loading="lazy" 
                 onclick="seriesSystem.showSeriesDetail(${series.id})" 
                 onerror="this.src='https://via.placeholder.com/500x750/141414/9C27B0?text=📺'">
            <div class="card-info" onclick="seriesSystem.showSeriesDetail(${series.id})">
                <h3 title="${title}">${title}</h3>
                <div class="card-meta">
                    <span class="rating-badge">⭐ ${series.rating}</span>
                    <span>${series.year} • ${totalSeasons} temp.</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn-card btn-list" onclick="event.stopPropagation(); listsSystem.addToLists('${this.escapeAttr(title)}', 'Séries')" title="Adicionar à Lista">📋</button>
                <button class="btn-card btn-download" onclick="event.stopPropagation(); downloadsSystem.downloadAllSeasons('${this.escapeAttr(title)}', ${series.id})" title="Baixar Tudo">⬇️ Tudo</button>
            </div>
        </div>`;
    }

    // ============================================
    // MOSTRAR DETALHES DA SÉRIE
    // ============================================
    showSeriesDetail(seriesId) {
        const series = this.getSeriesById(seriesId);
        
        if (!series) {
            // Registrar clique não encontrado
            if (window.registerNotFoundClick) {
                window.registerNotFoundClick('series', `ID: ${seriesId}`, '');
            }
            alert('Série não encontrada no catálogo!\n\nUse a aba "Explorar" para sugerir esta série.');
            return;
        }

        this.currentSeries = series;
        window._currentSeries = series;

        const modal = document.getElementById('mainModal');
        const content = document.getElementById('modalContent');
        if (!modal || !content) return;

        const posterUrl = CONFIG.TMDB_IMAGE_ORIGINAL + series.poster;
        const title = this.escapeHTML(series.title);
        const genre = this.escapeHTML(series.genre);
        const desc = this.escapeHTML(series.desc);
        const totalSeasons = series.seasons ? series.seasons.length : 0;

        content.innerHTML = `
        <div class="detail-grid">
            <img src="${posterUrl}" 
                 alt="${title}" 
                 class="detail-poster" 
                 onerror="this.src='https://via.placeholder.com/500x750/141414/9C27B0?text=📺'">
            <div>
                <span class="type-badge badge-series" style="position:static; display:inline-block;">📺 Série</span>
                <h2 style="font-family:'Playfair Display',serif; font-size:clamp(1.3rem,5vw,1.8rem); margin:0.5rem 0;">${title}</h2>
                <p style="color:var(--text-dim); font-size:0.85rem;">📅 ${series.year} | ⭐ ${series.rating}/10 | ${totalSeasons} temporadas | ${genre}</p>
                <p style="line-height:1.7; margin:0.8rem 0; color:var(--text-dim); font-size:0.9rem;">${desc}</p>
                <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
                    <button class="btn btn-blue" onclick="listsSystem.addToLists('${this.escapeAttr(title)}', 'Séries'); closeModal();">📋 Quero Assistir</button>
                    <button class="btn btn-green" onclick="downloadsSystem.downloadAllSeasons('${this.escapeAttr(title)}', ${series.id})">⬇️ Baixar Todas Temporadas</button>
                </div>
            </div>
        </div>
        
        <div class="season-scroll" style="margin-top:1.5rem;">
            <strong style="color:var(--gold); margin-right:0.5rem;">📅 Temporadas:</strong>
            ${series.seasons.map((s, i) => `
                <span class="season-chip ${i === 0 ? 'active' : ''}" 
                      onclick="seriesSystem.showEpisodes(${series.id}, ${i})">
                      T${s.number} (${s.year})
                </span>
            `).join('')}
        </div>
        
        <div id="episodeContainer" style="margin-top:1rem;">
            ${this.renderEpisodeList(series.seasons[0])}
        </div>`;

        modal.classList.add('active');
        modal.scrollTop = 0;
    }

    // ============================================
    // RENDERIZAR LISTA DE EPISÓDIOS
    // ============================================
    renderEpisodeList(season) {
        if (!season || !season.episodes || season.episodes.length === 0) {
            return '<p class="empty-state">Nenhum episódio disponível nesta temporada</p>';
        }

        return season.episodes.map(ep => {
            const epTitle = this.escapeHTML(ep.title);
            const epDesc = this.escapeHTML(ep.desc);
            const videoUrl = ep.videoUrl || CONFIG.SUPABASE_VIDEOS.assistir[0];

            return `
            <div class="episode-item">
                <div style="flex:1;">
                    <strong style="color:var(--gold);">Ep ${ep.number}</strong> - ${epTitle}
                    <p style="color:var(--text-dim); font-size:0.75rem; margin-top:0.2rem;">${epDesc}</p>
                </div>
                <div class="episode-buttons">
                    <button class="btn btn-red" style="padding:0.3rem 0.6rem; font-size:0.7rem;" 
                            onclick="playerSystem.playVideo('${this.escapeAttr(epTitle)}', '${videoUrl}')" 
                            title="Assistir">▶</button>
                    <button class="btn btn-green" style="padding:0.3rem 0.6rem; font-size:0.7rem;" 
                            onclick="downloadsSystem.downloadFile('${this.escapeAttr(epTitle)}', '${videoUrl}', 'Série')" 
                            title="Baixar">⬇️</button>
                </div>
            </div>`;
        }).join('');
    }

    // ============================================
    // MOSTRAR EPISÓDIOS DE UMA TEMPORADA
    // ============================================
    showEpisodes(seriesId, seasonIdx) {
        const series = this.currentSeries || this.getSeriesById(seriesId);
        if (!series || !series.seasons || !series.seasons[seasonIdx]) return;

        // Atualizar chips visuais
        document.querySelectorAll('.season-chip').forEach((chip, i) => {
            chip.classList.toggle('active', i === seasonIdx);
        });

        // Atualizar lista de episódios
        const container = document.getElementById('episodeContainer');
        if (container) {
            container.innerHTML = this.renderEpisodeList(series.seasons[seasonIdx]);
        }
    }

    // ============================================
    // BUSCAR SÉRIE POR ID
    // ============================================
    getSeriesById(id) {
        return seriesDB.find(s => s.id === id) || null;
    }

    // ============================================
    // BUSCAR SÉRIES POR TERMO
    // ============================================
    searchSeries(query) {
        const q = query.toLowerCase().trim();
        return seriesDB.filter(s => 
            s.title.toLowerCase().includes(q) ||
            s.genre.toLowerCase().includes(q) ||
            s.desc.toLowerCase().includes(q)
        ).map(s => ({ ...s, resultType: 'series' }));
    }

    // ============================================
    // OBTER TODAS AS SÉRIES
    // ============================================
    getAllSeries() {
        return seriesDB || [];
    }

    // ============================================
    // OBTER TOTAL DE SÉRIES
    // ============================================
    getTotalSeries() {
        return (seriesDB || []).length;
    }

    // ============================================
    // OBTER TOTAL DE EPISÓDIOS DE UMA SÉRIE
    // ============================================
    getTotalEpisodes(seriesId) {
        const series = this.getSeriesById(seriesId);
        if (!series || !series.seasons) return 0;
        
        let total = 0;
        series.seasons.forEach(season => {
            total += season.episodes ? season.episodes.length : 0;
        });
        return total;
    }

    // ============================================
    // OBTER TODOS OS EPISÓDIOS DE UMA SÉRIE
    // ============================================
    getAllEpisodes(seriesId) {
        const series = this.getSeriesById(seriesId);
        if (!series || !series.seasons) return [];
        
        const episodes = [];
        series.seasons.forEach(season => {
            if (season.episodes) {
                season.episodes.forEach(ep => {
                    episodes.push({
                        ...ep,
                        seriesId: series.id,
                        seriesTitle: series.title,
                        seasonNumber: season.number,
                        seasonYear: season.year
                    });
                });
            }
        });
        return episodes;
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
const seriesSystem = new SeriesSystem();

// Exportar global
window.seriesSystem = seriesSystem;

// Compatibilidade com código existente
window.renderSeries = () => seriesSystem.renderSeries();
window.showSeriesDetail = (id) => seriesSystem.showSeriesDetail(id);
window.showEpisodes = (seriesId, seasonIdx) => seriesSystem.showEpisodes(seriesId, seasonIdx);
window.getSeriesById = (id) => seriesSystem.getSeriesById(id);
window.searchSeries = (query) => seriesSystem.searchSeries(query);
window.renderEpisodeList = (season) => seriesSystem.renderEpisodeList(season);

console.log('📺 Sistema de séries carregado!');
console.log('📋 Total de séries:', seriesSystem.getTotalSeries());