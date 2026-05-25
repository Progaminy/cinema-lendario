// ============================================
// js/admin.js
// SISTEMA ADMINISTRATIVO
// Código de acesso: luz299792456
// Gerencia sugestões, notificações e listas
// ============================================

// ============================================
// CONFIGURAÇÃO DO ADMIN
// ============================================
const ADMIN_CODE = 'luz299792456';
let isAdminLoggedIn = false;

// ============================================
// BANCO DE SUGESTÕES (Salvo no localStorage)
// ============================================
function getSuggestions() {
    return JSON.parse(localStorage.getItem('cinema_suggestions') || '[]');
}

function saveSuggestions(suggestions) {
    localStorage.setItem('cinema_suggestions', JSON.stringify(suggestions));
}

// ============================================
// BANCO DE CLICKS NÃO ENCONTRADOS
// ============================================
function getNotFoundClicks() {
    return JSON.parse(localStorage.getItem('cinema_notfound_clicks') || '[]');
}

function saveNotFoundClicks(clicks) {
    localStorage.setItem('cinema_notfound_clicks', JSON.stringify(clicks));
}

// ============================================
// BANCO DE NOTIFICAÇÕES
// ============================================
function getNotifications() {
    return JSON.parse(localStorage.getItem('cinema_notifications') || '[]');
}

function saveNotifications(notifications) {
    localStorage.setItem('cinema_notifications', JSON.stringify(notifications));
}

// ============================================
// REGISTRAR CLIQUE NÃO ENCONTRADO
// ============================================
function registerNotFoundClick(type, title, category) {
    const clicks = getNotFoundClicks();
    
    // Verificar se já existe
    const existing = clicks.find(c => c.title.toLowerCase() === title.toLowerCase() && c.type === type);
    
    if (existing) {
        existing.count = (existing.count || 1) + 1;
        existing.lastClick = new Date().toISOString();
        existing.users = existing.users || [];
        if (currentUser && !existing.users.find(u => u.contact === currentUser.contact)) {
            existing.users.push({
                name: currentUser.name,
                contact: currentUser.contact,
                date: new Date().toISOString()
            });
        }
    } else {
        clicks.push({
            id: Date.now(),
            type: type, // 'movie', 'series', 'trailer'
            title: title,
            category: category || '',
            count: 1,
            firstClick: new Date().toISOString(),
            lastClick: new Date().toISOString(),
            status: 'pending', // pending, completed
            users: currentUser ? [{
                name: currentUser.name,
                contact: currentUser.contact,
                date: new Date().toISOString()
            }] : []
        });
    }
    
    saveNotFoundClicks(clicks);
    
    // Também adicionar à lista de sugestões se não existir
    addSuggestion(type, title, category);
}

// ============================================
// ADICIONAR SUGESTÃO
// ============================================
function addSuggestion(type, title, category) {
    const suggestions = getSuggestions();
    
    const exists = suggestions.find(s => 
        s.title.toLowerCase() === title.toLowerCase() && s.type === type
    );
    
    if (!exists) {
        suggestions.push({
            id: Date.now(),
            type: type, // 'movie', 'series', 'trailer'
            title: title,
            category: category || '',
            status: 'pending', // pending, completed
            suggestedBy: currentUser ? {
                name: currentUser.name,
                contact: currentUser.contact
            } : null,
            date: new Date().toISOString(),
            completedDate: null
        });
        saveSuggestions(suggestions);
    }
}

// ============================================
// USUÁRIO SUGERIR FILME/SÉRIE
// ============================================
function userSuggest(title, type) {
    if (!title || title.trim().length < 2) {
        alert('Por favor, digite um título válido!');
        return false;
    }
    
    addSuggestion(type, title.trim(), '');
    alert(`✅ Obrigado! "${title.trim()}" foi sugerido com sucesso!\n\nNossa equipe vai analisar e adicionar ao catálogo em breve.`);
    return true;
}

// ============================================
// ADMIN: LOGIN
// ============================================
function adminLogin(code) {
    if (code === ADMIN_CODE) {
        isAdminLoggedIn = true;
        localStorage.setItem('cinema_admin_logged', 'true');
        return true;
    }
    return false;
}

function adminLogout() {
    isAdminLoggedIn = false;
    localStorage.removeItem('cinema_admin_logged');
}

function checkAdminLogin() {
    const saved = localStorage.getItem('cinema_admin_logged');
    if (saved === 'true') {
        isAdminLoggedIn = true;
        return true;
    }
    return false;
}

// ============================================
// ADMIN: MARCAR SUGESTÃO COMO CONCLUÍDA
// ============================================
function adminCompleteSuggestion(suggestionId) {
    if (!isAdminLoggedIn) {
        alert('🔒 Acesso negado! Faça login como administrador.');
        return false;
    }
    
    const suggestions = getSuggestions();
    const suggestion = suggestions.find(s => s.id === suggestionId);
    
    if (suggestion) {
        suggestion.status = 'completed';
        suggestion.completedDate = new Date().toISOString();
        saveSuggestions(suggestions);
        
        // Também marcar nos cliques não encontrados
        const clicks = getNotFoundClicks();
        const click = clicks.find(c => 
            c.title.toLowerCase() === suggestion.title.toLowerCase() && 
            c.type === suggestion.type
        );
        if (click) {
            click.status = 'completed';
            saveNotFoundClicks(clicks);
        }
        
        // Notificar usuários
        notifyUsersSuggestionCompleted(suggestion);
        
        return true;
    }
    return false;
}

// ============================================
// ADMIN: APAGAR SUGESTÃO
// ============================================
function adminDeleteSuggestion(suggestionId) {
    if (!isAdminLoggedIn) {
        alert('🔒 Acesso negado! Faça login como administrador.');
        return false;
    }
    
    if (!confirm('Tem certeza que deseja apagar esta sugestão?')) return false;
    
    let suggestions = getSuggestions();
    suggestions = suggestions.filter(s => s.id !== suggestionId);
    saveSuggestions(suggestions);
    
    return true;
}

// ============================================
// NOTIFICAR USUÁRIOS
// ============================================
function notifyUsersSuggestionCompleted(suggestion) {
    const clicks = getNotFoundClicks();
    const click = clicks.find(c => 
        c.title.toLowerCase() === suggestion.title.toLowerCase() && 
        c.type === suggestion.type
    );
    
    if (click && click.users && click.users.length > 0) {
        click.users.forEach(user => {
            createNotification(user.contact, {
                title: suggestion.title,
                type: suggestion.type,
                message: `✅ "${suggestion.title}" já está disponível no Cinema Lendário! Venha conferir!`,
                date: new Date().toISOString()
            });
        });
    }
    
    // Também notificar quem sugeriu
    if (suggestion.suggestedBy && suggestion.suggestedBy.contact) {
        createNotification(suggestion.suggestedBy.contact, {
            title: suggestion.title,
            type: suggestion.type,
            message: `✅ Sua sugestão "${suggestion.title}" foi adicionada ao catálogo! Obrigado por contribuir!`,
            date: new Date().toISOString()
        });
    }
}

// ============================================
// CRIAR NOTIFICAÇÃO
// ============================================
function createNotification(userContact, data) {
    const notifications = getNotifications();
    
    notifications.push({
        id: Date.now(),
        userContact: userContact,
        title: data.title,
        type: data.type,
        message: data.message,
        date: data.date,
        read: false
    });
    
    saveNotifications(notifications);
}

// ============================================
// OBTER NOTIFICAÇÕES DO USUÁRIO
// ============================================
function getUserNotifications() {
    if (!currentUser) return [];
    
    const notifications = getNotifications();
    return notifications.filter(n => n.userContact === currentUser.contact);
}

// ============================================
// OBTER NOTIFICAÇÕES NÃO LIDAS
// ============================================
function getUnreadNotificationsCount() {
    const notifications = getUserNotifications();
    return notifications.filter(n => !n.read).length;
}

// ============================================
// MARCAR NOTIFICAÇÃO COMO LIDA
// ============================================
function markNotificationAsRead(notificationId) {
    const notifications = getNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        saveNotifications(notifications);
    }
}

// ============================================
// MARCAR TODAS NOTIFICAÇÕES COMO LIDAS
// ============================================
function markAllNotificationsAsRead() {
    if (!currentUser) return;
    
    const notifications = getNotifications();
    notifications.forEach(n => {
        if (n.userContact === currentUser.contact) {
            n.read = true;
        }
    });
    saveNotifications(notifications);
}

// ============================================
// RENDER PAINEL ADMIN
// ============================================
function renderAdminPanel() {
    const suggestions = getSuggestions();
    const clicks = getNotFoundClicks();
    
    let html = `
        <div style="max-width:1000px; margin:0 auto; padding:1rem;">
            <h2 style="color:var(--gold); font-family:'Playfair Display',serif; margin-bottom:1rem;">🔐 Painel Administrativo</h2>
            
            <!-- Abas -->
            <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; flex-wrap:wrap;">
                <button class="btn btn-gold" onclick="showAdminTab('suggestions')">💡 Sugestões (${suggestions.length})</button>
                <button class="btn btn-blue" onclick="showAdminTab('clicks')">👆 Cliques Não Encontrados (${clicks.length})</button>
                <button class="btn btn-red" onclick="adminLogout(); closeModal();">🚪 Sair</button>
            </div>
            
            <div id="adminTabContent"></div>
        </div>`;
    
    return html;
}

function showAdminTab(tab) {
    const container = document.getElementById('adminTabContent');
    if (!container) return;
    
    if (tab === 'suggestions') {
        const suggestions = getSuggestions();
        const pending = suggestions.filter(s => s.status === 'pending');
        const completed = suggestions.filter(s => s.status === 'completed');
        
        container.innerHTML = `
            <h3 style="color:var(--gold); margin-bottom:1rem;">⏳ Pendentes (${pending.length})</h3>
            ${pending.length === 0 ? '<p style="color:var(--text-dim);">Nenhuma sugestão pendente</p>' : 
                pending.map(s => `
                <div style="background:var(--elevated); padding:1rem; border-radius:8px; margin-bottom:0.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                    <div>
                        <strong>${s.type === 'movie' ? '🎬' : s.type === 'series' ? '📺' : '🎬'} ${s.title}</strong>
                        <p style="color:var(--text-dim); font-size:0.8rem;">Sugerido por: ${s.suggestedBy?.name || 'Anônimo'} • ${new Date(s.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div style="display:flex; gap:0.3rem;">
                        <button class="btn btn-green" style="padding:0.3rem 0.6rem; font-size:0.7rem;" onclick="adminCompleteSuggestion(${s.id}); showAdminTab('suggestions');">✅ Concluir</button>
                        <button class="btn" style="background:var(--red); color:#FFF; padding:0.3rem 0.6rem; font-size:0.7rem;" onclick="if(adminDeleteSuggestion(${s.id})) showAdminTab('suggestions');">🗑️</button>
                    </div>
                </div>
            `).join('')}
            
            <h3 style="color:var(--gold); margin:1.5rem 0 1rem;">✅ Concluídas (${completed.length})</h3>
            ${completed.length === 0 ? '<p style="color:var(--text-dim);">Nenhuma sugestão concluída</p>' : 
                completed.map(s => `
                <div style="background:var(--elevated); padding:0.8rem; border-radius:8px; margin-bottom:0.3rem; opacity:0.7;">
                    <strong>${s.type === 'movie' ? '🎬' : s.type === 'series' ? '📺' : '🎬'} ${s.title}</strong>
                    <span style="color:#4CAF50; margin-left:0.5rem;">✅ Concluído em ${new Date(s.completedDate).toLocaleDateString('pt-BR')}</span>
                </div>
            `).join('')}
        `;
    } else if (tab === 'clicks') {
        const clicks = getNotFoundClicks();
        
        container.innerHTML = `
            <h3 style="color:var(--gold); margin-bottom:1rem;">👆 Cliques em Conteúdo Não Encontrado (${clicks.length})</h3>
            ${clicks.length === 0 ? '<p style="color:var(--text-dim);">Nenhum registro</p>' : 
                clicks.map(c => `
                <div style="background:var(--elevated); padding:1rem; border-radius:8px; margin-bottom:0.5rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                        <div>
                            <strong>${c.type === 'movie' ? '🎬' : c.type === 'series' ? '📺' : '🎬'} ${c.title}</strong>
                            <span style="background:${c.status === 'completed' ? '#4CAF50' : '#FF6600'}; color:#FFF; padding:0.1rem 0.4rem; border-radius:10px; font-size:0.7rem; margin-left:0.5rem;">${c.status === 'completed' ? 'Concluído' : 'Pendente'}</span>
                            <p style="color:var(--text-dim); font-size:0.8rem;">Clicado ${c.count}x • Último: ${new Date(c.lastClick).toLocaleDateString('pt-BR')}</p>
                            ${c.users ? `<p style="color:var(--text-dim); font-size:0.7rem;">Usuários: ${c.users.map(u => u.name).join(', ')}</p>` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        `;
    }
}

// ============================================
// VERIFICAR CONTEÚDO E REGISTRAR SE NÃO ENCONTRAR
// ============================================
function checkAndRegisterMovie(movieId) {
    const movie = getMovieById(movieId);
    if (!movie) {
        registerNotFoundClick('movie', `ID: ${movieId}`, '');
        return null;
    }
    return movie;
}

function checkAndRegisterSeries(seriesId) {
    const series = getSeriesById(seriesId);
    if (!series) {
        registerNotFoundClick('series', `ID: ${seriesId}`, '');
        return null;
    }
    return series;
}

function checkAndRegisterTrailer(movieId) {
    const trailer = getMovieTrailer(movieId);
    if (!trailer || trailer === GENERIC_MOVIE_TRAILER) {
        const movie = getMovieById(movieId);
        registerNotFoundClick('trailer', movie ? movie.title : `ID: ${movieId}`, movie?.genre || '');
    }
    return trailer;
}

// ============================================
// EXIBIR BADGE DE NOTIFICAÇÕES
// ============================================
function renderNotificationBadge() {
    const count = getUnreadNotificationsCount();
    return count > 0 ? `<span style="background:#E50914; color:#FFF; border-radius:50%; padding:0.1rem 0.4rem; font-size:0.7rem; position:absolute; top:-5px; right:-5px;">${count}</span>` : '';
}

// ============================================
// INICIALIZAR
// ============================================
checkAdminLogin();
console.log('🔐 Sistema Admin carregado');
console.log('👆 Sistema de sugestões carregado');
console.log('🔔 Sistema de notificações carregado');