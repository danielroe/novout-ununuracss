import { CSSInject, UnunuraCoreOptions, STANDARD_EXCLUDE_SCAN, STANDARD_INCLUDE_SCAN, VueSFC } from 'ununura-shared'
import { classesFromRawHtml, generateCss } from './ast'
import { scan } from './scanner'
import { lex } from './lexer'
import { purgeOnlyCssClassTitle } from './purge'
import { getGlobals } from './globals'

export const UnunuraGlobalGenerate = async (options?: UnunuraCoreOptions): Promise<CSSInject> => {
  const files = await scan({
    include: options?.include ?? STANDARD_INCLUDE_SCAN,
    exclude: options?.exclude ?? STANDARD_EXCLUDE_SCAN,
  })

  return getGlobals(files)
}

export const UnunuraVueSFCFile = (sfc: VueSFC): CSSInject => {
  const scopedBuffer: string[] = []
  const raw = classesFromRawHtml(sfc)

  let _code = sfc

  raw.forEach((classTitle) => {
    const generated = generateCss(lex(classTitle)).replace(/__NULLABLE__\n/, '')

    const resolvedClassTitle = purgeOnlyCssClassTitle(generated)
    _code = _code.replaceAll(classTitle, resolvedClassTitle)

    scopedBuffer.push(generated)
  })

  const bufferRaw = scopedBuffer.reduce((acc, css) => (acc += `${css}\n`))

  return `${_code}\n\n<style scoped>\n${bufferRaw.trimEnd()}\n</style>`
}
