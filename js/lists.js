// ============================================
// js/lists.js
// SISTEMA DE LISTAS DO USUÁRIO
// Watchlist, Favoritos, Categorias
// ============================================

class ListsSystem {
    constructor() {
        this.lists = {
            watchlist: { key: 'watchlist', name: '🎯 Quero Assistir', icon: '🎯' },
            drama: { key: 'drama', name: '🎭 Drama', icon: '🎭' },
            comedy: { key: 'comedy', name: '😂 Comédia', icon: '😂' },
            scifi: { key: 'scifi', name: '🚀 Ficção Científica', icon: '🚀' },
            horror: { key: 'horror', name: '👻 Terror', icon: '👻' },
            action: { key: 'action', name: '💥 Ação', icon: '💥' },
            romance: { key: 'romance', name: '💕 Romance', icon: '💕' },
            seriesList: { key: 'seriesList', name: '📺 Séries', icon: '📺' }
        };
        
        this.loadAllLists();
    }

    // ============================================
    // CARREGAR TODAS AS LISTAS
    // ============================================
    loadAllLists() {
        Object.keys(this.lists).forEach(key => {
            this.lists[key].items = this.loadList(key);
        });
    }

    loadList(listKey) {
        try {
            const saved = localStorage.getItem(`cinema_${listKey}`);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    saveList(listKey) {
        try {
            const items = this.lists[listKey]?.items || [];
            localStorage.setItem(`cinema_${listKey}`, JSON.stringify(items));
        } catch (e) {
            console.error(`Erro ao salvar lista ${listKey}:`, e);
        }
    }

    // ============================================
    // ADICIONAR ÀS LISTAS (MÚLTIPLAS CATEGORIAS)
    // ============================================
    addToLists(title, genre) {
        if (!title) return;

        // Sempre adicionar à watchlist
        this.addToList('watchlist', title, genre);

        // Adicionar às categorias específicas
        if (genre) {
            const genreLower = genre.toLowerCase();
            
            if (genreLower.includes('drama')) this.addToList('drama', title, genre);
            if (genreLower.includes('comédia') || genreLower.includes('comedia')) this.addToList('comedy', title, genre);
            if (genreLower.includes('ficção') || genreLower.includes('ficcao') || genreLower.includes('científica')) this.addToList('scifi', title, genre);
            if (genreLower.includes('terror')) this.addToList('horror', title, genre);
            if (genreLower.includes('ação') || genreLower.includes('acao')) this.addToList('action', title, genre);
            if (genreLower.includes('romance')) this.addToList('romance', title, genre);
            if (genreLower.includes('série') || genreLower.includes('serie')) this.addToList('seriesList', title, genre);
        }

        // Notificar
        const addedCategories = this.getCategoriesForGenre(genre);
        const categoryNames = addedCategories
            .map(key => this.lists[key]?.name)
            .filter(Boolean)
            .join(', ');

        alert(`✅ "${title}" adicionado com sucesso!\n\n📋 Listas: ${categoryNames || 'Watchlist'}`);
        
        // Atualizar UI se estiver na página de listas
        if (document.getElementById('listsView')?.classList.contains('active')) {
            this.renderAllLists();
        }
    }

    addToList(listKey, title, genre) {
        if (!this.lists[listKey]) return;

        const items = this.lists[listKey].items;
        
        // Verificar se já existe
        const exists = items.find(i => i.title === title);
        if (!exists) {
            items.push({
                title: title,
                genre: genre || '',
                date: new Date().toISOString()
            });
            this.saveList(listKey);
            console.log(`📋 "${title}" adicionado à lista: ${this.lists[listKey].name}`);
        }
    }

    // ============================================
    // REMOVER DA LISTA
    // ============================================
    removeFromList(listKey, title) {
        if (!this.lists[listKey]) return;

        const items = this.lists[listKey].items;
        const index = items.findIndex(i => i.title === title);
        
        if (index !== -1) {
            items.splice(index, 1);
            this.saveList(listKey);
            this.renderAllLists();
            console.log(`🗑️ "${title}" removido da lista: ${this.lists[listKey].name}`);
        }
    }

    // ============================================
    // VERIFICAR SE ESTÁ NA LISTA
    // ============================================
    isInList(listKey, title) {
        if (!this.lists[listKey]) return false;
        return this.lists[listKey].items.some(i => i.title === title);
    }

    // ============================================
    // OBTER CATEGORIAS PARA UM GÊNERO
    // ============================================
    getCategoriesForGenre(genre) {
        if (!genre) return ['watchlist'];
        
        const categories = ['watchlist'];
        const genreLower = genre.toLowerCase();
        
        if (genreLower.includes('drama')) categories.push('drama');
        if (genreLower.includes('comédia') || genreLower.includes('comedia')) categories.push('comedy');
        if (genreLower.includes('ficção') || genreLower.includes('ficcao')) categories.push('scifi');
        if (genreLower.includes('terror')) categories.push('horror');
        if (genreLower.includes('ação') || genreLower.includes('acao')) categories.push('action');
        if (genreLower.includes('romance')) categories.push('romance');
        if (genreLower.includes('série') || genreLower.includes('serie')) categories.push('seriesList');
        
        return categories;
    }

    // ============================================
    // RENDERIZAR TODAS AS LISTAS
    // ============================================
    renderAllLists() {
        Object.keys(this.lists).forEach(key => {
            this.renderListSection(key);
        });
    }

    renderListSection(listKey) {
        const list = this.lists[listKey];
        if (!list) return;

        // Mapear para IDs dos containers
        const containerIds = {
            watchlist: 'watchlistContent',
            drama: 'dramaContent',
            comedy: 'comedyContent',
            scifi: 'scifiContent',
            horror: 'horrorContent',
            action: 'actionContent',
            romance: 'romanceContent',
            seriesList: 'seriesListContent'
        };

        const containerId = containerIds[listKey];
        const container = document.getElementById(containerId);
        if (!container) return;

        const items = list.items || [];

        if (items.length === 0) {
            container.innerHTML = `
                <p style="color:var(--text-dim); text-align:center; padding:0.8rem; font-size:0.8rem;">
                    Nenhum item nesta lista ainda
                </p>`;
            return;
        }

        container.innerHTML = items.map((item, index) => `
            <div class="list-item">
                <span style="flex:1; cursor:pointer; font-size:0.85rem;" 
                      onclick="listsSystem.findAndPlay('${this.escapeAttr(item.title)}')" 
                      title="Clique para assistir">
                    🎬 <strong>${this.escapeHTML(item.title)}</strong>
                    ${item.genre ? `<small style="color:var(--text-dim); display:block; font-size:0.7rem;">${this.escapeHTML(item.genre)}</small>` : ''}
                </span>
                <div style="display:flex; gap:0.3rem; align-items:center;">
                    <button class="btn btn-red" style="padding:0.3rem 0.6rem; font-size:0.7rem;" 
                            onclick="event.stopPropagation(); listsSystem.findAndPlay('${this.escapeAttr(item.title)}')" 
                            title="Assistir">▶</button>
                    <button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:1.1rem;" 
                            onclick="event.stopPropagation(); listsSystem.removeFromList('${listKey}', '${this.escapeAttr(item.title)}')" 
                            title="Remover">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    // ============================================
    // ENCONTRAR E REPRODUZIR
    // ============================================
    findAndPlay(title) {
        if (!title) return;

        // Buscar nos filmes
        const movie = moviesSystem.getMovieById(
            moviesSystem.getAllMovies().find(m => m.title === title)?.id
        );
        
        if (movie) {
            moviesSystem.showMovieDetail(movie.id);
            return;
        }

        // Buscar nas séries
        const series = seriesSystem.getAllSeries().find(s => s.title === title);
        if (series) {
            seriesSystem.showSeriesDetail(series.id);
            return;
        }

        // Buscar nos episódios
        for (const s of seriesSystem.getAllSeries()) {
            for (const season of (s.seasons || [])) {
                for (const ep of (season.episodes || [])) {
                    if (ep.title === title) {
                        playerSystem.playVideo(ep.title, ep.videoUrl || CONFIG.SUPABASE_VIDEOS.assistir[0]);
                        return;
                    }
                }
            }
        }

        alert(`"${title}" está nas suas listas, mas não foi encontrado no catálogo atual.`);
    }

    // ============================================
    // OBTER TODOS OS ITENS DE UMA LISTA
    // ============================================
    getListItems(listKey) {
        return this.lists[listKey]?.items || [];
    }

    // ============================================
    // CONTAR ITENS
    // ============================================
    getListCount(listKey) {
        return this.getListItems(listKey).length;
    }

    getTotalItems() {
        let total = 0;
        Object.keys(this.lists).forEach(key => {
            total += this.getListCount(key);
        });
        return total;
    }

    // ============================================
    // LIMPAR LISTA
    // ============================================
    clearList(listKey) {
        if (!this.lists[listKey]) return;
        
        if (confirm(`Tem certeza que deseja limpar a lista "${this.lists[listKey].name}"?`)) {
            this.lists[listKey].items = [];
            this.saveList(listKey);
            this.renderAllLists();
        }
    }

    clearAllLists() {
        if (confirm('Tem certeza que deseja limpar TODAS as listas?')) {
            Object.keys(this.lists).forEach(key => {
                this.lists[key].items = [];
                this.saveList(key);
            });
            this.renderAllLists();
        }
    }

    // ============================================
    // EXPORTAR LISTAS
    // ============================================
    exportLists() {
        const data = {};
        Object.keys(this.lists).forEach(key => {
            data[key] = {
                name: this.lists[key].name,
                items: this.lists[key].items
            };
        });

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `cinema_lendario_listas_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        console.log('📋 Listas exportadas com sucesso!');
    }

    // ============================================
    // IMPORTAR LISTAS
    // ============================================
    importLists(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            Object.keys(data).forEach(key => {
                if (this.lists[key] && data[key].items) {
                    this.lists[key].items = data[key].items;
                    this.saveList(key);
                }
            });
            
            this.renderAllLists();
            console.log('📋 Listas importadas com sucesso!');
            return true;
        } catch (e) {
            console.error('Erro ao importar listas:', e);
            return false;
        }
    }

    // ============================================
    // ESTATÍSTICAS
    // ============================================
    getStats() {
        const stats = {};
        Object.keys(this.lists).forEach(key => {
            stats[key] = {
                name: this.lists[key].name,
                count: this.getListCount(key)
            };
        });
        stats.total = this.getTotalItems();
        return stats;
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
const listsSystem = new ListsSystem();

// Exportar global
window.listsSystem = listsSystem;

// Compatibilidade com código existente
window.addToLists = (title, genre) => listsSystem.addToLists(title, genre);
window.addToList = (listKey, title, genre) => listsSystem.addToList(listKey, title, genre);
window.removeFromList = (listKey, title) => listsSystem.removeFromList(listKey, title);
window.renderAllLists = () => listsSystem.renderAllLists();
window.findAndPlay = (title) => listsSystem.findAndPlay(title);

console.log('📋 Sistema de listas carregado!');
console.log('📊 Stats:', listsSystem.getStats());