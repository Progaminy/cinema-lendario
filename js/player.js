// ============================================
// js/player.js
// SISTEMA DE PLAYER DE VÍDEO
// Reprodução de filmes, episódios e trailers
// ============================================

class PlayerSystem {
    constructor() {
        this.currentVideo = null;
        this.currentTitle = '';
        this.currentUrl = '';
        this.isPlaying = false;
        this.playHistory = [];
        this.loadHistory();
    }

    // ============================================
    // REPRODUZIR VÍDEO
    // ============================================
    playVideo(title, url) {
        if (!url) {
            alert('❌ Vídeo não disponível no momento.');
            return;
        }

        const modal = document.getElementById('mainModal');
        const content = document.getElementById('modalContent');
        if (!modal || !content) return;

        this.currentTitle = title;
        this.currentUrl = url;

        const safeTitle = this.escapeHTML(title);

        content.innerHTML = `
            <h3 style="color:var(--gold); margin-bottom:0.8rem;">▶ ${safeTitle}</h3>
            <div class="video-container" id="playerContainer">
                <video id="mainVideoPlayer" 
                       controls 
                       autoplay 
                       playsinline 
                       style="width:100%;height:100%;"
                       onplay="playerSystem.onPlay()"
                       onpause="playerSystem.onPause()"
                       onended="playerSystem.onEnded()"
                       onerror="playerSystem.onError()">
                    <source src="${url}" type="video/mp4">
                    <p style="color:#FFF; text-align:center; padding:2rem;">
                        Seu navegador não suporta vídeo HTML5.
                        <br><br>
                        <a href="${url}" download class="btn btn-green" style="text-decoration:none; display:inline-block;">
                            ⬇️ Baixar vídeo
                        </a>
                    </p>
                </video>
            </div>
            <div style="margin-top:0.8rem; display:flex; gap:0.4rem; flex-wrap:wrap;">
                <button class="btn btn-red" onclick="playerSystem.restartVideo()" title="Reiniciar">🔄 Reiniciar</button>
                <button class="btn btn-green" onclick="downloadsSystem.downloadFile('${this.escapeAttr(safeTitle)}', '${url}', 'Video')" title="Baixar">⬇️ Baixar</button>
                <button class="btn btn-blue" onclick="playerSystem.pictureInPicture()" title="Picture-in-Picture">📺 PiP</button>
                <button class="btn btn-gold" onclick="closeModal()" title="Voltar">🔙 Voltar</button>
            </div>
            <div style="margin-top:0.5rem; color:var(--text-dim); font-size:0.7rem;">
                <span id="playerStatus">⏯️ Pronto para reproduzir</span>
            </div>`;

        modal.classList.add('active');
        modal.scrollTop = 0;

        // Salvar no histórico
        this.addToHistory(title, url);

        // Tentar iniciar picture-in-picture se suportado
        setTimeout(() => {
            const video = document.getElementById('mainVideoPlayer');
            if (video) {
                this.currentVideo = video;
                video.play().catch(() => {
                    console.log('Autoplay bloqueado pelo navegador');
                });
            }
        }, 300);

        console.log(`▶ Reproduzindo: "${title}"`);
    }

    // ============================================
    // REPRODUZIR TRAILER
    // ============================================
    playTrailer(title, url) {
        const modal = document.getElementById('mainModal');
        const content = document.getElementById('modalContent');
        if (!modal || !content) return;

        const safeTitle = this.escapeHTML(title);

        content.innerHTML = `
            <h3 style="color:#FF6600; margin-bottom:0.8rem;">🎬 Trailer - ${safeTitle}</h3>
            <div class="video-container">
                <video controls autoplay playsinline style="width:100%;height:100%;"
                       onplay="playerSystem.onPlay()">
                    <source src="${url}" type="video/mp4">
                </video>
            </div>
            <div style="margin-top:0.8rem; display:flex; gap:0.4rem;">
                <button class="btn btn-green" onclick="downloadsSystem.downloadFile('Trailer - ${this.escapeAttr(safeTitle)}', '${url}', 'Trailer')">⬇️ Baixar</button>
                <button class="btn btn-gold" onclick="closeModal()">🔙 Voltar</button>
            </div>`;

        modal.classList.add('active');
        modal.scrollTop = 0;
    }

    // ============================================
    // CONTROLES DO PLAYER
    // ============================================
    restartVideo() {
        const video = document.getElementById('mainVideoPlayer');
        if (video) {
            video.currentTime = 0;
            video.play();
        }
    }

    pauseVideo() {
        const video = document.getElementById('mainVideoPlayer');
        if (video) {
            video.pause();
        }
    }

    resumeVideo() {
        const video = document.getElementById('mainVideoPlayer');
        if (video) {
            video.play();
        }
    }

    togglePlay() {
        const video = document.getElementById('mainVideoPlayer');
        if (!video) return;
        
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    setVolume(volume) {
        const video = document.getElementById('mainVideoPlayer');
        if (video) {
            video.volume = Math.max(0, Math.min(1, volume));
        }
    }

    mute() {
        const video = document.getElementById('mainVideoPlayer');
        if (video) {
            video.muted = !video.muted;
        }
    }

    seekTo(time) {
        const video = document.getElementById('mainVideoPlayer');
        if (video) {
            video.currentTime = time;
        }
    }

    // ============================================
    // PICTURE-IN-PICTURE
    // ============================================
    async pictureInPicture() {
        const video = document.getElementById('mainVideoPlayer');
        if (!video) {
            alert('Nenhum vídeo em reprodução.');
            return;
        }

        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
                await video.requestPictureInPicture();
                console.log('📺 Picture-in-Picture ativado');
            } else {
                alert('Picture-in-Picture não é suportado neste navegador.');
            }
        } catch (e) {
            console.error('Erro PiP:', e);
            alert('Erro ao ativar Picture-in-Picture.');
        }
    }

    // ============================================
    // TELA CHEIA
    // ============================================
    toggleFullscreen() {
        const container = document.getElementById('playerContainer');
        if (!container) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            container.requestFullscreen().catch(() => {
                console.log('Tela cheia não suportada');
            });
        }
    }

    // ============================================
    // EVENTOS DO PLAYER
    // ============================================
    onPlay() {
        this.isPlaying = true;
        const status = document.getElementById('playerStatus');
        if (status) status.textContent = '▶ Reproduzindo...';
        console.log('▶ Vídeo iniciado');
    }

    onPause() {
        this.isPlaying = false;
        const status = document.getElementById('playerStatus');
        if (status) status.textContent = '⏸ Pausado';
    }

    onEnded() {
        this.isPlaying = false;
        const status = document.getElementById('playerStatus');
        if (status) status.textContent = '✅ Vídeo finalizado';
        console.log('✅ Vídeo concluído');
    }

    onError() {
        const status = document.getElementById('playerStatus');
        if (status) status.textContent = '❌ Erro ao carregar vídeo';
        console.error('❌ Erro no player de vídeo');
    }

    // ============================================
    // HISTÓRICO DE REPRODUÇÃO
    // ============================================
    addToHistory(title, url) {
        this.playHistory.unshift({
            title,
            url,
            date: new Date().toISOString()
        });

        // Limitar a 50 itens
        if (this.playHistory.length > 50) {
            this.playHistory = this.playHistory.slice(0, 50);
        }

        this.saveHistory();
    }

    saveHistory() {
        try {
            localStorage.setItem('cinema_play_history', JSON.stringify(this.playHistory));
        } catch (e) {
            console.error('Erro ao salvar histórico:', e);
        }
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem('cinema_play_history');
            if (saved) {
                this.playHistory = JSON.parse(saved);
            }
        } catch (e) {
            this.playHistory = [];
        }
    }

    getHistory(limit = 10) {
        return this.playHistory.slice(0, limit);
    }

    clearHistory() {
        this.playHistory = [];
        localStorage.removeItem('cinema_play_history');
    }

    // ============================================
    // INFORMAÇÕES DO VÍDEO ATUAL
    // ============================================
    getCurrentVideoInfo() {
        const video = document.getElementById('mainVideoPlayer');
        if (!video) return null;

        return {
            title: this.currentTitle,
            url: this.currentUrl,
            currentTime: video.currentTime,
            duration: video.duration,
            paused: video.paused,
            volume: video.volume,
            muted: video.muted,
            playbackRate: video.playbackRate
        };
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

    // ============================================
    // TECLAS DE ATALHO
    // ============================================
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Só funciona se o modal estiver aberto
            const modal = document.getElementById('mainModal');
            if (!modal || !modal.classList.contains('active')) return;

            switch (e.key) {
                case ' ':
                    e.preventDefault();
                    this.togglePlay();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.seekTo((document.getElementById('mainVideoPlayer')?.currentTime || 0) - 10);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.seekTo((document.getElementById('mainVideoPlayer')?.currentTime || 0) + 10);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.setVolume((document.getElementById('mainVideoPlayer')?.volume || 0) + 0.1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.setVolume((document.getElementById('mainVideoPlayer')?.volume || 0) - 0.1);
                    break;
                case 'm':
                    this.mute();
                    break;
                case 'f':
                    this.toggleFullscreen();
                    break;
                case 'p':
                    this.pictureInPicture();
                    break;
                case 'r':
                    this.restartVideo();
                    break;
            }
        });

        console.log('⌨️ Atalhos de teclado configurados');
    }
}

// Singleton
const playerSystem = new PlayerSystem();

// Configurar atalhos de teclado
playerSystem.setupKeyboardShortcuts();

// Exportar global
window.playerSystem = playerSystem;

// Compatibilidade com código existente
window.playVideo = (title, url) => playerSystem.playVideo(title, url);
window.playTrailer = (title, url) => playerSystem.playTrailer(title, url);

// Atalho de tecla ESC para fechar modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('mainModal');
        if (modal && modal.classList.contains('active')) {
            closeModal();
        }
    }
});

console.log('▶ Sistema de player carregado!');
console.log('⌨️ Atalhos: Espaço (play/pause), ← → (10s), ↑ ↓ (volume), M (mudo), F (tela cheia), P (PiP), R (reiniciar)');