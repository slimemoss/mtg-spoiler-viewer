export interface MtgCard {
  colors: string[],
  manaValue: number,
  rarity: string,
  jname: string,
  imageurl: string,
  number: string
}

declare module '~/data/LTR.json' {
  const data: MtgCard;
  export default data;
}
