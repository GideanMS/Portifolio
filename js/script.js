// ============================================================
// Gidean Matos — Portfolio scripts
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initProgressBar();
  initReveal();
  initTerminal();
  initAvatarToggle();
});

/* ---------- navbar background on scroll ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- scroll progress bar ---------- */
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}

/* ---------- fade-in reveal on scroll ---------- */
function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

/* ---------- terminal: intro typing + interactive commands ---------- */
function initTerminal() {
  const outputEl = document.getElementById('terminalOutput');
  const historyEl = document.getElementById('terminalHistory');
  const inputEl = document.getElementById('terminalInput');
  const inputLine = document.querySelector('.term-input-line');
  const section = document.getElementById('terminal');
  if (!outputEl || !section) return;

  const introLines = [
    'Software Developer',
    '2+ years of professional experience.',
    'Focused on Backend Development',
    'using ASP.NET Core.'
  ];

  const commandHistory = [];
  let historyPointer = -1;

  const COMMANDS = {
    help: () =>
      'comandos disponíveis:\n' +
      '  whoami      — sobre mim\n' +
      '  skills      — stack técnica\n' +
      '  projects    — projeto em destaque\n' +
      '  journey     — trajetória\n' +
      '  contact     — formas de contato\n' +
      '  github      — abrir perfil do GitHub\n' +
      '  clear       — limpar terminal',

    whoami: () => introLines.join('\n'),

    skills: () =>
      'Languages   C#, SQL\n' +
      'Frameworks  ASP.NET Core, Entity Framework\n' +
      'Databases   SQL Server, MongoDB\n' +
      'Cloud       AWS EC2, AWS S3\n' +
      'Tools       Git, GitHub, Swagger, Docker, Postman',

    projects: () =>
      'FactoryManager — Industrial Management API\n' +
      'C# · ASP.NET Core · Entity Framework Core · SQL Server · Docker\n' +
      'veja a seção "FactoryManager" abaixo para detalhes.',

    journey: () =>
      '2021 - 2022  Atendente - Cinemark\n' +
      '2022 - 2024  Estagio - Cinemark\n' +
      '2026  FactoryManager\n' +
      'today Looking for Backend opportunities',

    contact: () =>
      'LinkedIn  linkedin.com/in/gideanmatossantana\n' +
      'GitHub    github.com/GideanMS\n' +
      'Email     g1d34n@gmail.com',

    github: () => {
      window.open('https://github.com/GideanMS', '_blank', 'noopener');
      return 'abrindo github.com/GideanMS ...';
    },

    ls: () => 'about  skills  factory-manager  journey  github  contact',

    sudo: () => 'Nice try. Permission denied ✋',

    clear: () => null // handled specially
  };

  function runCommand(raw) {
    const cmdLine = document.createElement('p');
    cmdLine.className = 'term-history-cmd';
    cmdLine.innerHTML = `<span class="prompt">Gidean@Portfolio:~$</span> ${escapeHtml(raw)}`;
    historyEl.appendChild(cmdLine);

    const key = raw.trim().toLowerCase();

    if (key === '') return;

    if (key === 'clear') {
      historyEl.innerHTML = '';
      return;
    }

    const handler = COMMANDS[key];
    const out = document.createElement('p');
    out.className = 'term-history-out';

    if (handler) {
      out.textContent = handler();
    } else {
      out.classList.add('term-error');
      out.textContent = `command not found: ${raw}. digite "help" para ver a lista de comandos.`;
    }
    historyEl.appendChild(out);
    section.scrollIntoView({ block: 'nearest' });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = inputEl.value;
        if (value.trim() !== '') {
          commandHistory.push(value);
          historyPointer = commandHistory.length;
        }
        runCommand(value);
        inputEl.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyPointer > 0) {
          historyPointer--;
          inputEl.value = commandHistory[historyPointer];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyPointer < commandHistory.length - 1) {
          historyPointer++;
          inputEl.value = commandHistory[historyPointer];
        } else {
          historyPointer = commandHistory.length;
          inputEl.value = '';
        }
      }
    });
  }

  if (inputLine) {
    inputLine.addEventListener('click', () => inputEl && inputEl.focus());
  }

  /* ---- intro typing animation for the initial `whoami` ---- */
  let started = false;

  const typeLines = () => {
    if (started) return;
    started = true;

    let lineIndex = 0;
    let charIndex = 0;
    const speed = 28;

    const currentLineEl = () => {
      let el = outputEl.querySelector(`[data-line="${lineIndex}"]`);
      if (!el) {
        el = document.createElement('p');
        el.className = 'term-line line-fill';
        el.dataset.line = lineIndex;
        outputEl.appendChild(el);
      }
      return el;
    };

    const tick = () => {
      if (lineIndex >= introLines.length) {
        if (inputEl) inputEl.focus({ preventScroll: true });
        return;
      }
      const el = currentLineEl();
      const fullLine = introLines[lineIndex];

      if (charIndex <= fullLine.length) {
        el.textContent = fullLine.slice(0, charIndex);
        charIndex++;
        setTimeout(tick, speed);
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(tick, 220);
      }
    };

    tick();
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeLines();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    observer.observe(section);
  } else {
    typeLines();
  }
}

/* ---------- avatar / octocat toggle ---------- */
function initAvatarToggle() {
  const toggle = document.getElementById('avatarToggle');
  const img = document.getElementById('avatarImg');
  if (!toggle || !img) return;

  const profileSrc = 'assets/profile.png';
  const octocatSrc = 'https://github.githubassets.com/images/modules/logos_page/Octocat.png';

  let showingOctocat = false;

  toggle.addEventListener('click', () => {
    showingOctocat = !showingOctocat;
    img.src = showingOctocat ? octocatSrc : profileSrc;
    img.alt = showingOctocat ? 'Octocat, mascote do GitHub' : 'Foto de Gidean Matos';
  });
}
