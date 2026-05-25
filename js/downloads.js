// ============================================
// js/downloads.js
// SISTEMA DE DOWNLOADS
// Download real para o dispositivo
// Gerenciamento de arquivos baixados
// ============================================

class DownloadsSystem {
    constructor() {
        this.downloads = [];
        this.downloadQueue = [];
        this.isDownloading = false;
        this.maxConcurrent = 2;
        this.activeDownloads = 0;
        this.loadDownloads();
    }

    // ============================================
    // INICIAR DOWNLOAD DE ARQUIVO ÚNICO
    // ============================================
    async downloadFile(title, url, type) {
        if (!url) {
            alert('❌ Link de download não disponível.');
            return;
        }

        // Verificar se já foi baixado
        const existing = this.downloads.find(d => d.title === title && d.status === 'completed');
        if (existing) {
            if (confirm(`"${title}" já foi baixado!\n\nDeseja baixar novamente?`)) {
                this.removeDownloadByTitle(title);
            } else {
                this.playDownloaded(title);
                return;
            }
        }

        const filename = this.generateFilename(title);
        
        // Adicionar à fila
        const downloadItem = {
            id: Date.now(),
            title: title,
            url: url,
            type: type || 'video',
            filename: filename,
            status: 'queued',
            progress: 0,
            size: null,
            date: new Date().toISOString(),
            completedDate: null
        };

        this.downloads.unshift(downloadItem);
        this.saveDownloads();

        // Iniciar download
        this.processDownload(downloadItem);

        console.log(`⬇️ Download iniciado: "${title}"`);
    }

    // ============================================
    // PROCESSAR DOWNLOAD
    // ============================================
    async processDownload(downloadItem) {
        downloadItem.status = 'downloading';
        this.saveDownloads();
        this.activeDownloads++;

        try {
            const response = await fetch(downloadItem.url, {
                method: 'GET',
                mode: 'cors'
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const contentLength = response.headers.get('content-length');
            const total = parseInt(contentLength, 10);
            
            const reader = response.body.getReader();
            const chunks = [];
            let received = 0;

            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                chunks.push(value);
                received += value.length;

                if (total) {
                    downloadItem.progress = Math.round((received / total) * 100);
                    downloadItem.size = this.formatSize(total);
                    this.saveDownloads();
                    this.updateDownloadUI();
                }
            }

            // Criar blob e iniciar download no navegador
            const blob = new Blob(chunks, { type: 'video/mp4' });
            const blobUrl = URL.createObjectURL(blob);

            // Download real para o dispositivo
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = downloadItem.filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();

            // Limpar
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);
            }, 100);

            downloadItem.status = 'completed';
            downloadItem.progress = 100;
            downloadItem.size = this.formatSize(blob.size);
            downloadItem.completedDate = new Date().toISOString();
            downloadItem.blobUrl = blobUrl;

            this.saveDownloads();
            this.updateDownloadUI();

            // Notificar usuário
            this.showDownloadNotification(downloadItem.title, downloadItem.size);

            console.log(`✅ Download concluído: "${downloadItem.title}" (${downloadItem.size})`);

        } catch (error) {
            console.error(`❌ Erro no download: "${downloadItem.title}"`, error);
            
            downloadItem.status = 'failed';
            downloadItem.error = error.message;
            this.saveDownloads();

            // Tentar método alternativo
            this.fallbackDownload(downloadItem);
        }

        this.activeDownloads--;
        this.processQueue();
    }

    // ============================================
    // DOWNLOAD ALTERNATIVO (FALLBACK)
    // ============================================
    fallbackDownload(downloadItem) {
        try {
            const a = document.createElement('a');
            a.href = downloadItem.url;
            a.download = downloadItem.filename;
            a.target = '_blank';
            a.rel = 'noopener';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            downloadItem.status = 'completed';
            downloadItem.progress = 100;
            downloadItem.completedDate = new Date().toISOString();
            this.saveDownloads();
            
            console.log(`⬇️ Download alternativo: "${downloadItem.title}"`);
        } catch (e) {
            // Último recurso: abrir em nova aba
            window.open(downloadItem.url, '_blank');
            downloadItem.status = 'completed';
            this.saveDownloads();
        }
    }

    // ============================================
    // FILA DE DOWNLOADS
    // ============================================
    processQueue() {
        const queued = this.downloads.filter(d => d.status === 'queued');
        
        for (const item of queued) {
            if (this.activeDownloads < this.maxConcurrent) {
                this.processDownload(item);
            } else {
                break;
            }
        }
    }

    // ============================================
    // DOWNLOAD DE TEMPORADA INTEIRA
    // ============================================
    async downloadAllSeasons(title, seriesId) {
        const series = seriesSystem.getSeriesById(seriesId);
        if (!series) {
            alert('❌ Série não encontrada!');
            return;
        }

        let totalEpisodes = 0;
        series.seasons.forEach(s => {
            totalEpisodes += s.episodes ? s.episodes.length : 0;
        });

        if (!confirm(`⬇️ Baixar TODOS os ${totalEpisodes} episódios de "${title}"?\n\nCada episódio será baixado separadamente.`)) {
            return;
        }

        let count = 0;
        const delay = 600; // 600ms entre cada download

        for (const season of series.seasons) {
            for (const episode of season.episodes) {
                const epTitle = `${title} - S${season.number}E${episode.number} - ${episode.title}`;
                const url = episode.videoUrl || CONFIG.SUPABASE_VIDEOS.assistir[0];

                setTimeout(() => {
                    this.downloadFile(epTitle, url, 'Série');
                }, count * delay);

                count++;
            }
        }

        alert(`⬇️ ${totalEpisodes} downloads iniciados!\n\nAcompanhe o progresso na aba "Downloads".`);
    }

    // ============================================
    // REPRODUZIR ARQUIVO BAIXADO
    // ============================================
    playDownloaded(title) {
        const download = this.downloads.find(d => d.title === title && d.status === 'completed');
        
        if (download && download.blobUrl) {
            playerSystem.playVideo(download.title, download.blobUrl);
        } else if (download) {
            playerSystem.playVideo(download.title, download.url);
        } else {
            alert('❌ Arquivo não encontrado.');
        }
    }

    // ============================================
    // REMOVER DOWNLOADS
    // ============================================
    removeDownload(id) {
        const download = this.downloads.find(d => d.id === id);
        if (download && download.blobUrl) {
            URL.revokeObjectURL(download.blobUrl);
        }
        
        this.downloads = this.downloads.filter(d => d.id !== id);
        this.saveDownloads();
        this.updateDownloadUI();
    }

    removeDownloadByTitle(title) {
        const download = this.downloads.find(d => d.title === title);
        if (download) {
            this.removeDownload(download.id);
        }
    }

    clearCompleted() {
        this.downloads = this.downloads.filter(d => d.status !== 'completed');
        this.saveDownloads();
        this.updateDownloadUI();
    }

    clearAll() {
        if (confirm('Tem certeza que deseja limpar TODOS os downloads?')) {
            // Revogar URLs
            this.downloads.forEach(d => {
                if (d.blobUrl) URL.revokeObjectURL(d.blobUrl);
            });
            
            this.downloads = [];
            this.saveDownloads();
            this.updateDownloadUI();
        }
    }

    retryFailed(id) {
        const download = this.downloads.find(d => d.id === id);
        if (download) {
            download.status = 'queued';
            download.progress = 0;
            download.error = null;
            this.saveDownloads();
            this.processDownload(download);
        }
    }

    // ============================================
    // RENDERIZAR LISTA DE DOWNLOADS
    // ============================================
    renderDownloads() {
        const container = document.getElementById('downloadsContent');
        if (!container) return;

        if (this.downloads.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p style="font-size:3rem; margin-bottom:1rem;">⬇️</p>
                    <p>Nenhum download ainda</p>
                    <p style="font-size:0.8rem; margin-top:0.5rem;">Clique em ⬇️ em qualquer filme ou episódio para baixar!</p>
                </div>`;
            return;
        }

        const completed = this.downloads.filter(d => d.status === 'completed').length;
        const downloading = this.downloads.filter(d => d.status === 'downloading').length;
        const queued = this.downloads.filter(d => d.status === 'queued').length;
        const failed = this.downloads.filter(d => d.status === 'failed').length;

        let html = `
            <div style="display:flex; gap:0.5rem; margin-bottom:1rem; flex-wrap:wrap; align-items:center;">
                <span style="color:var(--text-dim); font-size:0.8rem;">
                    ${completed} concluídos | ${downloading} baixando | ${queued} na fila${failed > 0 ? ` | ${failed} falhou` : ''}
                </span>
                ${completed > 0 ? `<button class="btn btn-orange" style="padding:0.3rem 0.6rem; font-size:0.7rem;" onclick="downloadsSystem.clearCompleted()">🗑️ Limpar concluídos</button>` : ''}
                ${this.downloads.length > 0 ? `<button class="btn btn-red" style="padding:0.3rem 0.6rem; font-size:0.7rem;" onclick="downloadsSystem.clearAll()">🗑️ Limpar tudo</button>` : ''}
            </div>`;

        html += this.downloads.map(d => this.createDownloadItem(d)).join('');

        container.innerHTML = html;
    }

    createDownloadItem(d) {
        const date = new Date(d.date).toLocaleDateString('pt-BR');
        const time = new Date(d.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        let statusIcon = '';
        let statusColor = '';
        let actions = '';

        switch (d.status) {
            case 'completed':
                statusIcon = '✅';
                statusColor = '#4CAF50';
                actions = `
                    <button class="btn btn-red" style="padding:0.3rem 0.6rem; font-size:0.7rem;" 
                            onclick="downloadsSystem.playDownloaded('${this.escapeAttr(d.title)}')">▶ Assistir</button>
                    <button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:1rem;" 
                            onclick="downloadsSystem.removeDownload(${d.id})">🗑️</button>`;
                break;
            case 'downloading':
                statusIcon = '⏳';
                statusColor = '#2196F3';
                actions = `<span style="font-size:0.7rem; color:#2196F3;">Baixando...</span>`;
                break;
            case 'queued':
                statusIcon = '⏸';
                statusColor = '#FF9800';
                actions = `<span style="font-size:0.7rem; color:#FF9800;">Na fila</span>`;
                break;
            case 'failed':
                statusIcon = '❌';
                statusColor = '#f44336';
                actions = `
                    <button class="btn btn-orange" style="padding:0.3rem 0.6rem; font-size:0.7rem;" 
                            onclick="downloadsSystem.retryFailed(${d.id})">🔄 Tentar</button>
                    <button style="background:none;border:none;color:var(--red);cursor:pointer;font-size:1rem;" 
                            onclick="downloadsSystem.removeDownload(${d.id})">🗑️</button>`;
                break;
        }

        return `
        <div style="background:var(--elevated); padding:0.8rem; border-radius:8px; margin-bottom:0.5rem; border-left:3px solid ${statusColor};">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                <div style="flex:1; min-width:150px;">
                    <strong style="font-size:0.85rem;">${statusIcon} ${this.escapeHTML(d.title)}</strong>
                    <p style="color:var(--text-dim); font-size:0.7rem;">${d.type} • ${d.size || 'Tamanho desconhecido'} • ${date} ${time}</p>
                    ${d.status === 'downloading' ? `
                        <div style="width:100%; height:4px; background:var(--surface); border-radius:2px; margin-top:0.3rem; overflow:hidden;">
                            <div style="height:100%; width:${d.progress}%; background:${statusColor}; border-radius:2px; transition:width 0.3s;"></div>
                        </div>
                        <span style="font-size:0.65rem; color:${statusColor};">${d.progress}%</span>
                    ` : ''}
                    ${d.error ? `<p style="color:#f44336; font-size:0.65rem;">Erro: ${d.error}</p>` : ''}
                </div>
                <div style="display:flex; gap:0.3rem; align-items:center;">
                    ${actions}
                </div>
            </div>
        </div>`;
    }

    // ============================================
    // ATUALIZAR UI
    // ============================================
    updateDownloadUI() {
        const downloadsView = document.getElementById('downloadsView');
        if (downloadsView && downloadsView.classList.contains('active')) {
            this.renderDownloads();
        }
    }

    // ============================================
    // NOTIFICAÇÃO DE DOWNLOAD
    // ============================================
    showDownloadNotification(title, size) {
        // Verificar se o navegador suporta notificações
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('✅ Download Concluído', {
                body: `"${title}" (${size})\nToque para assistir!`,
                icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="%23D4AF37"%3E%3Ccircle cx="32" cy="32" r="30" fill="%23141414"/%3E%3Ctext x="32" y="42" text-anchor="middle" font-size="32"%3E⬇️%3C/text%3E%3C/svg%3E'
            });
        }
    }

    // ============================================
    // PERSISTÊNCIA
    // ============================================
    saveDownloads() {
        try {
            // Não salvar blobUrls (são temporárias)
            const toSave = this.downloads.map(d => ({
                ...d,
                blobUrl: null
            }));
            localStorage.setItem('cinema_downloads', JSON.stringify(toSave));
        } catch (e) {
            console.error('Erro ao salvar downloads:', e);
        }
    }

    loadDownloads() {
        try {
            const saved = localStorage.getItem('cinema_downloads');
            if (saved) {
                this.downloads = JSON.parse(saved);
                // Marcar downloads interrompidos como failed
                this.downloads.forEach(d => {
                    if (d.status === 'downloading') {
                        d.status = 'failed';
                        d.error = 'Download interrompido';
                    }
                });
            }
        } catch (e) {
            this.downloads = [];
        }
    }

    // ============================================
    // UTILITÁRIOS
    // ============================================
    generateFilename(title) {
        return title
            .replace(/[^a-zA-Z0-9À-ú \-_]/g, '')
            .trim()
            .slice(0, 60)
            .replace(/\s+/g, '_') + '.mp4';
    }

    formatSize(bytes) {
        if (!bytes) return 'Desconhecido';
        
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    }

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
    // ESTATÍSTICAS
    // ============================================
    getStats() {
        const total = this.downloads.length;
        const completed = this.downloads.filter(d => d.status === 'completed').length;
        const totalSize = this.downloads
            .filter(d => d.status === 'completed' && d.size)
            .reduce((acc, d) => {
                const num = parseFloat(d.size);
                return acc + (isNaN(num) ? 0 : num);
            }, 0);

        return {
            total,
            completed,
            pending: total - completed,
            totalSize: this.formatSize(totalSize * 1024 * 1024)
        };
    }
}

// Singleton
const downloadsSystem = new DownloadsSystem();

// Solicitar permissão para notificações
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Exportar global
window.downloadsSystem = downloadsSystem;

// Compatibilidade com código existente
window.downloadFile = (title, url, type) => downloadsSystem.downloadFile(title, url, type);
window.downloadAllSeasons = (title, seriesId) => downloadsSystem.downloadAllSeasons(title, seriesId);
window.renderDownloads = () => downloadsSystem.renderDownloads();
window.deleteDownload = (id) => downloadsSystem.removeDownload(id);

console.log('⬇️ Sistema de downloads carregado!');
console.log('📊 Stats:', downloadsSystem.getStats());