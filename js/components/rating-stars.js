// js/components/rating-stars.js
// Sistema de avaliação com estrelas interativas

class RatingStarsComponent {
    constructor() {
        this.currentRating = 0;
        this.hoverRating = 0;
    }

    // Criar sistema de estrelas interativo
    createStarRating(initialRating = 0, readonly = false) {
        const container = document.createElement('div');
        container.className = 'star-rating-container';
        container.dataset.rating = initialRating;

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            star.dataset.value = i;
            star.innerHTML = '★';
            
            if (i <= initialRating) {
                star.classList.add('active');
            }

            if (!readonly) {
                star.addEventListener('mouseenter', () => {
                    this.highlightStars(container, i);
                });

                star.addEventListener('mouseleave', () => {
                    this.highlightStars(container, parseInt(container.dataset.rating));
                });

                star.addEventListener('click', () => {
                    container.dataset.rating = i;
                    this.currentRating = i;
                    this.highlightStars(container, i);
                    
                    // Disparar evento personalizado
                    const event = new CustomEvent('ratingChange', {
                        detail: { rating: i }
                    });
                    container.dispatchEvent(event);
                });
            }

            container.appendChild(star);
        }

        // Label com valor
        const label = document.createElement('span');
        label.className = 'rating-label';
        label.textContent = this.getRatingLabel(initialRating);
        container.appendChild(label);

        return container;
    }

    highlightStars(container, rating) {
        const stars = container.querySelectorAll('.star');
        stars.forEach(star => {
            const value = parseInt(star.dataset.value);
            star.classList.toggle('active', value <= rating);
        });

        // Atualizar label
        const label = container.querySelector('.rating-label');
        if (label) {
            label.textContent = this.getRatingLabel(rating);
        }
    }

    getRatingLabel(rating) {
        const labels = {
            0: 'Avalie este filme',
            1: '😴 Péssimo',
            2: '😐 Ruim',
            3: '🤔 Regular',
            4: '😊 Bom',
            5: '🤩 Excelente!'
        };
        return labels[rating] || '';
    }

    // Criar miniatura de avaliação (para cards)
    createMiniStars(rating) {
        const stars = Math.floor(rating / 2);
        const hasHalf = rating % 2 >= 1;
        
        let html = '';
        for (let i = 0; i < 5; i++) {
            if (i < stars) {
                html += '<span class="mini-star filled">★</span>';
            } else if (i === stars && hasHalf) {
                html += '<span class="mini-star half">⯨</span>';
            } else {
                html += '<span class="mini-star empty">☆</span>';
            }
        }
        
        return `<span class="mini-rating">${html} <span class="rating-number">${rating.toFixed(1)}</span></span>`;
    }

    // Renderizar barra de progresso de avaliações
    renderRatingBreakdown(ratings) {
        if (!ratings || ratings.length === 0) {
            return '<p class="no-ratings">Nenhuma avaliação ainda</p>';
        }

        const total = ratings.length;
        const distribution = {
            5: 0, 4: 0, 3: 0, 2: 0, 1: 0
        };

        ratings.forEach(r => {
            const roundedRating = Math.round(r.rating);
            if (distribution[roundedRating] !== undefined) {
                distribution[roundedRating]++;
            }
        });

        let html = '<div class="rating-breakdown">';
        
        for (let i = 5; i >= 1; i--) {
            const count = distribution[i];
            const percentage = total > 0 ? (count / total) * 100 : 0;
            
            html += `
                <div class="breakdown-row">
                    <span class="breakdown-label">${i} ★</span>
                    <div class="breakdown-bar">
                        <div class="breakdown-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span class="breakdown-count">${count}</span>
                    <span class="breakdown-percentage">${percentage.toFixed(1)}%</span>
                </div>
            `;
        }

        html += '</div>';
        return html;
    }

    // Formulário de avaliação completo
    renderReviewForm(movieId, existingReview = null) {
        const rating = existingReview ? existingReview.rating : 0;
        const review = existingReview ? existingReview.review : '';
        const tags = existingReview ? existingReview.tags : [];
        const mood = existingReview ? existingReview.mood : '';

        return `
            <div class="review-form cinematic-card">
                <h3>${existingReview ? 'Editar sua Avaliação' : 'Avaliar este Filme'}</h3>
                
                <div class="form-group">
                    <label>Sua Nota:</label>
                    <div id="starRating"></div>
                </div>

                <div class="form-group">
                    <label>Sua Crítica:</label>
                    <textarea id="reviewText" 
                              class="cinematic-input" 
                              placeholder="Escreva sua análise lendária..."
                              rows="5">${review}</textarea>
                </div>

                <div class="form-group">
                    <label>Tags de Mood:</label>
                    <div class="mood-tags">
                        ${this.renderMoodTags(mood)}
                    </div>
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" id="spoilerCheck">
                        Contém spoilers
                    </label>
                </div>

                <button class="btn-gold" onclick="app.submitReview('${movieId}')">
                    ${existingReview ? 'Atualizar' : 'Publicar'} Crítica
                </button>
            </div>
        `;
    }

    renderMoodTags(selectedMood = '') {
        const moods = [
            { id: 'inspiring', label: '🌟 Inspirador', icon: '🌟' },
            { id: 'tense', label: '😰 Tenso', icon: '😰' },
            { id: 'melancholic', label: '😢 Melancólico', icon: '😢' },
            { id: 'fun', label: '😄 Divertido', icon: '😄' },
            { id: 'mind-bending', label: '🤯 Surreal', icon: '🤯' },
            { id: 'romantic', label: '💕 Romântico', icon: '💕' },
            { id: 'epic', label: '⚔️ Épico', icon: '⚔️' },
            { id: 'noir', label: '🕵️ Noir', icon: '🕵️' }
        ];

        return moods.map(mood => `
            <label class="mood-tag ${selectedMood === mood.id ? 'selected' : ''}">
                <input type="radio" 
                       name="mood" 
                       value="${mood.id}"
                       ${selectedMood === mood.id ? 'checked' : ''}>
                ${mood.icon} ${mood.label}
            </label>
        `).join('');
    }
}

// Singleton
const ratingStars = new RatingStarsComponent();
window.ratingStars = ratingStars;