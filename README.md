# POATAN — Mãos de Pedra

> Landing page tributo a **Alex "Poatan" Pereira**, ex-campeão de duas divisões do UFC e do Glory Kickboxing — da favela do Batistini ao topo do mundo.

![HTML5](https://img.shields.io/badge/HTML5-0a0806?style=for-the-badge&logo=html5&logoColor=e8a33d)
![CSS3](https://img.shields.io/badge/CSS3-0a0806?style=for-the-badge&logo=css3&logoColor=e8a33d)
![JavaScript](https://img.shields.io/badge/JavaScript-0a0806?style=for-the-badge&logo=javascript&logoColor=e8a33d)
![Sem dependências](https://img.shields.io/badge/zero%20dependências-c8371e?style=for-the-badge)

Projeto de portfólio 100% artesanal: **um único arquivo HTML**, sem frameworks, sem bibliotecas, sem build. Tudo — animações, ícones, efeitos 3D e partículas — foi escrito à mão em HTML, CSS e JavaScript puro.

---

## ✦ Destaques

### Tela de carregamento com estética indígena
Homenagem à ancestralidade **Pataxó** de Alex Pereira e à origem Tupi do nome *Poatan* (Po = mão, Atã = pedra):
- Faixas de grafismo tribal animadas (SVG gerado em runtime);
- Emblema circular com anéis giratórios e pulso de tambor;
- Flecha como barra de progresso, que **dispara** ao completar;
- Modo de gravação: abra a página com `#loader` no fim da URL para segurar a tela — ideal para gravar stories e reels.

### Efeitos 3D reais
- Cartão do herói com *tilt* 3D que responde ao **mouse** no desktop e ao **giroscópio** no celular (funciona no navegador interno do Instagram);
- Cartões de conquistas com *flip* 3D por hover ou toque;
- Galeria com elevação em perspectiva e brilho especular dinâmico.

### Direção de arte
- Paleta inspirada no urucum, jenipapo e ouro dos cinturões;
- Partículas de brasa em canvas atravessando toda a página;
- Iconografia própria em SVG de traço fino (nenhum emoji, nenhuma lib de ícones);
- Tipografia display (Bebas Neue / Oswald) com hierarquia editorial.

### Conteúdo com pesquisa real
Linha do tempo completa (2009–2026), os 4 cinturões mundiais, a rivalidade com Israel Adesanya, a reconquista no UFC 320 e a ida ao peso-pesado — tudo levantado de fontes públicas.

---

## ✦ Como rodar

Não precisa de nada além de um navegador:

```bash
git clone https://github.com/giraldidev/Poatan.git
cd Poatan
# abra o index.html, ou sirva localmente:
python -m http.server 8899
```

## ✦ Estrutura

```
├── index.html   # página completa (markup + estilos + scripts)
└── assets/      # fotografias (Wikimedia Commons — licenças livres)
```

## ✦ Acessibilidade e performance

- Respeita `prefers-reduced-motion`;
- Imagens com `loading="lazy"` e `fetchpriority` no herói;
- Sem requisições de terceiros além do Google Fonts;
- Responsivo de 320px ao ultrawide.

---

## ✦ Créditos

- **Fotografias:** [Wikimedia Commons](https://commons.wikimedia.org/) — licenças livres / domínio público (Departamento de Defesa dos EUA).
- Página de fã para fins de portfólio, **sem afiliação** com Alex Pereira, UFC ou Glory Kickboxing.

## ✦ Autor

**Vinicius Giraldi** — [@giraldidev](https://www.instagram.com/giraldidev)

*Chama.*
