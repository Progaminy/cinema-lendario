// js/components/user-profile.js
// Componente de perfil do usuário e gamificação

class UserProfileComponent {
    constructor() {
        this.levels = this.initLevels();
        this.badges = this.initBadges();
    }

    initLevels() {
        return [
            { level: 1, name: '🎬 Cineasta Iniciante', xpRequired: 0, color: '#A0A0A0' },
            { level: 2, name: '🍿 Espectador', xpRequired: 100, color: '#CD7F32' },
            { level: 3, name: '🎥 Cinéfilo', xpRequired: 300, color: '#C0C0C0' },
            { level: 4, name: '📽️ Crítico', xpRequired: 600, color: '#D4AF37' },
            { level: 5, name: '🎬 Diretor', xpRequired: 1000, color: '#D4AF37' },
            { level: 6, name: '👑 Lenda do Cinema', xpRequired: 2000, color: '#FFD700' },
            { level: 7, name: '🌟 Mestre do Cinema', xpRequired: 5000, color: '#FF4500' },
            { level: 8, name: '🎭 Deus do Cinema', xpRequired: 10000, color: '#8B0000' }
        ];
    }

    initBadges() {
        return [
            { id: 'first_rating', name: '🎯 Primeira Avaliação', description: 'Avaliou seu primeiro filme', icon: '🎯', rarity: 'common' },
            { id: 'ten_ratings', name: '📝 Crítico Iniciante', description: '10 filmes avaliados', icon: '📝', rarity: 'common' },
            { id: 'fifty_ratings', name: '📊 Crítico Experiente', description: '50 filmes avaliados', icon: '📊', rarity: 'rare' },
            { id: 'hundred_ratings', name: '🏆 Crítico Lendário', description: '100 filmes avaliados', icon: '🏆', rarity: 'legendary' },
            { id: 'marathon', name: '🏃 Maratonista', description: 'Assistiu uma trilogia completa', icon: '🏃', rarity: 'rare' },
            { id: 'time_traveler', name: '⏰ Viajante do Tempo', description: 'Filmes de 5 décadas diferentes', icon: '⏰', rarity: 'epic' },
            { id: 'world_cinema', name: '🌍 Cinema Mundial', description: 'Filmes de 10 países diferentes', icon: '🌍', rarity: 'epic' },
            { id: 'hidden_gem', name: '💎 Descobridor de Joias', description: 'Avaliou filme com menos de 1000 votos', icon: '💎', rarity: 'rare' },
            { id: 'night_owl', name: '🦉 Coruja da Noite', description: 'Avaliou 5 filmes depois da meia-noite', icon: '🦉', rarity: 'common' },
            { id: 'genre_master', name: '🎭 Mestre de Gênero', description: 'Avaliou 20 filmes do mesmo gênero', icon: '🎭', rarity: 'epic' }
        ];
    }

    // Calcular nível baseado no XP
    getLevelInfo(xp) {
        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (xp >= this.levels[i].xpRequired) {
                return {
                    current: this.levels[i],
                    next: this.levels[i + 1] || null,
                    progress: this.calculateProgress(xp, this.levels[i], this.levels[i + 1])
                };
            }
        }
        return {
            current: this.levels[0],
            next: this.levels[1],
            progress: 0
        };
    }

    calculateProgress(xp, currentLevel, nextLevel) {
        if (!nextLevel) return 100;
        
        const xpInLevel = xp - currentLevel.xpRequired;
        const xpNeeded = nextLevel.xpRequired - currentLevel.xpRequired;
        return Math.min(100, Math.floor((xpInLevel / xpNeeded) * 100));
    }

    // Renderizar card de perfil completo
    renderProfileCard(userData) {
        const levelInfo = this.getLevelInfo(userData.xp || 0);
        const userBadges = this.getUserBadges(userData.badges || []);

        return `
            <div class="profile-card cinematic-card">
                <div class="profile-header-section">
                    <div class="avatar-container">
                        <img src="${userData.avatar || 'assets/default-avatar.png'}" 
                             alt="Avatar" 
                             class="profile-avatar">
                        <div class="level-badge" style="background: ${levelInfo.current.color}">
                            ${levelInfo.current.name}
                        </div>
                    </div>
                    
                    <div class="profile-main-info">
                        <h2 class="profile-name">${userData.displayName || 'Cinéfilo Anônimo'}</h2>
                        <p class="profile-bio">${userData.bio || 'Amante da sétima arte'}</p>
                        
                        <div class="profile-stats">
                            <div class="stat-item">
                                <span class="stat-number">${userData.totalRatings || 0}</span>
                                <span class="stat-label">Avaliações</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">${userData.totalWatched || 0}</span>
                                <span class="stat-label">Assistidos</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">${userData.totalLists || 0}</span>
                                <span class="stat-label">Listas</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">${userBadges.length}</span>
                                <span class="stat-label">Conquistas</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xp-section">
                    <div class="xp-header">
                        <span>⚡ ${userData.xp || 0} XP</span>
                        ${levelInfo.next ? 
                            `<span>Próximo: ${levelInfo.next.name} (${levelInfo.next.xpRequired} XP)</span>` : 
                            '<span>🏆 Nível Máximo!</span>'
                        }
                    </div>
                    <div class="xp-bar">
                        <div class="xp-fill" style="width: ${levelInfo.progress}%; background: ${levelInfo.current.color};"></div>
                    </div>
                    <span class="xp-percentage">${levelInfo.progress}%</span>
                </div>

                <div class="badges-section">
                    <h3>🏅 Conquistas</h3>
                    <div class="badges-grid">
                        ${userBadges.length > 0 ? 
                            userBadges.map(badge => this.renderBadge(badge)).join('') :
                            '<p class="no-badges">Nenhuma conquista ainda. Continue avaliando filmes!</p>'
                        }
                    </div>
                </div>

                ${this.renderRecentActivity(userData.recentActivity || [])}
            </div>
        `;
    }

    renderBadge(badge) {
        const rarityColors = {
            common: '#A0A0A0',
            rare: '#4169E1',
            epic: '#8B008B',
            legendary: '#FFD700'
        };

        return `
            <div class="badge-card" style="border-color: ${rarityColors[badge.rarity] || '#A0A0A0'}">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-info">
                    <h4 class="badge-name">${badge.name}</h4>
                    <p class="badge-description">${badge.description}</p>
                    <span class="badge-rarity ${badge.rarity}">${badge.rarity}</span>
                </div>
            </div>
        `;
    }

    renderRecentActivity(activities) {
        if (!activities || activities.length === 0) {
            return '';
        }

        return `
            <div class="recent-activity">
                <h3>📜 Atividade Recente</h3>
                <div class="activity-list">
                    ${activities.slice(0, 10).map(activity => `
                        <div class="activity-item">
                            <span class="activity-icon">${this.getActivityIcon(activity.type)}</span>
                            <div class="activity-content">
                                <p>${activity.description}</p>
                                <span class="activity-time">${this.formatTime(activity.timestamp)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getActivityIcon(type) {
        const icons = {
            rating: '⭐',
            watchlist: '📋',
            watched: '✅',
            badge: '🏅',
            review: '📝',
            favorite: '❤️'
        };
        return icons[type] || '🎬';
    }

    formatTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Agora mesmo';
        if (minutes < 60) return `Há ${minutes} min`;
        if (hours < 24) return `Há ${hours}h`;
        if (days < 7) return `Há ${days} dias`;
        
        return new Date(timestamp).toLocaleDateString('pt-BR');
    }

    getUserBadges(badgeIds) {
        if (!badgeIds || badgeIds.length === 0) return [];
        
        return this.badges.filter(badge => badgeIds.includes(badge.id));
    }

    // Verificar e conceder badges
    async checkAndAwardBadges(userId) {
        const userData = await this.getUserData(userId);
        const newBadges = [];

        // Verificar cada condição de badge
        if (userData.totalRatings >= 1 && !userData.badges.includes('first_rating')) {
            newBadges.push(this.badges.find(b => b.id === 'first_rating'));
        }

        if (userData.totalRatings >= 10 && !userData.badges.includes('ten_ratings')) {
            newBadges.push(this.badges.find(b => b.id === 'ten_ratings'));
        }

        if (userData.totalRatings >= 50 && !userData.badges.includes('fifty_ratings')) {
            newBadges.push(this.badges.find(b => b.id === 'fifty_ratings'));
        }

        if (userData.totalRatings >= 100 && !userData.badges.includes('hundred_ratings')) {
            newBadges.push(this.badges.find(b => b.id === 'hundred_ratings'));
        }

        return newBadges;
    }

    async getUserData(userId) {
        // Buscar dados do usuário no IndexedDB
        const userData = await cinemaDB.get('userProfiles', userId);
        const ratings = await cinemaDB.getByIndex('ratings', 'userId', userId);
        const watched = await cinemaDB.getByIndex('history', 'userId', userId);

        return {
            ...userData,
            totalRatings: ratings.length,
            totalWatched: watched.length,
            badges: userData?.badges || []
        };
    }

    // Renderizar leaderboard
    renderLeaderboard(users) {
        if (!users || users.length === 0) {
            return '<p class="no-data">Nenhum usuário no ranking</p>';
        }

        // Ordenar por XP
        const sortedUsers = users.sort((a, b) => (b.xp || 0) - (a.xp || 0));

        return `
            <div class="leaderboard">
                <h3>🏆 Ranking de Lendas</h3>
                <div class="leaderboard-list">
                    ${sortedUsers.slice(0, 10).map((user, index) => {
                        const levelInfo = this.getLevelInfo(user.xp || 0);
                        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
                        
                        return `
                            <div class="leaderboard-item ${index < 3 ? 'top-three' : ''}">
                                <span class="rank ${index < 3 ? 'medal' : ''}">${medal}</span>
                                <img src="${user.avatar || 'assets/default-avatar.png'}" 
                                     class="leader-avatar" 
                                     alt="${user.displayName}">
                                <div class="leader-info">
                                    <h4>${user.displayName}</h4>
                                    <span class="leader-level" style="color: ${levelInfo.current.color}">
                                        ${levelInfo.current.name}
                                    </span>
                                </div>
                                <div class="leader-xp">
                                    <span class="xp-number">${user.xp || 0}</span>
                                    <span class="xp-label">XP</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
}

// Singleton
const userProfile = new UserProfileComponent();
window.userProfile = userProfile;