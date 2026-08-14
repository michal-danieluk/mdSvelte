---
title: "Dane strukturalne SEO: prosty poradnik Schema.org"
seoTitle: "Dane strukturalne SEO: checklista dla właściciela strony"
date: "2026-08-15"
tags: ["SEO", "Dane strukturalne", "Schema.org", "JSON-LD", "Techniczne SEO"]
description: "Dane strukturalne SEO prostym językiem: wybierz typ Schema.org, sprawdź stronę i przygotuj informacje dla wykonawcy swojej strony."
preview: "Dane strukturalne bez grzebania w kodzie. Sprawdź, co możesz zrobić samodzielnie, a co warto przekazać wykonawcy strony."
keywords: "dane strukturalne SEO, Schema.org, JSON-LD, jak sprawdzić dane strukturalne, walidacja danych strukturalnych, rich results"
featured: false
workflow_status: approved
expert_input: optional
---

Dane strukturalne to informacje zapisane w kodzie strony dla wyszukiwarek. Czytelnik widzi tytuł artykułu, autora i datę publikacji. Google dostaje te informacje również w uporządkowanej formie. Dzięki temu łatwiej rozpoznaje, co znajduje się na stronie.

Nie jest to tajny przycisk do wyższej pozycji. Poprawny kod nie gwarantuje lepszego wyglądu wyniku w Google, dodatkowego ruchu ani polecenia przez AI. Pomaga jednak wyszukiwarce zrozumieć, czym jest strona i co zawiera.

Na początek wystarczy prosty proces:

**wybierz rodzaj strony → opisz prawdziwe dane → przekaż je do wdrożenia → wykonaj dwa testy**

Bez instalowania pięciu wtyczek i oznaczania wszystkiego, co da się znaleźć w słowniku Schema.org.

## Schema.org, JSON-LD i wyniki rozszerzone to trzy różne rzeczy

Te nazwy często trafiają do jednego worka, więc najpierw je rozdzielmy.

**Schema.org** to lista rodzajów treści i pól służących do ich opisu. Znajdziesz tam na przykład osobę (`Person`), firmę (`Organization`), produkt (`Product`), artykuł (`Article`) i wydarzenie (`Event`).

**JSON-LD** to sposób zapisania tych informacji w kodzie strony. Cały opis mieści się w jednym osobnym bloku. Dzięki temu zwykle łatwiej go dodać i poprawić niż inne formaty, takie jak Microdata czy RDFa.

**Wynik rozszerzony**, po angielsku rich result, to wynik Google pokazujący dodatkowe informacje. Przy przepisie mogą to być na przykład czas przygotowania i ocena. Google obsługuje tylko wybrane rodzaje danych i samo decyduje, czy je pokaże.

Czyli:

- Schema.org mówi, jakich pojęć i pól możesz użyć;
- JSON-LD mówi, jak zapisać je w kodzie;
- Google określa, które dane mogą wpływać na wygląd wyniku wyszukiwania.

Kod może więc być poprawny według Schema.org, ale nie dawać dodatkowych elementów w wyniku Google.

## Jaki typ Schema.org wybrać?

Zacznij od pytania: **czym jest ta konkretna strona?**

Nie wybieraj typu tylko dlatego, że atrakcyjnie wygląda w Google. Dane mają opisywać prawdziwą zawartość strony.

| Rodzaj strony                                       | Typ Schema.org na start           | Co opisuje                                   |
| --------------------------------------------------- | --------------------------------- | -------------------------------------------- |
| Strona autora lub eksperta                          | `Person`                          | osobę, jej nazwę, stronę i powiązane profile |
| Strona firmy                                        | `Organization`                    | firmę, markę i jej oficjalne dane            |
| Firma przyjmująca klientów w konkretnej lokalizacji | odpowiedni podtyp `LocalBusiness` | lokalizację, kontakt i rodzaj działalności   |
| Artykuł blogowy                                     | `Article` albo `BlogPosting`      | tytuł, autora, daty i główny URL tekstu      |
| Produkt                                             | `Product`                         | konkretny produkt widoczny na stronie        |
| Wydarzenie                                          | `Event`                           | wydarzenie z prawdziwą datą i lokalizacją    |
| Okruszki nawigacyjne                                | `BreadcrumbList`                  | położenie strony w strukturze serwisu        |

Schema.org ma znacznie więcej typów. Nie każdy z nich zmienia wygląd wyniku w Google. Przed dodaniem kodu sprawdź [listę danych obsługiwanych przez Google](https://developers.google.com/search/docs/appearance/structured-data/search-gallery).

Na początek dodaj tylko typy pasujące do prawdziwej zawartości najważniejszych stron. Na michaldanieluk.pl strona główna ma dane `Person` i `WebSite`, a każdy wpis dostaje `BlogPosting`. To opisuje autora, witrynę i artykuł bez udawania sklepu, wydarzenia czy katalogu ofert.

## Jak wygląda JSON-LD w praktyce?

Poniżej jest skrócony przykład danych `Person` używanych na tej stronie:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Michał Danieluk",
    "url": "https://www.michaldanieluk.pl",
    "jobTitle": "Digital Marketing Specialist",
    "sameAs": [
      "https://www.linkedin.com/in/michal-danieluk",
      "https://x.com/michaldanieluk"
    ]
  }
</script>
```

Najważniejsze pola:

- `@context` wskazuje słownik Schema.org;
- `@type` określa opisywany rodzaj rzeczy;
- `name`, `url` i `jobTitle` zawierają konkretne informacje;
- `sameAs` łączy tę samą osobę z jej oficjalnymi profilami.

`sameAs` nie jest listą wszystkich stron, na których masz konto. Link powinien prowadzić do profilu reprezentującego tę samą osobę albo organizację.

Artykuł opisuje się podobnie. Podajesz jego tytuł, datę publikacji, autora i główny adres. Najlepiej, jeśli system pobiera te informacje bezpośrednio z wpisu. Wtedy zmiana tytułu lub adresu automatycznie aktualizuje też dane dla wyszukiwarki.

## Jak przygotować dane strukturalne do dodania?

Nie musisz od razu pisać kodu. Twoim zadaniem jest sprawdzić stronę, wybrać właściwy rodzaj danych i przygotować prawdziwe informacje. Sam kod może dodać używany system albo wykonawca strony.

### 1. Sprawdź, czy dane już istnieją

Otwórz [Schema.org Validator](https://validator.schema.org/), wklej adres strony i zapisz wykryte typy danych. Jeśli potrzebny typ już istnieje, nie dodawaj kolejnej kopii bez sprawdzenia, skąd pochodzi obecny kod.

### 2. Wybierz jedną ważną stronę

Zacznij od strony głównej, najważniejszej usługi albo gotowego artykułu. Sprawdź, co rzeczywiście się na niej znajduje: firma, autor, produkt, wydarzenie czy opis usługi. Typ Schema.org musi pasować do tego, co widzi czytelnik.

### 3. Sprawdź, jak zbudowana jest strona

Jeśli korzystasz z WordPressa lub kreatora stron, zajrzyj do ustawień wtyczki SEO. Poszukaj opcji nazwanej „Schema” albo „dane strukturalne”. System może już tworzyć potrzebny kod.

Jeżeli nie widzisz takiej funkcji, nie wklejaj kodu do przypadkowego pola. Przy stronie tworzonej na zamówienie najlepiej przekazać zadanie wykonawcy.

### 4. Przygotuj informacje dla siebie lub wykonawcy

Zapisz:

- adres strony, której dotyczy zmiana;
- wybrany typ Schema.org;
- informacje widoczne na stronie, na przykład nazwę firmy, autora, datę lub adres;
- jeśli Google oferuje dla tego typu wynik rozszerzony, link do jego [wymagań](https://developers.google.com/search/docs/appearance/structured-data/search-gallery).

Możesz wysłać wykonawcy taką wiadomość:

> Proszę dodać dane JSON-LD typu `[wybrany typ]` na stronie `[adres]`. Kod powinien korzystać z informacji widocznych na stronie i aktualizować się razem z nimi. Po publikacji proszę sprawdzić adres w Schema.org Validator oraz Google Rich Results Test.

### 5. Porównaj dane z tym, co widzi czytelnik

Jeśli dane podają cenę, autora, ocenę, adres lub datę, ta informacja powinna być również widoczna na stronie. Nie dodawaj opinii, ocen ani usług, których czytelnik tam nie znajdzie.

### 6. Wykonaj dwa testy po publikacji

[Schema.org Validator](https://validator.schema.org/) pokazuje znalezione typy danych i błędy. [Google Rich Results Test](https://search.google.com/test/rich-results) sprawdza natomiast tylko dane, które Google może pokazać jako wynik rozszerzony.

Wklej ten sam adres do obu narzędzi. Schema.org Validator może wykryć `Person` lub `WebSite`, a test Google nie pokaże obsługiwanych elementów. Nie musi to oznaczać błędu. Nie każdy poprawny typ Schema.org zmienia wygląd wyniku w Google.

Sprawdziłem w ten sposób również michaldanieluk.pl. Schema.org Validator wykrywa na stronie głównej dane `Person` i `WebSite`, a w artykułach dodatkowo `BlogPosting`. Nie oznacza to jednak automatycznie wyższej pozycji ani większego ruchu.

## IndexNow to osobne rozwiązanie

IndexNow nie jest częścią Schema.org. Dane strukturalne opisują zawartość strony. IndexNow informuje Bing i inne obsługujące go wyszukiwarki, że konkretny adres został dodany, zmieniony albo usunięty.

Takie zgłoszenie może przyspieszyć zauważenie zmiany. Nie gwarantuje jednak, że wyszukiwarka od razu odwiedzi stronę, doda ją do wyników albo poprawi jej pozycję.

Najpierw sprawdź, czy hosting, system strony albo wtyczka SEO obsługuje IndexNow automatycznie. Na michaldanieluk.pl adres zmienionego artykułu jest wysyłany po udanej publikacji. Ręczna konfiguracja klucza i połączenia z IndexNow to temat na osobny poradnik.

## Najczęstsze błędy w danych strukturalnych

### Kod opisuje coś, czego nie ma na stronie

To najpoważniejszy problem. Opinie, ceny, FAQ i dane autora muszą odpowiadać rzeczywistej treści. Nie twórz drugiej, lepszej wersji strony przeznaczonej wyłącznie dla wyszukiwarki.

### Ten sam typ jest kopiowany wszędzie

`BlogPosting` pasuje do artykułu, ale nie do strony kontaktowej. `Product` pasuje do konkretnego produktu, ale nie do ogólnej listy usług. Typ wybierasz osobno dla każdej strony.

### Walidator jest zielony, więc „SEO zrobione”

Dane strukturalne są tylko jednym z elementów SEO. Nie sprawią, że zablokowana strona nagle pojawi się w Google. Nie poprawią też słabego tekstu ani braku linków między podstronami. Szerszą kontrolę opisuję w poradniku [jak zrobić audyt SEO](/post/jak-zrobic-audyt-seo_2026-07-19).

### Poprawny kod nie gwarantuje lepszego wyniku

Google wyraźnie zaznacza, że poprawne dane nie gwarantują specjalnego wyglądu wyniku. Ostateczną decyzję zawsze podejmuje wyszukiwarka.

### Kod po zmianie treści zostaje stary

Zmienił się tytuł, autor, adres albo data, ale JSON-LD nadal pokazuje starą informację. Najlepiej pobierać dane z tego samego miejsca co treść artykułu. Wtedy jedna zmiana aktualizuje oba miejsca.

## Od czego zacząć dzisiaj?

Wybierz jedną stronę i wykonaj cztery kroki:

1. sprawdź, jakie dane już znajdują się na stronie;
2. wybierz typ pasujący do widocznej treści;
3. przygotuj prawdziwe informacje i przekaż je do wdrożenia;
4. po publikacji porównaj dane z treścią i wykonaj oba testy.

Jeżeli strona nie ma jeszcze danych strukturalnych, zacznij od prostego opisu. Jeśli ma ich dużo, usuń informacje, których czytelnik nie znajdzie na stronie.

Dane strukturalne nie mają dodawać kodu dla samego kodu. Powinny przekazywać wyszukiwarce te same informacje, które widzi czytelnik.

## Źródła

- [Wprowadzenie do danych strukturalnych w Google Search](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Ogólne wytyczne dotyczące danych strukturalnych](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Typy danych obsługiwane przez Google Search](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Dokumentacja IndexNow](https://www.indexnow.org/documentation)
- [FAQ IndexNow](https://www.indexnow.org/faq)
- [IndexNow w Bing Webmaster Tools](https://www.bing.com/indexnow)
