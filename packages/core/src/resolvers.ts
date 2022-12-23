import { UnunuraIdentifier, NULLABLE } from 'ununura-shared'
import {
  getResourceText,
  getResourceBackgroundColor,
  getResourceBackgroundImage,
  getResourceBorder,
  getResourcePaddingOrMargin,
  getResourceFlex,
  getResourceWidthOrHeight,
} from './resources'

export const resolveFloatingToClassName = (t: string) =>
  t
    .replace(/[.%\s]/gi, '')
    .replace(/[,_\s]/gi, '-')
    .replace(/[():/\s]/gi, '')

export const resolveIdentifierInCSS = (identifier: UnunuraIdentifier): string => {
  switch (identifier) {
    case UnunuraIdentifier.Margin:
      return 'margin'
    case UnunuraIdentifier.Padding:
      return 'padding'
    case UnunuraIdentifier.BackgroundColor:
    case UnunuraIdentifier.BackgroundImage:
      return 'background'
    case UnunuraIdentifier.Text:
      return 'text'
    case UnunuraIdentifier.Border:
      return 'border'
    case UnunuraIdentifier.Flexbox:
      return 'flex'
    case UnunuraIdentifier.Height:
      return 'height'
    case UnunuraIdentifier.Width:
      return 'width'
  }
}

export const resolveCSS = (identifier: UnunuraIdentifier, contents: string[]): string => {
  switch (identifier) {
    case UnunuraIdentifier.Margin:
    case UnunuraIdentifier.Padding:
      return getResourcePaddingOrMargin(identifier, contents)
    case UnunuraIdentifier.BackgroundColor:
      return getResourceBackgroundColor(identifier, contents)
    case UnunuraIdentifier.BackgroundImage:
      return getResourceBackgroundImage(identifier, contents)
    case UnunuraIdentifier.Text:
      return getResourceText(identifier, contents)
    case UnunuraIdentifier.Border:
      return getResourceBorder(identifier, contents)
    case UnunuraIdentifier.Flexbox:
      return getResourceFlex(identifier, contents)
    case UnunuraIdentifier.Height:
    case UnunuraIdentifier.Width:
      return getResourceWidthOrHeight(identifier, contents)
    default:
      return NULLABLE
  }
}

export const resolveTitleCssClass = (identifier: UnunuraIdentifier, contents: string[]) => {
  return contents.reduce((sum, acc) => {
    if (acc) return (sum += `-${resolveFloatingToClassName(acc)}`)

    return sum
  }, `.${identifier}`)
}

export const resolveCssClass = (identifier: UnunuraIdentifier, contents: string[], setter: string): string => {
  const title = resolveTitleCssClass(identifier, contents)

  const cl = `${title} {${setter}}`

  return cl
}

export const resolveOnlyCssClassTitle = (css: string): string => {
  return `\n${css}`
    .split('\n.')
    .filter(Boolean)
    .join('{')
    .split('{')
    .filter((v) => !v.startsWith('\n'))
    .map((v) => v.trim())
    .join(' ')
}
