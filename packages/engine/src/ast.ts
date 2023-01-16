import { Content } from 'hast'
import { fromHtml } from 'hast-util-from-html'
import { Root } from 'hast-util-from-html/lib'
import { Node, parse as jsxParse } from 'babel-jsx-to-ast-fragmented'
import {
  isUniqueKey,
  isCloseMultipleKey,
  isOpenMultipleKey,
  Option,
  isCommonIdentifier as isCommonIdentifierKey,
  UnunuraContextualize,
  isContextOpenKey,
  isContextCloseKey,
  isContextIdentifier as isContextIdentifierKey,
  UnunuraContextualizeStack,
} from 'ununura-shared'
import { generateMultipleClass, generateUniqueClass } from './resources'

export const classesFromRawHtml = (html: string): string[] => {
  const tree = fromHtml(html, { fragment: true })
  const classes: string[] = []

  const ast = (children: Content[]): void => {
    children.forEach((node) => {
      if (node.type === 'element') {
        if (node.tagName === 'template') ast((node.content as Root).children) // vue sfc

        const target: Option<string> = (node.properties?.className as string[])?.join(' ')

        if (target) classes.push(target)

        if (node.children) ast(node.children)
      }
    })
  }

  ast(tree.children)

  return classes
}

export const classesFromRawJSX = (jsx: string): string[] => {
  const tree = jsxParse(jsx)
  const classes: string[] = []

  const ast = (current: Node): void => {
    const cls = current.attributes.filter(({ name }) => name === 'className' || name === 'class')

    if (cls?.length > 0) classes.push(...cls.map((cl) => cl.value as string))

    if (current.children) current.children.forEach((target) => ast(target))
  }

  tree.forEach((fn) => {
    fn.forEach((el) => {
      ast(el)
    })
  })

  return classes
}

export const generateCss = (keys: string[]): string => {
  let prev_unique: Option<string> = undefined
  let prev_multiple: Option<string> = undefined
  let prev_common_identifier: Option<string> = undefined
  let prev_context_identifier: Option<UnunuraContextualize> = undefined

  const buffer: string[] = []
  const context_stack: UnunuraContextualizeStack = []

  for (const key of keys) {
    const isUnique = isUniqueKey(key)
    const isOpen = isOpenMultipleKey(key)
    const isContextOpen = isContextOpenKey(key)
    const isContextClose = isContextCloseKey(key)
    const isEnd = isCloseMultipleKey(key)
    const isCommonIdentifier = isCommonIdentifierKey(key)
    const isContextIdentifier = isContextIdentifierKey(key)

    if (isCommonIdentifier) {
      prev_common_identifier = key
    } else if (isUnique) {
      prev_unique = key
    } else if (isOpen) {
      prev_multiple = key
    } else if (isContextIdentifier) {
      prev_context_identifier = key as UnunuraContextualize
    } else if (isContextOpen) {
      if (prev_context_identifier) context_stack.push(prev_context_identifier)
      prev_context_identifier = undefined
    } else if (isContextClose) {
      context_stack.pop()
    } else {
      if (!isEnd) {
        if (prev_unique && prev_common_identifier)
          buffer.push(
            generateUniqueClass([prev_common_identifier, key], {
              stack: context_stack,
              buffer,
              contents: [],
            })
          )
        if (prev_multiple && prev_common_identifier)
          buffer.push(
            generateMultipleClass([prev_common_identifier, key], {
              stack: context_stack,
              buffer,
              contents: [],
            })
          )
      }

      prev_unique = undefined
      prev_multiple = undefined
      prev_common_identifier = undefined
    }
  }

  return buffer.reduce((acc, key) => (acc += `${key}\n`), '')
}
