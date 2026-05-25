// js/services/legendary-service.js
// Catálogo de filmes lendários e curadoria especial

class LegendaryService {
    constructor() {
        this.legendaryMovies = CONFIG.LEGENDARY_MOVIES;
        this.catalog = this.initCatalog();
    }

    initCatalog() {
        return {
            // Filmes por diretor
            directors: {
                'Stanley Kubrick': {
                    name: 'Stanley Kubrick',
                    bio: 'Mestre do cinema, conhecido por seu perfeccionismo e inovação visual.',
                    movies: [
                        { title: '2001: Uma Odisseia no Espaço', year: 1968, rating: 8.3 },
                        { title: 'Laranja Mecânica', year: 1971, rating: 8.3 },
                        { title: 'O Iluminado', year: 1980, rating: 8.4 },
                        { title: 'Dr. Fantástico', year: 1964, rating: 8.4 },
                        { title: 'Nascido para Matar', year: 1987, rating: 8.3 }
                    ]
                },
                'Akira Kurosawa': {
                    name: 'Akira Kurosawa',
                    bio: 'O imperador do cinema japonês, influenciou gerações de cineastas.',
                    movies: [
                        { title: 'Sete Samurais', year: 1954, rating: 8.6 },
                        { title: 'Rashomon', year: 1950, rating: 8.2 },
                        { title: 'Yojimbo', year: 1961, rating: 8.2 },
                        { title: 'Ran', year: 1985, rating: 8.2 },
                        { title: 'Sonhos', year: 1990, rating: 7.7 }
                    ]
                },
                'Alfred Hitchcock': {
                    name: 'Alfred Hitchcock',
                    bio: 'O mestre do suspense, revolucionou o cinema de thriller psicológico.',
                    movies: [
                        { title: 'Psicose', year: 1960, rating: 8.5 },
                        { title: 'Janela Indiscreta', year: 1954, rating: 8.4 },
                        { title: 'Um Corpo que Cai', year: 1958, rating: 8.3 },
                        { title: 'Intriga Internacional', year: 1959, rating: 8.3 },
                        { title: 'Os Pássaros', year: 1963, rating: 7.7 }
                    ]
                },
                'Martin Scorsese': {
                    name: 'Martin Scorsese',
                    bio: 'Gênio do cinema americano, mestre em retratar a violência e redenção.',
                    movies: [
                        { title: 'Taxi Driver', year: 1976, rating: 8.2 },
                        { title: 'Os Bons Companheiros', year: 1990, rating: 8.7 },
                        { title: 'Touro Indomável', year: 1980, rating: 8.2 },
                        { title: 'O Lobo de Wall Street', year: 2013, rating: 8.2 },
                        { title: 'Os Infiltrados', year: 2006, rating: 8.5 }
                    ]
                }
            },

            // Movimentos cinematográficos
            movements: {
                'Nouvelle Vague': {
                    description: 'Revolução do cinema francês nos anos 60, quebrando regras tradicionais.',
                    movies: [
                        { title: 'Acossado', director: 'Jean-Luc Godard', year: 1960 },
                        { title: 'Os Incompreendidos', director: 'François Truffaut', year: 1959 },
                        { title: 'Hiroshima Mon Amour', director: 'Alain Resnais', year: 1959 },
                        { title: 'Jules e Jim', director: 'François Truffaut', year: 1962 }
                    ]
                },
                'Neorrealismo Italiano': {
                    description: 'Cinema que retrata a realidade crua da Itália pós-guerra.',
                    movies: [
                        { title: 'Ladrões de Bicicleta', director: 'Vittorio De Sica', year: 1948 },
                        { title: 'Roma, Cidade Aberta', director: 'Roberto Rossellini', year: 1945 },
                        { title: 'A Estrada da Vida', director: 'Federico Fellini', year: 1954 }
                    ]
                },
                'Expressionismo Alemão': {
                    description: 'Estilo visual distorcido que influenciou o cinema noir e terror.',
                    movies: [
                        { title: 'Metrópolis', director: 'Fritz Lang', year: 1927 },
                        { title: 'O Gabinete do Dr. Caligari', director: 'Robert Wiene', year: 1920 },
                        { title: 'Nosferatu', director: 'F.W. Murnau', year: 1922 }
                    ]
                },
                'Cinema Novo Brasileiro': {
                    description: 'Movimento que revolucionou o cinema brasileiro nos anos 60.',
                    movies: [
                        { title: 'Deus e o Diabo na Terra do Sol', director: 'Glauber Rocha', year: 1964 },
                        { title: 'Terra em Transe', director: 'Glauber Rocha', year: 1967 },
                        { title: 'Vidas Secas', director: 'Nelson Pereira dos Santos', year: 1963 }
                    ]
                }
            },

            // Décadas essenciais
            decades: {
                '1920-1929': {
                    label: 'Anos 20 - A Era do Cinema Mudo',
                    movies: [
                        'Metrópolis', 'O Encouraçado Potemkin', 'Em Busca do Ouro',
                        'O Garoto', 'Aurora'
                    ]
                },
                '1940-1949': {
                    label: 'Anos 40 - Era de Ouro de Hollywood',
                    movies: [
                        'Cidadão Kane', 'Casablanca', 'It\'s a Wonderful Life',
                        'O Falcão Maltês', 'Ladrões de Bicicleta'
                    ]
                },
                '1970-1979': {
                    label: 'Anos 70 - A Nova Hollywood',
                    movies: [
                        'O Poderoso Chefão', 'Taxi Driver', 'Apocalypse Now',
                        'Chinatown', 'Um Estranho no Ninho'
                    ]
                }
            },

            // Listas temáticas
            themes: {
                'Obras-Primas Absolutas': [
                    'Cidadão Kane', 'O Poderoso Chefão', '2001: Uma Odisseia no Espaço',
                    'Sete Samurais', 'O Sétimo Selo'
                ],
                'Filmes que Mudaram o Cinema': [
                    'Matrix', 'Pulp Fiction', 'Star Wars', 'Psicose',
                    'O Nascimento de uma Nação'
                ],
                'Tesouros Escondidos': [
                    'A Primeira Noite de um Homem', 'O Homem que Matou o Facínora',
                    'A Doce Vida', 'Primavera, Verão, Outono, Inverno... e Primavera'
                ],
                'Cinema Nacional Imperdível': [
                    'Central do Brasil', 'Cidade de Deus', 'O Pagador de Promessas',
                    'Pixote', 'O Auto da Compadecida'
                ]
            }
        };
    }

    // Buscar filmes de um diretor específico
    getDirectorFilms(directorName) {
        const director = this.catalog.directors[directorName];
        if (!director) return [];
        
        return {
            director: director,
            movies: director.movies
        };
    }

    // Buscar filmes de um movimento
    getMovementFilms(movementName) {
        const movement = this.catalog.movements[movementName];
        if (!movement) return [];
        
        return {
            movement: movement,
            movies: movement.movies
        };
    }

    // Buscar filmes por década
    getDecadeFilms(decade) {
        const decadeData = this.catalog.decades[decade];
        if (!decadeData) return [];
        
        return {
            label: decadeData.label,
            movies: decadeData.movies
        };
    }

    // Buscar lista temática
    getThemeList(themeName) {
        return this.catalog.themes[themeName] || [];
    }

    // Obter todos os diretores disponíveis
    getAllDirectors() {
        return Object.keys(this.catalog.directors).map(name => ({
            name,
            movieCount: this.catalog.directors[name].movies.length
        }));
    }

    // Obter todos os movimentos
    getAllMovements() {
        return Object.keys(this.catalog.movements).map(name => ({
            name,
            description: this.catalog.movements[name].description,
            movieCount: this.catalog.movements[name].movies.length
        }));
    }

    // Obter todas as décadas
    getAllDecades() {
        return Object.keys(this.catalog.decades).map(decade => ({
            decade,
            label: this.catalog.decades[decade].label,
            movieCount: this.catalog.decades[decade].movies.length
        }));
    }

    // Obter todas as listas temáticas
    getAllThemes() {
        return Object.keys(this.catalog.themes).map(theme => ({
            name: theme,
            movieCount: this.catalog.themes[theme].length
        }));
    }

    // Buscar easter eggs de um filme lendário
    getMovieEasterEggs(movieTitle) {
        const movie = this.legendaryMovies.find(m => 
            m.title.toLowerCase() === movieTitle.toLowerCase()
        );
        
        return movie?.easterEggs || [];
    }

    // Gerar HTML para seção de filme lendário
    renderLegendaryMovieCard(movie) {
        return `
            <div class="movie-card legendary-card" onclick="app.showMovieDetail('${movie.id}')">
                <div class="legendary-badge">
                    <span>👑</span> Lendário
                </div>
                <img src="${movie.poster}" 
                     alt="${movie.title}" 
                     class="movie-poster"
                     loading="lazy">
                <div class="movie-card-info">
                    <h3 class="movie-card-title">${movie.title}</h3>
                    <div class="movie-card-meta">
                        <span class="rating-badge">⭐ ${movie.rating}</span>
                        <span>${movie.year}</span>
                    </div>
                    <div class="movie-card-director">
                        Dir: ${movie.director}
                    </div>
                    ${movie.whereToWatch ? `
                        <div class="available-on">
                            📺 ${movie.whereToWatch.join(' • ')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Renderizar seção de diretor
    renderDirectorSection(directorName) {
        const directorData = this.getDirectorFilms(directorName);
        if (!directorData.director) return '';

        let html = `
            <div class="director-section cinematic-card">
                <div class="director-header">
                    <h2>🎬 ${directorData.director.name}</h2>
                    <p class="director-bio">${directorData.director.bio}</p>
                </div>
                <div class="director-movies">
                    <h3>Obras Essenciais:</h3>
                    <div class="essential-list">
        `;

        directorData.movies.forEach(movie => {
            html += `
                <div class="essential-item">
                    <span class="year">${movie.year}</span>
                    <span class="title">${movie.title}</span>
                    <span class="rating">⭐ ${movie.rating}</span>
                </div>
            `;
        });

        html += '</div></div></div>';
        return html;
    }

    // Sugerir próximo filme baseado no que o usuário gostou
    suggestNextMovie(watchedMovieTitle) {
        // Verificar se está nos lendários
        const movie = this.legendaryMovies.find(m => 
            m.title.toLowerCase() === watchedMovieTitle.toLowerCase()
        );

        if (!movie) return null;

        const suggestions = {
            'O Poderoso Chefão': ['Os Bons Companheiros', 'Era Uma Vez na América', 'Scarface'],
            'Cidadão Kane': ['O Terceiro Homem', 'Crepúsculo dos Deuses', 'Sindicato de Ladrões'],
            '2001: Uma Odisseia no Espaço': ['Solaris', 'Interestelar', 'A Chegada'],
            'Pulp Fiction': ['Cães de Aluguel', 'Snatch - Porcos e Diamantes', 'Fargo'],
            'Matrix': ['Ghost in the Shell', 'Akira', 'O Show de Truman']
        };

        return suggestions[watchedMovieTitle] || null;
    }
}

// Singleton
const legendaryService = new LegendaryService();
window.legendaryService = legendaryService;