/* ============================================================
   PORTFÓLIO IRES HELENA — INTERAÇÕES
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ========== 1. MODO ESCURO ========== */
    const temaBtn = document.getElementById('temaBtn');
    if (temaBtn) {
        temaBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            temaBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
        });
    }

    /* ========== 2. FILTRO DE PROJETOS ========== */
    const filtros = document.querySelectorAll('.filtro');
    const projetos = document.querySelectorAll('.card--projeto');
    filtros.forEach(f => f.addEventListener('click', () => {
        filtros.forEach(x => x.classList.remove('ativo'));
        f.classList.add('ativo');
        const alvo = f.dataset.filtro;
        projetos.forEach(p => {
            const tags = [...p.querySelectorAll('.card__tags span')].map(s => s.textContent.toLowerCase());
            p.classList.toggle('escondido', alvo !== 'todos' && !tags.includes(alvo));
        });
    }));

    /* ========== 3. BADGES CLICÁVEIS → PROJETOS ========== */
    document.querySelectorAll('.badge').forEach(b => b.addEventListener('click', () => {
        const secaoProjetos = document.getElementById('projetos');
        if (secaoProjetos) secaoProjetos.scrollIntoView({ behavior: 'smooth' });
    }));

    /* ========== 4. REVELAÇÃO AO ROLAR ========== */
    const elementos = document.querySelectorAll('.section__title, .card, .contato__text, .contato__links');
    elementos.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ativo');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    elementos.forEach(el => observer.observe(el));

    /* ========== 5. TILT 3D NOS CARDS DE PROJETO ========== */
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
            const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
            card.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    /* ========== 6. NAVEGAÇÃO SUAVE COM OFFSET ========== */
    const header = document.querySelector('.header');
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const alvo = document.querySelector(link.getAttribute('href'));
            if (!alvo) return;
            e.preventDefault();
            window.scrollTo({
                top: alvo.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight - 10,
                behavior: 'smooth'
            });
        });
    });

    /* ========== 7. SOMBRA DO HEADER AO ROLAR ========== */
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 40
            ? '0 6px 24px rgba(247, 141, 167, 0.22)'
            : 'none';
    });

    /* ========== 8. DIGITAÇÃO NO SUBTÍTULO ========== */
    const sub = document.querySelector('.hero__subtitle');
    if (sub) {
        const txt = sub.textContent;
        sub.textContent = '';
        let i = 0;
        const digitar = () => {
            if (i < txt.length) {
                sub.textContent += txt[i++];
                setTimeout(digitar, 45);
            }
        };
        setTimeout(digitar, 600);
    }

    /* ========== 9. PARALLAX NOS BLOBS ========== */
    const blobs = document.querySelectorAll('.blob');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        blobs.forEach((b, i) => {
            const f = (i + 1) * 12;
            b.style.marginLeft = `${x * f}px`;
            b.style.marginTop = `${y * f}px`;
        });
    });

    /* ========== 10. ANO DINÂMICO ========== */
    const footerP = document.querySelector('.footer p');
    if (footerP) {
        footerP.innerHTML = `© ${new Date().getFullYear()} Ires Helena · Feito com 💗`;
    }

    /* ========== 11. BOTÃO MISTERIOSO ========== */
    const misterioBtn = document.getElementById('misterioBtn');
    const somMisterio = document.getElementById('somMisterio');

    if (misterioBtn && somMisterio) {
        window.addEventListener('scroll', () => {
            const fimDaPagina = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
            misterioBtn.classList.toggle('visivel', fimDaPagina);
        });

        misterioBtn.addEventListener('click', () => {
            somMisterio.currentTime = 0;
            somMisterio.play().catch(err => console.warn('Áudio bloqueado:', err));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ========== 12. CURSOR COM RASTRO SUAVE ========== */
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let glowX = window.innerWidth / 2;
    let glowY = window.innerHeight / 2;
    let mouseX = glowX;
    let mouseY = glowY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animarGlow = () => {
        glowX += (mouseX - glowX) * 0.18;
        glowY += (mouseY - glowY) * 0.18;
        glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animarGlow);
    };
    animarGlow();

    /* ========== 13. PARTÍCULAS AO CLICAR ========== */
    const emojis = ['✨', '💖', '🌸', '⭐', '💫', '🩷'];
    const cores = ['#f78da7', '#ff9eb5', '#ffd1dc', '#ffe4ec'];

    document.addEventListener('click', (e) => {
        const alvo = e.target;
        const clicavel = alvo.closest('a, button, .badge, .card, .filtro, .nav__link, .btn');
        const qtd = clicavel ? 10 : 6;

        for (let i = 0; i < qtd; i++) {
            const p = document.createElement('span');
            p.className = 'particula-click';
            p.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            const angulo = Math.random() * Math.PI * 2;
            const dist = 40 + Math.random() * 60;
            const dx = Math.cos(angulo) * dist;
            const dy = Math.sin(angulo) * dist - 30;
            const rot = (Math.random() * 360 - 180) + 'deg';

            p.style.left = e.clientX + 'px';
            p.style.top  = e.clientY + 'px';
            p.style.setProperty('--dx', dx + 'px');
            p.style.setProperty('--dy', dy + 'px');
            p.style.setProperty('--rot', rot);
            p.style.color = cores[Math.floor(Math.random() * cores.length)];
            p.style.fontSize = (12 + Math.random() * 10) + 'px';

            document.body.appendChild(p);
            setTimeout(() => p.remove(), 950);
        }
    });

});