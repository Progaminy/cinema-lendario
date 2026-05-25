// ============================================
// js/auth.js
// SISTEMA DE AUTENTICAÇÃO
// Login com Email ou Telefone
// Código do país: Moçambique primeiro
// ============================================

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.loginMode = 'login'; // 'login' ou 'register'
        this.init();
    }

    init() {
        // Verificar se há usuário salvo
        const saved = localStorage.getItem('cinema_user');
        if (saved) {
            try {
                this.currentUser = JSON.parse(saved);
                console.log('👤 Usuário carregado:', this.currentUser.name);
            } catch (e) {
                console.error('Erro ao carregar usuário:', e);
                localStorage.removeItem('cinema_user');
            }
        }
    }

    // ============================================
    // VERIFICAÇÃO DE LOGIN
    // ============================================
    isLoggedIn() {
        return this.currentUser !== null;
    }

    requireLogin() {
        if (!this.isLoggedIn()) {
            this.showLoginScreen();
            return false;
        }
        return true;
    }

    // ============================================
    // TELA DE LOGIN
    // ============================================
    showLoginScreen() {
        const overlay = document.getElementById('loginOverlay');
        if (overlay) {
            overlay.classList.remove('hidden');
            // Resetar campos
            document.getElementById('loginName').value = '';
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPhone').value = '';
            document.getElementById('loginPassword').value = '';
        }
    }

    hideLoginScreen() {
        const overlay = document.getElementById('loginOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    // ============================================
    // MODO LOGIN/CADASTRO
    // ============================================
    toggleLoginMode() {
        this.loginMode = this.loginMode === 'login' ? 'register' : 'login';
        
        const message = document.getElementById('loginMessage');
        const btn = document.getElementById('loginSubmitBtn');
        const toggle = document.getElementById('toggleMode');
        
        if (this.loginMode === 'register') {
            message.textContent = 'Crie sua conta gratuitamente';
            btn.textContent = '✨ Cadastrar';
            toggle.textContent = 'Já tem conta? Entrar';
        } else {
            message.textContent = 'Entre com email ou telefone';
            btn.textContent = '🎬 Entrar';
            toggle.textContent = 'Não tem conta? Cadastre-se';
        }
    }

    // ============================================
    // MÉTODO DE LOGIN (EMAIL OU TELEFONE)
    // ============================================
    toggleLoginMethod() {
        const method = document.getElementById('loginMethod').value;
        document.getElementById('emailField').style.display = method === 'email' ? 'block' : 'none';
        document.getElementById('phoneField').style.display = method === 'phone' ? 'block' : 'none';
    }

    // ============================================
    // PROCESSAR LOGIN/CADASTRO
    // ============================================
    handleLogin(event) {
        if (event) event.preventDefault();
        
        const name = document.getElementById('loginName').value.trim();
        const method = document.getElementById('loginMethod').value;
        const password = document.getElementById('loginPassword').value;
        
        // Validar nome
        if (!name || name.length < 2) {
            this.showError('Por favor, digite seu nome completo!');
            return false;
        }
        
        // Validar contato
        let contact = '';
        if (method === 'email') {
            contact = document.getElementById('loginEmail').value.trim();
            if (!contact || !this.validateEmail(contact)) {
                this.showError('Por favor, digite um email válido!');
                return false;
            }
        } else {
            const code = document.getElementById('countryCode').value;
            const phone = document.getElementById('loginPhone').value.trim();
            if (!phone || phone.length < 8) {
                this.showError('Por favor, digite um número de telefone válido!');
                return false;
            }
            contact = code + phone.replace(/\D/g, '');
        }
        
        // Validar senha
        if (!password || password.length < 4) {
            this.showError('A senha deve ter pelo menos 4 caracteres!');
            return false;
        }
        
        // Login ou Cadastro
        if (this.loginMode === 'login') {
            return this.doLogin(contact, password);
        } else {
            return this.doRegister(name, contact, method, password);
        }
    }

    // ============================================
    // FAZER LOGIN
    // ============================================
    doLogin(contact, password) {
        const saved = localStorage.getItem('cinema_user');
        
        if (!saved) {
            this.showError('Nenhuma conta encontrada! Cadastre-se primeiro.');
            return false;
        }
        
        try {
            const user = JSON.parse(saved);
            
            // Verificar se é o mesmo contato
            if (user.contact !== contact) {
                this.showError('Email/telefone não encontrado!');
                return false;
            }
            
            // Verificar senha
            if (user.password !== password) {
                this.showError('Senha incorreta!');
                return false;
            }
            
            // Login bem-sucedido
            this.currentUser = user;
            this.hideLoginScreen();
            this.updateUI();
            this.showSuccess(`✅ Bem-vindo de volta, ${user.name}!`);
            
            // Disparar evento de login
            window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: user }));
            
            return true;
            
        } catch (e) {
            console.error('Erro ao fazer login:', e);
            this.showError('Erro ao processar login. Tente novamente.');
            return false;
        }
    }

    // ============================================
    // FAZER CADASTRO
    // ============================================
    doRegister(name, contact, method, password) {
        // Verificar se já existe
        const saved = localStorage.getItem('cinema_user');
        if (saved) {
            try {
                const existing = JSON.parse(saved);
                if (existing.contact === contact) {
                    this.showError('Este email/telefone já está cadastrado!');
                    return false;
                }
            } catch (e) {}
        }
        
        // Criar novo usuário
        this.currentUser = {
            name: name,
            contact: contact,
            method: method,
            password: password,
            avatar: name.charAt(0).toUpperCase(),
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };
        
        // Salvar
        localStorage.setItem('cinema_user', JSON.stringify(this.currentUser));
        
        // Também salvar no IndexedDB se disponível
        if (window.cinemaDB && window.cinemaDB.ready) {
            window.cinemaDB.saveUser(this.currentUser).catch(() => {});
        }
        
        this.hideLoginScreen();
        this.updateUI();
        this.showSuccess(`✅ Conta criada com sucesso!\n\nBem-vindo(a) ao Cinema Lendário, ${name}!`);
        
        // Disparar evento de cadastro
        window.dispatchEvent(new CustomEvent('userRegistered', { detail: this.currentUser }));
        
        return true;
    }

    // ============================================
    // LOGOUT
    // ============================================
    logout() {
        if (confirm('Deseja sair da sua conta?')) {
            const userName = this.currentUser?.name || 'Usuário';
            this.currentUser = null;
            localStorage.removeItem('cinema_user');
            this.showLoginScreen();
            this.updateUI();
            console.log('👋 Logout realizado:', userName);
        }
    }

    // ============================================
    // ATUALIZAR INTERFACE
    // ============================================
    updateUI() {
        const avatar = document.getElementById('headerAvatar');
        const username = document.getElementById('headerUsername');
        
        if (this.currentUser) {
            if (username) {
                username.textContent = this.currentUser.name;
            }
            if (avatar) {
                const initial = this.currentUser.avatar || this.currentUser.name.charAt(0).toUpperCase();
                avatar.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='35' fill='%23141414'%3E%3Ccircle cx='17' cy='17' r='17'/%3E%3Ctext x='17' y='22' text-anchor='middle' fill='%23D4AF37' font-size='16'%3E${initial}%3C/text%3E%3C/svg%3E`;
            }
        } else {
            if (username) username.textContent = 'Usuário';
            if (avatar) {
                avatar.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='35' fill='%23141414'%3E%3Ccircle cx='17' cy='17' r='17'/%3E%3Ctext x='17' y='22' text-anchor='middle' fill='%23D4AF37' font-size='16'%3E🎬%3C/text%3E%3C/svg%3E`;
            }
        }
        
        // Atualizar badge de notificações
        if (window.updateNotificationBadge) {
            window.updateNotificationBadge();
        }
    }

    // ============================================
    // VALIDAÇÕES
    // ============================================
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ============================================
    // MENSAGENS
    // ============================================
    showError(message) {
        alert('❌ ' + message);
    }

    showSuccess(message) {
        alert(message);
    }

    // ============================================
    // GETTERS
    // ============================================
    getUser() {
        return this.currentUser;
    }

    getUserName() {
        return this.currentUser?.name || 'Usuário';
    }

    getUserContact() {
        return this.currentUser?.contact || '';
    }

    getUserAvatar() {
        return this.currentUser?.avatar || '🎬';
    }
}

// Singleton
const auth = new AuthSystem();

// Exportar funções globais (compatibilidade com código existente)
window.auth = auth;
window.currentUser = auth.getUser();

// Atualizar currentUser global quando mudar
window.addEventListener('userLoggedIn', (e) => {
    window.currentUser = e.detail;
});

window.addEventListener('userRegistered', (e) => {
    window.currentUser = e.detail;
});

// Funções globais para o HTML
window.checkLogin = () => auth.isLoggedIn();
window.toggleLoginMode = () => auth.toggleLoginMode();
window.toggleLoginMethod = () => auth.toggleLoginMethod();
window.handleLogin = (e) => auth.handleLogin(e);
window.logout = () => auth.logout();

console.log('🔐 Sistema de autenticação carregado!');
console.log('📧 Login disponível: Email ou Telefone');
console.log('🇲🇿 Código do país: Moçambique (+258) primeiro');