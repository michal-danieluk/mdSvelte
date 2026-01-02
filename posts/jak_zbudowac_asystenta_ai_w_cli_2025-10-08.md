---
title: 'Budowa Asystenta AI w CLI (Cz. 1): Dlaczego przeglądarka Cię ogranicza?'
date: '2025-10-08'
tags: ['AI', 'Filozofia Pracy', 'Produktywność', 'Deep Work', 'Seria Asystent CLI']
description: 'Część 1 serii o budowie osobistego asystenta AI. Dowiedz się, dlaczego kopiowanie promptów do ChatGPT to ślepa uliczka i czym jest podejście "Context-First".'
keywords: 'AI w terminalu, Gemini, Claude, context-first, deep work, automatyzacja pracy, asystent osobisty'
image_prompt: 'A split screen illustration: left side chaotic web browser tabs with a stressed stick figure, right side clean black terminal window with a calm stick figure and a glowing brain icon.'
---

## Wstęp: Jesteś ludzkim routerem API

Zacznijmy od brutalnej prawdy. Jeśli Twoja praca z AI polega na tym, że masz otwartego ChataGPT w jednej karcie, Claude'a w drugiej, a Google Docs w trzeciej – robisz to źle.

Jesteś wtedy tylko **ludzkim interfejsem do kopiowania i wklejania**.
1. Kopiujesz tekst z maila.
2. Wklejasz do AI: "Odpisz na to grzecznie".
3. Kopiujesz wynik.
4. Wklejasz do maila.

To nie jest "współpraca z AI". To jest manualna manufaktura. W tej serii artykułów pokażę Ci, jak przestać być robotnikiem na taśmie produkcyjnej promptów, a stać się architektem systemu.

**Witaj w serii "Budowa Asystenta AI w CLI".**
W trzech częściach przejdziemy drogę od chaosu w przeglądarce do własnego, spersonalizowanego Jarvis'a w terminalu.

*   **Część 1 (To czytasz):** Dlaczego terminal i pliki tekstowe to przyszłość pracy z AI?
*   **[Część 2 (Już dostępna): Warsztat Geeka](/post/jak_zbudowac_asystenta_ai_w_cli_cz2_warsztat_2025-10-09)** – instalacja, konfiguracja i struktura plików.
*   **Część 3 (Wkrótce):** Workflow w praktyce – automatyzacja, research i pisanie.

---

## Problem: Kontekst to Król (który jest nagi)

Modele AI są dzisiaj genialne. Gemini 1.5 Pro czy Claude 3.5 Sonnet to potężne mózgi. Ale mózg bez pamięci i kontekstu jest bezużyteczny.

Kiedy otwierasz "Nowy czat" w przeglądarce, dostajesz genialnego stażystę, który... ma amnezję. Nie wie kim jesteś. Nie wie, nad czym pracujesz. Nie zna Twojego stylu. Musisz mu to wszystko tłumaczyć w każdym prompcie.

Marnujesz czas na ustawianie sceny ("Jesteś ekspertem SEO..."), zamiast na granie sztuki.

## Rozwiązanie: File-Based Context (Kontekst Oparty na Plikach)

Wyobraź sobie, że wchodzisz do pokoju (folderu na dysku) o nazwie `PROJEKT_X`. W tym pokoju na ścianie wisi kartka z zasadami: "Tu mówimy krótko, używamy Pythona i nie lubimy marketingu".

Wchodzisz do pokoju obok (`PROJEKT_Y`), a tam inna kartka: "Tu jesteśmy kreatywni, piszemy posty na LinkedIn i używamy dużej ilości emoji".

Twój asystent AI powinien działać tak samo.

### Jak to działa w praktyce?

Zamiast konfigurować "Custom Instructions" w ustawieniach konta (które są globalne i sztywne), trzymamy instrukcje w plikach tekstowych (Markdown) bezpośrednio w folderach z naszymi projektami.

*   Pracujesz nad blogiem? W folderze `/blog` leży plik `GEMINI.md`, który mówi asystentowi: *"Jesteś redaktorem. Pilnuj mojego stylu pisania (link do przykładów)"*.
*   Kodujesz? W folderze `/kod` leży plik, który mówi: *"Jesteś Senior Dev'em. Zwracaj uwagę na czystość kodu i bezpieczeństwo"*.

To podejście nazywam **Context-First**. Nie Ty idziesz do AI z kontekstem. To AI przychodzi do Twojego kontekstu.

## Dlaczego Terminal (CLI)?

*"Ale Zofia, terminal jest brzydki i trudny!"*

Może. Ale jest też:
1.  **Szybki.** Otwarcie terminala i wpisanie komendy trwa 0.5 sekundy. Załadowanie interfejsu webowego ChatGPT potrafi trwać wieki.
2.  **Skupiony (Deep Work).** Przeglądarka to świątynia rozproszenia. Powiadomienia, zakładki, kuszący YouTube. Terminal to czysta, czarna pustka. Tylko Ty i Twój tekst.
3.  **Łączliwy.** W terminalu możesz łączyć klocki. Możesz kazać AI przeczytać plik, poprawić go, a wynik zapisać od razu jako nowy plik. Bez dotykania myszki.

## Co zyskasz budując taki system?

Nie obiecuję Ci gruszek na wierzbie. To wymaga zmiany nawyków. Ale jeśli przejdziesz tę drogę, zyskasz:

*   **Pamięć idealną:** Twój asystent będzie pamiętał wszystko, co zapiszesz w plikach projektu.
*   **Spójność:** Każdy tekst, kod czy mail będzie brzmiał tak, jak Ty tego chcesz, bez ciągłego poprawiania.
*   **Ochronę prywatności:** Twoje dane (w dużej mierze) zostają lokalnie, wysyłasz tylko to, co musisz.

## Co dalej?

W tej części chciałam zasiać w Twojej głowie ziarno niepewności. Czy na pewno obecny sposób pracy z AI jest optymalny? Jeśli czujesz, że marnujesz potencjał modeli przez kiepski interfejs – zapraszam do **[Części 2 (Już dostępna): Warsztat Geeka](/post/jak_zbudowac_asystenta_ai_w_cli_cz2_warsztat_2025-10-09)**.

W kolejnym wpisie ubrudzimy sobie ręce. Pokażę Ci krok po kroku:
1.  Jak zainstalować niezbędne narzędzia.
2.  Jak stworzyć strukturę katalogów ("Mózg" asystenta).
3.  Jak napisać swój pierwszy plik kontekstowy `GEMINI.md`.

Wyciągaj klawiaturę. Będzie się działo.
