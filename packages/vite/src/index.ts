import { UnunuraViteOptions } from 'ununura-shared'
import type { Plugin } from 'vite'
import CORE from './plugins/core'
import EXTERNAL_FONTAINE from './plugins/fontaine'

export const ununura = (options: UnunuraViteOptions = {}): Plugin[] => {
  return [CORE(options), EXTERNAL_FONTAINE] as Plugin[]
}
