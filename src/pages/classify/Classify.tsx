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

  return <>
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
    </Form>
    <Form>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
        <Form.Label>色</Form.Label>
        {[["W", "W"], ["U", "U"], ["B", "B"], ["R", "R"], ["G", "G"]].map((v, i) => (
          <Form.Check
            key={i} type="checkbox" label={v[1]} checked={config.colors.has(v[0])}
            onChange={(e) => hooks.setColor(v[0], e.target.checked)}
          />
        ))}
        <Form.Check type="checkbox" label="無色" checked={config.noColor}
                    onChange={(e) => hooks.setNoColor(e.target.checked)} />
        <Form.Check type="checkbox" label="土地" checked={config.land}
                    onChange={(e) => hooks.setLand(e.target.checked)} />
      </div>
    </Form>

    <Form>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
        <Form.Label>ソート</Form.Label>
        <Form.Check
          checked={config.sortby == SortBy.number}
          onChange={() => hooks.setSortBy(SortBy.number)}
          label="ID" name="sortby" type="radio"
        />
        <Form.Check
          checked={config.sortby == SortBy.cost}
          onChange={() => hooks.setSortBy(SortBy.cost)}
          label="Mana" name="sortby" type="radio"
        />
      </div>
    </Form>
  </>
}
