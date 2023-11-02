import * as React from 'react'
import { Helmet } from "react-helmet"

import { MtgCard } from '../data/LTR'
import { Card } from './Card'
import { Classify } from './classify/Classify'
import { useClassify } from './classify/ClassifyHooks'

interface Props {
  data: MtgCard[]
  setName: string
}
export const Page = (props: Props) => {
  const [config, classifyHooks] = useClassify()
  const [shown, setShown] = React.useState<MtgCard[]>([])

  React.useEffect(() => {
    let c = classifyHooks.classify(props.data)
    setShown(c)
  }, [config, props.data])

  return (<>
    <Helmet
      title={props.setName + ' カードギャラリー | slimemoss'}
    />
    
    <Classify config={config} hooks={classifyHooks}/>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(300px, 1fr))'}}>
      {shown.map((card, i) => (
        <div key={i} style={{margin: '0.2rem'}}>
          <Card card={card}/>
        </div>
      ))}
    </div> 
  </>)
}
