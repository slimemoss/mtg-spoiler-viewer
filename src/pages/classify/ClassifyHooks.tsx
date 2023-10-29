import * as React from 'react'
import { MtgCard } from '../../data/LTR'

const OrderdColor = ['W', 'U', 'B', 'R', 'G']

const cmpColor = (a: string[], b: string[]): number => {
  const colorOrderCmp = (a: string, b: string): number => {
    let ca = OrderdColor.indexOf(a)
    let cb = OrderdColor.indexOf(b)
    return ca - cb
  }

  const sortColor = (color: string[]): string[] => {
    return color.concat().sort((a, b) => (colorOrderCmp(a, b)))
  }

  const noColorIsBehind = (a: number): number => (a == 0 ? Number.MAX_SAFE_INTEGER : a)
  let len = noColorIsBehind(a.length) - noColorIsBehind(b.length)
  if(len != 0) { return len }

  a = sortColor(a)
  b = sortColor(b)
  for (let i = 0; i < a.length; i++) {
    let cmp = colorOrderCmp(a[i], b[i])
    if(cmp != 0) { return cmp }
  }
  return 0
}

export enum SortBy {
  number,
  cost
}

export interface Config {
  colors: Set<string>
  noColor: boolean
  land: boolean
  rarity: Set<string>
  sortby: SortBy
}
const defaultConfig: Config = {
  colors: new Set(['W']),
  noColor: false,
  land: false,
  rarity: new Set([]),
  sortby: SortBy.number
}

export interface ClassifyHooksI {
  setColor: (color: string, add: boolean) => void
  setNoColor: (v: boolean) => void
  setLand: (v: boolean) => void
  setRarity: (rarity: string, add: boolean) => void
  setSortBy: (v: SortBy) => void
  classify: (cards: MtgCard[]) => MtgCard[]
}

export const useClassify = (): [Config, ClassifyHooksI] => {
  const [config, setConfig] = React.useState<Config>(defaultConfig)

  const setColor = (color: string, add: boolean) => {
    if(add) {
      config.colors.add(color)
    } else {
      config.colors.delete(color)
    }
    setConfig({
      ...config,
      noColor: false,
      land: false
    })
  }
  const setNoColor = (v: boolean) => {    
    if(v) {
      config.colors = new Set()
    }
    setConfig({...config, noColor: v, land: false})
  }
  const setLand = (v: boolean) => {
    if(v) {
      config.colors = new Set()
    }
    setConfig({...config, land: v, noColor: false})
  }

  const setRarity = (rarity: string, add: boolean) => {
    if(add) {
      config.rarity.add(rarity)
    } else {
      config.rarity.delete(rarity)
    }
    setConfig(config)
  }
  const setSortBy = (v: SortBy) => {
    setConfig({...config, sortby: v})
  }


  const classify = (cards: MtgCard[]): MtgCard[] => {
    const sort = (cards: MtgCard[], sortby: SortBy): MtgCard[] => {
      cards = cards.concat()
      // mana
      switch (sortby) {
        case SortBy.cost:
          cards = cards.sort((a, b) => (a.manaValue - b.manaValue))
          break
        case SortBy.number:
        default:
          cards = cards.sort((a, b) => (parseInt(a.number) - parseInt(b.number)))
          break
      }
      return cards
    }

    const filter = (cards: MtgCard[], colors: Set<string>, noColor: boolean, land: boolean, rarity: Set<string>): MtgCard[] => {
      // filter color
      cards = cards.concat()
      if (noColor) {
        cards = cards.filter((c) => (!c.types.includes('Land')))
        cards = cards.filter((c) => (c.colorIdentity.length == 0))
      } else if (land){
        cards = cards.filter((c) => (c.types.includes('Land')))
      } else {
        cards = cards.filter((c) => (!c.types.includes('Land')))
        if (colors.size != 0) {
          cards = cards.filter((c) => {
            let res = true
            colors.forEach((v) => {
              res = res && c.colorIdentity.includes(v)
            })
            return res
          })
        }
      }
      // filter rarity
      if (rarity.size != 0) {
        cards = cards.filter((c) => (
          rarity.has(c.rarity)
        ))
      }
      
      return cards
    }
    // 色の数, ColorOrder の優先度でソート
    const sortByColor = (cards: MtgCard[]): MtgCard[] => {
      cards = cards.concat()
      cards = cards.sort((a, b) => (cmpColor(a.colorIdentity, b.colorIdentity)))
      return cards
    }

    cards = cards.concat()
    cards = sort(cards, config.sortby)
    cards = filter(cards, config.colors, config.noColor, config.land, config.rarity)
    cards = sortByColor(cards)
    return cards
  }

  return [config, {setColor, setNoColor, setLand, setRarity, setSortBy, classify}]
}
