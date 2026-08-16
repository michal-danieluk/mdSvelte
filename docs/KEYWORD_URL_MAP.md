# Mapa keyword → URL — michaldanieluk.pl

Data analizy: 2026-08-09
Status: mapa częściowo zwalidowana eksportem Semrush z 2026-08-09

## Cel

Każda ważna intencja wyszukiwania powinna mieć jeden główny URL. Pozostałe materiały mogą wspierać temat linkowaniem, ale nie powinny używać tej samej frazy jako własnego primary keyword.

Rola domeny: edukacyjny personal brand o praktycznym SEO i marketingu dla małych firm. Strony usługowe i konwersyjne pozostają na buildletter.com.

## Stan GSC

Porównanie 2026-07-11–2026-08-07 do poprzednich 28 dni:

- kliknięcia: 2 vs 1;
- wyświetlenia: 452 vs 102, wzrost o 343%;
- CTR: 0,44% vs 0,98%;
- średnia pozycja: 47,75 vs 49,94, poprawa o około 2,2 pozycji.

Interpretacja: widoczność szybko się rozszerza, ale większość fraz jest jeszcze poza TOP 20. Spadek CTR wynika głównie z wejścia na większą liczbę niskich pozycji. Nie należy teraz masowo zmieniać title tylko dlatego, że CTR całej domeny jest niski.

URL Inspection potwierdza `Submitted and indexed`, dozwolone indeksowanie, skuteczny fetch oraz canonical wybrany przez Google dla wszystkich dziewięciu analizowanych URL-i. Nie ma blokera indeksacyjnego.

## Wyniki walidacji Semrush

Eksport `content-marketing_audyt-SEO_bulk_pl_2026-08-09_20-47-06.csv` zawiera 10 sprawdzonych fraz dla Polski:

| Keyword                         |      Volume |  KD | Intent        | Wniosek                                                                                                |
| ------------------------------- | ----------: | --: | ------------- | ------------------------------------------------------------------------------------------------------ |
| content marketing               |      12 100 |  27 | Informational | Główny temat istniejącego huba contentowego                                                            |
| pozycjonowanie stron            |       5 400 |  50 | Transactional | Nie używać jako głównej frazy edukacyjnego artykułu; prowadzić frazą `jak działa pozycjonowanie stron` |
| audyt SEO                       |       1 900 |  44 | Informational | Zachować istniejący artykuł i wzmacniać klaster/linkowanie                                             |
| SEO copywriting                 |       1 300 |  14 | Informational | Najlepsza kombinacja popytu, dopasowania i trudności w istniejących treściach                          |
| pozycjonowanie wizytówki Google |       1 300 |  23 | Informational | Najlepsza potwierdzona luka na nowy artykuł                                                            |
| pozycjonowanie cena             |       1 000 |  35 | Informational | Dobre dopasowanie do istniejącego artykułu o kosztach                                                  |
| pozycjonowanie lokalne          |         880 |  23 | Informational | Dobra luka; porównać TOP 10 z wizytówką Google przed decyzją o osobnym URL-u                           |
| SEO copywriting przykłady       |          20 |  17 | Commercial    | Niski wolumen, ale GSC pokazuje już trakcję i lepszą pozycję dedykowanego URL-u                        |
| marketing dla małej firmy       |          20 |   6 | Informational | Zachować jako hub wspierający, nie jako główny motor ruchu                                             |
| SEO dla małej firmy             | brak danych |  17 | Informational | Zachować jako strategiczne pozycjonowanie huba, bez prognozy ruchu                                     |

Eksport zawiera metryki i SERP Features, ale nie listę konkretnych wyników TOP 10. Nadal wymagają ręcznego porównania dwie pary:

- `pozycjonowanie wizytówki Google` vs `pozycjonowanie lokalne`;
- `pozycjonowanie stron` vs `jak działa pozycjonowanie stron`.

## Wyniki DataForSEO

Keyword Overview z 2026-08-09 zwrócił 16 z 29 fraz za `$0.01392`. Najważniejsze dodatkowe sygnały:

- `SEO copywriting`: 1 000 wyszukiwań — pozostaje główną istniejącą okazją;
- `tekst SEO przykład`: 210 — właściwy primary dla artykułu z przykładami;
- `pozycjonowanie cena`: 1 000 oraz `ile kosztuje pozycjonowanie`: 590 — oba warianty przypisane do istniejącego artykułu kosztowego;
- `pozycjonowanie wizytówki Google`: 1 300 — najwyższy priorytet nowej treści;
- `wyszukiwarka słów kluczowych`: 480 — druga potencjalna luka;
- `pozycjonowanie stron`: intent commercial, CPC 19,58 PLN — nie jest właściwym primary dla edukacyjnego artykułu;
- `jak działa pozycjonowanie stron`: 30, intent informational — właściwe dopasowanie do obecnej treści, ale mały potencjał ruchu.

Automatyczne etykiety intent i KD różnią się między DataForSEO a Semrush, dlatego nie są samodzielną podstawą decyzji. Pełne dane i porównanie znajdują się w `docs/DATAFORSEO_RESEARCH_REPORT.md`.

Endpoint SERP pozostał zablokowany błędem weryfikacji `40104`; cztery zapytania TOP 10 nie zostały wykonane ani naliczone. Po odblokowaniu należy użyć trybu `--serp-only`, aby nie płacić ponownie za Keyword Overview.

## Docelowa mapa

| Priorytet | Intencja / primary keyword                                       | Główny URL                                             | Rola innych stron                                                                       | Decyzja                                                                                                                                           |
| --------- | ---------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1        | SEO dla małej firmy                                              | `/seo`                                                 | Artykuły odpowiadają na węższe pytania                                                  | Hub nie powinien targetować jednocześnie `pozycjonowanie stron`, `audyt SEO` i `SEO copywriting` jako primary                                     |
| P1        | marketing dla małej firmy                                        | `/marketing`                                           | Koszty, czas do efektów i kanały mają osobne artykuły                                   | Rozbudować hub; obecnie 72 wyświetlenia i średnia pozycja około 79                                                                                |
| P1        | content marketing                                                | `/post/content-marketing-i-seo-copywriting_2026-07-18` | Definicja i przykłady SEO copywritingu mają własne URL-e                                | Usunąć roszczenie do `tekst SEO przykład`; ograniczyć nakładanie z definicją SEO copywritingu                                                     |
| P1        | SEO copywriting / co to jest SEO copywriting                     | `/post/co-to-jest-seo-copywriting_2026-07-10`          | Hub contentowy linkuje do definicji; przykłady mają osobny URL                          | Google już wybiera tę stronę dla `SEO copywriting`; nie przenosić frazy na hub                                                                    |
| P1        | SEO copywriting przykłady / tekst SEO przykład                   | `/post/seo-copywriting-przyklady_2026-07-28`           | Definicja linkuje do przykładów, ale nie targetuje `przykłady`                          | Strona ma lepszą pozycję dla frazy `SEO copywriting przykłady` niż artykuł definicyjny                                                            |
| P1        | audyt SEO / jak zrobić audyt SEO                                 | `/post/jak-zrobic-audyt-seo_2026-07-19`                | `/seo` tylko przedstawia i linkuje etap audytu                                          | Strona jest nowa; najpierw wzmocnić linkowanie i obserwować, nie przepisywać od zera                                                              |
| P1        | ile kosztuje pozycjonowanie / pozycjonowanie cena                | `/post/ile-kosztuje-pozycjonowanie-strony_2026-07-17`  | Artykuł o marketingu ma szerszy budżet wszystkich kanałów                               | Zachować commercial intent i prowadzić do dalszej decyzji/kontaktu                                                                                |
| P1        | jak sprawdzić, czy agencja dobrze prowadzi Google Ads i Meta Ads | `/post/jak-sprawdzic-kampanie-google-ads_2026-04-01`   | Dedykowany tekst Meta Ads ma targetować analizę kampanii Meta, nie frazę łączoną        | Oba URL-e są w TOP 5 dla tej samej frazy; wybrać stronę Google Ads jako właściciela zapytania łączonego                                           |
| P1        | analiza kampanii Meta Ads / jak sprawdzić kampanię Meta Ads      | `/post/jak-sprawdzic-kampanie-meta-ads_2026-04-17`     | Artykuł łączony linkuje do szczegółowej analizy Meta                                    | Wzmocnić odrębną intencję i ograniczyć sygnały frazy łączonej                                                                                     |
| P2        | pozycjonowanie stron / jak działa pozycjonowanie                 | `/post/jak-dziala-pozycjonowanie-stron_2026-07-20`     | `/seo` jest hubem dla małej firmy, nie konkurującym poradnikiem mechanicznym            | Potwierdzić w Semrush, czy SERP dla `pozycjonowanie stron` jest głównie usługowy; jeśli tak, primary zmienić na `jak działa pozycjonowanie stron` |
| P2        | czy SEO się opłaca                                               | `/post/czy-seo-sie-oplaca-malej-firmie_2026-07-12`     | Tekst o cenie odpowiada na koszt, nie na decyzję inwestycyjną                           | Zachować odrębną intencję ROI                                                                                                                     |
| P2        | SEO samemu czy agencja                                           | `/post/seo-samemu-czy-zatrudnic-kogos_2026-07-14`      | Tekst o kontroli agencji dotyczy już trwającej współpracy                               | Zachować etap przed zakupem                                                                                                                       |
| P2        | jak sprawdzić agencję SEO                                        | `/post/jak-sprawdzic-agencje-seo_2026-07-15`           | Tekst o czerwonych flagach jest szerszy i dotyczy agencji marketingowej                 | Rozdzielić etap kontroli pracy od etapu wyboru agencji                                                                                            |
| P2        | Google Ads dla małej firmy                                       | `/google-ads`                                          | Konfiguracja, błędy, wynik jakości i kontrola mają własne URL-e                         | Hub powinien być kompletną mapą tematu, nie tylko listą kart                                                                                      |
| P2        | jak ustawić kampanię Google Ads                                  | `/post/jak-ustawic-kampanie-google-ads_2026-04-14`     | Hub kieruje do poradnika                                                                | Jedna intencja wykonawcza                                                                                                                         |
| P2        | wynik jakości Google Ads                                         | `/post/wynik-jakosci-google-ads_2026-04-10`            | Tekst o kontroli kampanii tylko wspomina metrykę i linkuje do artykułu                  | Usunąć duplicate primary z frontmatter tekstu kontrolnego                                                                                         |
| P2        | Meta Ads dla małej firmy                                         | `/meta-ads`                                            | Analiza kampanii i koszty mają osobne strony                                            | Hub wymaga większej liczby dedykowanych materiałów                                                                                                |
| P2        | ile kosztuje marketing małej firmy                               | `/post/ile-kosztuje-marketing-malej-firmy_2026-07-15`  | `/marketing` podsumowuje budżet i linkuje do szczegółów                                 | Zachować intencję budżetową                                                                                                                       |
| P3        | pozycjonowanie wizytówki Google                                  | nowy artykuł, slug do ustalenia                        | Artykuł o lokalnym SEO może być tym samym URL-em tylko jeśli SERP-y mocno się pokrywają | Najważniejsza luka do ręcznego sprawdzenia w Semrush                                                                                              |
| P3        | pozycjonowanie lokalne                                           | nowy artykuł albo wspólny z wizytówką Google           | Tekst o cenie pozycjonowania tylko wprowadza temat                                      | Decyzja po ręcznym porównaniu SERP                                                                                                                |
| P2        | ile kosztuje Google Ads                                          | `/post/ile-kosztuje-google-ads`                       | Ogólny tekst o kosztach marketingu, poradnik wyboru agencji i hub Google Ads linkują do szczegółu | Właściciel intencji kosztu testu Google Ads; monitorować w GSC                                                                                   |
| P3        | wyszukiwarka słów kluczowych / jak znaleźć słowa kluczowe        | nowy artykuł                                           | Audyt SEO tylko używa tego jako jednego kroku                                           | Pisać dopiero po sprawdzeniu SERP i realnego zastosowania dla odbiorcy                                                                            |

## Potwierdzone nakładanie intencji

### 1. SEO copywriting — definicja vs przykłady

GSC dla `SEO copywriting przykłady` pokazuje:

- artykuł definicyjny: średnia pozycja około 25,6;
- artykuł z przykładami: średnia pozycja około 14,8.

Decyzja:

- definicja przejmuje `SEO copywriting` i pytania `co to jest`;
- przykłady przejmują wszystkie warianty z `przykład`, `tekst SEO przykład` i `dobre/złe teksty`;
- hub content marketingowy nie powinien używać `tekst SEO przykład` jako własnego primary keyword.

### 2. Kontrola Google Ads i Meta Ads

W ostatnich 28 dniach fraza `jak sprawdzić, czy agencja dobrze prowadzi Google Ads i Meta Ads?` wyświetlała:

- tekst Google Ads: 19 wyświetleń, średnia pozycja 4,2;
- tekst Meta Ads: 10 wyświetleń, średnia pozycja 4,7;
- oba URL-e: 0 kliknięć.

Decyzja:

- tekst Google Ads zachowuje zapytanie łączone, ponieważ jego title jest dokładnym dopasowaniem;
- tekst Meta Ads przejmuje `analiza kampanii Meta Ads` i `jak sprawdzić kampanię Meta Ads`;
- nie scalać artykułów, bo odpowiadają na dwie użyteczne intencje; uporządkować title, description, keywords oraz anchor texty.

### 3. Wynik jakości Google Ads

Fraza występuje w dwóch frontmatterach:

- artykuł o kontroli kampanii;
- dedykowany artykuł o wyniku jakości.

Decyzja: dedykowany artykuł jest właścicielem frazy. W tekście kontrolnym wynik jakości pozostaje sekcją i linkiem kontekstowym.

## Co zmienić w pierwszym sprincie

### Zmiana 1 — rozdzielenie SEO copywritingu

Wdrożone 2026-08-09 zgodnie z `docs/COMPACT_KEYWORDS_RULES.md`:

- hub content marketingowy przejął wyłącznie `content marketing` i nie deklaruje `tekst SEO przykład` ani `SEO copywriting` jako primary;
- artykuł definicyjny przejął `SEO copywriting` i `co to jest SEO copywriting`;
- artykuł z przykładami przejął `tekst SEO przykład` i warianty z `przykład`;
- SEO title, H1, description i pierwsze zdania zaczynają się od przypisanych fraz lub ich naturalnych wariantów;
- definicja, przykłady i hub linkują do siebie anchorami zgodnymi z rolą docelowego URL-a;
- istniejące slugi pozostawiono bez zmian, ponieważ URL-e są już zaindeksowane i mają dane w GSC.

### Zmiana 2 — rozdzielenie Google Ads i Meta Ads

- pozostawić zapytanie łączone tekstowi Google Ads;
- usunąć `analiza kampanii Meta Ads` i `ocena kampanii Meta Ads` z keywords tekstu Google Ads;
- dopracować title/meta tekstu Meta pod samodzielną analizę kampanii Meta Ads;
- linkować między artykułami anchorami odpowiadającymi ich własnym intencjom.

### Zmiana 3 — wzmocnienie hubów

`/seo` i `/marketing` są zindeksowane, ale mają średnie pozycje około 81,5 i 79,2. Ich treść jest głównie warstwą nawigacyjną.

- `/seo`: dodać unikalną odpowiedź na problem `SEO dla małej firmy`, kryteria decyzji i krótką mapę kolejności działań;
- `/marketing`: rozwinąć wybór kanałów, budżet, horyzont czasu i pomiar;
- nie kopiować treści artykułów; hub ma syntetyzować decyzje i prowadzić do szczegółów.

### Zmiana 4 — nie przepisywać nowych artykułów za wcześnie

Audyt SEO, przykłady SEO copywritingu i część pillar contentu zostały zaindeksowane pod koniec lipca. Najpierw poprawić mapowanie i linkowanie, potem zostawić 4–6 tygodni na zebranie danych.

## Ręczna walidacja Semrush

Do ręcznego sprawdzenia służy `docs/SEMRUSH_MANUAL_CHECK.csv`.

Dla każdej frazy uzupełnić:

- Volume PL;
- KD;
- Intent;
- dominujący typ wyników w TOP 10;
- czy wskazany URL odpowiada tej intencji;
- ostateczną decyzję: `keep`, `change target`, `merge`, `new page`, `drop`.

Semrush nie jest automatycznym źródłem danych w tym workflow. GSC pozostaje źródłem rzeczywistych danych tej domeny, a Semrush służy do ręcznej oceny popytu i konkurencji.
