# Content Strategy — michaldanieluk.pl (Semrush-driven)

> Working brief for Claude/agenci piszący do `posts/`. Zastępuje ad-hoc podejście do tematów — każdy nowy artykuł powinien wpisywać się w jeden z 4 filarów poniżej i realizować wytyczne wykonawcze na końcu.

Surowe dane Semrush (mindmapy + eksporty CSV/XLSX, 5359 słów kluczowych): `~/Downloads/CEMEX/Pobrane/SEO/`
- `SEO_pages_2026-07-20.csv` — pełny eksport (Keyword, Page, Topic, Volume, KD, Intent, SERP Features)
- `SEO-dla-małych-firm_mindmap_2026-07-20.jpg`, `SEO_mindmap_2026-07-20.jpg` — mapy klastrów

## 1. Tożsamość autora (DNA treści)

Michał — digital marketing specialist, 11+ lat w performance marketingu i B2B lead gen. Techniczny marketer: rozwija aplikacje w Ruby on Rails, stawia self-hosted home laby (Ubuntu/CasaOS), pracuje w terminalu (Neovim, tmux), digital minimalism.

Styl: bezpośredni, partnerski, konkretny, lekki sarkazm/inteligentny humor. Zero korpo-nowomowy i lania wody. Obrazowe analogie ze świata tech/dev (dokładnie ten ton widać już w `czerwone-flagi-agencja-marketingowa`, `jak-sprawdzic-agencje-seo`).

## 2. Struktura klastrów (Semrush)

### Filar A — Content Marketing i SEO Copywriting (Hub główny)
Pillar page, min. 2500 słów.
- content marketing (Vol 10440, Informational)
- seo i sem (Vol 1940, Informational)
- seo copywriting (Vol 1650, Informational)
- seo marketing (Vol 520, Informational)
- Subs: tekst seo przykład (220), seo sem ppc (220)

### Filar B — Analiza, Narzędzia i Audyt SEO (Hub techniczny)
Pillar page / zaawansowany poradnik.
- audyt seo (Vol 4480, Informational)
- google position checker (Vol 1200, Informational)
- audyt strony internetowej (Vol 590, Commercial)
- audyty stron (Vol 580, Informational)
- narzędzia seo (Vol 510, Informational)
- audyt strony (Vol 390, Informational)
- analise seo (Vol 180, Informational)

### Filar C — Podstawy i Pozycjonowanie Ogólne
- pozycjonowanie stron (Vol 9430)
- pozycjonowanie sklepu (Vol 3830)
- wyszukiwarka słów kluczowych (Vol 1230)
- linkbuilding seo (Vol 410)
- linkowanie wewnętrzne (Vol 210)

### Filar D — SEO dla Małych Firm & Finanse (Hub komercyjny) — NOWOŚĆ
Strona cennikowa / landing ofertowy / posty o ROI. Temat: odczarowywanie kosztów SEO, transparentność budżetowa dla MSP, pozycjonowanie lokalne.
- pozycjonowanie cena (Vol 5860, Commercial/Transactional) — kluczowa fraza pod ROI
- pozycjonowanie lokalne (Vol 1080, Commercial/Informational)

## 3. Gap-check vs. istniejące posty (`posts/`, stan 2026-07-20)

Żaden istniejący wpis nie celuje wprost w primary keyword żadnego filara jako pillar page. Najbliższe pokrycie (do wykorzystania jako linkowanie wewnętrzne, nie duplikacja):

| Filar | Primary keyword | Status |
|---|---|---|
| A | content marketing / seo copywriting | Brak. `content_is_king_ai_is_the_kingdom` dotyka "content marketing ai" wąsko (kąt AI/GEO, nie klasyczny content marketing). |
| B | audyt seo / narzędzia seo | Częściowe pokrycie boczne: `jak-sprawdzic-agencje-seo` ma "audyt seo małej firmy" jako secondary keyword, ale kąt to kontrola agencji, nie pillar "jak zrobić audyt SEO". Brak pillar page. |
| C | pozycjonowanie stron / linkbuilding | Brak. `partyzanckie_seo`, `podsumowanie-2025-seo`, `seo_umiera_nadchodzi_geo` to ogólne SEO, nie targetują tej frazy. |
| D | pozycjonowanie cena / lokalne | Blisko: `ile-kosztuje-marketing-malej-firmy` pokrywa koszt ogólnie (SEO to jeden z podpunktów) — dobry kandydat do linkowania, ale nie zastępuje dedykowanego "ile kosztuje pozycjonowanie" targetującego frazę transakcyjną wprost. |

Wniosek: wszystkie 4 filary są realnym białym polem — najwyższy wolumen + intencja transakcyjna: **Filar D "pozycjonowanie cena" (5860, Commercial)** i **Filar C "pozycjonowanie stron" (9430)**.

## 4. Wytyczne wykonawcze (dla każdego artykułu)

1. Określ filar (A/B/C/D) i intencję (Informational vs Commercial). Frazy z "cena"/"lokalne" → konkretne liczby/widełki, bez owijania w bawełnę (patrz `ile-kosztuje-marketing-malej-firmy` jako wzór tonu).
2. Struktura nagłówków H1/H2/H3 z naturalnie wplecionymi frazami z filara.
3. Wpleć techniczną analogię/case study (n8n/Make, terminal, digital minimalism) — zgodnie z DNA.
4. Sekcja "Co dalej?" na końcu: CTA do newslettera "Buildletter" + linkowanie wewnętrzne do 2-3 powiązanych postów z klastra (wzorzec już stosowany w repo, patrz commit `b2ef016`).
5. Frontmatter jak w istniejących postach: `title, date, tags, description, keywords, image_prompt, featured`.
