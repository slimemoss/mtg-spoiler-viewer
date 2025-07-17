import * as React from 'react'
import { Alert, ButtonGroup, Form, ToggleButton } from 'react-bootstrap'

export enum Lang {
  JA,
  EN
}

const ToggleLang = (props: {toggleLang: ToggleLangI, hooks: ToggleLangHooksI}) => {
  const {toggleLang, hooks} = props
  const radios = [
    { name: 'JA', value: Lang.JA },
    { name: 'EN', value: Lang.EN }
  ]

  return (
    <div>
      <Form>
	<Form.Label>言語切り替え</Form.Label>
	<div className="d-flex">
	  <Form.Check
            type="switch"
            label=""
            checked={toggleLang.clickToSwitch}
            onChange={e => hooks.setClickToSwitch(e.target.checked)}
          />

	  <div hidden={!toggleLang.clickToSwitch}>
	    <ButtonGroup style={{ marginRight: '12px' }}>
	      {radios.map((radio, idx) => (
		<ToggleButton
		  key={idx}
		  id={`radio-${idx}`}
		  type="radio"
		  variant={'outline-info'}
		  size="sm"
		  name="radio"
		  value={radio.value}
		  checked={toggleLang.lang === radio.value}
		  onChange={(e) => hooks.setLang(Number(e.currentTarget.value) as Lang)}
		>
		  {radio.name}
		</ToggleButton>
	      ))}
	    </ButtonGroup>
	    画像クリックでも言語切り替えできます。
	  </div>
	</div>
      </Form>
    </div>
  )
}


export interface ToggleLangI {
  clickToSwitch: boolean
  lang: Lang
}
export interface ToggleLangHooksI {
  setLang: (lang: Lang) => void
  setClickToSwitch: (v: boolean) => void
}
export const useToggleLang = () => {
  const [lang, setLang] = React.useState<Lang>(Lang.JA)
  const [clickToSwitch, setClickToSwitch] = React.useState<boolean>(false)

  const toggleLang: ToggleLangI = {
    lang, clickToSwitch
  }

  const toggleLangHooks: ToggleLangHooksI = {
    setLang, setClickToSwitch
  }

  return {ToggleLang, toggleLang, toggleLangHooks}
}
