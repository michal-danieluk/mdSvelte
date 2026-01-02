---
title: 'Budowa Asystenta AI w CLI (Cz. 2): Warsztat Geeka - Konfiguracja'
date: '2025-10-09'
tags: ['AI', 'Tutorial', 'Gemini CLI', 'Konfiguracja', 'Seria Asystent CLI']
description: 'Część 2 serii. Przechodzimy do praktyki: instalacja narzędzi, zdobycie kluczy API i budowa struktury katalogów, która stanie się mózgiem Twojego asystenta.'
keywords: 'Gemini API key, instalacja gemini-cli, struktura plików markdown, context-first, tutorial AI'
image_prompt: 'Close-up of a computer screen showing terminal code installation, matrix style green font, with a schematic blueprint of a folder structure overlay.'
---

## Wstęp: Czas ubrudzić sobie ręce

W [Części 1](/post/jak_zbudowac_asystenta_ai_w_cli_2025-10-08) ustaliliśmy, że przeglądarka to nienajlepsze miejsce do poważnej pracy z AI. Dzisiaj przestajemy gadać, a zaczynamy budować.

Stworzymy środowisko, w którym Twój asystent (nazwijmy go roboczo "Gienek", choć ja wolę Zofia) będzie miał dostęp do Twoich plików i kontekstu.

### Czego potrzebujesz?

1.  **Terminala.** (Terminal na macOS/Linux, PowerShell lub WSL na Windows).
2.  **Node.js.** (Środowisko uruchomieniowe dla JavaScript).
3.  **Klucza API** od Google (Gemini) lub Anthropic (Claude).
4.  **15 minut** spokoju.

---

## Krok 1: Silnik (Instalacja Narzędzia)

Nie będziemy pisać własnego klienta API od zera (chyba że bardzo chcesz, wtedy polecam Pythona). Skorzystamy z gotowych rozwiązań CLI.

Jest wiele wrapperów, ale dla uproszczenia skupimy się na ekosystemie Node.js, który ma świetne paczki.

Otwórz terminal i wpisz:

```bash
# Sprawdź czy masz Node.js
node -v
# Jeśli wyskoczy błąd, zainstaluj Node.js ze strony nodejs.org

# Instalujemy przykładowego klienta CLI (jest ich wiele, wybierz ulubiony)
# Tutaj używamy popularnego wrappera dla Gemini
npm install -g @google/gemini-cli
```

*Uwaga: Świat Open Source zmienia się szybko. Jeśli ta konkretna paczka nie działa, poszukaj na GitHubie frazy "gemini cli" lub "claude cli" i wybierz taką z największą liczbą gwiazdek.*

## Krok 2: Paliwo (Klucz API)

Sam program to tylko pusta skorupa. Potrzebuje dostępu do mózgu modelu.

1.  Wejdź na [Google AI Studio](https://aistudio.google.com/).
2.  Kliknij "Get API Key".
3.  Utwórz nowy klucz (jest darmowy do pewnego limitu, który ciężko przekroczyć osobiście).
4.  Skopiuj go. **Nikomu go nie pokazuj.**

Teraz musimy powiedzieć Twojemu terminalowi, gdzie ten klucz jest. Najlepiej dodać go do zmiennych środowiskowych.

**Na macOS/Linux:**
```bash
export GEMINI_API_KEY="twój-tajny-klucz-tutaj"
```
(Aby to zapisać na stałe, dodaj tę linię do pliku `.zshrc` lub `.bashrc`).

## Krok 3: Architektura (To Tu Dzieje Się Magia)

Teraz najważniejszy moment. Większość ludzi tutaj kończy – mają narzędzie, wpisują `gemini "cześć"` i cieszą się jak dzieci. Ale my budujemy **system**.

Stwórzmy strukturę katalogów dla Twojego projektu (np. bloga, firmy, czy nauki).

```bash
/Mój-Projekt/
├── .gemini/              # Folder na ustawienia systemowe (opcjonalnie)
├── GEMINI.md             # <--- TO JEST KLUCZ!
├── notatki/
└── projekty/
```

### Plik `GEMINI.md` - Dusza Twojego Asystenta

To jest ten moment "Context-First". W głównym katalogu projektu stwórz plik `GEMINI.md`. To instrukcja, którą asystent przeczyta **zanim** odpowie na Twoje pytanie.

Przykładowa treść `GEMINI.md`:

```markdown
# Kontekst Projektu: Mój Osobisty Blog

## Rola
Jesteś doświadczonym redaktorem i specjalistą SEO. Twoim celem jest pomaganie mi w pisaniu artykułów, które są merytoryczne, ale mają lekki, humorystyczny styl.

## Styl
- Używaj krótkich zdań.
- Unikaj korporacyjnego żargonu ("synergia", "dynamiczny rozwój").
- Bądź bezpośredni. Jeśli mój pomysł jest słaby, powiedz to.

## O Mnie
Jestem programistą, który uczy się marketingu. Lubię analogie do świata kodu.
```

## Krok 4: Pierwsze Uruchomienie

Teraz, będąc w katalogu `/Mój-Projekt`, wywołaj asystenta. Większość narzędzi CLI automatycznie szuka plików `.md` w obecnym katalogu, aby załadować kontekst (lub musisz im to wskazać flagą, np. `--context GEMINI.md` - sprawdź dokumentację swojego narzędzia).

Wpisz w terminalu:

```bash
gemini "Mam pomysł na post o kawie. Czy to pasuje do mojego bloga?"
```

Co się stanie?
1. Narzędzie przeczyta Twój prompt.
2. Narzędzie (jeśli jest dobrze skonfigurowane) doklei do niego treść `GEMINI.md`.
3. Model AI dostanie całość: "Jesteś redaktorem... Użytkownik pyta o kawę...".
4. Odpowie Ci: *"Słuchaj, jesteś programistą piszącym o marketingu. Jeśli nie połączysz tej kawy z algorytmem kofeiny w Twoim mózgu, to nikogo to nie obejdzie. Spróbujmy podejść do tego tak..."*

Widzisz różnicę? Nie musiałeś mu tłumaczyć, o czym jest blog. On to wie, bo "siedzi" w tym katalogu razem z Tobą.

## Zadanie Domowe

Zanim przejdziemy do **Części 3**, zrób to:
1.  Zainstaluj CLI.
2.  Stwórz jeden folder dla konkretnego projektu (może być "Nauka Angielskiego", "Mój Startup", cokolwiek).
3.  Napisz dla niego plik `GEMINI.md` z definicją roli i zasadami.

W następnym odcinku pokażę Ci, jak wykorzystać ten system do **automatyzacji prawdziwej pracy**: zrobimy research, napiszemy artykuł i przygotujemy posty na social media – wszystko jedną serią komend.
