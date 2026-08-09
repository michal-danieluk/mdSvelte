# Raport DataForSEO — 2026-08-09

## Zakres i koszt

Zatwierdzony plan obejmował 29 keywordów w Keyword Overview oraz 4 zapytania SERP TOP 10 przy limicie kosztu `$0.03`.

Wynik wykonania:

- Keyword Overview: wykonane;
- zwrócone wyniki: 16 z 29 keywordów;
- brakujące wyniki: 13 keywordów, bez opłaty za brakujące rekordy;
- koszt Keyword Overview: `$0.01392`;
- SERP TOP 10: niewykonane — endpoint nadal zwraca `40104 Please verify your account`;
- koszt SERP: `$0`;
- potwierdzone saldo po operacji: `$0.98608`.

Surowa odpowiedź jest zapisana w `docs/dataforseo/2026-08-09-keyword-serp-research.json`. Znormalizowane wyniki znajdują się w `docs/dataforseo/2026-08-09-keyword-overview.csv`.

## Najważniejsze wyniki

| Keyword                         | Volume PL |   KD | Intent        | CPC PLN | Wniosek                                                                                      |
| ------------------------------- | --------: | ---: | ------------- | ------: | -------------------------------------------------------------------------------------------- |
| content marketing               |    12 100 |  0\* | commercial    |    3,94 | Duży temat, ale szeroki i z AI Overview; existing hub wymaga wyraźnego kąta dla małej firmy  |
| pozycjonowanie stron            |     5 400 |   34 | commercial    |   19,58 | Bardzo komercyjna fraza; artykuł edukacyjny powinien prowadzić long-tailem `jak działa...`   |
| audyt SEO                       |     1 600 |   49 | commercial    |    9,71 | Wartościowy, ale trudniejszy klaster; istniejący poradnik potrzebuje autorytetu i linkowania |
| pozycjonowanie wizytówki Google |     1 300 |  0\* | commercial    |    7,95 | Najmocniejsza luka nowej treści, z wyraźną wartością biznesową                               |
| SEO copywriting                 |     1 000 |  0\* | commercial    |    4,58 | Mocna istniejąca okazja, dodatkowo potwierdzona przez GSC                                    |
| pozycjonowanie cena             |     1 000 |   22 | commercial    |    7,88 | Bardzo dobre dopasowanie do istniejącego artykułu kosztowego                                 |
| pozycjonowanie lokalne          |       880 |  0\* | commercial    |    6,07 | Mocna luka; finalna decyzja o osobnym URL-u wymaga SERP overlapu                             |
| ile kosztuje pozycjonowanie     |       590 |    4 | informational |    2,44 | Najłatwiejszy long-tail dla istniejącego artykułu kosztowego                                 |
| wyszukiwarka słów kluczowych    |       480 |  0\* | informational |    2,75 | Potencjalny nowy poradnik lub narzędzie, ale trzeba sprawdzić typ wyników                    |
| tekst SEO przykład              |       210 |  0\* | informational |    0,36 | Wyraźnie lepszy target niż samo `SEO copywriting przykłady`                                  |
| wynik jakości Google Ads        |        70 | brak | informational |    brak | Zachować dla dedykowanego artykułu                                                           |
| jak zrobić audyt SEO            |        70 | brak | informational |    1,04 | Dobry long-tail dla poradnika audytowego                                                     |
| jak znaleźć słowa kluczowe      |        50 | brak | informational |    brak | Fraza wspierająca potencjalny poradnik keyword research                                      |
| co to jest SEO copywriting      |        40 | brak | informational |    brak | Właściwa fraza dla istniejącego artykułu definicyjnego                                       |
| jak działa pozycjonowanie stron |        30 | brak | informational |    brak | Mały wolumen, ale prawidłowa intencja dla edukacyjnego artykułu                              |
| marketing dla małej firmy       |        30 | brak | commercial    |    brak | Hub strategiczny, nie główny motor ruchu                                                     |

`KD 0*` oznacza wartość zwróconą przez DataForSEO, a nie gwarancję braku konkurencji. Przy szerokich frazach z silnymi domenami i rozbudowanym SERP-em należy ją traktować ostrożnie.

## Porównanie DataForSEO z Semrush

Wolumeny są zwykle zbliżone, ale intent i KD potrafią różnić się znacząco:

- `content marketing`: oba źródła 12 100; Semrush KD 27/informational, DataForSEO KD 0/commercial;
- `pozycjonowanie stron`: oba 5 400; Semrush KD 50/transactional, DataForSEO KD 34/commercial;
- `audyt SEO`: Semrush 1 900/KD 44/informational, DataForSEO 1 600/KD 49/commercial;
- `SEO copywriting`: Semrush 1 300/KD 14/informational, DataForSEO 1 000/KD 0/commercial;
- `pozycjonowanie cena`: oba 1 000; Semrush KD 35/informational, DataForSEO KD 22/commercial;
- `pozycjonowanie lokalne`: oba 880; Semrush KD 23/informational, DataForSEO KD 0/commercial.

Wniosek: wolumen nadaje się do priorytetyzacji, ale decyzji o typie strony nie należy opierać na automatycznej etykiecie intent jednego dostawcy. Ostateczny typ URL-u powinien wynikać z faktycznych wyników TOP 10 i celu domeny.

## Frazy bez wyniku DataForSEO

DataForSEO nie zwróciło danych dla:

- SEO dla małej firmy;
- SEO copywriting przykłady;
- jak sprawdzić, czy agencja dobrze prowadzi Google Ads i Meta Ads?;
- analiza kampanii Meta Ads;
- jak sprawdzić kampanię Meta Ads;
- czy SEO się opłaca;
- SEO samemu czy agencja;
- jak sprawdzić agencję SEO;
- Google Ads dla małej firmy;
- jak ustawić kampanię Google Ads;
- Meta Ads dla małej firmy;
- ile kosztuje marketing małej firmy;
- ile kosztuje Google Ads.

Brak wyniku nie oznacza automatycznie zerowego popytu. Część tych fraz ma dane w GSC lub Semrush i nadal może być wartościowym long-tailem.

## Decyzje

1. Najpierw uporządkować istniejący klaster SEO copywriting:
   - `SEO copywriting` i `co to jest SEO copywriting` → artykuł definicyjny;
   - `tekst SEO przykład` → artykuł z przykładami;
   - `content marketing` → szeroki hub contentowy.
2. Zachować i wzmocnić artykuł kosztowy:
   - primary: `pozycjonowanie cena`;
   - supporting: `ile kosztuje pozycjonowanie`.
3. Zachować poradnik audytowy:
   - primary: `audyt SEO`;
   - supporting: `jak zrobić audyt SEO`.
4. Nowa treść o wizytówce Google pozostaje najwyższym priorytetem content gap.
5. Nie targetować edukacyjnym artykułem szerokiej, komercyjnej frazy `pozycjonowanie stron`.
6. `wyszukiwarka słów kluczowych` jest drugą ciekawą luką, ale wymaga sprawdzenia, czy SERP preferuje poradniki czy narzędzia.

## Brakujący etap SERP

Endpoint `serp/google/organic/live/advanced` nadal zwraca `40104`. Skrypt obsługuje teraz tryb `--serp-only`, dzięki czemu po odblokowaniu endpointu nie zapłacimy ponownie za Keyword Overview.

Planowany koszt czterech brakujących SERP-ów: `$0.008`.
