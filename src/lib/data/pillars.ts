export const pillarSlugs = ['seo', 'google-ads', 'meta-ads', 'marketing'] as const

export type PillarSlug = (typeof pillarSlugs)[number]

export type LearningStep = {
  label: string
  title: string
  description: string
  articleSlug: string
}

export type PillarConfig = {
  slug: PillarSlug
  name: string
  eyebrow: string
  seoTitle: string
  metaDescription: string
  title: string
  accent: string
  promise: string
  introduction: string
  learningPath: LearningStep[]
  moreArticleSlugs: string[]
}

export const pillars: Record<PillarSlug, PillarConfig> = {
  seo: {
    slug: 'seo',
    name: 'SEO',
    eyebrow: 'Przewodnik po SEO',
    seoTitle: 'SEO od podstaw: praktyczny przewodnik dla małej firmy | Michał Danieluk',
    metaDescription:
      'Zrozum SEO bez branżowego żargonu. Przejdź od mechaniki Google przez audyt i treści po ocenę efektów pozycjonowania swojej strony.',
    title: 'SEO, które da się',
    accent: 'zrozumieć i sprawdzić',
    promise:
      'Przejdziesz przez cztery filary: treści, audyt, mechanikę pozycjonowania oraz koszty SEO dla małej firmy.',
    introduction:
      'Pozycjonowanie nie zaczyna się od listy stu słów kluczowych. Zaczyna się od strony, którą robot Google może znaleźć, człowiek chce przeczytać, a właściciel firmy potrafi ocenić. Ta ścieżka układa najważniejsze elementy we właściwej kolejności.',
    learningPath: [
      {
        label: 'Filar A · Content i copywriting',
        title: 'Twórz treści, które odpowiadają na pytania',
        description:
          'Połącz intencję wyszukiwania z pomocnym tekstem. To moment, w którym strategia SEO zaczyna pracować na realny ruch.',
        articleSlug: 'content-marketing-i-seo-copywriting_2026-07-18'
      },
      {
        label: 'Filar B · Audyt i narzędzia',
        title: 'Zrób audyt własnej strony',
        description:
          'Przejdź przez technikę, treść i linki darmowymi narzędziami. Wyniki zamień w krótką, priorytetyzowaną listę działań.',
        articleSlug: 'jak-zrobic-audyt-seo_2026-07-19'
      },
      {
        label: 'Filar C · Podstawy',
        title: 'Zobacz, jak działa Google',
        description:
          'Crawling, indeksacja i ranking to trzy różne etapy. Ich rozróżnienie pozwala diagnozować problemy zamiast zgadywać.',
        articleSlug: 'jak-dziala-pozycjonowanie-stron_2026-07-20'
      },
      {
        label: 'Filar D · Mała firma i finanse',
        title: 'Policz koszt i oceń ofertę',
        description:
          'Poznaj realne widełki, składniki ceny i specyfikę lokalnego SEO, zanim podpiszesz długą umowę lub odrzucisz dobrą inwestycję.',
        articleSlug: 'ile-kosztuje-pozycjonowanie-strony_2026-07-17'
      }
    ],
    moreArticleSlugs: [
      'jak-sprawdzic-agencje-seo_2026-07-15',
      'partyzanckie_seo_2025-10-03',
      'jak_sprawic_by_ai_polecalo_twoja_strone_2025-10-03'
    ]
  },
  'google-ads': {
    slug: 'google-ads',
    name: 'Google Ads',
    eyebrow: 'Przewodnik po Google Ads',
    seoTitle: 'Google Ads od zera: kampanie bez przepalania budżetu | Michał Danieluk',
    metaDescription:
      'Naucz się planować i kontrolować Google Ads: od ustawienia kampanii przez wynik jakości po samodzielną ocenę wydatków i pracy agencji.',
    title: 'Google Ads bez',
    accent: 'przepalania budżetu',
    promise:
      'Ułożysz pierwszą kampanię, zrozumiesz co wpływa na cenę kliknięcia i nauczysz się kontrolować konto bez bycia specjalistą.',
    introduction:
      'Google Ads potrafi szybko dostarczyć klientów, ale równie szybko zamienia błędne decyzje w rachunek. Dobra kampania łączy intencję użytkownika, klarowną reklamę, właściwą stronę docelową i pomiar. Poniżej przechodzimy przez ten system krok po kroku.',
    learningPath: [
      {
        label: '01 · Zbuduj podstawy',
        title: 'Ustaw kampanię od zera',
        description:
          'Zacznij od celu, struktury i słów kluczowych. Dopiero później przejdź do stawek, reklam i uruchomienia budżetu.',
        articleSlug: 'jak-ustawic-kampanie-google-ads_2026-04-14'
      },
      {
        label: '02 · Płać za jakość',
        title: 'Zrozum wynik jakości',
        description:
          'Trafność reklamy i doświadczenie strony docelowej wpływają na koszt. Naucz się poprawiać je jako jeden system.',
        articleSlug: 'wynik-jakosci-google-ads_2026-04-10'
      },
      {
        label: '03 · Zamknij wycieki',
        title: 'Znajdź miejsca, które zjadają budżet',
        description:
          'Sprawdź powtarzalne błędy małych kont i ustaw prostą rutynę kontroli, zanim zaczniesz zwiększać wydatki.',
        articleSlug: 'google-ads-bledy-mala-firma_2026-03-30'
      }
    ],
    moreArticleSlugs: [
      'jak-sprawdzic-kampanie-google-ads_2026-04-01',
      'jak-wybrac-agencje-google-ads_2026-04-03',
      'jak-dlugo-czekac-na-efekty-marketingu_2026-07-02'
    ]
  },
  'meta-ads': {
    slug: 'meta-ads',
    name: 'Meta Ads',
    eyebrow: 'Przewodnik po Meta Ads',
    seoTitle: 'Meta Ads dla małej firmy: kontrola kampanii i budżetu | Michał Danieluk',
    metaDescription:
      'Praktyczny przewodnik po Meta Ads dla małej firmy: zaplanuj budżet, kontroluj kampanie na Facebooku i Instagramie oraz rozliczaj agencję.',
    title: 'Meta Ads bez',
    accent: 'kupowania pustych zasięgów',
    promise:
      'Nauczysz się patrzeć dalej niż na kliknięcia: zaplanujesz budżet, sprawdzisz kondycję kampanii i odzyskasz kontrolę nad pracą agencji.',
    introduction:
      'Meta Ads nie odpowiada na gotowy popyt tak jak wyszukiwarka. Reklama musi najpierw zatrzymać scrollowanie, zbudować zainteresowanie i dopiero później skłonić do działania. Dlatego liczą się kreacja, częstotliwość, jakość odbiorców i pomiar — nie sam zasięg z raportu.',
    learningPath: [
      {
        label: '01 · Zaplanuj inwestycję',
        title: 'Ustal budżet w kontekście całego marketingu',
        description:
          'Poznaj realne koszty prowadzenia reklam i oddziel wynagrodzenie za obsługę od budżetu, który trafia do systemu Meta.',
        articleSlug: 'ile-kosztuje-marketing-malej-firmy_2026-07-15'
      },
      {
        label: '02 · Kontroluj kampanię',
        title: 'Sprawdź cztery metryki, których nie warto ignorować',
        description:
          'Częstotliwość, CPM, ranking jakości i nakładanie grup odbiorców pokażą, czy kampania nadal pracuje, czy tylko wydaje pieniądze.',
        articleSlug: 'jak-sprawdzic-kampanie-meta-ads_2026-04-17'
      },
      {
        label: '03 · Rozliczaj współpracę',
        title: 'Rozpoznaj czerwone flagi agencji',
        description:
          'Zadbaj o własność konta, dostęp do danych i jasne zasady raportowania, zanim brak kontroli stanie się kosztownym problemem.',
        articleSlug: 'czerwone-flagi-agencja-marketingowa_2026-07-15'
      }
    ],
    moreArticleSlugs: [
      '5-kontrintuicyjnych-lekcji-marktingowych',
      'jak-dlugo-czekac-na-efekty-marketingu_2026-07-02',
      'jak-sprawdzic-kampanie-google-ads_2026-04-01'
    ]
  },
  marketing: {
    slug: 'marketing',
    name: 'Marketing',
    eyebrow: 'Przewodnik po marketingu',
    seoTitle: 'Marketing małej firmy: strategia, koszty i realne efekty | Michał Danieluk',
    metaDescription:
      'Praktyczny marketing małej firmy: wybierz właściwe kanały, poznaj realne koszty i terminy oraz podejmuj decyzje bez agencyjnych obietnic.',
    title: 'Marketing, który wspiera',
    accent: 'decyzje biznesowe',
    promise:
      'Wybierzesz kanały odpowiednie do etapu firmy, ustawisz realistyczny budżet i ocenisz pracę marketingu przez pryzmat biznesu.',
    introduction:
      'Marketing nie jest pojedynczą kampanią ani zestawem postów. To system: komu pomagasz, dlaczego ktoś ma wybrać właśnie Ciebie, gdzie docierasz z tą obietnicą i jak mierzysz rezultat. Ten przewodnik pomaga ułożyć decyzje przed wyborem narzędzi.',
    learningPath: [
      {
        label: '01 · Ustaw oczekiwania',
        title: 'Poznaj realny czas do efektów',
        description:
          'SEO, reklamy i e-mail pracują w innym tempie. Dopasuj kanał do momentu, w którym firma potrzebuje rezultatu.',
        articleSlug: 'jak-dlugo-czekac-na-efekty-marketingu_2026-07-02'
      },
      {
        label: '02 · Policz inwestycję',
        title: 'Zaplanuj realistyczny budżet',
        description:
          'Porównaj koszty kanałów i zobacz, za co faktycznie płacisz. Budżet ma wynikać z celu, nie z przypadkowej oferty.',
        articleSlug: 'ile-kosztuje-marketing-malej-firmy_2026-07-15'
      },
      {
        label: '03 · Zbuduj aktywa',
        title: 'Połącz content z wyszukiwaniem',
        description:
          'Twórz materiały, które rozwiązują problemy klientów i pracują dłużej niż pojedyncza kampania promocyjna.',
        articleSlug: 'content-marketing-i-seo-copywriting_2026-07-18'
      }
    ],
    moreArticleSlugs: [
      'czerwone-flagi-agencja-marketingowa_2026-07-15',
      '5-kontrintuicyjnych-lekcji-marktingowych',
      'narzedzia-ai-ktorych-naprawde-uzywam_2025-11-15'
    ]
  }
}

export function isPillarSlug(value: string): value is PillarSlug {
  return pillarSlugs.includes(value as PillarSlug)
}

export function getPillar(slug: PillarSlug): PillarConfig {
  return pillars[slug]
}

export function getRelatedPillars(slug: PillarSlug): PillarConfig[] {
  return pillarSlugs
    .filter((candidate) => candidate !== slug)
    .map((candidate) => pillars[candidate])
}

export function getPillarArticleSlugs(pillar: PillarConfig): string[] {
  return [...pillar.learningPath.map((step) => step.articleSlug), ...pillar.moreArticleSlugs]
}
