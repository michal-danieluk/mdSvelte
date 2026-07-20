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

Status po pierwszym przebiegu (Filary D, B, C napisane jako wpisy blogowe — patrz sekcja 5, pillar page routes to osobny projekt kodowy dla Codex/Forge, nie ten workflow):

| Filar | Primary keyword | Status |
|---|---|---|
| A | content marketing / seo copywriting | ✅ `content-marketing-i-seo-copywriting_2026-07-18` — hub główny (1983 słowa, cel 2500 nie w pełni osiągnięty — patrz uwaga niżej). `content_is_king_ai_is_the_kingdom` zostaje jako wąski wpis o kącie AI/GEO, zlinkowany z hubem. |
| B | audyt seo / narzędzia seo | ✅ `jak-zrobic-audyt-seo_2026-07-19` — poradnik DIY audytu (techniczny/content/off-page + narzędzia). |
| C | pozycjonowanie stron / linkbuilding | ✅ `jak-dziala-pozycjonowanie-stron_2026-07-20` — mechanika (crawling/indeksacja/ranking/linki), różnicowana od DIY-planu na buildletter.com. |
| D | pozycjonowanie cena / lokalne | ✅ `ile-kosztuje-pozycjonowanie-strony_2026-07-17` — widełki + rozbicie kosztów + pozycjonowanie lokalne. |

**Wszystkie 4 filary mają teraz dedykowany artykuł** (A/B/C/D). Kolejny krok to pillar-page routes w kodzie (Codex/Forge, osobny projekt) oraz ewentualne dociągnięcie Filaru A do 2500+ słów, jeśli po czasie okaże się, że 1983 słowa nie wystarczają rankingowo — celowo nie dobijałem do okrągłej liczby kosztem lania wody (sprzeczne z DNA autora).

## 4. Wytyczne wykonawcze (dla każdego artykułu)

1. Określ filar (A/B/C/D) i intencję (Informational vs Commercial). Frazy z "cena"/"lokalne" → konkretne liczby/widełki, bez owijania w bawełnę (patrz `ile-kosztuje-marketing-malej-firmy` jako wzór tonu).
2. Struktura nagłówków H1/H2/H3 z naturalnie wplecionymi frazami z filara.
3. Wpleć techniczną analogię/case study (n8n/Make, terminal, digital minimalism) — zgodnie z DNA.
4. Sekcja "Co dalej?" na końcu: CTA do newslettera "Buildletter" + linkowanie wewnętrzne do 2-3 powiązanych postów z klastra (wzorzec już stosowany w repo, patrz commit `b2ef016`).
5. Frontmatter jak w istniejących postach: `title, date, tags, description, keywords, image_prompt, featured`.
6. **Data zawsze z przeszłości albo dzisiejsza, nigdy z przyszłości** — Vercel prerenderuje w build-time i nie odświeży się sam, gdy "nadejdzie" data. Sprawdź kolizję: `grep -rl "date: 'YYYY-MM-DD'" posts/*.md` przed zapisem.
7. **Sprawdź nakładanie z buildletter.com/blog** (`~/Desktop/buildletter/src/pages/blog/`) przed pisaniem — ten sam autor prowadzi tam osobny blog o SEO/marketingu małych firm, z kątem sprzedażowym (CTA do usług). Jeśli temat się pokrywa: różnicuj kąt (michaldanieluk.pl = edukacyjny/personal brand, buildletter.com = sprzedażowy/actionable) i dodaj link w obie strony zamiast pisać duplikat. **Buildletter.com to osobne repo (Astro, nie SvelteKit) — commituj tam tylko pliki, które sam edytujesz, working tree bywa "brudny" od innej, równoległej pracy Michała.**

## 5. Backlog — kolejne wpisy z serii "przebudowa bloga"

- **Część 1 (2026-07-16):** `jak-przebudowuje-bloga-pillar-pages_2026-07-16` — plan przebudowy, dlaczego pillar pages, research keywordowy Semrushem, jak powstały 4 filary A/B/C/D.
- **Część 2 — Answer the Public (rozpoczęta 2026-07-20):** 4 spoke-artykuły napisane w tej sesji (`czy-seo-sie-oplaca-malej-firmie`, `seo-samemu-czy-zatrudnic-kogos`, `content-marketing-a-seo-roznice`, `co-to-jest-seo-copywriting`), wszystkie dopięte do `pillars.ts` (`/seo`). Zasada: spoke targetuje długi ogon/konkretne pytanie, linkuje do huba, nie konkuruje o frazę główną.

### Backlog otwarty — NIE pisać automatycznie, tylko na wyraźne polecenie Michała

Sesja z 2026-07-20 zamknięta świadomie na 9 wpisach (kontrola tempa — ADHD, wiele wątków naraz). Poniższe czekają na osobny sygnał, każdy osobno, nie hurtem:

1. **"Jak zbudować pillar page"** (pillar pages co to, struktura bloga SEO) — how-to, generalizowany dla innych, różny od `jak-przebudowuje-bloga-pillar-pages` (to była historia WŁASNEGO wdrożenia, nie poradnik dla kogoś innego). Można pisać od razu, gdy Michał da sygnał — nie wymaga niczego dodatkowego.
2. **"Jak mierzyć efekty SEO"** (KPI SEO dla małej firmy, jak sprawdzić efekty pozycjonowania) — **kolejność ma znaczenie: pisać PO podłączeniu GA4/GSC** (patrz punkt 4), żeby oprzeć tekst na realnych danych z własnej strony, nie na ogólnikach — inaczej nachodzi na sekcję pomiaru już istniejącą w hubie Filaru A.
3. **"Google Ads czy SEO dla małej firmy"** (google ads vs seo) — dobry temat pomostowy między pillarem `/seo` a `/google-ads` (oba już istnieją w kodzie). Zero blokerów, można pisać na sygnał.
4. **Podłączenie GA4 + Google Search Console** — osobny, większy wątek (dostępy, uprawnienia, zakres: jednorazowy podgląd vs stały monitoring vs automatyczny raport). Nie dopisek do pisania treści — wymaga własnej, skupionej rozmowy, zanim się zacznie.
5. **Cross-pollinacja z newsletterem "Marketing w Budowlance" (beehiiv)** — Michał zauważył 2026-07-20, że research z tej sesji (Semrush + Answer the Public) może zasilić też tamten newsletter, nie tylko blog. **Trzeci kanał treściowy** dopisany do tej samej sesji, w której już ustaliliśmy zamknięcie na 9 wpisach — świadomie NIE rozwijane teraz, wraca jako osobny wątek na wyraźny sygnał, żeby nie mnożyć otwartych frontów w jednej sesji.
