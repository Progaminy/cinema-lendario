// ============================================
// js/app.js
// APLICATIVO PRINCIPAL DO CINEMA LENDÁRIO
// Integra todos os sistemas
// ============================================

// ============================================
// LOGIN SYSTEM
// ============================================
let currentUser = null;
let loginMode = 'login';

function checkLogin() {
    const saved = localStorage.getItem('cinema_user');
    if (saved) {
        currentUser = JSON.parse(saved);
        document.getElementById('loginOverlay').classList.add('hidden');
        updateHeaderUser();
        updateNotificationBadge();
        return true;
    }
    document.getElementById('loginOverlay').classList.remove('hidden');
    return false;
}

function toggleLoginMethod() {
    const method = document.getElementById('loginMethod').value;
    document.getElementById('emailField').style.display = method === 'email' ? 'block' : 'none';
    document.getElementById('phoneField').style.display = method === 'phone' ? 'block' : 'none';
}

function toggleLoginMode() {
    loginMode = loginMode === 'login' ? 'register' : 'login';
    document.getElementById('loginMessage').textContent = loginMode === 'register' ? 'Crie sua conta gratuitamente' : 'Entre com email ou telefone';
    document.getElementById('loginSubmitBtn').textContent = loginMode === 'register' ? '✨ Cadastrar' : '🎬 Entrar';
    document.getElementById('toggleMode').textContent = loginMode === 'register' ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastre-se';
}

function handleLogin(e) {
    e.preventDefault();
    const name = document.getElementById('loginName').value.trim();
    const method = document.getElementById('loginMethod').value;
    const password = document.getElementById('loginPassword').value;
    
    let contact = '';
    if (method === 'email') {
        contact = document.getElementById('loginEmail').value.trim();
        if (!contact) { alert('Preencha o email!'); return; }
    } else {
        const code = document.getElementById('countryCode').value;
        const phone = document.getElementById('loginPhone').value.trim();
        if (!phone) { alert('Preencha o telefone!'); return; }
        contact = code + phone;
    }
    
    if (!name || !password) { alert('Preencha todos os campos!'); return; }
    if (password.length < 4) { alert('Senha deve ter pelo menos 4 caracteres!'); return; }
    
    if (loginMode === 'login') {
        const saved = localStorage.getItem('cinema_user');
        if (saved) {
            const user = JSON.parse(saved);
            if (user.contact === contact && user.password === password) {
                currentUser = user;
                document.getElementById('loginOverlay').classList.add('hidden');
                updateHeaderUser();
                updateNotificationBadge();
                alert(`✅ Bem-vindo de volta, ${user.name}!`);
                return;
            }
            alert('❌ Dados incorretos!');
            return;
        }
        alert('❌ Nenhuma conta encontrada. Cadastre-se primeiro!');
        return;
    }
    
    const saved = localStorage.getItem('cinema_user');
    if (saved) {
        const existing = JSON.parse(saved);
        if (existing.contact === contact) {
            alert('❌ Este email/telefone já está cadastrado!');
            return;
        }
    }
    
    currentUser = {
        name, contact, method, password,
        avatar: name.charAt(0).toUpperCase(),
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('cinema_user', JSON.stringify(currentUser));
    document.getElementById('loginOverlay').classList.add('hidden');
    updateHeaderUser();
    alert(`✅ Conta criada com sucesso!\n\nBem-vindo(a), ${name}!`);
}

function logout() {
    if (confirm('Deseja sair da sua conta?')) {
        currentUser = null;
        localStorage.removeItem('cinema_user');
        document.getElementById('loginOverlay').classList.remove('hidden');
    }
}

function updateHeaderUser() {
    if (currentUser) {
        document.getElementById('headerUsername').textContent = currentUser.name;
        document.getElementById('headerAvatar').src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='35' fill='%23141414'%3E%3Ccircle cx='17' cy='17' r='17'/%3E%3Ctext x='17' y='22' text-anchor='middle' fill='%23D4AF37' font-size='16'%3E${currentUser.avatar}%3C/text%3E%3C/svg%3E`;
    }
}

// ============================================
// NAVEGAÇÃO
// ============================================
let currentCategory = 'all';

function navigateTo(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.top-nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
    
    const viewMap = { movies: 'moviesView', series: 'seriesView', explore: 'exploreView', lists: 'listsView', downloads: 'downloadsView' };
    const targetView = document.getElementById(viewMap[view]);
    if (targetView) targetView.classList.add('active');
    
    document.querySelectorAll(`.top-nav-btn[onclick*="${view}"], .bottom-nav-btn[onclick*="${view}"]`).forEach(b => b.classList.add('active'));
    
    if (view === 'movies') { initCategories(); renderMovies('all'); }
    if (view === 'series') renderSeries();
    if (view === 'lists') renderAllLists();
    if (view === 'downloads') renderDownloads();
}

// ============================================
// CATEGORIAS
// ============================================
function initCategories() {
    const scroll = document.getElementById('categoriesScroll');
    const icons = { 'Ação': '💥', 'Drama': '🎭', 'Comédia': '😂', 'Ficção Científica': '🚀', 'Terror': '👻', 'Romance': '💕', 'Animação': '🎨', 'Aventura': '🗺️' };
    scroll.innerHTML = 
        '<span class="category-chip active" onclick="filterCategory(\'all\')">📋 Todos</span>' +
        allCategories.map(cat => `<span class="category-chip" onclick="filterCategory('${cat}')">${icons[cat]||'🎬'} ${cat}</span>`).join('');
}

function filterCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
    if (event?.target) event.target.classList.add('active');
    renderMovies(cat);
}

// ============================================
// RENDER FILMES
// ============================================
function renderMovies(cat) {
    const grid = document.getElementById('moviesGrid');
    let movies = cat === 'all' ? [] : (moviesDB[cat] || []);
    if (cat === 'all') Object.values(moviesDB).forEach(arr => movies.push(...arr));
    
    grid.innerHTML = movies.map(m => `
        <div class="content-card">
            <div class="type-badge badge-movie">${m.genre}</div>
            <img src="${CONFIG.TMDB_IMAGE_URL}${m.poster}" alt="${m.title}" loading="lazy" onclick="showMovieDetail(${m.id})" onerror="this.src='https://via.placeholder.com/500x750/141414/D4AF37?text=🎬'">
            <div class="card-info" onclick="showMovieDetail(${m.id})">
                <h3>${m.title}</h3>
                <div class="card-meta"><span class="rating-badge">⭐ ${m.rating}</span><span>${m.year}</span></div>
            </div>
            <div class="card-actions">
                <button class="btn-card btn-play" onclick="event.stopPropagation(); playVideo('${esc(m.title)}', '${m.videoUrl}')">▶</button>
                <button class="btn-card btn-trailer" onclick="event.stopPropagation(); showTrailer(${m.id}, '${esc(m.title)}')">🎬</button>
                <button class="btn-card btn-download" onclick="event.stopPropagation(); downloadFile('${esc(m.title)}', '${m.videoUrl}', '${m.genre}')">⬇️</button>
                <button class="btn-card btn-list" onclick="event.stopPropagation(); addToLists('${esc(m.title)}', '${m.genre}')">📋</button>
            </div>
        </div>
    `).join('');
}

// ============================================
// RENDER SÉRIES
// ============================================
function renderSeries() {
    const grid = document.getElementById('seriesGrid');
    grid.innerHTML = seriesDB.map(s => `
        <div class="content-card">
            <div class="type-badge badge-series">📺</div>
            <img src="${CONFIG.TMDB_IMAGE_URL}${s.poster}" alt="${s.title}" loading="lazy" onclick="showSeriesDetail(${s.id})" onerror="this.src='https://via.placeholder.com/500x750/141414/9C27B0?text=📺'">
            <div class="card-info" onclick="showSeriesDetail(${s.id})">
                <h3>${s.title}</h3>
                <div class="card-meta"><span class="rating-badge">⭐ ${s.rating}</span><span>${s.year} • ${s.seasons.length}T</span></div>
            </div>
            <div class="card-actions">
                <button class="btn-card btn-list" onclick="event.stopPropagation(); addToLists('${esc(s.title)}', 'Séries')">📋</button>
                <button class="btn-card btn-download" onclick="event.stopPropagation(); downloadAllSeasons('${esc(s.title)}', ${s.id})">⬇️ Tudo</button>
            </div>
        </div>
    `).join('');
}

// ============================================
// DETALHES DO FILME
// ============================================
function showMovieDetail(id) {
    const movie = checkAndRegisterMovie(id);
    if (!movie) {
        alert('Filme não encontrado no catálogo. Use a opção de sugerir!');
        return;
    }
    
    const modal = document.getElementById('mainModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <div class="detail-grid">
            <img src="${CONFIG.TMDB_IMAGE_ORIGINAL}${movie.poster}" alt="${movie.title}" class="detail-poster" onerror="this.src='https://via.placeholder.com/500x750/141414/D4AF37?text=🎬'">
            <div>
                <span class="type-badge badge-movie" style="position:static; display:inline-block;">${movie.genre}</span>
                <h2 style="font-family:'Playfair Display',serif; font-size:clamp(1.3rem,5vw,1.8rem); margin:0.5rem 0;">${movie.title}</h2>
                <p style="color:var(--text-dim); font-size:0.85rem;">📅 ${movie.year} | ⭐ ${movie.rating}/10 | 🎬 ${movie.director}</p>
                <p style="line-height:1.7; margin:0.8rem 0; color:var(--text-dim); font-size:0.9rem;">${movie.desc}</p>
                <p style="color:var(--text-dim); font-size:0.8rem;"><strong>Elenco:</strong> ${movie.cast.join(', ')}</p>
                <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-top:0.8rem;">
                    <button class="btn btn-red" onclick="playVideo('${esc(movie.title)}', '${movie.videoUrl}')">▶ Assistir</button>
                    <button class="btn btn-orange" onclick="showTrailer(${movie.id}, '${esc(movie.title)}')">🎬 Trailer</button>
                    <button class="btn btn-green" onclick="downloadFile('${esc(movie.title)}', '${movie.videoUrl}', '${movie.genre}')">⬇️ Baixar</button>
                    <button class="btn btn-blue" onclick="addToLists('${esc(movie.title)}', '${movie.genre}'); closeModal();">📋 Lista</button>
                </div>
            </div>
        </div>
        <div class="video-container" style="margin-top:1rem;">
            <video controls poster="${CONFIG.TMDB_IMAGE_URL}${movie.poster}" style="width:100%;height:100%;">
                <source src="${movie.videoUrl}" type="video/mp4">
            </video>
        </div>`;
    
    modal.classList.add('active');
    modal.scrollTop = 0;
}

// ============================================
// DETALHES DA SÉRIE
// ============================================
function showSeriesDetail(id) {
    const series = checkAndRegisterSeries(id);
    if (!series) {
        alert('Série não encontrada no catálogo. Use a opção de sugerir!');
        return;
    }
    
    const modal = document.getElementById('mainModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <div class="detail-grid">
            <img src="${CONFIG.TMDB_IMAGE_ORIGINAL}${series.poster}" alt="${series.title}" class="detail-poster" onerror="this.src='https://via.placeholder.com/500x750/141414/9C27B0?text=📺'">
            <div>
                <span class="type-badge badge-series" style="position:static; display:inline-block;">Série</span>
                <h2 style="font-family:'Playfair Display',serif; font-size:clamp(1.3rem,5vw,1.8rem); margin:0.5rem 0;">${series.title}</h2>
                <p style="color:var(--text-dim); font-size:0.85rem;">📅 ${series.year} | ⭐ ${series.rating}/10 | ${series.seasons.length} temporadas | ${series.genre}</p>
                <p style="line-height:1.7; margin:0.8rem 0; color:var(--text-dim); font-size:0.9rem;">${series.desc}</p>
                <button class="btn btn-blue" onclick="addToLists('${esc(series.title)}', 'Séries'); closeModal();">📋 Quero Assistir</button>
                <button class="btn btn-green" onclick="downloadAllSeasons('${esc(series.title)}', ${series.id})">⬇️ Baixar Tudo</button>
            </div>
        </div>
        <div class="season-scroll" style="margin-top:1rem;">
            ${series.seasons.map((s, i) => `<span class="season-chip ${i===0?'active':''}" onclick="showEpisodes(${series.id}, ${i})">T${s.number} (${s.year})</span>`).join('')}
        </div>
        <div id="episodeContainer" style="margin-top:0.8rem;">${renderEpisodeList(series.seasons[0])}</div>`;
    
    modal.classList.add('active');
    modal.scrollTop = 0;
    window._currentSeries = series;
}

function renderEpisodeList(season) {
    return season.episodes.map(ep => `
        <div class="episode-item">
            <div style="flex:1;">
                <strong style="color:var(--gold);">Ep ${ep.number}</strong> - ${ep.title}
                <p style="color:var(--text-dim); font-size:0.75rem; margin-top:0.2rem;">${ep.desc}</p>
            </div>
            <div class="episode-buttons">
                <button class="btn btn-red" style="padding:0.3rem 0.6rem; font-size:0.7rem;" onclick="playVideo('${esc(ep.title)}', '${ep.videoUrl}')">▶</button>
                <button class="btn btn-green" style="padding:0.3rem 0.6rem; font-size:0.7rem;" onclick="downloadFile('${esc(ep.title)}', '${ep.videoUrl}', 'Série')">⬇️</button>
            </div>
        </div>
    `).join('');
}

function showEpisodes(seriesId, seasonIdx) {
    const series = window._currentSeries || getSeriesById(seriesId);
    if (!series) return;
    document.querySelectorAll('.season-chip').forEach((c, i) => c.classList.toggle('active', i === seasonIdx));
    document.getElementById('episodeContainer').innerHTML = renderEpisodeList(series.seasons[seasonIdx]);
}

// ============================================
// TRAILER
// ============================================
function showTrailer(movieId, title) {
    const modal = document.getElementById('mainModal');
    const content = document.getElementById('modalContent');
    
    const trailerUrl = checkAndRegisterTrailer(movieId);
    
    content.innerHTML = `
        <h3 style="color:#FF6600; margin-bottom:0.8rem;">🎬 Trailer - ${title}</h3>
        <div class="video-container">
            <video controls autoplay playsinline style="width:100%;height:100%;">
                <source src="${trailerUrl}" type="video/mp4">
            </video>
        </div>
        <p style="color:var(--text-dim); font-size:0.7rem; margin-top:0.3rem;">${trailerUrl === GENERIC_MOVIE_TRAILER ? 'Trailer genérico (fallback)' : 'Trailer específico'}</p>
        <button class="btn btn-gold" onclick="closeModal()" style="margin-top:0.8rem;">🔙 Voltar</button>`;
    
    modal.classList.add('active');
    modal.scrollTop = 0;
}

// ============================================
// PLAYER
// ============================================
function playVideo(title, url) {
    const modal = document.getElementById('mainModal');
    const content = document.getElementById('modalContent');
    content.innerHTML = `
        <h3 style="color:var(--gold); margin-bottom:0.8rem;">▶ ${title}</h3>
        <div class="video-container">
            <video controls autoplay playsinline style="width:100%;height:100%;">
                <source src="${url}" type="video/mp4">
            </video>
        </div>
        <div style="margin-top:0.8rem; display:flex; gap:0.4rem;">
            <button class="btn btn-green" onclick="downloadFile('${esc(title)}', '${url}', 'Video')">⬇️ Baixar</button>
            <button class="btn btn-gold" onclick="closeModal()">🔙 Voltar</button>
        </div>`;
    modal.classList.add('active');
    modal.scrollTop = 0;
}

// ============================================
// DOWNLOADS
// ============================================
function downloadFile(title, url, type) {
    try {
        const filename = title.replace(/[^a-zA-Z0-9À-ú \-_]/g, '').slice(0, 60) + '.mp4';
        
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = filename;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);
                
                const downloads = JSON.parse(localStorage.getItem('cinema_downloads') || '[]');
                if (!downloads.find(d => d.title === title)) {
                    downloads.push({
                        title, url, type,
                        size: (blob.size / 1024 / 1024).toFixed(1) + ' MB',
                        date: new Date().toISOString(),
                        status: 'completed'
                    });
                    localStorage.setItem('cinema_downloads', JSON.stringify(downloads));
                }
                
                alert(`✅ Download concluído!\n\n"${title}"\nTamanho: ${(blob.size / 1024 / 1024).toFixed(1)} MB`);
            })
            .catch(() => {
                window.open(url, '_blank');
                alert(`⬇️ Download iniciado: "${title}"`);
            });
    } catch (e) {
        window.open(url, '_blank');
    }
}

function downloadAllSeasons(title, seriesId) {
    const series = getSeriesById(seriesId);
    if (!series) return;
    
    let totalEps = 0;
    series.seasons.forEach(s => totalEps += s.episodes.length);
    
    if (confirm(`⬇️ Baixar ${totalEps} episódios de "${title}"?`)) {
        let count = 0;
        series.seasons.forEach(season => {
            season.episodes.forEach(ep => {
                setTimeout(() => {
                    downloadFile(`${title} S${season.number}E${ep.number} - ${ep.title}`, ep.videoUrl, 'Série');
                }, count * 600);
                count++;
            });
        });
        alert(`⬇️ Iniciando download de ${totalEps} episódios!`);
    }
}

function renderDownloads() {
    const container = document.getElementById('downloadsContent');
    const downloads = JSON.parse(localStorage.getItem('cinema_downloads') || '[]');
    
    if (downloads.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhum download ainda.</p>';
        return;
    }
    
    container.innerHTML = downloads.reverse().map(d => `
        <div style="background:var(--elevated); padding:0.8rem; border-radius:8px; margin-bottom:0.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                <div style="flex:1;">
                    <strong style="font-size:0.9rem;">${d.title}</strong>
                    <p style="color:var(--text-dim); font-size:0.7rem;">${d.size || ''} • ${d.type} • ${new Date(d.date).toLocaleDateString('pt-BR')}</p>
                </div>
                <div style="display:flex; gap:0.3rem; align-items:center;">
                    <span style="color:#4CAF50;">✅</span>
                    <button class="btn btn-red" style="padding:0.3rem 0.6rem; font-size:0.7rem;" onclick="playVideo('${esc(d.title)}', '${d.url}')">▶</button>
                    <button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:1rem;" onclick="deleteDownload('${esc(d.title)}')">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

function deleteDownload(title) {
    let downloads = JSON.parse(localStorage.getItem('cinema_downloads') || '[]');
    downloads = downloads.filter(d => d.title !== title);
    localStorage.setItem('cinema_downloads', JSON.stringify(downloads));
    renderDownloads();
}

// ============================================
// LISTAS
// ============================================
function addToLists(title, genre) {
    addToList('watchlist', title, genre);
    if (genre.includes('Drama')) addToList('drama', title, genre);
    if (genre.includes('Comédia') || genre.includes('Comedia')) addToList('comedy', title, genre);
    if (genre.includes('Ficção')) addToList('scifi', title, genre);
    if (genre.includes('Terror')) addToList('horror', title, genre);
    if (genre.includes('Ação') || genre.includes('Acao')) addToList('action', title, genre);
    if (genre.includes('Romance')) addToList('romance', title, genre);
    if (genre === 'Séries') addToList('seriesList', title, genre);
    alert(`✅ "${title}" adicionado às listas!`);
}

function addToList(listKey, title, genre) {
    const items = JSON.parse(localStorage.getItem(`cinema_${listKey}`) || '[]');
    if (!items.find(i => i.title === title)) {
        items.push({ title, genre, date: new Date().toISOString() });
        localStorage.setItem(`cinema_${listKey}`, JSON.stringify(items));
    }
}

function removeFromList(listKey, title) {
    let items = JSON.parse(localStorage.getItem(`cinema_${listKey}`) || '[]');
    items = items.filter(i => i.title !== title);
    localStorage.setItem(`cinema_${listKey}`, JSON.stringify(items));
    renderAllLists();
}

function renderAllLists() {
    renderListSection('watchlist', 'watchlistContent');
    renderListSection('drama', 'dramaContent');
    renderListSection('comedy', 'comedyContent');
    renderListSection('scifi', 'scifiContent');
    renderListSection('horror', 'horrorContent');
    renderListSection('action', 'actionContent');
    renderListSection('romance', 'romanceContent');
    renderListSection('seriesList', 'seriesListContent');
}

function renderListSection(listKey, elId) {
    const container = document.getElementById(elId);
    const items = JSON.parse(localStorage.getItem(`cinema_${listKey}`) || '[]');
    
    if (items.length === 0) {
        container.innerHTML = '<p style="color:var(--text-dim); text-align:center; padding:0.5rem; font-size:0.8rem;">Vazio</p>';
        return;
    }
    
    container.innerHTML = items.map(item => `
        <div class="list-item">
            <span style="flex:1; cursor:pointer; font-size:0.85rem;" onclick="findAndPlay('${esc(item.title)}')">🎬 ${item.title}</span>
            <button class="btn btn-red" style="padding:0.3rem 0.6rem; font-size:0.7rem;" onclick="findAndPlay('${esc(item.title)}')">▶</button>
            <button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:1rem;" onclick="removeFromList('${listKey}', '${esc(item.title)}')">🗑️</button>
        </div>
    `).join('');
}

function findAndPlay(title) {
    // Buscar nos filmes
    for (const category of Object.values(moviesDB)) {
        const m = category.find(m => m.title === title);
        if (m) { playVideo(m.title, m.videoUrl); return; }
    }
    // Buscar nas séries
    for (const s of seriesDB) {
        if (s.title === title) { showSeriesDetail(s.id); return; }
        for (const season of s.seasons) {
            const ep = season.episodes.find(e => e.title === title);
            if (ep) { playVideo(ep.title, ep.videoUrl); return; }
        }
    }
    alert(`"${title}" está nas suas listas!`);
}

// ============================================
// EXPLORAR (BUSCA LOCAL)
// ============================================
function searchLocal() {
    const query = document.getElementById('searchInput')?.value.trim().toLowerCase();
    const grid = document.getElementById('exploreGrid');
    
    if (!query) {
        grid.innerHTML = '<p class="empty-state">Digite para buscar no catálogo</p>';
        return;
    }
    
    const movieResults = searchMovies(query);
    const seriesResults = searchSeries(query);
    
    const allResults = [
        ...movieResults.map(m => ({ ...m, resultType: 'movie' })),
        ...seriesResults.map(s => ({ ...s, resultType: 'series' }))
    ];
    
    if (allResults.length === 0) {
        grid.innerHTML = '<p class="empty-state">Nenhum resultado encontrado. Use a opção de sugerir abaixo!</p>';
        return;
    }
    
    grid.innerHTML = allResults.map(item => {
        if (item.resultType === 'series') {
            return `
            <div class="content-card" onclick="showSeriesDetail(${item.id})">
                <div class="type-badge badge-series">📺</div>
                <img src="${CONFIG.TMDB_IMAGE_URL}${item.poster}" alt="${item.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/500x750/141414/9C27B0?text=📺'">
                <div class="card-info">
                    <h3>${item.title}</h3>
                    <div class="card-meta"><span class="rating-badge">⭐ ${item.rating}</span><span>${item.year} • ${item.seasons.length}T</span></div>
                </div>
                <div class="card-actions">
                    <button class="btn-card btn-list" onclick="event.stopPropagation(); addToLists('${esc(item.title)}', 'Séries')">📋</button>
                    <button class="btn-card btn-download" onclick="event.stopPropagation(); downloadAllSeasons('${esc(item.title)}', ${item.id})">⬇️</button>
                </div>
            </div>`;
        } else {
            return `
            <div class="content-card" onclick="showMovieDetail(${item.id})">
                <div class="type-badge badge-movie">${item.genre}</div>
                <img src="${CONFIG.TMDB_IMAGE_URL}${item.poster}" alt="${item.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/500x750/141414/D4AF37?text=🎬'">
                <div class="card-info">
                    <h3>${item.title}</h3>
                    <div class="card-meta"><span class="rating-badge">⭐ ${item.rating}</span><span>${item.year}</span></div>
                </div>
                <div class="card-actions">
                    <button class="btn-card btn-play" onclick="event.stopPropagation(); playVideo('${esc(item.title)}', '${item.videoUrl}')">▶</button>
                    <button class="btn-card btn-trailer" onclick="event.stopPropagation(); showTrailer(${item.id}, '${esc(item.title)}')">🎬</button>
                    <button class="btn-card btn-download" onclick="event.stopPropagation(); downloadFile('${esc(item.title)}', '${item.videoUrl}', '${item.genre}')">⬇️</button>
                    <button class="btn-card btn-list" onclick="event.stopPropagation(); addToLists('${esc(item.title)}', '${item.genre}')">📋</button>
                </div>
            </div>`;
        }
    }).join('');
}

// ============================================
// SUGESTÕES
// ============================================
function suggestContent() {
    const title = document.getElementById('suggestInput')?.value.trim();
    const type = document.getElementById('suggestType')?.value;
    
    if (!title || title.length < 2) {
        alert('Digite um título válido!');
        return;
    }
    
    if (userSuggest(title, type)) {
        document.getElementById('suggestInput').value = '';
    }
}

// ============================================
// NOTIFICAÇÕES
// ============================================
function openNotifications() {
    if (!currentUser) {
        alert('Faça login para ver notificações!');
        return;
    }
    
    const notifications = getUserNotifications();
    const modal = document.getElementById('mainModal');
    const content = document.getElementById('modalContent');
    
    if (notifications.length === 0) {
        content.innerHTML = `
            <h3 style="color:var(--gold);">🔔 Notificações</h3>
            <p class="empty-state">Nenhuma notificação ainda</p>
            <button class="btn btn-gold" onclick="closeModal()">🔙 Voltar</button>`;
    } else {
        content.innerHTML = `
            <h3 style="color:var(--gold);">🔔 Notificações (${notifications.length})</h3>
            <button class="btn btn-blue" onclick="markAllNotificationsAsRead(); openNotifications();" style="margin-bottom:1rem;">✅ Marcar todas como lidas</button>
            ${notifications.reverse().map(n => `
                <div style="background:var(--elevated); padding:0.8rem; border-radius:8px; margin-bottom:0.5rem; ${n.read ? 'opacity:0.6;' : ''}">
                    <p><strong>${n.title}</strong></p>
                    <p style="color:var(--text-dim); font-size:0.85rem;">${n.message}</p>
                    <p style="color:var(--text-dim); font-size:0.7rem;">${new Date(n.date).toLocaleDateString('pt-BR')}</p>
                    ${!n.read ? `<button class="btn btn-gold" style="padding:0.2rem 0.5rem; font-size:0.7rem;" onclick="markNotificationAsRead(${n.id}); openNotifications();">Marcar lida</button>` : '<span style="color:#4CAF50; font-size:0.7rem;">✅ Lida</span>'}
                </div>
            `).join('')}
            <button class="btn btn-gold" onclick="closeModal()">🔙 Voltar</button>`;
    }
    
    modal.classList.add('active');
    modal.scrollTop = 0;
}

function updateNotificationBadge() {
    const badge = document.getElementById('notifBadge');
    const count = getUnreadNotificationsCount();
    badge.innerHTML = count > 0 ? `<span style="background:#E50914; color:#FFF; border-radius:50%; padding:0.1rem 0.4rem; font-size:0.65rem; position:absolute; top:-8px; right:-8px;">${count}</span>` : '';
}

// ============================================
// ADMIN
// ============================================
function openAdmin() {
    const code = prompt('🔐 Digite o código de administrador:');
    if (!code) return;
    
    if (adminLogin(code)) {
        const modal = document.getElementById('mainModal');
        const content = document.getElementById('modalContent');
        content.innerHTML = renderAdminPanel();
        modal.classList.add('active');
        modal.scrollTop = 0;
    } else {
        alert('❌ Código incorreto!');
    }
}

// ============================================
// UTILITÁRIOS
// ============================================
function esc(str) { return (str || '').replace(/'/g, "\\'").replace(/"/g, '\\"'); }
function closeModal() { document.getElementById('mainModal').classList.remove('active'); }

document.getElementById('mainModal').addEventListener('click', function(e) { if (e.target === this) closeModal(); });
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
    // Atalho admin: Ctrl+Shift+A
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        openAdmin();
    }
});

// ============================================
// INIT
// ============================================
function init() {
    checkLogin();
    initCategories();
    renderMovies('all');
    updateNotificationBadge();
    
    // Atualizar badge a cada 30 segundos
    setInterval(updateNotificationBadge, 30000);
    
    console.log('🎬 Cinema Lendário 100% FUNCIONAL!');
    console.log('✅ Login com email/telefone (Moçambique primeiro)');
    console.log('✅ Catálogo completo de filmes e séries');
    console.log('✅ Trailers específicos + fallback');
    console.log('✅ Downloads reais');
    console.log('✅ Listas por categoria');
    console.log('✅ Busca local');
    console.log('✅ Sugestões de conteúdo');
    console.log('✅ Sistema Admin (Ctrl+Shift+A)');
    console.log('✅ Notificações');
    console.log('🔑 Código Admin: luz299792456');
}

init();