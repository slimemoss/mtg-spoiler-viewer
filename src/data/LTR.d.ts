export interface MtgCard {
  colorIdentity: string[],
  manaValue: number,
  rarity: string,
  number: string,
  types: string[],
  jname: string,
  imageurl: string,
  backimageurl?: string | null,
}

declare module '~/data/LTR.json' {
  const data: MtgCard;
  export default data;
}
