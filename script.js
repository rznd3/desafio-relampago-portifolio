// aguarda o documento html carregar completamente antes de iniciar o js
// isso evita erros de tentar acessar elementos que ainda não existem na tela
document.addEventListener('DOMContentLoaded', () => {

    // busca o elemento <nav> com a classe .navbar para alterar seu estilo no scroll
    const navbar = document.querySelector('.navbar');

    // busca o botão com id 'scroll-to-projects' para adicionar o evento de clique
    const scrollBtn = document.getElementById('scroll-to-projects');

    // adiciona um 'ouvinte' para todo movimento de rolagem (scroll) na janela do navegador
    window.addEventListener('scroll', () => {

        // verifica se a posição vertical do scroll (scrolly) é maior que 50 pixels
        if (window.scrollY > 50) {
            // se for, muda o fundo da navbar para um cinza quase preto com transparência
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            // reduz o padding vertical para 15px, deixando a navbar mais compacta
            navbar.style.padding = '15px 5%';
            // aplica um leve desfoque no que estiver atrás da navbar (efeito de vidro)
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            // caso contrário (se o scroll for menor que 50px), remove o fundo
            navbar.style.background = 'transparent';
            // volta o padding para o tamanho original (maior)
            navbar.style.padding = '30px 5%';
            // remove o efeito de desfoque
            navbar.style.backdropFilter = 'none';
        }
    });

    // adiciona um evento de clique ao botão 'go'
    scrollBtn.addEventListener('click', () => {
        // busca a seção de projetos pelo id e rola suavemente até ela
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });

    // seleciona todos os elementos que têm a classe .project-card ou .contact-centered
    // esses elementos serão animados quando aparecerem na tela
    const revealElements = document.querySelectorAll('.project-card, .contact-centered');

    // cria um novo intersectionobserver (observador de interseção)
    // ele serve para detectar quando um elemento entra no campo de visão do usuário
    const revealObserver = new IntersectionObserver((entries) => {
        // para cada entrada (elemento observado) que mudou de estado...
        entries.forEach(entry => {
            // verifica se o elemento está 'interseccionando', ou seja, visível na tela
            if (entry.isIntersecting) {
                // muda a opacidade para 1 (totalmente visível)
                entry.target.style.opacity = '1';
                // remove o deslocamento vertical (volta para a posição original 0)
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 }); // configura para disparar quando 10% do elemento estiver visível

    // percorre cada elemento da lista de elementos para animar
    revealElements.forEach(el => {
        // define a opacidade inicial como 0 (invisível)
        el.style.opacity = '0';
        // desloca o elemento 40 pixels para baixo inicialmente
        el.style.transform = 'translateY(40px)';
        // define que qualquer mudança de estilo levará 1 segundo e usará uma curva suave
        el.style.transition = 'all 1s cubic-bezier(0.2, 1, 0.3, 1)';
        // começa a observar este elemento com o observer criado acima
        revealObserver.observe(el);
    });
});