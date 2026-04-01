---
title: 'Jak automatyzuję content plan za pomocą AI i Airtable'
date: '2026-01-28'
tags: ['AI', 'Automatyzacja', 'Content Marketingt', 'Airtable', 'Produktywność']
description: 'Praktyczny przewodnik po moim systemie planowania contentu. Airtable jako baza, AI do generowania pomysłów i briefów. Bez teorii — same konkrety.'
keywords: 'content plan AI, Airtable content calendar, automatyzacja contentu, planowanie treści AI, Claude content workflow'
image_prompt: 'A clean Airtable-style spreadsheet on a laptop screen with colorful status labels, surrounded by floating AI circuit patterns and content icons like video and article symbols, modern flat illustration style.'
---

## Planowanie contentu mnie dobijało

Powiedzmy sobie szczerze: planowanie treści to nie jest sexy temat. Ale wiesz, co jest jeszcze gorsze? Siedzieć w poniedziałek rano przed pustym ekranem i zastanawiać się, o czym nagrać filmik.

Przez kilka miesięcy robiłem to tak: pomysły w głowie, czasem notatka w telefonie, czasem karteczka na biurku. Efekt? Połowa pomysłów ginęła, druga połowa nie pasowała do żadnej strategii, a ja publikowałem wtedy, gdy akurat miałem wena. Czyli raz na dwa tygodnie. W dobrym miesiącu.

Teraz planowanie całego tygodnia zajmuje mi 15 minut. Poważnie. Pokażę Ci jak.

---

## Problem: Za dużo pomysłów, zero systemu

Pomysły na treści miałem zawsze. Problem nigdy nie polegał na braku kreatywności. Problem polegał na tym, że:

- Pomysły lądowały w 5 różnych miejscach (notatki, WhatsApp do siebie na inny numer, zakładki w przeglądarce)
- Nie wiedziałem, który pomysł jest dobry, a który to ślepa uliczka
- Nie miałem pojęcia, co jest "w produkcji", a co tylko luźną myślą
- Każdy poniedziałek zaczynał się od zera

Potrzebowałem jednego miejsca, prostego przepływu i kogoś, kto pomoże mi myśleć. Tym "kimś" okazał się AI.

---

## Mój setup: Airtable + Claude

Nie wymyślałem tutaj koła na nowo. Setup jest prosty do bólu i właśnie dlatego działa.

### Airtable jako kręgosłup

Airtable to taki Excel na sterydach — ale spokojnie, nie musisz być technicznym ninja, żeby go ogarnąć. Moja baza ma jedną tabelę z pięcioma kolumnami:

| Kolumna | Typ | Po co |
|---------|-----|-------|
| **Tytuł** | Tekst | Roboczy tytuł pomysłu |
| **Status** | Select | Gdzie jest w pipeline |
| **Format** | Select | YouTube / LinkedIn / Newsletter |
| **Data** | Date | Planowana publikacja |
| **Notatki** | Long text | Brief, linki, luźne myśli |

Statusy to serce całego systemu. Mam ich pięć:

**pomysł → brief → draft → review → opublikowany**

Każdy pomysł zaczyna jako "pomysł" i przesuwa się w prawo. Jeśli utknął — widzę to od razu. Jeśli mam za mało materiału w pipeline — też widzę.

### AI do generowania pomysłów

Tu wchodzi Claude. Raz na tydzień (albo gdy mam pusty pipeline) odpalam sesję ideacji (tak wiem powinno być kreacji ale tak wyszło z angielska i już zostało, to mój system nie czepiać się). Nie generuję jednego pomysłu na raz — robię to hurtowo.

Mój prompt wygląda mniej więcej tak:

```
Jestem twórcą contentu o AI i automatyzacji dla małych firm.
Moje formaty: YouTube, LinkedIn, newsletter.

Wygeneruj 10 pomysłów na treści na najbliższe 2 tygodnie.
Dla każdego podaj: tytuł, format, 1-zdaniowy hook.

Unikaj: ogólników, clickbaitu, rzeczy dla programistów.
Celuj w: właścicieli małych firm, marketerów, ludzi ciekawych AI.
```

Dostaję 10 pomysłów w 30 sekund. Połowę wyrzucam, 3-4 trafiają do Airtable ze statusem "pomysł". Gotowe.

### AI do briefów

To jest mój ulubiony kawałek. Mam pomysł w Airtable, ale żeby go zrealizować, potrzebuję struktury. Zamiast siedzieć godzinę nad outline'em, proszę Claude'a:

```
Stwórz brief do filmu na YouTube.
Temat: [tytuł z Airtable]
Długość: 8-12 minut
Grupa docelowa: właściciele małych firm

Struktura briefu:
- Hook (pierwsze 30 sekund)
- Główne punkty (3-5)
- CTA
- Notatki do B-rolla
```

Dwie minuty i mam brief, który wklejam do kolumny "Notatki". Status zmieniam na "brief". Następny.

### Cotygodniowy przegląd: 15 minut

Każdy poniedziałek o 9:00 otwieram Airtable i odpowiadam sobie na trzy pytania:

1. **Co jest gotowe do publikacji?** (status: review → opublikowany)
2. **Co wymaga mojej pracy w tym tygodniu?** (status: brief → draft)
3. **Czy mam wystarczająco pomysłów w pipeline?** (jeśli mniej niż 5 ze statusem "pomysł" — odpalam sesję ideacji)

To wszystko. 15 minut i wiem dokładnie, co robię w tym tygodniu.

---

## Porady, żebyś nie przesadził

Bo wiem, że teraz myślisz o dodaniu 15 kolumn, 8 widoków i automatyzacji przez Zapiera. Nie rób tego. Serio.

**Zacznij od trzech kolumn.** Tytuł, status, format. Resztę dodasz, jak poczujesz, że czegoś brakuje. Nie wcześniej.

**Nie automatyzuj wszystkiego od razu.** Ręczne przesuwanie statusu to 2 sekundy. Nie potrzebujesz na to automatyzacji. Automatyzuj wtedy, gdy coś naprawdę boli — nie wtedy, gdy coś "fajnie byłoby zautomatyzować".

**Generuj pomysły hurtowo.** 10 na raz, nie jeden na raz. Dlaczego? Bo przy jednym pomyśle za bardzo się do niego przywiązujesz. Przy dziesięciu — wyrzucasz słabe bez sentymentu.

**Nie każdy pomysł musi zostać zrealizowany.** Pipeline to nie lista zobowiązań. Jeśli pomysł leży ze statusem "pomysł" od trzech tygodni — usuń go. Nie wrócisz do niego. Wiem to. Ty też to wiesz.

---

## System nie musi być idealny

Mój content plan nie jest dziełem sztuki. Nie ma pięknych dashboardów, nie synchronizuje się z 12 narzędziami, nie wysyła mi powiadomień ze statystykami.

Ma tabelę, pięć statusów i AI, który pomaga mi myśleć szybciej.

I wiesz co? Odkąd go mam, publikuję regularnie. Nie dlatego, że mam więcej czasu. Dlatego, że w poniedziałek rano nie zaczynam od zera.

System nie musi być idealny. Musi działać. Ten działa. Dla mnie. I pamiętaj kążdy ma dzialać Dla Ciebie. 


