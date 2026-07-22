---
task: "Implement SEO audit recommendations"
slug: 20260720-103732_blog-pillar-pages
project: md_blog
effort: E3
effort_source: auto
phase: complete
progress: 113/113
mode: interactive
started: 2026-07-20T10:37:32Z
updated: 2026-07-22T11:31:01Z
iteration: 4
principal_stated_goal: "wdróż rekomendacje"
principal_stated_goal_source: explicit-revision
principal_stated_goal_signal: 2
principal_stated_goal_locked: 2026-07-22T11:17:52Z
density_score: 0.67
interview_invoked: false
divergence_risk: low
density_gate_acknowledged: true
context_checks_fired: [observe-density, observe-sufficiency]
context_sufficient: true
frame_drift: none
---

## Problem

Blog ma rosnący zbiór artykułów o SEO, Google Ads i marketingu, ale nie ma trwałych stron tematycznych, które objaśniają obszar, prowadzą czytelnika od podstaw do decyzji i grupują powiązane materiały. Same tagi są indeksem, nie pillar page: nie budują narracji, intencji wyszukiwania ani świadomego linkowania wewnętrznego.

## Vision

Czytelnik wchodzi na jedną z czterech krótkich, konkretnych stron eksperckich i od razu rozumie, czego się nauczy, od czego zacząć oraz jaki artykuł przeczytać następnie. Każdy pillar ma własną obietnicę i strukturę, ale wszystkie wyglądają jak naturalna część obecnego bloga. Euphoric surprise: cztery nowe adresy porządkują już istniejący dorobek bez tworzenia równoległego systemu kategorii.

## Out of Scope

- Publikacja na produkcję, commit i push bez osobnej dyspozycji.
- Przepisywanie istniejących artykułów lub zmiana ich adresów.
- Tworzenie CMS-a do ręcznego zarządzania pillar pages.
- Zewnętrzne badanie słów kluczowych i obietnice rankingów.
- Nowy system wizualny niezależny od obecnego bloga.
- Ręczne dopisywanie fraz do każdego artykułu, jeżeli frontmatter lub tagi już je definiują.

## Constraints

- SvelteKit 2 i Svelte 5, bez nowych zależności.
- Bun do wszystkich komend projektu.
- Istniejące tokeny, typografia i komponenty mają pozostać źródłem stylu.
- Trasy kanoniczne: `/seo`, `/google-ads`, `/marketing`.
- Dobór wpisów ma korzystać z obecnego źródła danych, bez duplikowania metadanych postów.
- Iteracja 1 wymagała Interceptora; iteracja 2 jest weryfikowana wyłącznie przez kod i prerenderowany HTML.
- Metadane artykułów mają pozostać utrzymywane w ich frontmatterze.
- Istniejące adresy artykułów i tagów pozostają bez zmian; warianty tagów różniące się wielkością liter są scalane na poziomie modelu danych.
- Weryfikacja iteracji 3 obejmuje prerenderowany HTML oraz prawdziwy Chrome przez Interceptor.
- Agentowy manifest ma być statyczny i nie może duplikować pełnej treści artykułów.
- Daty modyfikacji mają pochodzić wyłącznie z jawnego frontmatteru; brak pola `updated` zachowuje datę publikacji.

## Goal

„stwórz mi pillar pageś w blogu dla /seo /adsy (albo inna nazwa) i /marketing. Dasz radę to zrobić??” Zbudować responsywne, indeksowalne pillar pages pod `/seo`, `/google-ads`, `/meta-ads` i `/marketing`, które wprowadzają do tematu, porządkują istniejące artykuły oraz wzajemnie wspierają architekturę linkowania bloga. W iteracji dopilnować alfabetycznej kolejności filarów A–D i zbalansowanego układu czterech kart SEO.

Iteracja 2: „trzeba mi dodac słowa klluczowe do mojej storony michaldanieluk.pl bo wogóle ich nie ma jakrobiłem audyt poprzez semrush.” Każda indeksowalna strona ma emitować jeden niepusty, tematyczny `meta[name="keywords"]`; istniejące frazy postów mają płynąć z frontmatteru, a wynik ma zostać sprawdzony w wygenerowanym HTML, zapisany w commicie i wypchnięty na bieżącą gałąź.

Iteracja 3: „to wykonać zalecenia z audytu.” Wdrożyć lokalnie potwierdzone zalecenia techniczne i treściowe: jeden kanoniczny host `www`, spójne reguły indeksacji tagów i sitemap, czyste podglądy Markdown, poprawne title/opisy/H1/linki, schema `WebSite` oraz płytszą paginację archiwum. Nie zmieniać publicznych ścieżek ani zależności i nie wdrażać na produkcję bez osobnej zgody.

Iteracja 4: „wdróż rekomendacje”. Dodać kuratowany `/llms.txt`, rozdzielić w `robots.txt` boty wyszukujące i użytkownika od botów treningowych oraz przenieść jawne `updated` z frontmatteru do `BlogPosting.dateModified` i sitemapowego `lastmod`, zachowując datę publikacji jako fallback.

## Criteria

- [x] ISC-1: Nawigacja przeglądarką do `/seo` renderuje stronę pillar SEO bez błędu.
- [x] ISC-2: Nawigacja przeglądarką do `/google-ads` renderuje stronę pillar Google Ads bez błędu.
- [x] ISC-3: Nawigacja przeglądarką do `/marketing` renderuje stronę pillar marketingową bez błędu.
- [x] ISC-4: `/seo` ma unikalny element `title` opisujący pillar SEO.
- [x] ISC-5: `/google-ads` ma unikalny element `title` opisujący pillar Google Ads.
- [x] ISC-6: `/marketing` ma unikalny element `title` opisujący pillar marketingowy.
- [x] ISC-7: `/seo` ma unikalny opis meta zgodny z intencją strony.
- [x] ISC-8: `/google-ads` ma unikalny opis meta zgodny z intencją strony.
- [x] ISC-9: `/marketing` ma unikalny opis meta zgodny z intencją strony.
- [x] ISC-10: `/seo` ma dokładnie jeden nagłówek H1.
- [x] ISC-11: `/google-ads` ma dokładnie jeden nagłówek H1.
- [x] ISC-12: `/marketing` ma dokładnie jeden nagłówek H1.
- [x] ISC-13: Pillar SEO pokazuje co najmniej trzy istniejące wpisy dotyczące SEO.
- [x] ISC-14: Pillar Google Ads pokazuje co najmniej trzy istniejące wpisy dotyczące reklam płatnych.
- [x] ISC-15: Pillar marketingowy pokazuje co najmniej trzy istniejące wpisy dotyczące marketingu.
- [x] ISC-16: Każda karta wpisu prowadzi do istniejącej trasy artykułu.
- [x] ISC-17: Pillar SEO zawiera sekcję prowadzącą czytelnika od podstaw do kolejnych kroków.
- [x] ISC-18: Pillar Google Ads zawiera sekcję prowadzącą czytelnika od podstaw do kolejnych kroków.
- [x] ISC-19: Pillar marketingowy zawiera sekcję prowadzącą czytelnika od podstaw do kolejnych kroków.
- [x] ISC-20: Każdy pillar linkuje do dwóch pozostałych pillarów.
- [x] ISC-21: Każdy pillar zawiera widoczny CTA do Buildletter.
- [x] ISC-22: Wszystkie cztery strony korzystają ze wspólnego komponentu prezentacyjnego.
- [x] ISC-23: Konfiguracja treści czterech pillarów jest utrzymywana w jednym źródle danych.
- [x] ISC-24: Strony wykorzystują istniejące tokeny kolorów i typografię bloga.
- [x] ISC-25: Układ mobilny nie powoduje poziomego przewijania przy szerokości 390 px.
- [x] ISC-26: Układ desktopowy zachowuje czytelną hierarchię przy szerokości 1440 px.
- [x] ISC-27: Linki i przyciski mają widoczne stany fokusu klawiatury.
- [x] ISC-28: `bun run check` kończy się bez błędów i ostrzeżeń.
- [x] ISC-29: `bun run build` kończy się kodem wyjścia 0.
- [x] ISC-30: Sitemap zawiera `/seo`, `/google-ads` i `/marketing`.
- [x] ISC-31: Antecedent: każdy pillar ma odmienną obietnicę czytelniczą odpowiadającą własnej intencji tematycznej.
- [x] ISC-32: Anti: wdrożenie nie dodaje zależności ani nie zmienia tras istniejących artykułów.
- [x] ISC-33: Nawigacja przeglądarką do `/meta-ads` renderuje stronę pillar Meta Ads bez błędu.
- [x] ISC-34: `/meta-ads` ma unikalny element `title` opisujący pillar Meta Ads.
- [x] ISC-35: `/meta-ads` ma unikalny opis meta zgodny z intencją strony.
- [x] ISC-36: `/meta-ads` ma dokładnie jeden nagłówek H1.
- [x] ISC-37: Pillar Meta Ads pokazuje co najmniej trzy istniejące wpisy dotyczące Meta Ads lub zarządzania płatnymi kampaniami.
- [x] ISC-38: Pillar Meta Ads zawiera sekcję prowadzącą czytelnika od podstaw do kontroli efektów.
- [x] ISC-39: Każdy z czterech pillarów linkuje do trzech pozostałych pillarów.
- [x] ISC-40: Sitemap zawiera `/meta-ads` obok pozostałych pillarów.
- [x] ISC-41: Stopka udostępnia bezpośredni link do `/meta-ads`.
- [x] ISC-42: Ścieżka SEO pokazuje filary w kolejności A → B → C → D.
- [x] ISC-43: Cztery karty ścieżki SEO tworzą na desktopie czytelny, zbalansowany układ 2 × 2.
- [x] ISC-44: Na mobile cztery karty SEO układają się pojedynczo, jedna pod drugą.
- [x] ISC-45: `Seo.svelte` emituje dokładnie jeden niepusty `meta[name="keywords"]` dla przekazanych fraz.
- [x] ISC-46: Normalizacja słów kluczowych obsługuje string i tablicę bez pustych wartości ani duplikatów.
- [x] ISC-47: Strona główna ma tematyczne frazy dotyczące marketingu, SEO, Google Ads i automatyzacji.
- [x] ISC-48: Lista wpisów ma odrębne frazy opisujące zakres bloga.
- [x] ISC-49: Archiwum tagów ma odrębne frazy związane z kategoriami bloga.
- [x] ISC-50: Każda strona pojedynczego tagu zawiera nazwę tego tagu w słowach kluczowych.
- [x] ISC-51: Strona „O mnie” ma frazy zgodne z kompetencjami i widoczną treścią Michała.
- [x] ISC-52: Każdy pillar ma własny zestaw fraz utrzymywany w `pillars.ts`.
- [x] ISC-53: Artykuł z polem `keywords` renderuje frazy ze swojego frontmatteru.
- [x] ISC-54: Artykuł bez pola `keywords` używa tagów, a bez tagów własnego tytułu jako fallbacku.
- [x] ISC-55: `bun run check` i `bun run build` kończą się kodem 0.
- [x] ISC-56: Anti: zmiana nie modyfikuje adresów, zależności, title, description, canonical ani social meta.
- [x] ISC-57: Zmiany SEO są zapisane w osobnym commicie na bieżącej gałęzi.
- [x] ISC-58: Commit z metadanymi SEO jest wypchnięty do `origin/main`.
- [x] ISC-59: Wspólna stała `website` używa kanonicznego hosta `https://www.michaldanieluk.pl`.
- [x] ISC-60: JSON-LD i linki absolutne generowane przez aplikację korzystają ze wspólnej stałej `website`, bez starego hosta apex.
- [x] ISC-61: Prerender strony głównej emituje canonical i `og:url` z hostem `www`.
- [x] ISC-62: Prerender przykładowego artykułu emituje canonical, JSON-LD i social URL z hostem `www`.
- [x] ISC-63: Każdy `<loc>` w sitemapie używa hosta `www`.
- [x] ISC-64: Sitemap nie zawiera zduplikowanych wartości `<loc>`.
- [x] ISC-65: Sitemap pomija tagi używane przez mniej niż dwa artykuły.
- [x] ISC-66: Lista tagów scala warianty nazw prowadzące do tego samego sluga i sumuje ich użycia.
- [x] ISC-67: Strona tagu z jednym artykułem emituje `meta[name="robots"]` o wartości `noindex, follow`.
- [x] ISC-68: Strona tagu z co najmniej dwoma artykułami nie emituje dyrektywy `noindex`.
- [x] ISC-69: `robots.txt` wskazuje kanoniczny adres sitemapy z hostem `www`.
- [x] ISC-70: Strona główna emituje poprawny JSON-LD typu `WebSite` z nazwą i kanonicznym URL-em.
- [x] ISC-71: Podstrony artykułów nie duplikują schematu `WebSite` przeznaczonego dla strony głównej.
- [x] ISC-72: Repozytorium nie zawiera placeholderów `link-do-linkedin`, `link-do-twittera` ani `link-do-kontaktu`.
- [x] ISC-73: Każdy prerenderowany artykuł ma dokładnie jeden nagłówek H1.
- [x] ISC-74: Cztery wskazane starsze wpisy mają jawne, tekstowe opisy bez składni Markdown.
- [x] ISC-75: Automatyczny podgląd pierwszego akapitu renderuje Markdown jako HTML i udostępnia czysty tekst dla metadanych.
- [x] ISC-76: Karty wpisów na stronie głównej nie pokazują surowych znaczników linków, nagłówków ani wyróżnień Markdown.
- [x] ISC-77: Domyślny title artykułu nie dokleja automatycznie nazwy autora.
- [x] ISC-78: Frontmatter artykułu może opcjonalnie nadpisać title SEO polem `seoTitle` bez zmiany H1.
- [x] ISC-79: Strona „O mnie” ma opis meta inny niż strona główna i zgodny z jej treścią.
- [x] ISC-80: `/posts` zawiera bezpośrednie linki do każdej strony paginacji archiwum.
- [x] ISC-81: Najstarsza strona paginacji zawiera linki do wpisów `text-email` i `ans-dot-file`.
- [x] ISC-82: Wdrożenie nie zmienia slugów ani istniejących tras artykułów i tagów.
- [x] ISC-83: Wdrożenie nie dodaje ani nie aktualizuje zależności projektu.
- [x] ISC-84: Testy jednostkowe transformacji tagów i podglądów kończą się kodem 0.
- [x] ISC-85: `bun run check` kończy się bez błędów i ostrzeżeń.
- [x] ISC-86: `bun run build` kończy się kodem 0.
- [x] ISC-87: Sweep prerenderowanego HTML potwierdza domenę, title, opisy, H1, robots i spójność sitemapy.
- [x] ISC-88: Interceptor renderuje stronę główną bez błędów konsoli i z czystymi podglądami kart.
- [x] ISC-89: Interceptor renderuje artykuł i tag `noindex` bez błędów konsoli.
- [x] ISC-90: Żaden URL oznaczony `noindex` nie występuje w sitemapie.
- [x] ISC-91: Build generuje publiczny endpoint `/llms.txt`.
- [x] ISC-92: `/llms.txt` identyfikuje autora i kanoniczną domenę bloga.
- [x] ISC-93: `/llms.txt` wskazuje stronę filarową `/seo`.
- [x] ISC-94: `/llms.txt` wskazuje stronę filarową `/google-ads`.
- [x] ISC-95: `/llms.txt` wskazuje stronę filarową `/meta-ads`.
- [x] ISC-96: `/llms.txt` wskazuje stronę filarową `/marketing`.
- [x] ISC-97: `/llms.txt` wskazuje archiwum `/posts`.
- [x] ISC-98: `/llms.txt` wskazuje `/sitemap.xml`.
- [x] ISC-99: `/llms.txt` wskazuje `/rss.xml`.
- [x] ISC-100: `/llms.txt` wskazuje `/api/posts.json`.
- [x] ISC-101: `robots.txt` jawnie zezwala `OAI-SearchBot`.
- [x] ISC-102: `robots.txt` jawnie zezwala `Claude-SearchBot`.
- [x] ISC-103: `robots.txt` jawnie zezwala `ChatGPT-User`.
- [x] ISC-104: `robots.txt` jawnie zezwala `Claude-User`.
- [x] ISC-105: `robots.txt` blokuje `GPTBot`.
- [x] ISC-106: `robots.txt` blokuje `ClaudeBot`.
- [x] ISC-107: Model danych postu normalizuje opcjonalne `updated` do `yyyy-MM-dd`.
- [x] ISC-107.1: Publiczne `/api/posts.json` udostępnia `updated` dla zaktualizowanych wpisów.
- [x] ISC-108: `BlogPosting.dateModified` używa `updated`, gdy pole istnieje.
- [x] ISC-109: Sitemapowy `lastmod` używa `updated`, gdy pole istnieje.
- [x] ISC-110: Brak `updated` ustawia `dateModified` na `datePublished`.
- [x] ISC-111: Brak `updated` ustawia `lastmod` na datę publikacji.
- [x] ISC-112: Anti: testy, typecheck i build produkcyjny kończą się kodem 0.

## Test Strategy

| isc | type | check | threshold | tool | anchors_to |
|---|---|---|---|---|---|
| ISC-1..3, ISC-33 | screenshot | realna nawigacja do każdej trasy | poprawny render | Interceptor | literal |
| ISC-4..12, ISC-34..36 | bash | tytuły, meta i H1 w prerenderowanym HTML | unikalne, po jednym H1 | `rg` w buildzie | derived: indeksowalność |
| ISC-13..21, ISC-37..39 | screenshot | treść, linki i CTA każdej strony | wszystkie elementy widoczne | Interceptor | literal |
| ISC-22..24 | bash | wspólny komponent, dane i tokeny | pojedyncze źródła | `rg` i odczyt plików | derived: spójność |
| ISC-25..27 | screenshot | mobilny, desktopowy i focus layout | brak overflow, czytelny focus | Interceptor | derived: użyteczność |
| ISC-28 | bash | typy i dostępność | kod 0, zero błędów | `bun run check` | derived: jakość |
| ISC-29 | bash | build produkcyjny | kod 0 | `bun run build` | derived: działanie |
| ISC-30, ISC-40..41 | bash | wygenerowany sitemap i stopka | cztery adresy obecne | `rg` | literal |
| ISC-31 | manual | porównanie obietnic hero | cztery odrębne intencje | odczyt konfiguracji | derived: doświadczenie |
| ISC-32 | bash | diff zależności i tras postów | brak zmian | `git diff` | derived: regresja |
| ISC-42..44 | screenshot | kolejność i układ kart SEO | A–D, 2 × 2 desktop, 1 × 4 mobile | Interceptor | literal: iteracja |
| ISC-45..46 | bash | renderowanie i normalizacja keywords | jeden tag, brak pustych/duplikatów | `rg` w buildzie | literal: słowa kluczowe |
| ISC-47..54 | bash | prerenderowany HTML stron i artykułów | tematyczne, niepuste frazy | `rg` i skrypt Bun | literal: michaldanieluk.pl |
| ISC-55 | bash | kontrola typów i build produkcyjny | oba kody 0 | `bun run check`, `bun run build` | derived: jakość |
| ISC-56 | bash | diff zależności, tras i pozostałych metadanych | brak regresji | `git diff`, `rg` | derived: bezpieczeństwo |
| ISC-57 | bash | commit zawiera wyłącznie uzgodnione zmiany | nowy SHA | `git show --stat` | derived: commit |
| ISC-58 | bash | zdalny ref wskazuje nowy commit | `origin/main == HEAD` | `git ls-remote` | derived: push |
| ISC-59..64 | bash | kanoniczny host w źródle i prerenderze | wyłącznie `www`, unikalne loc | `rg`, skrypt Bun | literal: audyt |
| ISC-65..68, ISC-90 | test/bash | kontrakt indeksacji tagów | wspólny próg, bez sprzeczności | `bun test`, prerender sweep | derived: crawl budget |
| ISC-69..71 | bash | robots i schema `WebSite` | poprawna dyrektywa i zakres | `rg`, parser JSON-LD | literal: audyt |
| ISC-72..74 | bash | linki, H1 i opisy starszych wpisów | zero placeholderów/Markdown, jeden H1 | `rg`, prerender sweep | literal: audyt |
| ISC-75..76 | test/screenshot | transformacja podglądów Markdown | czysty HTML i tekst | `bun test`, Interceptor | literal: audyt |
| ISC-77..79 | bash | title i opisy tras | bez automatycznego suffixu, unikalne opisy | prerender sweep | literal: audyt |
| ISC-80..81 | bash/screenshot | crawl depth archiwum | linki do wszystkich stron i starych wpisów | parser HTML, Interceptor | derived: discoverability |
| ISC-82..83 | bash | regresja tras i zależności | brak zmian | `git diff` | derived: bezpieczeństwo |
| ISC-84..87 | test/bash | testy, check, build i metadane | wszystkie kody 0 | `bun test`, `bun run check`, `bun run build` | derived: jakość |
| ISC-88..89 | screenshot | realny render kluczowych tras | brak błędów konsoli | Interceptor | literal: weryfikacja web |
| ISC-91..100 | bash/http | manifest agentowy i jego odnośniki | plik obecny, komplet 9 zasobów | `rg`, lokalny HTTP | literal: rekomendacje |
| ISC-101..106 | bash/http | jawne reguły botów AI | cztery allow, dwa disallow | `rg`, lokalny HTTP | derived: agentowe przeglądanie |
| ISC-107..111 | test/bash | przepływ `updated` i fallback daty, także API | poprawne ISO w schema, sitemapie i JSON | `bun test`, prerender sweep | derived: aktualność |
| ISC-112 | test/bash | testy, typy i build | wszystkie kody 0 | `bun test`, `bun run check`, `bun run build` | literal: rekomendacje |

## Features

| name | satisfies | depends_on | parallelizable | intelligence |
|---|---|---|---|---|
| PillarContentModel | ISC-4..23, ISC-31 | none | false | high |
| PillarPageUI | ISC-1..3, ISC-10..27 | PillarContentModel | false | high |
| PillarRoutes | ISC-1..12, ISC-30 | PillarContentModel, PillarPageUI | true | high |
| QualityVerification | ISC-25..32 | PillarRoutes | false | high |
| KeywordNormalizer | ISC-45..46, ISC-56 | none | false | high |
| RouteKeywordMetadata | ISC-47..52 | KeywordNormalizer | true | medium |
| ArticleKeywordMetadata | ISC-53..54 | KeywordNormalizer | true | high |
| KeywordVerificationDelivery | ISC-55..58 | RouteKeywordMetadata, ArticleKeywordMetadata | false | high |
| CanonicalOrigin | ISC-59..64, ISC-69..71 | none | false | high |
| TagIndexabilityContract | ISC-65..68, ISC-90 | CanonicalOrigin | false | high |
| MarkdownPreviewPipeline | ISC-75..76, ISC-84 | none | true | high |
| LegacyContentCleanup | ISC-72..74 | none | true | medium |
| ArticleMetadata | ISC-74, ISC-77..79 | MarkdownPreviewPipeline | true | medium |
| CrawlableArchive | ISC-80..81 | none | true | medium |
| SeoAuditVerification | ISC-82..89 | CanonicalOrigin, TagIndexabilityContract, MarkdownPreviewPipeline, LegacyContentCleanup, ArticleMetadata, CrawlableArchive | false | high |
| AgentManifest | ISC-91..100 | CanonicalOrigin, PillarRoutes | true | medium |
| AiCrawlerPolicy | ISC-101..106 | none | true | medium |
| ContentFreshnessSignals | ISC-107..111 | ArticleMetadata | false | high |
| AgentReadinessVerification | ISC-112 | AgentManifest, AiCrawlerPolicy, ContentFreshnessSignals | false | high |

## Decisions

- 2026-07-20 10:37: Wybrano `/google-ads` zamiast `/adsy`, ponieważ nazwa odpowiada językowi istniejących artykułów i precyzuje intencję wyszukiwania.
- 2026-07-20 10:37: Odstąpiono od izolowanego prototypu; integracja ma wynikać z audytu obecnych komponentów i tokenów SvelteKit.
- 2026-07-20 10:37: Podłoga 32 ISC jest naturalna dla trzech tras, ich metadanych, treści, responsywności, dostępności i regresji.
- 2026-07-20 10:44: `/seo` odwzorowuje cztery klastry A–D z `docs/CONTENT_STRATEGY.md` i ich dedykowane artykuły; strona nie może redukować tej strategii do filtra po tagu.
- 2026-07-20 10:51: Kontrola brakujących artykułów działa w `+page.server.ts` na granicy konfiguracja→UI; build zatrzymuje się przed wyrenderowaniem niekompletnej strony.
- 2026-07-20 13:18: Iteracja rozszerza architekturę o `/meta-ads`; ścieżka SEO musi być literowo A–D, a cztery karty mają zachować układ 1 × 4 na mobile i 2 × 2 od tabletu wzwyż.
- 2026-07-20 16:56: refined: rozpoczęto iterację 2; principal_stated_goal zmieniono z „stwórz mi pillar pageś w blogu dla /seo /adsy (albo inna nazwa) i /marketing. Dasz radę to zrobić??” na „trzeba mi dodac słowa klluczowe do mojej storony michaldanieluk.pl bo wogóle ich nie ma jakrobiłem audyt poprzez semrush.” jako nowy cel projektu.
- 2026-07-20 16:57: Użytkownik wyłączył Interceptor; w iteracji 2 dowodem jest kod i prerenderowany HTML, bez twierdzeń o weryfikacji przeglądarkowej.
- 2026-07-20 16:58: „Sitewide keywords” oznacza wspólne renderowanie z wartościami właściwymi dla strony, a nie jedną globalną listę na wszystkich trasach.
- 2026-07-20 16:59: Commit i push do `origin/main` dołączono jako kryteria ISC-57 i ISC-58 po doprecyzowaniu użytkownika.
- 2026-07-20 17:12: Refined: normalizator ogranicza wynik do 10 unikalnych fraz; bezpieczny fallback artykułu używa wyłącznie jego tytułu, nie ogólnej frazy autora.
- 2026-07-22 05:50: refined: rozpoczęto iterację 3; principal_stated_goal zmieniono z dodania keywords na wykonanie potwierdzonych zaleceń audytu SEO.
- 2026-07-22 05:52: Host `www` jest jedynym źródłem prawdy, ponieważ produkcja kończy przekierowania właśnie na nim; zmiana stałej usuwa rozjazd canonical/JSON-LD/sitemapy u źródła.
- 2026-07-22 05:53: Tagi o jednym wpisie pozostają dostępne i linkowalne, ale otrzymują `noindex, follow` i są pomijane w sitemapie; próg jest współdzieloną regułą, nie rozproszonym parametrem.
- 2026-07-22 05:54: Nie zmieniamy slugów tagów z utraconymi polskimi znakami; warianty nazw są scalane po obecnym slugu, co usuwa duplikaty bez łamania istniejących URL-i.
- 2026-07-22 05:55: Surowy Markdown jest naprawiany w pipeline danych, nie osobno w komponentach kart i metadanych; jedno przekształcenie obsługuje oba kanały.
- 2026-07-22 11:17: refined: rozpoczęto iterację 4; principal_stated_goal zmieniono z „to wykonać zalecenia z audytu.” na „wdróż rekomendacje” jako wdrożenie trzech zaleceń gotowości agentowej.
- 2026-07-22 11:17: W `robots.txt` zezwalamy botom wyszukującym i agentom uruchamianym przez użytkownika, a blokujemy oddzielne boty treningowe OpenAI i Anthropic; decyzja jest jawna i odwracalna.
- 2026-07-22 11:17: `/llms.txt` jest kuratowanym indeksem kluczowych zasobów, nie mechanizmem uprawnień ani kopią całego bloga.
- 2026-07-22 11:23: Root-cause-at-ingestion: opcjonalne `metadata.updated` musi zostać znormalizowane w `src/lib/data/posts.js`, aby jeden model zasilał schema, sitemapę i API bez trzech rozbieżnych parserów.
- 2026-07-22 11:30: Końcowy Advisor został pominięty po odrzuceniu przez kontrolę prywatności; wysłanie stanu repozytorium do zewnętrznej usługi nie było konieczne do lokalnej, deterministycznej weryfikacji.
- 2026-07-22 11:30: Pełny `bun run lint` pozostaje baseline-fail: Prettier wskazuje 49 wcześniej nieformatowanych plików, a ESLint 9 nie znajduje `eslint.config.*`; zmienione JS/TS przechodzą celowany Prettier check.

## Changelog

- 2026-07-20 | conjectured: brak słów kluczowych w Semrush wymaga ręcznego uzupełniania każdej strony
  refuted by: większość nowych postów miała już frazy we frontmatterze, lecz `Seo.svelte` ich nie renderował
  learned: właściwym miejscem naprawy jest wspólny kontrakt metadanych z kontekstowymi fallbackami i limitem 10 fraz
  criterion now: ISC-45..54 wymagają jednego renderera, unikalnych fraz tras oraz łańcucha frontmatter → tagi → tytuł
- 2026-07-22 | conjectured: każda krótka strona tagu wymaga dopisania dużej ilości tekstu
  refuted by: sama długość treści nie jest potwierdzoną karą, a problemem audytu jest nadmiar niskowartościowych URL-i indeksowalnych i duplikaty slugów
  learned: indeksowalność i sitemapę należy sterować wspólną regułą opartą na liczbie powiązanych wpisów, zachowując linki `follow`
  criterion now: ISC-65..68 i ISC-90 definiują jeden testowalny kontrakt indeksacji tagów
- 2026-07-22 | conjectured: lokalna północ przekazana do `toISOString()` zachowa kalendarzową datę frontmatteru
  refuted by: lokalny sweep zwrócił `dateModified: 2026-07-21T22:00:00.000Z` dla `updated: 2026-07-22`
  learned: data kalendarzowa bez czasu musi dostać jawne `T00:00:00.000Z`, inaczej strefa Europe/Warsaw przesuwa dzień w schema
  criterion now: ISC-108 i ISC-110 wymagają poprawnej daty UTC, a class-sweep obejmuje schema, sitemapę, RSS i API

## Verification

- ISC-1..3, ISC-13..21: Interceptor otworzył `/seo`, `/google-ads` i `/marketing`; drzewa dostępności zawierają komplet ścieżek, kart, cross-linków oraz CTA, a `window.__interceptor_errors` było puste.
- ISC-4..12, ISC-30: sweep prerenderowanych stron potwierdził odrębne title/opisy/canonical, po jednym H1 i obecność trzech tras w sitemapie.
- ISC-16, ISC-32: Chrome wykonał żądania HEAD do wszystkich 19 linkowanych tras postów z wynikiem 200; diff nie obejmuje `posts/`, `src/routes/post`, `package.json` ani lockfile.
- ISC-22..24, ISC-27, ISC-31: cztery konfiguracje korzystają z `PillarPage.svelte`, `pillars.ts`, istniejących tokenów zinc/indigo oraz jawnych klas `focus-visible`; każda ma odmienną obietnicę.
- ISC-25..26: Interceptor potwierdził desktop 1472 px bez overflow; iframe Chrome o viewportcie dokładnie 390 px miał `scrollWidth=375`, brak overflow i cztery karty w jednej kolumnie.
- ISC-28: `bun run check` — 0 błędów, 0 ostrzeżeń.
- ISC-29: `bun run build` — kod 0; zachowały się dwa wcześniejsze nieblokujące komunikaty o `verbatimModuleSyntax` i opcjonalnym `sharp` adaptera Vercel.
- ISC-33..38: Interceptor wyrenderował `/meta-ads` bez błędów, z unikalnym title/opisem/canonical, jednym H1, sześcioma działającymi linkami do wpisów i trzyetapową ścieżką.
- ISC-39..41: prerender sweep znalazł na każdym pillarze trzy pozostałe przewodniki; sitemap i stopka zawierają `/meta-ads`.
- ISC-42..44: Chrome zwrócił kolejność A, B, C, D; na desktopie pozycje tworzą dwa rzędy po dwie karty, na 390 px cztery osobne rzędy bez poziomego scrolla.
- ISC-45..46: source/build — `Seo.svelte` zawiera pojedynczy warunkowy emitter; lokalny SSR zwrócił po jednym tagu, a normalizator rozdziela string/tablicę, usuwa puste i duplikaty case-insensitive.
- ISC-47..52: local SSR via curl — `/`, `/posts`, `/tags`, `/tag/seo`, `/about`, `/seo`, `/google-ads`, `/meta-ads` i `/marketing` zwróciły odrębne, niepuste wartości `keywords`.
- ISC-53: local SSR via curl — `/post/jak-zrobic-audyt-seo_2026-07-19` zwrócił osiem fraz zapisanych we frontmatterze.
- ISC-54: local SSR via curl — `/post/ans-dot-file` bez keywords i tagów zwrócił tematyczny fallback `Zarządzanie dotfiles`.
- ISC-55: bash — `bun run check` zwrócił 0 błędów i 0 ostrzeżeń; `bun run build` zakończył się kodem 0.
- ISC-56: bash — `git diff --check` zwrócił kod 0; diff nie obejmuje `package.json`, lockfile ani tras URL i zachowuje istniejące meta title/description/canonical/social.
- ISC-57: git — commit `311e65f` (`Dodaj słowa kluczowe do metadanych SEO`) zawiera 9 plików funkcjonalnych, 125 insertions i 7 deletions.
- ISC-58: git — `git push origin main` zakończył się `95e70b1..311e65f main -> main`; `git ls-remote` potwierdził SHA `311e65f15072c33bf4e9664116473cef3324b3dc` na `refs/heads/main`.
- ISC-58: production HTTP — `curl -L https://michaldanieluk.pl/?verify=311e65f` zwrócił na kanonicznym `www` nowy tag `keywords` strony głównej.
- ISC-59..64: `verify-seo.ts` sprawdził 117 tras; wszystkie canonical, `og:url` i 67 unikalnych `<loc>` używają hosta `www`, a źródła absolutnych URL-i korzystają ze wspólnej stałej.
- ISC-65..68, ISC-90: 69 stron tagów zostało sprawdzonych; 50 jednokrotnych tagów ma `noindex, follow`, 19 indeksowalnych tagów jest w sitemapie i żaden URL `noindex` do niej nie trafił.
- ISC-69..71: `robots.txt` wskazuje sitemapę `www`; Chrome i parser JSON-LD potwierdziły `Person + WebSite` na `/` oraz `Person + BlogPosting` bez `WebSite` na artykule.
- ISC-72..74: `rg` nie znalazł placeholderów linków; sweep potwierdził dokładnie jeden H1 we wszystkich 40 artykułach i czyste opisy czterech starszych wpisów.
- ISC-75..76: `bun test tests/seo.test.js` — 3/3 testy; Interceptor na stronie głównej zwrócił `rawMarkdownLink: false` i poprawnie wyrenderowane podglądy.
- ISC-77..79: sweep potwierdził brak automatycznego suffixu autora w title artykułów, obsługę `seoTitle` w rendererze oraz różne opisy `/` i `/about`.
- ISC-80..81: parser `/posts` znalazł bezpośrednie linki do wszystkich czterech stron paginacji; ostatnia linkuje do `text-email` i `ans-dot-file`.
- ISC-82..83: `git diff` nie obejmuje package manifestu, lockfile ani slugów; brak nowych zależności i zmian tras.
- ISC-84..87: 3 testy przeszły; `bun run check` — 0 błędów, 0 ostrzeżeń; `bun run build` — kod 0; końcowy sweep 117 stron — `status: ok`.
- ISC-88..89: Interceptor na `/`, artykule audytowym i `/tag/neovim` zwrócił po jednym H1, `errors: []`, brak overlay; finalny tag ma canonical `www` i `noindex, follow`.
- ISC-91..100: lokalny preview oraz `verify-seo.ts` zwróciły 200 dla `/llms.txt`; manifest zawiera autora, canonical, cztery filary, archiwum, sitemapę, RSS i JSON API.
- ISC-101..106: lokalny `robots.txt` zawiera cztery jawne bloki `Allow: /` dla agentów wyszukujących/użytkownika oraz `Disallow: /` dla `GPTBot` i `ClaudeBot`.
- ISC-107..111: unit test normalizatora dat 4/4 oraz sweep 117 stron potwierdziły `updated: 2026-07-22` w API, schema i sitemapie, a artykuł bez `updated` zachował datę publikacji.
- ISC-112: `bun test tests/seo.test.js` — 4/4; `bun run check` — 0 błędów i 0 ostrzeżeń; finalny `bun run build` — kod 0; `verify-seo.ts` — `status: ok`.
- Browser note: Interceptor nie połączył się z rozszerzeniem Chrome (`no extensions connected`); iteracja nie zmienia UI, a wszystkie aktywne kryteria są file/HTTP/schema i mają lokalny dowód. Nie składamy twierdzenia o świeżej weryfikacji wizualnej.
