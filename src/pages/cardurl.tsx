import { MtgCard } from "../data/Schema"
import { Lang } from "./toggleLang"

export const cardurl = (card: MtgCard, isFace: boolean, lang: Lang): string => {
    const backUrl = 'https://cards.scryfall.io/back.png'
    const cardLang = lang == Lang.JA ? card.language.ja : card.language.en
    const url = isFace ? cardLang.face : (cardLang.back ? cardLang.back : '')

    if (url == '') {
      return backUrl
    }
    if (url == backUrl) {
      return backUrl
    }

    const fname = url.split('/').slice(-1)[0]
    return './dist/image/card/' + encodeURIComponent(fname)
  }
