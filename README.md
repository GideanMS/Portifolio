# Gidean Matos — Portfolio

Portfólio pessoal single-page, com tema escuro inspirado no GitHub. Construído com HTML, CSS e JavaScript puros (sem frameworks ou build step).

**[Ver demo ao vivo](#)** _(publique no GitHub Pages e cole o link aqui)_

## Seções

`Hero` → `Terminal` → `About` → `Skills` → `FactoryManager` → `Journey` → `GitHub` → `Contact` → `Footer`

## Stack

- HTML5 semântico
- CSS3 (custom properties, grid, animações)
- JavaScript vanilla (IntersectionObserver para reveal on scroll e efeito de digitação no terminal)
- [Devicon](https://devicon.dev/) para ícones de tecnologias
- [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) para os widgets do GitHub

## Estrutura

```
Gidean-Portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── profile.jpg     # sua foto (adicione aqui)
│   ├── octocat.png     # não obrigatório — usa o octocat oficial do GitHub por padrão
│   └── resume.pdf       # seu currículo em PDF (adicione aqui)
└── README.md
```

## Como personalizar

1. **Foto e currículo**: coloque `profile.jpg` e `resume.pdf` dentro de `assets/`.
2. **Links**: troque `gideanmatos` pelo seu usuário real do GitHub/LinkedIn em `index.html` (botões do Hero, seção Contact e widgets do GitHub).
3. **E-mail**: troque `gidean.matos@email.com` pelo seu e-mail real.
4. **Projeto FactoryManager**: atualize os links de repositório, Swagger e documentação na seção `#factory-manager`.
5. **Cores**: todas as cores estão centralizadas em `:root` no topo de `css/style.css` — troque os valores hex para gerar um novo tema.

## Paleta de cores

| Uso        | Cor       |
|------------|-----------|
| Background | `#0D1117` |
| Cards      | `#161B22` |
| Border     | `#30363D` |
| Primary    | `#58A6FF` |
| Secondary  | `#8B949E` |
| Text       | `#F0F6FC` |
| Hover      | `#79C0FF` |

## Rodando localmente

Não há dependências. Basta abrir `index.html` no navegador, ou servir a pasta com um servidor estático simples:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

---

Designed & Developed by **Gidean Matos** — 2026
