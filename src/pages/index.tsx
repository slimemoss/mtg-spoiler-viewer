import * as React from 'react'
import { Form } from 'react-bootstrap'
import { MtgCard } from '../data/LTR'

enum SortBy {
  number,
  cost
}

const ColorOrder = ['W', 'U', 'B', 'R', 'G']

const cmpColor = (a: string[], b: string[]): number => {
  const colorOrderCmp = (a: string, b: string): number => {
    let ca = ColorOrder.indexOf(a)
    let cb = ColorOrder.indexOf(b)
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

interface Props {
  data: MtgCard[]
}
export const Page = (props: Props) => {
  const [shown, setShown] = React.useState<MtgCard[]>([])

  const [colors, setColors]  = React.useState<Set<string>>(new Set(["W"]))
  const [noColor, setNoColor] = React.useState<boolean>(false)
  const [rarity, setRarity] = React.useState<Set<string>>(new Set([]))
  const [sortby, setSortBy] = React.useState<SortBy>(SortBy.number)

  const sort = (cards: MtgCard[]): MtgCard[] => {
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

  // 色の数, ColorOrder の優先度でソート
  const sortByColor = (cards: MtgCard[]): MtgCard[] => {
    cards = cards.concat()
    cards = cards.sort((a, b) => (cmpColor(a.colors, b.colors)))
    return cards
  }

  const filter = (cards: MtgCard[], colors: Set<string>, noColor: boolean, rarity: Set<string>): MtgCard[] => {
    // color
    cards = cards.concat()
    if (noColor) {
      cards = cards.filter((c) => (c.colors.length == 0))
    } else {
      if (colors.size != 0) {
        cards = cards.filter((c) => {
          let res = true
          colors.forEach((v) => {
            res = res && c.colors.includes(v)
          })
          return res
        })
      }
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
    let c = sort(props.data)
    c = filter(c, colors, noColor, rarity)
    c = sortByColor(c)
    setShown(c)
  }, [colors, noColor, rarity, sortby, props.data])

  return (<>
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
                setNoColor(false)
                res.add(v[0])
              } else {
                res.delete(v[0])
              }
              setColors(res)
            }}
          />
        ))}
        <Form.Check type="checkbox" label="無色" checked={noColor} onChange={(e) => {
          if(e.target.checked) {setColors(new Set<string>())}
          setNoColor(e.target.checked)}
        } />
      </div>
    </Form>
    <Form>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
        <Form.Label>ソート</Form.Label>
        <Form.Check
          checked={sortby == SortBy.number}
          onChange={(e) => {
            console.log(e)
            setSortBy(SortBy.number)
          }}
          label="ID"
          name="sortby"
          type="radio"
        />
        <Form.Check
          checked={sortby == SortBy.cost}
          onChange={(e) => {
            setSortBy(SortBy.cost)
            console.log(e)
          }}
          label="Mana"
          name="sortby"
          type="radio"
        />
      </div>
    </Form>

    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {
        shown.map((card, i) => (
          <div key={i} style={{margin: '0.2rem'}}>
            <img src={card.imageurl} height={512} loading="lazy"/>
            <div style={{textAlign: 'center'}}>{card.jname}</div>
          </div>
        ))
      }
    </div> 
  </>)
}
