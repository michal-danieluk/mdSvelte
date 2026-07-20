---
task: "Build three topic pillar pages for marketing blog"
slug: 20260720-103732_blog-pillar-pages
project: md_blog
effort: E3
effort_source: context-override
phase: complete
progress: 44/44
mode: interactive
started: 2026-07-20T10:37:32Z
updated: 2026-07-20T11:20:20Z
principal_stated_goal: "stwórz mi pillar pageś w blogu dla /seo /adsy (albo inna nazwa) i /marketing. Dasz radę to zrobić??"
principal_stated_goal_source: prompt
principal_stated_goal_signal: 4
principal_stated_goal_locked: 2026-07-20T10:37:32Z
density_score: 0.71
interview_invoked: false
divergence_risk: low
density_gate_acknowledged: true
context_checks_fired: [observe-density, observe-sufficiency]
context_sufficient: true
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

## Constraints

- SvelteKit 2 i Svelte 5, bez nowych zależności.
- Bun do wszystkich komend projektu.
- Istniejące tokeny, typografia i komponenty mają pozostać źródłem stylu.
- Trasy kanoniczne: `/seo`, `/google-ads`, `/marketing`.
- Dobór wpisów ma korzystać z obecnego źródła danych, bez duplikowania metadanych postów.
- Każda publiczna strona musi przejść realną nawigację w Chrome przez Interceptor.

## Goal

„stwórz mi pillar pageś w blogu dla /seo /adsy (albo inna nazwa) i /marketing. Dasz radę to zrobić??” Zbudować responsywne, indeksowalne pillar pages pod `/seo`, `/google-ads`, `/meta-ads` i `/marketing`, które wprowadzają do tematu, porządkują istniejące artykuły oraz wzajemnie wspierają architekturę linkowania bloga. W iteracji dopilnować alfabetycznej kolejności filarów A–D i zbalansowanego układu czterech kart SEO.

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

## Features

| name | satisfies | depends_on | parallelizable | intelligence |
|---|---|---|---|---|
| PillarContentModel | ISC-4..23, ISC-31 | none | false | high |
| PillarPageUI | ISC-1..3, ISC-10..27 | PillarContentModel | false | high |
| PillarRoutes | ISC-1..12, ISC-30 | PillarContentModel, PillarPageUI | true | high |
| QualityVerification | ISC-25..32 | PillarRoutes | false | high |

## Decisions

- 2026-07-20 10:37: Wybrano `/google-ads` zamiast `/adsy`, ponieważ nazwa odpowiada językowi istniejących artykułów i precyzuje intencję wyszukiwania.
- 2026-07-20 10:37: Odstąpiono od izolowanego prototypu; integracja ma wynikać z audytu obecnych komponentów i tokenów SvelteKit.
- 2026-07-20 10:37: Podłoga 32 ISC jest naturalna dla trzech tras, ich metadanych, treści, responsywności, dostępności i regresji.
- 2026-07-20 10:44: `/seo` odwzorowuje cztery klastry A–D z `docs/CONTENT_STRATEGY.md` i ich dedykowane artykuły; strona nie może redukować tej strategii do filtra po tagu.
- 2026-07-20 10:51: Kontrola brakujących artykułów działa w `+page.server.ts` na granicy konfiguracja→UI; build zatrzymuje się przed wyrenderowaniem niekompletnej strony.
- 2026-07-20 13:18: Iteracja rozszerza architekturę o `/meta-ads`; ścieżka SEO musi być literowo A–D, a cztery karty mają zachować układ 1 × 4 na mobile i 2 × 2 od tabletu wzwyż.

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
