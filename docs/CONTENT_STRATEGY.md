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

## 5. Ekosystem właściwości Michała — mapa i polityka cross-postingu

Ustalone 2026-07-21/22, po odkryciu że Substack "BuildLetter" (buildletter.substack.com) nie jest pustą platformą — ma już 7 opublikowanych wpisów po polsku, część niemal 1:1 duplikatów tytułów z michaldanieluk.pl (`automatyzacja-jednoosobowa-firma-stack-za-zero`, `5-kontrintuicyjnych-lekcji-marktingowych`, `nvim-i-obs`).

### Cztery właściwości, trzy filary (Substack nie jest osobnym filarem)

| Właściwość | Rola | Odbiorca |
|---|---|---|
| **michaldanieluk.pl** (ten blog) | Personal brand, edukacyjny, SEO-zindeksowany hub wiedzy | Szeroka publiczność SEO/marketing/tech |
| **buildletter.substack.com** ("BuildLetter") | Mailowe rozszerzenie michaldanieluk.pl — **ten sam filar, inny format**, nie 4. odrębny byt | Ci sami czytelnicy co blog, w formacie mailowym |
| **buildletter.com** | Serwisowy/sprzedażowy | Ogólne małe firmy szukające wykonawcy marketingu |
| **marketingwbudowlance.pl** (beehiiv) | Serwisowy/sprzedażowy, branżowy | Firmy budowlane/wykonawcze konkretnie |

### Polityka: ten sam temat, dwa różne teksty (nie duplikat + link)

Substack **nie wspiera tagów canonical** (zweryfikowane 2026-07-21 — ograniczenie platformy, nie coś do obejścia ustawieniem). Dwie opcje radzenia sobie z tym:
1. ~~Pełny tekst na blogu, teaser + link na Substacku~~ — działa, ale słabsze wykorzystanie Substacka.
2. **✅ Wybrane: ten sam temat, dwa naprawdę różne teksty** — różny kąt, różna struktura, różne przykłady (nie przepisanie innymi słowami — to nadal wygląda jak duplikat dla Google). Substack może brzmieć bardziej osobiście/warsztatowo (skoro to "personal BuildLetter"), blog bardziej poradnikowo. Zero problemu z duplicate content, bo tekst faktycznie się różni — dokładnie ten wzorzec, który już działa między michaldanieluk.pl a buildletter.com (patrz punkt 7 w sekcji 4).
3. **Zawsze linkuj między wersjami** (Substack → blog i odwrotnie) — nie zastępuje różnicowania treści, ale wzmacnia obie strony niezależnie od tego, że nie ma canonical.

**Do zrobienia (zgłoszone, nie wykonane):** 3 istniejące duplikaty na Substacku (patrz wyżej) nie mają linku do wersji na blogu — warto dopisać, skoro nie ma canonical, żeby dać Google chociaż sygnał kierunkowy.

## 6. Backlog — kolejne wpisy z serii "przebudowa bloga"

- **Część 1 (2026-07-16):** `jak-przebudowuje-bloga-pillar-pages_2026-07-16` — plan przebudowy, dlaczego pillar pages, research keywordowy Semrushem, jak powstały 4 filary A/B/C/D.
- **Część 2 — Answer the Public (rozpoczęta 2026-07-20):** 4 spoke-artykuły napisane w tej sesji (`czy-seo-sie-oplaca-malej-firmie`, `seo-samemu-czy-zatrudnic-kogos`, `content-marketing-a-seo-roznice`, `co-to-jest-seo-copywriting`), wszystkie dopięte do `pillars.ts` (`/seo`). Zasada: spoke targetuje długi ogon/konkretne pytanie, linkuje do huba, nie konkuruje o frazę główną.

### Backlog otwarty — NIE pisać automatycznie, tylko na wyraźne polecenie Michała

Sesja z 2026-07-20 zamknięta świadomie na 9 wpisach (kontrola tempa — ADHD, wiele wątków naraz). Poniższe czekają na osobny sygnał, każdy osobno, nie hurtem:

1. **"Jak zbudować pillar page"** (pillar pages co to, struktura bloga SEO) — how-to, generalizowany dla innych, różny od `jak-przebudowuje-bloga-pillar-pages` (to była historia WŁASNEGO wdrożenia, nie poradnik dla kogoś innego). Można pisać od razu, gdy Michał da sygnał — nie wymaga niczego dodatkowego.
2. **"Jak mierzyć efekty SEO"** (KPI SEO dla małej firmy, jak sprawdzić efekty pozycjonowania) — **kolejność ma znaczenie: pisać PO podłączeniu GA4/GSC** (patrz punkt 4), żeby oprzeć tekst na realnych danych z własnej strony, nie na ogólnikach — inaczej nachodzi na sekcję pomiaru już istniejącą w hubie Filaru A.
3. **"Google Ads czy SEO dla małej firmy"** (google ads vs seo) — dobry temat pomostowy między pillarem `/seo` a `/google-ads` (oba już istnieją w kodzie). Zero blokerów, można pisać na sygnał.
4. **Podłączenie GA4 + Google Search Console** — osobny, większy wątek (dostępy, uprawnienia, zakres: jednorazowy podgląd vs stały monitoring vs automatyczny raport). Nie dopisek do pisania treści — wymaga własnej, skupionej rozmowy, zanim się zacznie.
5. **Cross-pollinacja z newsletterem "Marketing w Budowlance" (beehiiv)** — Michał zauważył 2026-07-20, że research z tej sesji (Semrush + Answer the Public) może zasilić też tamten newsletter, nie tylko blog. **Trzeci kanał treściowy** dopisany do tej samej sesji, w której już ustaliliśmy zamknięcie na 9 wpisach — świadomie NIE rozwijane teraz, wraca jako osobny wątek na wyraźny sygnał, żeby nie mnożyć otwartych frontów w jednej sesji.
6. **"SEO a lejek sprzedażowy — jak się ma jedno do drugiego"** — zgłoszone przez Michała na Telegramie 2026-07-23 (02:25), do przemyślenia przy najbliższej sesji w terminalu, zanim zdecydujemy czy pisać. Pomost między Filarem A (content/SEO, informational) a Filarem D (ROI/konwersja, commercial) — dobrze pasuje obok `czy-seo-sie-oplaca-malej-firmie` i `ile-kosztuje-pozycjonowanie-strony`, ale kąt (ruch SEO → leady → sprzedaż) jeszcze nie ma własnego wpisu. Sprawdzić przy pisaniu: czy to blog (edukacyjny) czy raczej materiał pod buildletter.com (sprzedażowy) — kąt może się różnić między dwoma właściwościami tak jak w punkcie 7 sekcji 4.
7. **"Jak zrobiłem techniczny audyt SEO za pomocą Claude"** (robocze tłumaczenie "How to Do a Technical SEO Audit with Claude") — zgłoszone przez Michała 2026-07-24, do napisania na wyraźny sygnał. Case study / za kulisami, nie generyczny poradnik (różni się od `jak-zrobic-audyt-seo` — to DIY dla czytelnika, tu chodzi o **jak MY to zrobiliśmy**: proces krok po kroku, jakie narzędzie (Search Console MCP + eksport GSC, WebFetch do wyciągnięcia struktury artykułu, dopasowanie klastrów zapytań do istniejących H2), i co to konkretnie dało (znaleziona luka Meta Ads na artykule Google Ads, dodana sekcja, artykuł zaczyna celować w frazę na pozycji 3). Dobry materiał na demonstrację "AI jako narzędzie pracy", spójny z DNA autora (technical marketer, terminal-first). Pasuje obok Filaru B (audyt seo/narzędzia seo) jako uzupełnienie, nie duplikat.

### Klaster "Google Ads" — tematy z Semrush zgłoszone 2026-07-24 (przez pomyłkę zapisane najpierw w złym repo — `buildletter.com/docs/blog/BACKLOG.md` — przeniesione tutaj, bo to jest właściwy dom dla Semrush-driven treści edukacyjnej)

8. **Kiedy warto odpalić reklamy Google Ads?** — brak pokrycia. Istniejące (`jak-ustawic-kampanie-google-ads`, `jak-sprawdzic-kampanie-google-ads`, `jak-wybrac-agencje-google-ads`, `google-ads-bledy-mala-firma`) zakładają, że decyzja "robimy Ads" już zapadła — ten wpis ma odpowiadać na pytanie PRZED tą decyzją (sygnały/warunki, że to dobry moment).
9. **Kiedy warto odpalić reklamy Meta/Insta/TikTok?** — brak pokrycia. `jak-sprawdzic-kampanie-meta-ads` to audyt już działającej kampanii, nie "czy w ogóle zaczynać"; TikTok nieobecny w ogóle na blogu.
10. ~~Jak działa wynik jakości w Google Ads?~~ **DUPLIKAT — już opublikowane.** `wynik-jakosci-google-ads_2026-04-10.md` ("Co wpływa na wynik jakości Google Ads i jak go poprawić") pokrywa dokładnie ten temat. Nie pisać ponownie.
11. **Ile kosztuje kampania Google Ads?** — brak pokrycia (jest `ile-kosztuje-pozycjonowanie-strony` i `ile-kosztuje-marketing-malej-firmy`, ale nic Ads-specyficznego o budżetach/stawkach za klik).
12. **Co to jest Google Ads i jak działa** — brak wpisu definicyjnego/fundamentu; dobry pillar dla całego klastra Ads, reszta mogłaby się do niego linkować.
13. **Klaster "świadomość marki w Google Ads"** (4 zgłoszone tematy, mocno się pokrywają — czym jest świadomość marki i dlaczego ważna / jak ją mierzyć / jak budować w Ads / typy kampanii a etapy świadomości) — jeden temat rozbity na kawałki. Do decyzji: 1 solidny wpis albo mini-seria 2-3, nie 4 osobne.
14. **Kampanie brandowe Google Ads** (2 zgłoszone — "Kampanie Brandowe Google Ads" + "Kampanie Google Ads na własną markę – czy warto?") — jeden temat pod dwoma tytułami, połączyć w jeden wpis (definicja + ocena czy warto).

### Klaster ogólny "marketing małych firm" — przeniesione z buildletter.com/docs/blog/BACKLOG.md (2026-07-24)

**Powód przeniesienia (Michał, 2026-07-24):** michaldanieluk.pl pozycjonuje się w Google Search Console wyraźnie lepiej niż buildletter.com — pisać tu, nie tam, i linkować z każdego z tych wpisów do odpowiedniej strony usługowej/ofertowej na buildletter.com (CTA/konwersja zostaje na buildletter.com, ruch i widoczność SEO idą przez michaldanieluk.pl). Ten sam wzorzec cross-linkowania co w sekcji 5 wyżej.

15. **Marketing dla firm usługowych: co robić, a czego unikać** — inspiracja: https://roapp.io/pl/blog/marketing-dla-firm-uslugowych-co-robic-a-czego-unikac-10396/ (konkurencyjny artykuł — obecność online, community lokalne, opinie, retencja, ostrzeżenie przed kopiowaniem korporacji). Potrzebny własny kąt, żeby nie było przepisaniem cudzej listy. Link docelowy: strona ofertowa buildletter.com (usługi dla firm usługowych ogólnie).
16. **12 przykładów usług marketingowych (i które z nich naprawdę potrzebujesz)** — inspiracja: https://wenet.pl/blog/12-przykladow-uslug-marketingowych/ (agencyjny listicle: strona www, SEO, audyt SEO, social media, mobile marketing, analityka, content marketing, event marketing, influencer marketing, email marketing, SEM, marketing automation). Kąt (potwierdzony przez Michała): wpis informacyjny + jasna ocena przydatności każdej usługi dla małej firmy (SEO/wizytówka/social = tak, event/influencer/automation = zwykle nie). Link docelowy: strona usług buildletter.com.
17. **Marketing dla firm budowlanych: czego nie robić** — własny kąt wobec #15, zawężony do budowlanki (nisza newslettera "Marketing na Budowie"). Format błędów zamiast dobrych praktyk. Materiał gotowy z newslettera: martwa wizytówka, brak zdjęć z budowy, cisza po wycenie, ignorowanie złych opinii, żargon zamiast konkretów, Ads bez gotowej strony. Link docelowy: buildletter.com/oferta lub konkretna strona usługowa dla budowlanki.
