# Konfiguracja Projektu: mdSvelte-blog

## Stos technologiczny
- **Framework:** Svelte 5 + SvelteKit 2 + Vite 7.
- **Stylizacja:** Tailwind CSS 4.
- **Adapter:** `@sveltejs/adapter-vercel` (wymaga Node.js >= 20).
- **Zależności:** Ze względu na konflikty peer dependencies (Vite 7), używaj flagi `--legacy-peer-deps` przy instalacji paczek.

## Design & UX (Styl: Indigo-Zinc)
- **Paleta:** Profesjonalna, techniczna. Tła: `Zinc-50` (Light) / `Zinc-950` (Dark). Akcenty: `Indigo-500/600`.
- **Typografia:** Nagłówki `font-black`, tracking-tight.
- **Szerokość posta:** Na desktopie `max-w-3xl` dla głównej treści, kontener zewnętrzny `max-w-6xl` (aby pomieścić sticky ToC).
- **Dark Mode:** Naprawione miganie (FOUC) skryptem blokującym w `app.html`.

## Kluczowe Funkcjonalności
- **Wyszukiwarka:** Komponent `Search.svelte` (skrót Cmd+K, live search przez `/api/posts.json`).
- **Podobne wpisy:** Sekcja "Może Cię zainteresować" dobierana automatycznie po tagach (z fallbackiem na najnowsze).
- **Udostępnianie:** Komponent `ShareButtons.svelte` (LinkedIn, X, kopiowanie linku).
- **Kontakt:** Brak formularza serwerowego. Używamy bezpośredniego linku `mailto:michal@danieluk.pl`.

## Wytyczne dla AI
- **Git:** Commituj po każdej logicznej zmianie (użytkownik to uwielbia).
- **Tagi:** Trzymaj spójność (Wielka litera, np. 'Marketing', 'AI', 'SvelteKit').
- **Styl:** Unikaj ciepłych kolorów (Amber/Orange). Trzymaj się Indigo-Zinc dla spójności marki "Premium SaaS".
