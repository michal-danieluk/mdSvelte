---
title: 'Jak zrobić audyt SEO strony — kompletny przewodnik krok po kroku (2026)'
date: '2026-07-19'
tags: ['SEO', 'Audyt SEO', 'Marketing', 'Narzędzia SEO', 'Mała Firma']
description: 'Audyt SEO nie musi być czarną magią za 2000 zł. Pokazuję krok po kroku, jak sprawdzić stronę technicznie, contentowo i linkowo — z darmowymi narzędziami.'
keywords: 'audyt seo, jak zrobić audyt seo, audyt strony internetowej, audyty stron, narzędzia seo, audyt strony, analiza seo, google position checker'
image_prompt: 'A cyberpunk mechanic in a dark garage inspecting a glowing holographic website blueprint with a diagnostic scanner, checklist items lighting up green and red, wires and neon cables connecting to a floating browser window, purple and cyan neon light, cinematic composition'
featured: false
---

Audyt SEO brzmi jak coś, co robi się raz, płaci 2000 zł i dostaje PDF na 40 stron, którego nikt nie przeczyta. W rzeczywistości to punkt startowy każdego sensownego pozycjonowania — [pisałem już, że to pierwsza pozycja w cenniku, na którą warto patrzeć](/post/ile-kosztuje-pozycjonowanie-strony_2026-07-17) — i większość jego elementów możesz sprawdzić sam, za darmo, w jeden wieczór.

To nie jest ten sam tekst, co [mój poradnik o weryfikacji agencji SEO](/post/jak-sprawdzic-agencje-seo_2026-07-15). Tamten pokazuje, jak sprawdzić, czy ktoś, komu już płacisz, robi swoją robotę. Ten pokazuje, jak zrobić audyt od zera — niezależnie od tego, czy masz agencję, czy dopiero się zastanawiasz, czy Ci potrzebna.

---

## Czym jest audyt SEO i czego się po nim spodziewać

Audyt SEO to systematyczne sprawdzenie trzech obszarów strony: **technicznego** (czy Google w ogóle potrafi ją poprawnie przeczytać i zaindeksować), **contentowego** (czy treści odpowiadają na pytania, które ludzie faktycznie wpisują w wyszukiwarkę) i **off-page** (jak wygląda reputacja domeny w oczach innych stron internetowych).

Wynikiem porządnego audytu nie jest ocena "dobrze" albo "źle" — to lista konkretnych, priorytetyzowanych problemów do naprawienia. Jeśli dostałeś raport bez listy działań, dostałeś diagnozę bez recepty.

## Audyt techniczny — fundament, bez którego reszta nie ma sensu

Zacznij tutaj, zawsze. To jak `npm run check` przed deployem aplikacji — nie widzisz efektu gołym okiem, ale jeśli tego pominiesz, wszystko, co budujesz na wierzchu (content, linki), stoi na krzywym fundamencie i prędzej czy później się posypie.

### Szybkość strony
Wejdź na [PageSpeed Insights](https://pagespeed.web.dev) i wklej adres swojej strony. Wynik poniżej 50 na urządzeniach mobilnych to realny problem — Google od lat premiuje szybkie strony, a użytkownicy i tak uciekają z wolnych po trzech sekundach.

### Czy Google w ogóle widzi Twoją stronę
Wpisz w wyszukiwarkę `site:twojadomena.pl` — to najszybszy, darmowy sprawdzian indeksacji. Jeśli liczba wyników jest rażąco mała w porównaniu do liczby podstron, które faktycznie masz, coś blokuje indeksowanie. Dokładniejszy obraz dostaniesz w Google Search Console, w zakładce **Strony** — tam zobaczysz dokładnie, które adresy są zaindeksowane, a które odrzucone i dlaczego.

### Struktura linkowania wewnętrznego
Czy z każdej ważnej podstrony da się dojść do innej ważnej podstrony maksymalnie w kilku kliknięciach? Strony-sieroty (bez żadnego linku prowadzącego z innych miejsc serwisu) to jeden z najczęściej pomijanych problemów technicznych — Google traktuje brak linków wewnętrznych jako sygnał, że dana treść jest mało ważna, nawet jeśli merytorycznie jest świetna.

## Audyt contentowy — czy odpowiadasz na właściwe pytania

Techniczna strona może działać perfekcyjnie i nadal nie przyciągać ruchu, jeśli treść nie trafia w to, czego ludzie faktycznie szukają.

### Zacznij od wyszukiwarki słów kluczowych
Zanim ocenisz istniejącą treść, sprawdź, jakich fraz w ogóle szukają Twoi potencjalni klienci. Darmowy start: Google Trends i podpowiedzi autouzupełniania w samej wyszukiwarce. Bardziej systemowe podejście wymaga już narzędzia płatnego (więcej w sekcji o narzędziach niżej) — bez tego kroku ryzykujesz, że napiszesz świetny tekst pod frazę, której nikt nie wpisuje.

### Sprawdź, na jakich frazach faktycznie się wyświetlasz
Wróć do Search Console, zakładka **Skuteczność** → tabela **Zapytania**. Zobaczysz realne dane: na jakie frazy Twoja strona się pojawia w wynikach, ile kliknięć generuje i na jakiej średniej pozycji. To najbardziej wiarygodne źródło — surowe dane od Google, nie szacunki narzędzia trzeciego.

Jeśli interesuje Cię konkretna fraza, a nie cały przegląd, możesz też użyć darmowego **google position checker** — wpisujesz frazę i domenę, a narzędzie sprawdza, na której pozycji się znajdujesz, bez ręcznego przewijania wyników (co i tak zniekształcałaby personalizacja Twojego własnego konta Google).

## Audyt off-page — linki i reputacja domeny

Ten obszar najtrudniej sprawdzić za darmo, ale kilka sygnałów zobaczysz bez płacenia. W Search Console, zakładka **Linki**, znajdziesz listę stron, które linkują do Ciebie — jeśli widzisz tam głównie katalogi spamowe z podejrzanych domen, to sygnał ostrzegawczy, nie powód do dumy. Jakość linków liczy się bardziej niż ich ilość — pięć linków z branżowych, rozpoznawalnych stron jest warte więcej niż pięćdziesiąt z anonimowych katalogów.

## Narzędzia SEO — co jest darmowe, a za co warto zapłacić

Rozkładam to tak, jak sam dobieram narzędzia do własnego stacku — zaczynam od darmowych, płacę tylko tam, gdzie darmowe realnie się kończy.

**Darmowe, wystarczające na start:**
- **Google Search Console** — fundament, opisany wyżej, obowiązkowy dla każdej strony
- **PageSpeed Insights** — szybkość i Core Web Vitals
- **Google Trends** + autouzupełnianie wyszukiwarki — wstępny research fraz

**Płatne, gdy potrzebujesz skali:**
Ja od lat korzystam z [Semrusha](/post/narzedzia-ai-ktorych-naprawde-uzywam_2025-11-15) — daje pełny obraz konkurencji, wolumeny wyszukiwań i trudność fraz, których nie zobaczysz w żadnym darmowym narzędziu. Na polskim rynku popularną, tańszą alternatywą jest Senuto, a globalnym standardem do analizy linków — Ahrefs. Żadne z nich nie jest konieczne, żeby zrobić pierwszy, podstawowy audyt — ale każde przyspiesza pracę, jeśli robisz to regularnie, nie raz na rok.

## Kiedy zrobić audyt samodzielnie, a kiedy zlecić agencji

Podstawowy audyt techniczny i contentowy z tego tekstu zrobisz sam w jeden wieczór, bez wiedzy programistycznej — to kwestia kilkunastu kliknięć w darmowych narzędziach.

Zlecenie **audytu strony internetowej** jako usługi (widełki: 500–2500 zł jednorazowo, [pisałem o tym szerzej przy okazji cen pozycjonowania](/post/ile-kosztuje-pozycjonowanie-strony_2026-07-17)) ma sens, gdy: strona jest duża (setki podstron, trudno przejrzeć ręcznie), potrzebujesz analizy technicznej głębiej niż PageSpeed pokaże (crawl całej struktury, duplikaty treści, przekierowania), albo po prostu chcesz mieć zewnętrzne, niezależne oko — audytor bez interesu w utrzymaniu status quo Twojej strony często złapie rzeczy, których sam nie zauważysz, bo jesteś zbyt blisko własnego produktu.

Jedno zdanie ostrzeżenia: jeśli zlecasz audyt tej samej agencji, która potem ma Cię pozycjonować, dostaniesz raport zaprojektowany tak, żeby uzasadnić ich własną ofertę. Nie jest to zawsze nieuczciwe — ale warto o tym pamiętać, czytając wnioski.

---

## Co dalej?

**Chcesz dostawać więcej takich praktycznych materiałów o marketingu małej firmy?** Zapisz się do mojego newslettera — bez lania wody, same konkrety prosto od praktyka, nie teoretyka.

[Zapisz się do newslettera →](https://buildletter.substack.com/subscribe)

Powiązane teksty: [ile kosztuje pozycjonowanie strony w 2026](/post/ile-kosztuje-pozycjonowanie-strony_2026-07-17) · [jak sprawdzić, czy agencja SEO robi cokolwiek](/post/jak-sprawdzic-agencje-seo_2026-07-15) · [narzędzia AI, których naprawdę używam](/post/narzedzia-ai-ktorych-naprawde-uzywam_2025-11-15) · [jak przebudowuję tego bloga](/post/jak-przebudowuje-bloga-pillar-pages_2026-07-16)

---

*Zrobiłeś audyt i nie wiesz, co z niego wynika? Napisz do mnie na [LinkedIn](https://www.linkedin.com/in/michal-danieluk/) — chętnie zerknę i powiem, od czego zacząć.*
