// js/services/streaming-service.js
// Serviço de integração com plataformas de streaming

class StreamingService {
    constructor() {
        this.platforms = CONFIG.STREAMING_SOURCES;
        this.legendaryMovies = CONFIG.LEGENDARY_MOVIES;
    }

    // Buscar onde assistir um filme específico
    async findWhereToWatch(movieTitle, movieYear = null) {
        const results = {
            free: [],
            subscription: [],
            rent: [],
            buy: []
        };

        // 1. Verificar nos filmes lendários (temos links diretos)
        const legendary = this.legendaryMovies.find(m => 
            m.title.toLowerCase() === movieTitle.toLowerCase()
        );

        if (legendary) {
            if (legendary.whereToWatch) {
                legendary.whereToWatch.forEach(platform => {
                    results.subscription.push({
                        platform: platform,
                        url: legendary.streamingLinks[platform.toLowerCase()] || '#',
                        type: 'subscription'
                    });
                });
            }
            return results;
        }

        // 2. Verificar plataformas gratuitas disponíveis
        const freePlatforms = [
            {
                name: 'YouTube (Grátis)',
                icon: '▶️',
                searchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle + ' filme completo dublado')}`,
                type: 'free'
            },
            {
                name: 'Internet Archive',
                icon: '📚',
                searchUrl: `https://archive.org/details/movies?query=${encodeURIComponent(movieTitle)}`,
                type: 'free'
            },
            {
                name: 'Vimeo',
                icon: '🎥',
                searchUrl: `https://vimeo.com/search?q=${encodeURIComponent(movieTitle + ' full movie')}`,
                type: 'free'
            }
        ];

        results.free = freePlatforms;

        // 3. Adicionar links genéricos para plataformas de assinatura
        const subscriptionPlatforms = [
            {
                name: 'Netflix',
                icon: '🎬',
                searchUrl: `https://www.netflix.com/search?q=${encodeURIComponent(movieTitle)}`,
                type: 'subscription'
            },
            {
                name: 'Prime Video',
                icon: '📦',
                searchUrl: `https://www.amazon.com/s?k=${encodeURIComponent(movieTitle)}&i=instant-video`,
                type: 'subscription'
            },
            {
                name: 'HBO Max',
                icon: '🎯',
                searchUrl: `https://www.hbomax.com/search?q=${encodeURIComponent(movieTitle)}`,
                type: 'subscription'
            }
        ];

        results.subscription = subscriptionPlatforms;

        return results;
    }

    // Gerar HTML dos botões de streaming
    renderStreamingButtons(whereToWatch) {
        if (!whereToWatch) return '';

        let html = '<div class="streaming-section">';
        html += '<h4>🎬 Onde Assistir:</h4>';
        html += '<div class="streaming-buttons">';

        // Plataformas gratuitas primeiro
        if (whereToWatch.free && whereToWatch.free.length > 0) {
            html += '<div class="free-sources"><span>🆓 Grátis:</span>';
            whereToWatch.free.forEach(platform => {
                html += `
                    <a href="${platform.searchUrl}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="streaming-btn free">
                        ${platform.icon} ${platform.name}
                    </a>
                `;
            });
            html += '</div>';
        }

        // Plataformas de assinatura
        if (whereToWatch.subscription && whereToWatch.subscription.length > 0) {
            whereToWatch.subscription.forEach(platform => {
                html += `
                    <a href="${platform.url || platform.searchUrl}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="streaming-btn">
                        ${platform.icon || '📺'} ${platform.platform || platform.name}
                    </a>
                `;
            });
        }

        html += '</div></div>';
        return html;
    }

    // Obter lista de plataformas gratuitas disponíveis
    getFreePlatforms() {
        return Object.entries(this.platforms).map(([key, platform]) => ({
            id: key,
            name: platform.name,
            icon: platform.icon,
            url: platform.freeMovies || platform.movies || platform.onDemand,
            description: this.getPlatformDescription(key)
        }));
    }

    getPlatformDescription(platformId) {
        const descriptions = {
            youtube: 'Filmes gratuitos com anúncios. Grande variedade de títulos.',
            vimeo: 'Curadoria de filmes independentes e clássicos.',
            archive: 'Milhares de filmes em domínio público. Cinema clássico gratuito.',
            openculture: 'Seleção de filmes cult e educativos gratuitos.',
            crackle: 'Filmes e séries gratuitos com anúncios.',
            tubi: 'Grande catálogo de filmes gratuitos.',
            pluto: 'TV ao vivo e on-demand gratuitos.',
            peacock: 'Parte do catálogo disponível gratuitamente.'
        };
        return descriptions[platformId] || 'Filmes gratuitos disponíveis';
    }

    // Buscar filmes em domínio público
    async getPublicDomainMovies() {
        // Filmes que sabemos que estão em domínio público
        const publicDomainList = [
            {
                id: 'pd_night_of_the_living_dead',
                title: 'A Noite dos Mortos Vivos',
                year: 1968,
                director: 'George A. Romero',
                genre: ['Terror', 'Zumbi'],
                poster: 'https://image.tmdb.org/t/p/w500/mBPCGp1GQmZ6LhVnE5IIjIbhZyC.jpg',
                url: 'https://archive.org/details/NightOfTheLivingDead1968',
                platform: 'Internet Archive',
                type: 'public_domain'
            },
            {
                id: 'pd_charade',
                title: 'Charada',
                year: 1963,
                director: 'Stanley Donen',
                genre: ['Suspense', 'Comédia'],
                poster: 'https://image.tmdb.org/t/p/w500/qPCG3WqD5fKsiVzFGMqWg7BxvRJ.jpg',
                url: 'https://archive.org/details/Charade1963',
                platform: 'Internet Archive',
                type: 'public_domain'
            },
            {
                id: 'pd_his_girl_friday',
                title: 'Jejum de Amor',
                year: 1940,
                director: 'Howard Hawks',
                genre: ['Comédia', 'Romance'],
                poster: 'https://image.tmdb.org/t/p/w500/9cWqGWIOEcBTUPEOcYMgSBVJTsI.jpg',
                url: 'https://archive.org/details/HisGirlFriday1940',
                platform: 'Internet Archive',
                type: 'public_domain'
            }
        ];

        return publicDomainList;
    }
}

// Singleton
const streamingService = new StreamingService();
window.streamingService = streamingService;