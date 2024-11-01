import * as React from 'react'

import { Form } from 'react-bootstrap'
import { ClassifyHooksI, Config, SortBy } from './ClassifyHooks'

interface Props {
  config: Config
  hooks: ClassifyHooksI
}
export const Classify = (props: Props) => {
  const config = props.config
  const hooks = props.hooks

  const sortbylist: [SortBy, string][] = [[SortBy.ID, "id"], [SortBy.Color, "color"]]

  return (
    <div>
      <Form>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
          <Form.Label>レアリティ</Form.Label>
          {[["common", "C"], ["uncommon", "U"], ["rare", "R"], ["mythic", "M"]].map((v, i) => (
            <Form.Check
            key={i} type="checkbox" label={v[1]} checked={config.rarity.has(v[0])}
            onChange={(e) => hooks.setRarity(v[0], e.target.checked)}
            />
          ))}
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
          <Form.Label>ソート</Form.Label>
          {sortbylist.map((v, i) => (
            <Form.Check
            key={i} type="radio" label={v[1]}
            checked={config.sortBy == v[0]}
            onChange={(e) => {
              console.log(v)
              console.log(e.target.value)
              if(e.target.value == "on"){hooks.setSort(v[0])}
            }}
            />
          ))}
        </div>

      </Form>
    </div>
  )
}
