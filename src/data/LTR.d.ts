export interface MtgCard {
  colorIdentity: string[],
  manaValue: number,
  rarity: string,
  number: string,
  power: string | null,
  toughness: string | null,
  types: string[],
  jname: string,
  imageurl: string,
  backimageurl?: string | null,
  layout?: string | null
}

