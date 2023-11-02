import * as React from 'react'
import { MtgCard } from '../../data/LTR'

export interface Config {
  rarity: Set<string>
}
const defaultConfig: Config = {
  rarity: new Set([]),
}

export interface ClassifyHooksI {
  setRarity: (rarity: string, add: boolean) => void
  classify: (cards: MtgCard[]) => MtgCard[]
}

export const useClassify = (): [Config, ClassifyHooksI] => {
  const [config, setConfig] = React.useState<Config>(defaultConfig)

  const setRarity = (rarity: string, add: boolean) => {
    if(add) {
      config.rarity.add(rarity)
    } else {
      config.rarity.delete(rarity)
    }
    setConfig({...config})
  }

  const classify = (cards: MtgCard[]): MtgCard[] => {
    const filter = (cards: MtgCard[], rarity: Set<string>): MtgCard[] => {
      // filter rarity
      if (rarity.size != 0) {
        cards = cards.filter((c) => (
          rarity.has(c.rarity)
        ))
      }
      return cards
    }
    const fillEmpty = (cards: MtgCard[]): MtgCard[] => {
      const defaultMtgCard: MtgCard = {
        colorIdentity: [],
        manaValue: 0,
        rarity: '',
        number: '',
        types: [],
        jname: '',
        imageurl: 'https://i.imgur.com/cI9uGt2.jpeg',
        backimageurl: null,
      }

      const maxNumber = Math.max(...cards.map(c => parseInt(c.number)))

      const idx = [...Array(maxNumber).keys()]
      const res: MtgCard[] = idx.map(i => {
        const org = cards.filter(c => parseInt(c.number) == i + 1)
        if(org.length != 0) {
          return org[0]
        } else {
          const number = (i+1).toString()
          return {...defaultMtgCard, number}
        }
      })

      return res
    }

    cards = cards.concat()
    cards = fillEmpty(cards)
    cards = filter(cards, config.rarity)
    return cards
  }

  return [config, {setRarity, classify}]
}
