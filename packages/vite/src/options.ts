import { defaultAdapters } from 'ununura-engine'
import { UnunuraOptions, UnunuraResolvableOptions } from 'ununura-shared'

export const resolvedViteOptions = (options: UnunuraResolvableOptions = {}): UnunuraOptions => {
  return {
    defines: options?.defines ?? [],
    jsx: options?.jsx ?? false,
    jsxIgnoreEntryFile: options?.jsxIgnoreEntryFile ?? true,
    astAdapters: options?.astAdapters
      ? [...options.astAdapters, ...defaultAdapters()].map((v) => v.toLowerCase())
      : defaultAdapters().map((v) => v.toLowerCase()),
    scopedInTemplate: options?.scopedInTemplate ?? true,
    extend: options?.extend ?? {},
    specialEnvironment: options?.specialEnvironment ?? 'vite',
    applyAutoprefixer: options?.applyAutoprefixer ?? true,
    simplifyTitles: options?.simplifyTitles ?? false,
    forceIgnoreClassLineInTitles: options?.forceIgnoreClassLineInTitles ?? false,
    forceHydratedTemplate: options?.forceHydratedTemplate ?? false,
  } as const satisfies UnunuraOptions
}
