export interface MtgCard {
  colorIdentity: string[],
  manaValue: number,
  rarity: string,
  jname: string,
  imageurl: string,
  number: string,
  types: string[]
}

declare module '~/data/LTR.json' {
  const data: MtgCard;
  export default data;
}
