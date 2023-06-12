import * as React from 'react'
import { Form } from 'react-bootstrap'
import { MtgCard } from '../data/LTR'

import CardData from '../data/LTR.json'

export const Page = () => {
  const [shown, setShown] = React.useState<MtgCard[]>([])

  const [colors, setColors]  = React.useState<Set<string>>(new Set(["W"]))
  const [rarity, setRarity] = React.useState<Set<string>>(new Set(["common"]))

  const sort = (cards: MtgCard[]): MtgCard[] => {
    // mana
    cards = cards.sort((a, b) => (a.manaValue - b.manaValue))

    return cards
  }

  const filter = (cards: MtgCard[], colors: Set<string>, rarity: Set<string>): MtgCard[] => {
    // color
    if (colors.size != 0) {
      cards = cards.filter((c) => {
        let res = colors.size == c.colors.length
        colors.forEach((v) => {
          res = res && c.colors.includes(v)
        })
        return res
      })
    }

    // rarity
    if (rarity.size != 0) {
      cards = cards.filter((c) => (
        rarity.has(c.rarity)
      ))
    }

    return cards
  }

  React.useEffect(() => {
    let c = sort(CardData)
    c = filter(c, colors, rarity)
    setShown(c)
  }, [colors, rarity])

  return <>
    <Form>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
        <Form.Label>レアリティ</Form.Label>
        {[["common", "C"], ["uncommon", "U"], ["rare", "R"], ["mythic", "M"]].map((v, i) => (
          <Form.Check
            key={i} type="checkbox" label={v[1]} checked={rarity.has(v[0])}
            onChange={(e) => {
              let res = new Set(rarity)
              if (e.target.checked) {
                res.add(v[0])
              } else {
                res.delete(v[0])
              }
              setRarity(res)
            }}
          />
        ))}
      </div>
    </Form>
    <Form>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
        <Form.Label>色</Form.Label>
        {[["W", "W"], ["U", "U"], ["B", "B"], ["R", "R"], ["G", "G"]].map((v, i) => (
          <Form.Check
            key={i} type="checkbox" label={v[1]} checked={colors.has(v[0])}
            onChange={(e) => {
              let res = new Set(colors)
              if (e.target.checked) {
                res.add(v[0])
              } else {
                res.delete(v[0])
              }
              setColors(res)
            }}
          />
        ))}
      </div>
    </Form>

    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {
        shown.map((card, i) => (
          <div key={i}>
            <img src={card.imageurl} height={512}/>
          </div>
        ))
      }
    </div> 
  </>
}
