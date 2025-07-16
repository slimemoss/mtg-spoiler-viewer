import * as React from 'react'
import { MtgCard } from '../../data/Schema'

export enum SortBy {
  ID,
  Color
}
export interface Config {
  rarity: Set<string>
  sortBy: SortBy
}
const defaultConfig: Config = {
  rarity: new Set([]),
  sortBy: SortBy.ID
}

export interface ClassifyHooksI {
  setRarity: (rarity: string, add: boolean) => void
  setSort: (method: SortBy) => void
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

  const setSort = (method: SortBy) => {
    setConfig({
      ...config,
      sortBy: method
    })
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
        color_identity: [],
        mana_cost: null,
        rarity: '',
        collector_number: '',
        power: null,
        toughness: null,
        type_line: '',
	language: {
	  ja: {
	    name: '',
	    face: 'https://cards.scryfall.io/back.png',
	    back: null,
	  },
	  en: {
	    name: '',
	    face: 'https://cards.scryfall.io/back.png',
	    back: null,
	  }
	},
	layout: ''
      }

      const maxNumber = Math.min(Math.max(...cards.map(c => parseInt(c.collector_number))), 271)

      const idx = [...Array(maxNumber).keys()]
      const res: MtgCard[] = idx.map(i => {
        const org = cards.filter(c => parseInt(c.collector_number) == i + 1)
        if(org.length != 0) {
          return org[0]
        } else {
          const number = (i+1).toString()
          return {...defaultMtgCard, number}
        }
      })

      return res
    }

    // シングル -> マルチ -> 無色 -> 土地
    const sortByColor = (cards: MtgCard[]): MtgCard[] => {
      const colorOrder = ['W', 'U', 'B', 'R', 'G']
      const prio = (card: MtgCard): number => {
        var res = 0
        if(card.type_line.includes('Land')) { res += 10000 }
        if(card.color_identity.length == 0) { res += 5000 }
        if(card.color_identity.length > 2) { res += 2000 }
        if(card.color_identity.length > 1) { res += 1000 }
        card.color_identity.map(color => {
          res += colorOrder.indexOf(color) ** 3
        })

        return res
      }
      return cards.sort((a, b) => {
        return prio(a) - prio(b)
      })
    }

    const sortByID = (cards: MtgCard[]): MtgCard[] => {
      return cards
    }

    const sort = (cards: MtgCard[], sortMethod: SortBy): MtgCard[] => {
      switch (sortMethod) {
        case SortBy.Color:
          return sortByColor(cards)
      }
      return sortByID(cards)
    }

    cards = cards.concat()
    cards = fillEmpty(cards)
    cards = filter(cards, config.rarity)
    cards = sort(cards, config.sortBy)
    return cards
  }

  return [config, {setRarity, setSort, classify}]
}
