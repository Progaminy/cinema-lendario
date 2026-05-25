// js/app.js
// Aplicativo principal do Cinema Lendário

class CinemaLendarioApp {
    constructor() {
        this.currentView = 'home';
        this.currentMovie = null;
        this.searchTimeout = null;
        this.init();
    }

    async init() {
        console.log('🎬 Inicializando Cinema Lendário...');
        
        // Esconder loading
        setTimeout(() => {
            document.getElementById('loading')?.classList.add('hidden');
        }, 1500);

        // Inicializar banco de dados
        await cinemaDB.init();
        console.log('✅ Banco de dados pronto');

        // Carregar dados iniciais
        await this.loadInitialData();

        // Configurar navegação
        this.setupNavigation();
        
        // Configurar busca
        this.setupSearch();
        
        // Configurar filtros
        this.setupFilters();

        // Carregar view inicial
        await this.loadHomeView();

        console.log('✅ Cinema Lendário pronto!');
    }

    async loadInitialData() {
        try {
            // Popular filmes lendários no banco
            const legendaryMovies = CONFIG.LEGENDARY_MOVIES;
            for (const movie of legendaryMovies) {
                await cinemaDB.put('legendaryMovies', movie);
            }

            // Popular plataformas de streaming
            const platforms = streamingService.getFreePlatforms();
            for (const platform of platforms) {
                await cinemaDB.put('streamingPlatforms', platform);
            }

            console.log('📦 Dados iniciais carregados');
        } catch (error) {
            console.error('Erro ao carregar dados iniciais:', error);
        }
    }

    setupNavigation() {
        // Botões de navegação
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const view = btn.dataset.view;
                await this.navigateTo(view);
            });
        });

        // Fechar modal
        document.querySelector('.close')?.addEventListener('click', () => {
            document.getElementById('movieModal').classList.remove('active');
        });

        // Fechar modal clicando fora
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('movieModal');
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    async navigateTo(view) {
        // Atualizar botões
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        // Esconder todas as views
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

        // Mostrar view selecionada
        const viewElement = document.getElementById(`${view}View`);
        if (viewElement) {
            viewElement.classList.add('active');
            this.currentView = view;

            // Carregar conteúdo da view
            switch(view) {
                case 'home':
                    await this.loadHomeView();
                    break;
                case 'legendary':
                    await this.loadLegendaryView();
                    break;
                case 'streaming':
                    await this.loadStreamingView();
                    break;
                case 'explore':
                    await this.loadExploreView();
                    break;
                case 'lists':
                    await this.loadListsView();
                    break;
            }
        }
    }

    async loadHomeView() {
        const featuredContainer = document.getElementById('featuredMovies');
        const popularContainer = document.getElementById('popularMovies');

        if (!featuredContainer || !popularContainer) return;

        // Carregar filmes em destaque (lendários + populares)
        const legendaryMovies = await cinemaDB.getAll('legendaryMovies');
        featuredContainer.innerHTML = movieCardComponent.renderMovieGrid(
            legendaryMovies.slice(0, 5), 
            'legendary'
        );

        // Carregar filmes populares da API
        try {
            const cachedMovies = await cinemaDB.getCachedMovies(20);
            
            if (cachedMovies.length > 0) {
                popularContainer.innerHTML = movieCardComponent.renderMovieGrid(
                    cachedMovies, 
                    'api'
                );
            }

            // Buscar novos filmes da API
            const response = await fetch(
                `${CONFIG.TMDB_BASE_URL}/movie/popular?api_key=${CONFIG.TMDB_API_KEY}&language=pt-BR&page=1`
            );
            const data = await response.json();
            
            if (data.results) {
                await cinemaDB.cacheMovies(data.results);
                popularContainer.innerHTML = movieCardComponent.renderMovieGrid(
                    data.results, 
                    'api'
                );
            }
        } catch (error) {
            console.error('Erro ao carregar filmes populares:', error);
            // Mostrar cache se disponível
            const cached = await cinemaDB.getCachedMovies(20);
            if (cached.length > 0) {
                popularContainer.innerHTML = movieCardComponent.renderMovieGrid(cached, 'api');
            }
        }
    }

    async loadLegendaryView() {
        const container = document.getElementById('legendaryMovies');
        if (!container) return;

        // Carregar filmes lendários
        const legendaryMovies = CONFIG.LEGENDARY_MOVIES;
        container.innerHTML = movieCardComponent.renderMovieGrid(legendaryMovies, 'legendary');

        // Configurar filtros de diretor
        const directorFilter = document.getElementById('directorFilter');
        const movementFilter = document.getElementById('movementFilter');

        if (directorFilter) {
            directorFilter.addEventListener('change', async (e) => {
                const director = e.target.value;
                if (!director) {
                    container.innerHTML = movieCardComponent.renderMovieGrid(legendaryMovies, 'legendary');
                    return;
                }

                const directorData = legendaryService.getDirectorFilms(
                    this.getDirectorFullName(director)
                );
                
                if (directorData.movies) {
                    // Buscar na API TMDB pelos filmes do diretor
                    const movies = await this.searchMoviesByDirector(directorData.director.name);
                    container.innerHTML = movieCardComponent.renderMovieGrid(movies, 'api');
                }
            });
        }

        if (movementFilter) {
            movementFilter.addEventListener('change', (e) => {
                const movement = e.target.value;
                // Implementar filtro por movimento
            });
        }
    }

    async loadStreamingView() {
        const publicDomainContainer = document.getElementById('publicDomainMovies');
        if (!publicDomainContainer) return;

        // Carregar filmes em domínio público
        const publicDomainMovies = await streamingService.getPublicDomainMovies();
        publicDomainContainer.innerHTML = movieCardComponent.renderMovieGrid(
            publicDomainMovies, 
            'public_domain'
        );
    }

    async loadExploreView() {
        // Implementar busca e filtros avançados
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }

    async loadListsView() {
        // Carregar listas do usuário
        const watchlist = await cinemaDB.getList('watchlist');
        const watched = await cinemaDB.getList('watched');
        const favorites = await cinemaDB.getList('favorites');

        this.renderUserList('watchlist', watchlist);
        this.renderUserList('watched', watched);
        this.renderUserList('favorites', favorites);
    }

    renderUserList(containerId, items) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!items || items.length === 0) {
            container.innerHTML = '<p class="empty-list">Nenhum filme adicionado ainda</p>';
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="list-item" onclick="app.showMovieDetail('${item.movieId}')">
                <span class="list-item-title">${item.title}</span>
                <span class="list-item-rating">⭐ ${item.rating || 'N/A'}</span>
            </div>
        `).join('');
    }

    async showMovieDetail(movieId) {
        try {
            // Buscar filme no cache ou API
            let movie = await cinemaDB.get('movies', movieId);
            
            if (!movie) {
                // Buscar da API
                const response = await fetch(
                    `${CONFIG.TMDB_BASE_URL}/movie/${movieId}?api_key=${CONFIG.TMDB_API_KEY}&language=pt-BR`
                );
                movie = await response.json();
                await cinemaDB.cacheMovie(movie);
            }

            // Buscar onde assistir
            const whereToWatch = await streamingService.findWhereToWatch(movie.title, movie.release_date);

            // Renderizar detalhes
            const detailContainer = document.getElementById('movieDetail');
            if (detailContainer) {
                detailContainer.innerHTML = movieCardComponent.renderMovieDetail(movie, whereToWatch);
            }

            // Mostrar modal
            const modal = document.getElementById('movieModal');
            modal.classList.add('active');

            // Adicionar ao histórico
            await cinemaDB.addToHistory(movie);

        } catch (error) {
            console.error('Erro ao mostrar detalhes do filme:', error);
            alert('Erro ao carregar detalhes do filme');
        }
    }

    async addToWatchlist(movieId) {
        const movie = await cinemaDB.get('movies', movieId);
        if (movie) {
            await cinemaDB.addToList('watchlist', movie);
            alert('✅ Adicionado à Watchlist!');
        }
    }

    async markAsWatched(movieId) {
        const movie = await cinemaDB.get('movies', movieId);
        if (movie) {
            await cinemaDB.addToList('watched', movie);
            await cinemaDB.addToHistory(movie);
            alert('✅ Marcado como Assistido!');
        }
    }

    async toggleFavorite(movieId) {
        const movie = await cinemaDB.get('movies', movieId);
        if (movie) {
            const isFavorite = await cinemaDB.isInList('favorites', movieId);
            if (isFavorite) {
                await cinemaDB.removeFromList('favorites', movieId);
                alert('💔 Removido dos Favoritos');
            } else {
                await cinemaDB.addToList('favorites', movie);
                alert('❤️ Adicionado aos Favoritos!');
            }
        }
    }

    async searchMovies(query) {
        try {
            const response = await fetch(
                `${CONFIG.TMDB_BASE_URL}/search/movie?api_key=${CONFIG.TMDB_API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}&page=1`
            );
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Erro na busca:', error);
            return [];
        }
    }

    async searchMoviesByDirector(director) {
        try {
            // Buscar pessoa (diretor)
            const personResponse = await fetch(
                `${CONFIG.TMDB_BASE_URL}/search/person?api_key=${CONFIG.TMDB_API_KEY}&query=${encodeURIComponent(director)}`
            );
            const personData = await personResponse.json();
            
            if (personData.results && personData.results.length > 0) {
                const directorId = personData.results[0].id;
                // Buscar filmes do diretor
                const moviesResponse = await fetch(
                    `${CONFIG.TMDB_BASE_URL}/person/${directorId}/movie_credits?api_key=${CONFIG.TMDB_API_KEY}&language=pt-BR`
                );
                const moviesData = await moviesResponse.json();
                return moviesData.crew || [];
            }
            return [];
        } catch (error) {
            console.error('Erro ao buscar filmes do diretor:', error);
            return [];
        }
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const searchResults = document.getElementById('searchResults');

        if (!searchInput || !searchResults) return;

        // Busca em tempo real
        searchInput.addEventListener('input', (e) => {
            clearTimeout(this.searchTimeout);
            const query = e.target.value.trim();

            if (query.length < 3) {
                searchResults.innerHTML = '';
                return;
            }

            this.searchTimeout = setTimeout(async () => {
                searchResults.innerHTML = '<div class="loading-shimmer">Buscando...</div>';
                const movies = await this.searchMovies(query);
                searchResults.innerHTML = movieCardComponent.renderMovieGrid(movies, 'api');
            }, 500);
        });

        // Busca por botão
        if (searchBtn) {
            searchBtn.addEventListener('click', async () => {
                const query = searchInput.value.trim();
                if (query.length < 3) {
                    alert('Digite pelo menos 3 caracteres');
                    return;
                }
                const movies = await this.searchMovies(query);
                searchResults.innerHTML = movieCardComponent.renderMovieGrid(movies, 'api');
            });
        }
    }

    setupFilters() {
        // Filtros de categoria na home
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const genre = btn.dataset.genre;
                if (genre === 'all') {
                    await this.loadHomeView();
                    return;
                }

                // Buscar filmes por gênero
                try {
                    const response = await fetch(
                        `${CONFIG.TMDB_BASE_URL}/discover/movie?api_key=${CONFIG.TMDB_API_KEY}&language=pt-BR&with_genres=${this.getGenreId(genre)}&sort_by=popularity.desc`
                    );
                    const data = await response.json();
                    
                    const popularContainer = document.getElementById('popularMovies');
                    if (popularContainer && data.results) {
                        popularContainer.innerHTML = movieCardComponent.renderMovieGrid(data.results, 'api');
                    }
                } catch (error) {
                    console.error('Erro ao filtrar:', error);
                }
            });
        });

        // Filtro de ano
        const yearRange = document.getElementById('yearRange');
        const yearValue = document.getElementById('yearValue');
        if (yearRange && yearValue) {
            yearRange.addEventListener('input', (e) => {
                yearValue.textContent = e.target.value;
            });
        }
    }

    getGenreId(genre) {
        const genres = {
            action: 28,
            drama: 18,
            scifi: 878,
            classic: 9648, // Mistério (aproximação)
            comedy: 35,
            horror: 27,
            romance: 10749,
            documentary: 99
        };
        return genres[genre] || 28;
    }

    getDirectorFullName(shortName) {
        const names = {
            kubrick: 'Stanley Kubrick',
            kurosawa: 'Akira Kurosawa',
            hitchcock: 'Alfred Hitchcock',
            fellini: 'Federico Fellini',
            scorsese: 'Martin Scorsese'
        };
        return names[shortName] || shortName;
    }

    // Estatísticas do app
    async getAppStats() {
        return await cinemaDB.getStats();
    }
}

// Inicializar o app quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CinemaLendarioApp();
});

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('✅ Service Worker registrado:', registration.scope);
            })
            .catch(error => {
                console.log('❌ Service Worker falhou:', error);
            });
    });
}