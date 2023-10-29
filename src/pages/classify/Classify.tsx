import * as React from 'react'

import { Form } from 'react-bootstrap'
import { ClassifyHooksI, Config } from './ClassifyHooks'

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
  </>
}
