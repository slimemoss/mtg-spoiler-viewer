interface LanguageElem {
  name: string,
  face: string,
  back: string | null
}

interface Language {
  ja: LanguageElem
  en: LanguageElem
}

export interface MtgCard {
  language: Language,
  mana_cost: string | null,
  color_identity: string[],
  rarity: string,
  power: string | null,
  toughness: string | null,
  collector_number: string,
  type_line: string,
  layout: string
}
