// ============================================
// js/notifications.js
// SISTEMA DE NOTIFICAÇÕES
// Notificações para usuários sobre conteúdo adicionado
// ============================================

class NotificationsSystem {
    constructor() {
        this.notifications = [];
        this.loadNotifications();
    }

    // ============================================
    // CARREGAR/SALVAR NOTIFICAÇÕES
    // ============================================
    loadNotifications() {
        try {
            const saved = localStorage.getItem('cinema_notifications');
            if (saved) {
                this.notifications = JSON.parse(saved);
            }
        } catch (e) {
            this.notifications = [];
        }
    }

    saveNotifications() {
        try {
            localStorage.setItem('cinema_notifications', JSON.stringify(this.notifications));
        } catch (e) {
            console.error('Erro ao salvar notificações:', e);
        }
    }

    // ============================================
    // CRIAR NOTIFICAÇÃO
    // ============================================
    createNotification(userContact, data) {
        if (!userContact || !data) return null;

        const notification = {
            id: Date.now() + Math.random(),
            userContact: userContact,
            title: data.title || 'Sem título',
            type: data.type || 'info',
            message: data.message || '',
            date: data.date || new Date().toISOString(),
            read: false,
            actionUrl: data.actionUrl || null
        };

        this.notifications.unshift(notification);
        
        // Limitar a 100 notificações por usuário
        const userNotifications = this.notifications.filter(n => n.userContact === userContact);
        if (userNotifications.length > 100) {
            // Remover as mais antigas
            const toRemove = userNotifications.slice(100);
            toRemove.forEach(n => {
                const idx = this.notifications.findIndex(x => x.id === n.id);
                if (idx !== -1) this.notifications.splice(idx, 1);
            });
        }

        this.saveNotifications();
        
        // Atualizar badge
        this.updateBadge();
        
        console.log(`🔔 Notificação criada para ${userContact}: "${data.title}"`);
        return notification;
    }

    // ============================================
    // OBTER NOTIFICAÇÕES DO USUÁRIO
    // ============================================
    getUserNotifications() {
        if (!auth.isLoggedIn()) return [];
        
        const contact = auth.getUserContact();
        return this.notifications
            .filter(n => n.userContact === contact)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // ============================================
    // NOTIFICAÇÕES NÃO LIDAS
    // ============================================
    getUnreadNotifications() {
        return this.getUserNotifications().filter(n => !n.read);
    }

    getUnreadCount() {
        return this.getUnreadNotifications().length;
    }

    // ============================================
    // MARCAR COMO LIDA
    // ============================================
    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
            this.updateBadge();
            return true;
        }
        return false;
    }

    markAllAsRead() {
        if (!auth.isLoggedIn()) return;
        
        const contact = auth.getUserContact();
        let updated = false;
        
        this.notifications.forEach(n => {
            if (n.userContact === contact && !n.read) {
                n.read = true;
                updated = true;
            }
        });
        
        if (updated) {
            this.saveNotifications();
            this.updateBadge();
        }
    }

    // ============================================
    // DELETAR NOTIFICAÇÃO
    // ============================================
    deleteNotification(notificationId) {
        const index = this.notifications.findIndex(n => n.id === notificationId);
        if (index !== -1) {
            this.notifications.splice(index, 1);
            this.saveNotifications();
            this.updateBadge();
            return true;
        }
        return false;
    }

    deleteAllForUser() {
        if (!auth.isLoggedIn()) return;
        
        const contact = auth.getUserContact();
        this.notifications = this.notifications.filter(n => n.userContact !== contact);
        this.saveNotifications();
        this.updateBadge();
    }

    // ============================================
    // ATUALIZAR BADGE
    // ============================================
    updateBadge() {
        const badge = document.getElementById('notifBadge');
        if (!badge) return;

        const count = this.getUnreadCount();

        if (count > 0) {
            badge.innerHTML = `
                <span style="
                    background:#E50914; 
                    color:#FFF; 
                    border-radius:50%; 
                    padding:0.1rem 0.4rem; 
                    font-size:0.6rem; 
                    position:absolute; 
                    top:-8px; 
                    right:-8px;
                    font-weight:700;
                    min-width:18px;
                    text-align:center;
                ">${count > 99 ? '99+' : count}</span>`;
        } else {
            badge.innerHTML = '';
        }
    }

    // ============================================
    // ABRIR PAINEL DE NOTIFICAÇÕES
    // ============================================
    openNotificationsPanel() {
        if (!auth.isLoggedIn()) {
            alert('Faça login para ver suas notificações!');
            auth.showLoginScreen();
            return;
        }

        const modal = document.getElementById('mainModal');
        const content = document.getElementById('modalContent');
        if (!modal || !content) return;

        const notifications = this.getUserNotifications();
        const unreadCount = this.getUnreadCount();

        if (notifications.length === 0) {
            content.innerHTML = `
                <div style="text-align:center; padding:2rem;">
                    <h3 style="color:var(--gold); margin-bottom:1rem;">🔔 Notificações</h3>
                    <p style="font-size:4rem;">📭</p>
                    <p class="empty-state">Nenhuma notificação ainda</p>
                    <p style="color:var(--text-dim); font-size:0.8rem;">
                        Quando adicionarmos conteúdo que você procurou,<br>você será notificado aqui!
                    </p>
                    <button class="btn btn-gold" onclick="closeModal()" style="margin-top:1rem;">🔙 Voltar</button>
                </div>`;
        } else {
            let html = `
                <div style="max-height:70vh; overflow-y:auto;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; position:sticky; top:0; background:var(--surface); padding:0.5rem 0; z-index:5;">
                        <h3 style="color:var(--gold);">🔔 Notificações (${notifications.length})</h3>
                        <div style="display:flex; gap:0.5rem;">
                            ${unreadCount > 0 ? `
                                <button class="btn btn-blue" style="padding:0.3rem 0.6rem; font-size:0.7rem;" 
                                        onclick="notificationsSystem.markAllAsRead(); notificationsSystem.openNotificationsPanel();">
                                    ✅ Ler todas
                                </button>` : ''}
                            <button class="btn btn-red" style="padding:0.3rem 0.6rem; font-size:0.7rem;" 
                                    onclick="if(confirm('Apagar todas as notificações?')){notificationsSystem.deleteAllForUser(); notificationsSystem.openNotificationsPanel();}">
                                🗑️ Limpar
                            </button>
                        </div>
                    </div>`;

            notifications.forEach(notification => {
                const date = new Date(notification.date);
                const dateStr = date.toLocaleDateString('pt-BR');
                const timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                
                const typeIcons = {
                    'movie': '🎬',
                    'series': '📺',
                    'trailer': '🎬',
                    'info': 'ℹ️',
                    'success': '✅',
                    'warning': '⚠️'
                };
                
                const icon = typeIcons[notification.type] || '🔔';
                const isUnread = !notification.read;

                html += `
                <div style="
                    background:${isUnread ? 'rgba(212,175,55,0.1)' : 'var(--elevated)'}; 
                    padding:0.8rem; 
                    border-radius:8px; 
                    margin-bottom:0.5rem;
                    border-left:3px solid ${isUnread ? 'var(--gold)' : 'transparent'};
                    opacity:${isUnread ? '1' : '0.7'};
                    transition:all 0.3s;
                ">
                    <div style="display:flex; gap:0.5rem; align-items:flex-start;">
                        <span style="font-size:1.5rem;">${icon}</span>
                        <div style="flex:1;">
                            <strong style="font-size:0.9rem;">${this.escapeHTML(notification.title)}</strong>
                            <p style="color:var(--text-dim); font-size:0.8rem; margin:0.2rem 0;">${this.escapeHTML(notification.message)}</p>
                            <span style="color:var(--text-dim); font-size:0.7rem;">${dateStr} às ${timeStr}</span>
                            ${isUnread ? '<span style="background:var(--gold); color:var(--bg); padding:0.1rem 0.4rem; border-radius:10px; font-size:0.65rem; margin-left:0.5rem;">NOVA</span>' : ''}
                        </div>
                        <div style="display:flex; gap:0.3rem; flex-direction:column;">
                            ${isUnread ? `
                                <button class="btn btn-gold" style="padding:0.2rem 0.5rem; font-size:0.65rem;" 
                                        onclick="notificationsSystem.markAsRead(${notification.id}); notificationsSystem.openNotificationsPanel();">
                                    ✓
                                </button>` : ''}
                            <button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:0.9rem;" 
                                    onclick="notificationsSystem.deleteNotification(${notification.id}); notificationsSystem.openNotificationsPanel();">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>`;
            });

            html += `
                </div>
                <button class="btn btn-gold" onclick="closeModal()" style="margin-top:1rem;">🔙 Voltar</button>`;
            
            content.innerHTML = html;
        }

        modal.classList.add('active');
        modal.scrollTop = 0;
    }

    // ============================================
    // NOTIFICAR USUÁRIOS SOBRE CONTEÚDO ADICIONADO
    // ============================================
    notifyContentAdded(title, type) {
        // Buscar todos os usuários que clicaram nesse conteúdo
        const clicks = window.getNotFoundClicks ? window.getNotFoundClicks() : [];
        const relevantClicks = clicks.filter(c => 
            c.title.toLowerCase() === title.toLowerCase() && 
            c.type === type
        );

        // Notificar cada usuário
        const notifiedUsers = new Set();
        
        relevantClicks.forEach(click => {
            if (click.users) {
                click.users.forEach(user => {
                    if (!notifiedUsers.has(user.contact)) {
                        this.createNotification(user.contact, {
                            title: title,
                            type: type,
                            message: `✅ "${title}" já está disponível no Cinema Lendário! Venha conferir!`,
                            date: new Date().toISOString()
                        });
                        notifiedUsers.add(user.contact);
                    }
                });
            }
        });

        // Também notificar quem sugeriu
        const suggestions = window.getSuggestions ? window.getSuggestions() : [];
        const relevantSuggestion = suggestions.find(s => 
            s.title.toLowerCase() === title.toLowerCase() && 
            s.type === type
        );

        if (relevantSuggestion?.suggestedBy?.contact) {
            if (!notifiedUsers.has(relevantSuggestion.suggestedBy.contact)) {
                this.createNotification(relevantSuggestion.suggestedBy.contact, {
                    title: title,
                    type: type,
                    message: `✅ Sua sugestão "${title}" foi adicionada ao catálogo! Obrigado por contribuir!`,
                    date: new Date().toISOString()
                });
            }
        }
    }

    // ============================================
    // ENVIAR NOTIFICAÇÃO DO SISTEMA
    // ============================================
    sendSystemNotification(title, message, type = 'info') {
        // Para todos os usuários logados
        const userContact = auth.getUserContact();
        if (userContact) {
            this.createNotification(userContact, {
                title: title,
                type: type,
                message: message,
                date: new Date().toISOString()
            });
        }
    }

    // ============================================
    // NOTIFICAÇÃO DO NAVEGADOR (Push)
    // ============================================
    requestPushPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('✅ Permissão para notificações concedida');
                }
            });
        }
    }

    sendPushNotification(title, body) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="%23D4AF37"%3E%3Ccircle cx="32" cy="32" r="30" fill="%23141414"/%3E%3Ctext x="32" y="42" text-anchor="middle" font-size="28"%3E🎬%3C/text%3E%3C/svg%3E',
                tag: 'cinema-lendario'
            });
        }
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

    // ============================================
    // ESTATÍSTICAS
    // ============================================
    getStats() {
        if (!auth.isLoggedIn()) return { total: 0, unread: 0 };
        
        const all = this.getUserNotifications();
        return {
            total: all.length,
            unread: this.getUnreadCount(),
            lastNotification: all[0] || null
        };
    }
}

// Singleton
const notificationsSystem = new NotificationsSystem();

// Exportar global
window.notificationsSystem = notificationsSystem;

// Compatibilidade com código existente
window.openNotifications = () => notificationsSystem.openNotificationsPanel();
window.updateNotificationBadge = () => notificationsSystem.updateBadge();
window.createNotification = (userContact, data) => notificationsSystem.createNotification(userContact, data);
window.getUserNotifications = () => notificationsSystem.getUserNotifications();
window.getUnreadNotificationsCount = () => notificationsSystem.getUnreadCount();
window.markNotificationAsRead = (id) => notificationsSystem.markAsRead(id);
window.markAllNotificationsAsRead = () => notificationsSystem.markAllAsRead();
window.notifyContentAdded = (title, type) => notificationsSystem.notifyContentAdded(title, type);

// Solicitar permissão para notificações ao iniciar
setTimeout(() => {
    notificationsSystem.requestPushPermission();
}, 3000);

// Atualizar badge a cada 30 segundos
setInterval(() => {
    notificationsSystem.updateBadge();
}, 30000);

console.log('🔔 Sistema de notificações carregado!');
console.log('📊 Stats:', notificationsSystem.getStats());