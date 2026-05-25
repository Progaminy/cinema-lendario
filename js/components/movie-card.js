// js/components/movie-card.js
// Componente de Card de Filme reutilizável

class MovieCardComponent {
    constructor() {
        this.imageBaseUrl = CONFIG.TMDB_IMAGE_URL;
        this.placeholderPoster = this.generatePlaceholderSVG();
    }

    // Gerar placeholder SVG para quando não tem poster
    generatePlaceholderSVG() {
        return 'data:image/svg+xml,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" fill="%23141414">
                <rect width="500" height="750"/>
                <text x="250" y="375" text-anchor="middle" fill="%23D4AF37" font-size="48" font-family="serif">
                    🎬
                </text>
                <text x="250" y="420" text-anchor="middle" fill="%23A0A0A0" font-size="20" font-family="sans-serif">
                    Sem Poster
                </text>
            </svg>
        `);
    }

    // Obter URL do poster com fallback
    getPosterUrl(movie) {
        if (movie.poster_path) {
            return `${this.imageBaseUrl}/w500${movie.poster_path}`;
        }
        if (movie.poster) {
            return movie.poster;
        }
        return this.placeholderPoster;
    }

    // Renderizar card de filme da API
    renderAPIMovieCard(movie) {
        const posterUrl = this.getPosterUrl(movie);
        const year = movie.release_date 
            ? new Date(movie.release_date).getFullYear() 
            : '----';
        const rating = movie.vote_average 
            ? movie.vote_average.toFixed(1) 
            : 'N/A';
        const isTopRated = parseFloat(rating) >= 8;

        const cardHTML = `
            <div class="movie-card cinematic-card" 
                 data-movie-id="${movie.id}"
                 onclick="app.showMovieDetail('${movie.id}')">
                <div class="movie-poster-container">
                    <img src="${posterUrl}" 
                         alt="${this.escapeHTML(movie.title)}" 
                         class="movie-poster"
                         loading="lazy"
                         onerror="this.onerror=null; this.src='${this.placeholderPoster}';">
                    ${isTopRated ? '<div class="top-rated-badge">🔥 Top</div>' : ''}
                    ${movie.adult ? '<div class="adult-badge">18+</div>' : ''}
                </div>
                <div class="movie-card-info">
                    <h3 class="movie-card-title" title="${this.escapeHTML(movie.title)}">
                        ${this.truncateText(movie.title, 30)}
                    </h3>
                    <div class="movie-card-meta">
                        <span class="rating-badge ${isTopRated ? 'high-rating' : ''}">
                            ⭐ ${rating}
                        </span>
                        <span>${year}</span>
                    </div>
                    ${movie.genres ? this.renderGenreTags(movie.genres) : ''}
                </div>
            </div>
        `;

        return cardHTML;
    }

    // Renderizar tags de gênero
    renderGenreTags(genres) {
        if (!genres || genres.length === 0) return '';
        
        const genreList = Array.isArray(genres) ? genres.slice(0, 3) : [];
        
        return `
            <div class="movie-genres">
                ${genreList.map(g => `<span class="genre-tag">${g}</span>`).join('')}
            </div>
        `;
    }

    // Renderizar card de filme lendário
    renderLegendaryCard(movie) {
        const posterUrl = this.getPosterUrl(movie);
        
        return `
            <div class="movie-card legendary-card" 
                 onclick="app.showMovieDetail('${movie.id}')">
                <div class="legendary-badge">
                    <span>👑</span> Lendário
                </div>
                <img src="${posterUrl}" 
                     alt="${this.escapeHTML(movie.title)}" 
                     class="movie-poster"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='${this.placeholderPoster}';">
                <div class="movie-card-info">
                    <h3 class="movie-card-title">${this.escapeHTML(movie.title)}</h3>
                    <div class="movie-card-meta">
                        <span class="rating-badge">⭐ ${movie.rating}</span>
                        <span>${movie.year}</span>
                    </div>
                    <div class="movie-card-director">
                        Dir: ${movie.director}
                    </div>
                    ${movie.whereToWatch ? this.renderAvailableOn(movie.whereToWatch) : ''}
                </div>
            </div>
        `;
    }

    // Renderizar plataformas disponíveis
    renderAvailableOn(platforms) {
        if (!platforms || platforms.length === 0) return '';
        
        return `
            <div class="available-on">
                📺 ${platforms.join(' • ')}
            </div>
        `;
    }

    // Renderizar card de filme em domínio público
    renderPublicDomainCard(movie) {
        const posterUrl = this.getPosterUrl(movie);
        
        return `
            <div class="movie-card cinematic-card public-domain" 
                 onclick="window.open('${movie.url}', '_blank')">
                <div class="public-domain-badge">📚 Domínio Público</div>
                <div class="movie-poster-container">
                    <img src="${posterUrl}" 
                         alt="${this.escapeHTML(movie.title)}" 
                         class="movie-poster"
                         loading="lazy"
                         onerror="this.onerror=null; this.src='${this.placeholderPoster}';">
                </div>
                <div class="movie-card-info">
                    <h3 class="movie-card-title">${this.escapeHTML(movie.title)}</h3>
                    <div class="movie-card-meta">
                        <span>${movie.year}</span>
                        <span>Dir: ${movie.director}</span>
                    </div>
                    <div class="watch-free-btn">
                        ▶️ Assistir Grátis no ${movie.platform}
                    </div>
                </div>
            </div>
        `;
    }

    // Renderizar detalhes completos do filme no modal
    renderMovieDetail(movie, whereToWatch = null) {
        const posterUrl = this.getPosterUrl(movie);
        const backdropUrl = movie.backdrop_path
            ? `${this.imageBaseUrl}/original${movie.backdrop_path}`
            : '';
        const year = movie.release_date 
            ? new Date(movie.release_date).getFullYear()
            : (movie.year || '----');
        const rating = movie.vote_average || movie.rating || 'N/A';
        const runtime = movie.runtime 
            ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`
            : '';

        let html = `
            <div class="movie-detail-container">
                <div class="movie-detail-header">
                    <div class="poster-section">
                        <img src="${posterUrl}" 
                             alt="${this.escapeHTML(movie.title)}" 
                             class="movie-detail-poster"
                             onerror="this.onerror=null; this.src='${this.placeholderPoster}';">
                    </div>
                    <div class="info-section">
                        <h2 class="movie-title">${this.escapeHTML(movie.title)}</h2>
                        ${movie.tagline ? `<p class="movie-tagline">"${this.escapeHTML(movie.tagline)}"</p>` : ''}
                        
                        <div class="movie-meta">
                            <span>📅 ${year}</span>
                            ${runtime ? `<span>⏱️ ${runtime}</span>` : ''}
                            <span>⭐ ${rating}</span>
                            ${movie.vote_count ? `<span>🗳️ ${movie.vote_count} votos</span>` : ''}
                        </div>

                        ${movie.genres ? this.renderGenreTags(movie.genres) : ''}

                        ${movie.director ? `
                            <div class="movie-director">
                                <strong>Diretor:</strong> ${this.escapeHTML(movie.director)}
                            </div>
                        ` : ''}

                        <div class="movie-actions">
                            <button class="action-btn" onclick="app.addToWatchlist('${movie.id}')">
                                📋 + Watchlist
                            </button>
                            <button class="action-btn" onclick="app.markAsWatched('${movie.id}')">
                                ✅ Já assisti
                            </button>
                            <button class="action-btn favorite" onclick="app.toggleFavorite('${movie.id}')">
                                ❤️ Favorito
                            </button>
                        </div>
                    </div>
                </div>

                ${movie.overview ? `
                    <div class="movie-synopsis">
                        <h3>Sinopse</h3>
                        <p>${this.escapeHTML(movie.overview)}</p>
                    </div>
                ` : ''}

                ${whereToWatch && window.streamingService ? 
                    window.streamingService.renderStreamingButtons(whereToWatch) : ''}

                ${movie.easterEggs ? this.renderEasterEggs(movie.easterEggs) : ''}
            </div>
        `;

        return html;
    }

    // Renderizar easter eggs
    renderEasterEggs(easterEggs) {
        if (!easterEggs || easterEggs.length === 0) return '';
        
        return `
            <div class="easter-eggs-section">
                <h4>🎬 Curiosidades e Easter Eggs</h4>
                ${easterEggs.map(egg => `
                    <div class="easter-egg-item">${this.escapeHTML(egg)}</div>
                `).join('')}
            </div>
        `;
    }

    // Renderizar grid de filmes
    renderMovieGrid(movies, type = 'api') {
        if (!movies || movies.length === 0) {
            return '<p class="no-results">Nenhum filme encontrado</p>';
        }

        let html = '';
        
        movies.forEach(movie => {
            switch(type) {
                case 'legendary':
                    html += this.renderLegendaryCard(movie);
                    break;
                case 'public_domain':
                    html += this.renderPublicDomainCard(movie);
                    break;
                default:
                    html += this.renderAPIMovieCard(movie);
            }
        });

        return html;
    }

    // Utilitários
    truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    escapeHTML(text) {
        if (!text) return '';
        
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatCurrency(amount) {
        if (!amount) return 'N/A';
        
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Gerar estrelas de avaliação
    renderStarRating(rating) {
        const fullStars = Math.floor(rating / 2);
        const halfStar = rating % 2 >= 1;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) stars += '⭐';
        if (halfStar) stars += '✨';
        for (let i = 0; i < emptyStars; i++) stars += '☆';
        
        return stars;
    }
}

// Singleton
const movieCardComponent = new MovieCardComponent();
window.movieCardComponent = movieCardComponent;