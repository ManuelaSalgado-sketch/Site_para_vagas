document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos do Site de Vagas ---
    const jobListingsContainer = document.getElementById('job-listings');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // --- Elementos do Sistema de Login ---
    const loginSection = document.getElementById('login-section');
    const showLoginBtn = document.getElementById('showLoginBtn');
    const loginNavItem = document.getElementById('login-nav-item'); // O item "Login" na navegação
    const userInfo = document.getElementById('user-info'); // O item "Bem-vindo, user!"
    const loggedInUserSpan = document.getElementById('loggedInUser');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginMessage = document.getElementById('login-message');

    // --- Vagas (seu array de vagas existente) ---
    const jobs = [
        {
            id: 1,
            title: 'Desenvolvedor(a) Front-end Júnior',
            company: 'Tech Solutions Ltda.',
            location: 'Remoto',
            type: 'Tempo Integral',
            description: 'Buscamos um desenvolvedor(a) Front-end Júnior para atuar com HTML, CSS e JavaScript.',
            requirements: ['HTML5', 'CSS3', 'JavaScript Básico', 'Git'],
            applyLink: 'https://forms.gle/exemplofrontend'
        },
        {
            id: 2,
            title: 'Analista de Dados Pleno',
            company: 'Data Insights Corp.',
            location: 'São Paulo, SP',
            type: 'Tempo Integral',
            description: 'Profissional com experiência em análise de dados e ferramentas de BI.',
            requirements: ['SQL', 'Python (Pandas, NumPy)', 'Power BI/Tableau', 'Excel Avançado'],
            applyLink: 'https://forms.gle/exemplodados'
        },
        {
            id: 3,
            title: 'Designer UX/UI Sênior',
            company: 'Creative Innovations',
            location: 'Remoto',
            type: 'Tempo Integral',
            description: 'Designer experiente para criar interfaces intuitivas e agradáveis, com foco na experiência do usuário.',
            requirements: ['Figma/Sketch', 'Pesquisa de Usuário', 'Prototipagem', 'Design System'],
            applyLink: 'https://forms.gle/exemplouiux'
        },
        {
            id: 4,
            title: 'Engenheiro(a) de Software Back-end',
            company: 'CodeForge Labs',
            location: 'Rio de Janeiro, RJ',
            type: 'Tempo Integral',
            description: 'Desenvolver e manter APIs robustas utilizando Node.js e bancos de dados SQL.',
            requirements: ['Node.js', 'Express', 'SQL', 'Testes Unitários', 'AWS/Azure'],
            applyLink: 'https://forms.gle/exemplobackend'
        },
        {
            id: 5,
            title: 'Estágio em Marketing Digital',
            company: 'Growth Hub',
            location: 'Belo Horizonte, MG',
            type: 'Estágio',
            description: 'Apoiar a equipe de marketing em campanhas online e gestão de redes sociais.',
            requirements: ['Conhecimento básico de Marketing Digital', 'Proatividade', 'Boa comunicação', 'Ferramentas de Redes Sociais'],
            applyLink: 'https://forms.gle/exemplomarketing'
        },
        {
            id: 6,
            title: 'Especialista em Cloud Computing (AWS)',
            company: 'Cloud Innovations',
            location: 'Remoto',
            type: 'Tempo Integral',
            description: 'Profissional com vasta experiência em arquitetura e implementação de soluções na AWS.',
            requirements: ['AWS (EC2, S3, Lambda, VPC)', 'Docker', 'Kubernetes', 'CI/CD'],
            applyLink: 'https://forms.gle/exemploaws'
        },
        {
            id: 7,
            title: 'Analista de Suporte Técnico Nível 1',
            company: 'HelpDesk Pro',
            location: 'Campinas, SP (Presencial)',
            type: 'Tempo Integral',
            description: 'Atendimento e resolução de problemas técnicos para clientes internos e externos.',
            requirements: ['Conhecimento básico de redes', 'Windows/Linux', 'Boa comunicação', 'Proatividade'],
            applyLink: 'https://forms.gle/exemplosuporte'
        },
        {
            id: 8,
            title: 'Desenvolvedor(a) Mobile Android',
            company: 'Mobile Solutions',
            location: 'São Paulo, SP',
            type: 'Tempo Integral',
            description: 'Desenvolvimento de aplicativos nativos para a plataforma Android.',
            requirements: ['Kotlin/Java', 'Android SDK', 'APIs RESTful', 'Gradle'],
            applyLink: 'https://forms.gle/exemplomobile'
        },
        {
            id: 9,
            title: 'Gerente de Projetos de TI',
            company: 'Project Masters',
            location: 'Remoto',
            type: 'Tempo Integral',
            description: 'Liderar equipes e garantir a entrega de projetos de software dentro do prazo e orçamento.',
            requirements: ['Metodologias Ágeis (Scrum, Kanban)', 'PMBOK', 'Gerenciamento de Riscos', 'Comunicação Interpessoal'],
            applyLink: 'https://forms.gle/exemplogerente'
        },
        {
            id: 10,
            title: 'Cientista de Dados',
            company: 'Deep Learning Labs',
            location: 'Belo Horizonte, MG',
            type: 'Tempo Integral',
            description: 'Desenvolver modelos preditivos e análises estatísticas complexas para insights de negócio.',
            requirements: ['Python (Scikit-learn, TensorFlow/PyTorch)', 'R', 'Estatística Avançada', 'Machine Learning'],
            applyLink: 'https://forms.gle/exemplocientista'
        }
    ];

    // --- Credenciais Fictícias (APENAS PARA DEMONSTRAÇÃO) ---
    const VALID_USERNAME = 'user';
    const VALID_PASSWORD = 'password123'; // Nunca faça isso em um sistema real!

    // --- Funções de Exibição e Busca (já existentes) ---
    function displayJobs(jobArray) {
        jobListingsContainer.innerHTML = ''; // Limpa o conteúdo atual

        if (jobArray.length === 0) {
            jobListingsContainer.innerHTML = '<p>Nenhuma vaga encontrada para sua pesquisa.</p>';
            return;
        }

        jobArray.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');
            jobCard.innerHTML = `
                <h4>${job.title}</h4>
                <p><strong>Empresa:</strong> ${job.company}</p>
                <span class="location"><strong>Local:</strong> ${job.location}</span>
                <span class="type"><strong>Tipo:</strong> ${job.type}</span>
                <p>${job.description}</p>
                <p><strong>Requisitos:</strong> ${job.requirements.join(', ')}</p>
                <button onclick="window.open('${job.applyLink}', '_blank')">Candidatar-se</button>
            `;
            jobListingsContainer.appendChild(jobCard);
        });
    }

    function searchJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredJobs = jobs.filter(job =>
            job.title.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.location.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm)
        );
        displayJobs(filteredJobs);
    }

    // --- Funções do Sistema de Login ---

    // Função para atualizar o status de login na interface
    function updateLoginStatus() {
        const loggedInUsername = localStorage.getItem('loggedInUser'); // Verifica se há um usuário no localStorage

        if (loggedInUsername) {
            // Usuário logado
            loginNavItem.style.display = 'none'; // Esconde "Login / Cadastre-se"
            userInfo.style.display = 'inline-block'; // Mostra "Bem-vindo, user!"
            loggedInUserSpan.textContent = loggedInUsername;
            loginSection.style.display = 'none'; // Esconde a seção de login se estiver visível
            // Opcional: Você pode habilitar/desabilitar outras funcionalidades aqui
        } else {
            // Usuário deslogado
            loginNavItem.style.display = 'inline-block'; // Mostra "Login / Cadastre-se"
            userInfo.style.display = 'none'; // Esconde "Bem-vindo, user!"
            // Opcional: Você pode esconder/desabilitar funcionalidades exclusivas para logados
        }
    }

    // Função para lidar com o envio do formulário de login
    function handleLogin(event) {
        event.preventDefault(); // Impede o envio padrão do formulário (que recarregaria a página)

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            loginMessage.textContent = 'Login realizado com sucesso!';
            loginMessage.className = 'message success';
            localStorage.setItem('loggedInUser', username); // Armazena o usuário no localStorage
            usernameInput.value = ''; // Limpa os campos
            passwordInput.value = '';
            setTimeout(() => {
                loginSection.style.display = 'none'; // Esconde o formulário após 1.5s
                updateLoginStatus(); // Atualiza o status de login na nav
            }, 1500);
        } else {
            loginMessage.textContent = 'Usuário ou senha inválidos.';
            loginMessage.className = 'message error';
        }
    }

    // Função para lidar com o logout
    function handleLogout() {
        localStorage.removeItem('loggedInUser'); // Remove o usuário do localStorage
        updateLoginStatus(); // Atualiza o status de login na nav
        alert('Você foi desconectado(a).'); // Feedback simples
        // Opcional: Redirecionar para a página inicial ou limpar o conteúdo
    }

    // --- Event Listeners ---
    searchButton.addEventListener('click', searchJobs);

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchJobs();
        }
    });

    showLoginBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Evita que o link # mude a URL
        loginSection.style.display = 'block'; // Mostra a seção de login
        loginMessage.textContent = ''; // Limpa mensagens anteriores
        loginMessage.className = 'message';
        // Opcional: Esconder outras seções para focar no login
        // document.getElementById('hero').style.display = 'none';
        // document.getElementById('vagas').style.display = 'none';
    });

    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);

    // --- Inicialização ---
    displayJobs(jobs); // Exibe todas as vagas ao carregar a página
    updateLoginStatus(); // Verifica o status de login ao carregar a página
});