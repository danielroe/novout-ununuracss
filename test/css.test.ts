import { getGlobalReset, getGlobals } from 'packages/engine/src/globals'
import { purgeCSS, purgeOnlyCssClassTitle } from 'packages/engine/src/purge'
import { getSupportedInteger } from 'packages/engine/src/support'
import {
  resolveTitleCssClass,
  resolveCSS,
  generateUniqueClass,
  generateMultipleClass,
  resolveIdentifierInCSS,
  UnunuraGlobalGenerateReduced,
  setterRow,
} from 'ununura-engine'
import { MEYER_RESET_CSS, NOVOUT_RESET_CSS, NULLABLE, UnunuraIdentifier } from 'ununura-shared'
import { describe, expect, it } from 'vitest'

describe('resources', () => {
  it('should get css class', () => {
    const targets = [
      [
        resolveCSS(UnunuraIdentifier.Padding, { contents: ['2'], buffer: [], stack: [] }),
        `.p-2 {
  padding: 2px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Padding, { contents: ['2', '5'], buffer: [], stack: [] }),
        `.p-2-5 {
  padding: 2px 5px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Padding, { contents: ['2', '5rem', '0', '10rem'], buffer: [], stack: [] }),
        `.p-2-5rem-0-10rem {
  padding: 2px 5rem 0px 10rem;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Padding, { contents: ['0.25'], buffer: [], stack: [] }),
        `.p-025 {
  padding: 0.25px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Padding, { contents: ['left', '30px'], buffer: [], stack: [] }),
        `.p-left-30px {
  padding-left: 30px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Padding, { contents: ['b', '30px'], buffer: [], stack: [] }),
        `.p-b-30px {
  padding-bottom: 30px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Margin, { contents: ['2'], buffer: [], stack: [] }),
        `.m-2 {
  margin: 2px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Margin, { contents: ['2', '5'], buffer: [], stack: [] }),
        `.m-2-5 {
  margin: 2px 5px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Margin, { contents: ['2', '5', '0', '10'], buffer: [], stack: [] }),
        `.m-2-5-0-10 {
  margin: 2px 5px 0px 10px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Margin, { contents: ['0.25'], buffer: [], stack: [] }),
        `.m-025 {
  margin: 0.25px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Margin, { contents: ['50%', '25ch'], buffer: [], stack: [] }),
        `.m-50-25ch {
  margin: 50% 25ch;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Margin, { contents: ['top', '2rem'], buffer: [], stack: [] }),
        `.m-top-2rem {
  margin-top: 2rem;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Margin, { contents: ['t', '2rem'], buffer: [], stack: [] }),
        `.m-t-2rem {
  margin-top: 2rem;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Margin, { contents: ['!', '50%', '25ch'], buffer: [], stack: [] }),
        `.m-_important_-50-25ch {
  margin: 50% 25ch !important;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Margin, { contents: ['!', '50%', '25ch'], buffer: [], stack: ['focus'] }),
        `.m-_important_-50-25ch:focus {
  margin: 50% 25ch !important;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Border, { contents: ['white', '2', 'solid'], buffer: [], stack: [] }),
        `.b-white-2-solid {
  border: solid;
  border-color: white;
  border-width: 2px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Border, { contents: ['2'], buffer: [], stack: [] }),
        `.b-2 {
  border-width: 2px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Border, { contents: ['t', '2'], buffer: [], stack: [] }),
        `.b-t-2 {
  border-top-width: 2px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Border, { contents: ['dashed', 'black'], buffer: [], stack: [] }),
        `.b-dashed-black {
  border: dashed;
  border-color: black;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Border, { contents: ['10', 'dashed', 'black'], buffer: [], stack: [] }),
        `.b-10-dashed-black {
  border: dashed;
  border-color: black;
  border-width: 10px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Border, { contents: ['10', 'dashed', 'black'], buffer: [], stack: ['active'] }),
        `.b-10-dashed-black:active {
  border: dashed;
  border-color: black;
  border-width: 10px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Border, { contents: ['left', '10', 'dashed', 'black'], buffer: [], stack: ['active'] }),
        `.b-left-10-dashed-black:active {
  border-left: dashed;
  border-left-color: black;
  border-left-width: 10px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Outline, { contents: ['10', 'dashed', 'black'], buffer: [], stack: [] }),
        `.o-10-dashed-black {
  outline: dashed;
  outline-color: black;
  outline-width: 10px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Text, { contents: ['2rem', 'black'], buffer: [], stack: [] }),
        `.text-2rem-black {
  color: black;
  font-size: 2rem;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Text, { contents: ['2rem'], buffer: [], stack: [] }),
        `.text-2rem {
  font-size: 2rem;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Text, { contents: ['arial'], buffer: [], stack: [] }),
        `.text-arial {
  font-family: 'Arial', sans-serif;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Text, { contents: ['arial', '#CC0000', '700'], buffer: [], stack: [] }),
        `.text-arial-cc0000-700 {
  color: #CC0000;
  font-size: 700px;
  font-weight: 700;
  font-family: 'Arial', sans-serif;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Background, { contents: ['#000000'], buffer: [], stack: [] }),
        `.bg-000000 {
  background-color: #000000;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Background, { contents: ['#000000'], buffer: [], stack: ['dark'] }),
        `.dark .bg-000000-dark {
  background-color: #000000;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Background, { contents: ['rgba-255-255-255-0.5'], buffer: [], stack: [] }),
        `.bg-rgba-255-255-255-05 {
  background-color: rgba(255, 255, 255, 0.5);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Background, { contents: ['hsl-0-100%-50%'], buffer: [], stack: [] }),
        `.bg-hsl-0-100-50 {
  background-color: hsl(0, 100%, 50%);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Background, { contents: ['hsla-0-100%-50%-0.5'], buffer: [], stack: [] }),
        `.bg-hsla-0-100-50-05 {
  background-color: hsla(0, 100%, 50%, 0.5);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Background, { contents: ['--primary-color'], buffer: [], stack: [] }),
        `.bg---primary-color {
  background-color: var(--primary-color);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Background, { contents: ['#000001', 'cover'], buffer: [], stack: [] }),
        `.bg-000001-cover {
  background-color: #000001;
  background-size: cover;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Background, { contents: ['/test.png'], buffer: [], stack: [] }),
        `.bg-testpng {
  background-image: url("/test.png");
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Background, { contents: ['/foo.png', 'auto'], buffer: [], stack: [] }),
        `.bg-foopng-auto {
  background-image: url("/foo.png");
  background-size: auto;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Background, { contents: ['transparent'], buffer: [], stack: [] }),
        `.bg-transparent {
  background-color: transparent;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['row', 'grow'], buffer: [], stack: [] }),
        `.f-row-grow {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['row', 'v-center', 'h-center'], buffer: [], stack: [] }),
        `.f-row-v-center-h-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['row', 'v-stretch', 'h-start'], buffer: [], stack: [] }),
        `.f-row-v-stretch-h-start {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['row', 'v-start', 'h-between'], buffer: [], stack: [] }),
        `.f-row-v-start-h-between {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['col-reverse', 'grow-none'], buffer: [], stack: [] }),
        `.f-col-reverse-grow-none {
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 0;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['col-reverse', 'grow-none', 'gap-2rem'], buffer: [], stack: [] }),
        `.f-col-reverse-grow-none-gap-2rem {
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 0;
  gap: 2rem;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['wrap'], buffer: [], stack: [] }),
        `.f-wrap {
  display: flex;
  flex-wrap: wrap;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['nowrap'], buffer: [], stack: [] }),
        `.f-nowrap {
  display: flex;
  flex-wrap: nowrap;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['wrap-reverse'], buffer: [], stack: [] }),
        `.f-wrap-reverse {
  display: flex;
  flex-wrap: wrap-reverse;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['ji-center', 'ai-center'], buffer: [], stack: [] }),
        `.f-ji-center-ai-center {
  display: flex;
  justify-items: center;
  align-items: center;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['jc-center', 'ac-center'], buffer: [], stack: [] }),
        `.f-jc-center-ac-center {
  display: flex;
  justify-content: center;
  align-content: center;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['js-center', 'as-center'], buffer: [], stack: [] }),
        `.f-js-center-as-center {
  display: flex;
  justify-self: center;
  align-self: center;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['?', 'flex-1'], buffer: [], stack: [] }),
        `.f-_none_-flex-1 {
  flex: 1 1 0%;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['?', 'shrink-0'], buffer: [], stack: [] }),
        `.f-_none_-shrink-0 {
  flex-shrink: 0;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Flexbox, { contents: ['flex-1'], buffer: [], stack: [] }),
        `.f-flex-1 {
  display: flex;
  flex: 1 1 0%;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Grid, { contents: ['cols-2'], buffer: [], stack: [] }),
        `.g-cols-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Grid, { contents: ['rows-2'], buffer: [], stack: [] }),
        `.g-rows-2 {
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Grid, { contents: ['Cspan-2'], buffer: [], stack: [] }),
        `.g-cspan-2 {
  display: grid;
  grid-column: span 2 / span 2;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Grid, { contents: ['Wspan-2'], buffer: [], stack: [] }),
        `.g-wspan-2 {
  display: grid;
  grid-row: span 2 / span 2;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Grid, { contents: ['flow-foo'], buffer: [], stack: [] }),
        `.g-flow-foo {
  display: grid;
  grid-auto-flow: foo;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Grid, { contents: ['Aflow-foo'], buffer: [], stack: [] }),
        `.g-aflow-foo {
  display: grid;
  grid-auto-columns: foo;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Grid, { contents: ['gap-1rem'], buffer: [], stack: [] }),
        `.g-gap-1rem {
  display: grid;
  gap: 1rem;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Grid, { contents: ['ji-center', 'ai-center'], buffer: [], stack: [] }),
        `.g-ji-center-ai-center {
  display: grid;
  justify-items: center;
  align-items: center;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Grid, { contents: ['jc-center', 'ac-center'], buffer: [], stack: [] }),
        `.g-jc-center-ac-center {
  display: grid;
  justify-content: center;
  align-content: center;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Grid, { contents: ['js-center', 'as-center'], buffer: [], stack: [] }),
        `.g-js-center-as-center {
  display: grid;
  justify-self: center;
  align-self: center;
}`,
      ],
      [resolveCSS(UnunuraIdentifier.Grid, { contents: ['?'], buffer: [], stack: [] }), NULLABLE],
      [
        resolveCSS(UnunuraIdentifier.Width, { contents: ['100%'], buffer: [], stack: [] }),
        `.w-100 {
  width: 100%;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Width, { contents: ['max', '50vw'], buffer: [], stack: [] }),
        `.w-max-50vw {
  max-width: 50vw;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Width, { contents: ['100dvw'], buffer: [], stack: [] }),
        `.w-100dvw {
  width: 100dvw;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Height, { contents: ['300'], buffer: [], stack: [] }),
        `.h-300 {
  height: 300px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Height, { contents: ['300px'], buffer: [], stack: [] }),
        `.h-300px {
  height: 300px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Height, { contents: ['min', '100vh'], buffer: [], stack: [] }),
        `.h-min-100vh {
  min-height: 100vh;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Height, { contents: ['max', '10rem'], buffer: [], stack: [] }),
        `.h-max-10rem {
  max-height: 10rem;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Position, { contents: ['absolute'], buffer: [], stack: [] }),
        `.pos-absolute {
  position: absolute;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Position, { contents: ['sticky', 'left-2rem'], buffer: [], stack: [] }),
        `.pos-sticky-left-2rem {
  position: sticky;
  left: 2rem;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Position, { contents: ['relative', 'right-0'], buffer: [], stack: [] }),
        `.pos-relative-right-0 {
  position: relative;
  right: 0;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Position, { contents: ['!', 'sticky', 'left-2rem'], buffer: [], stack: [] }),
        `.pos-_important_-sticky-left-2rem {
  position: sticky !important;
  left: 2rem !important;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Scroll, { contents: ['hidden'], buffer: [], stack: [] }),
        `.sc-hidden {
  overflow: hidden;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Scroll, { contents: ['x', 'auto'], buffer: [], stack: [] }),
        `.sc-x-auto {
  overflow-x: auto;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Scroll, { contents: ['y', 'visible'], buffer: [], stack: [] }),
        `.sc-y-visible {
  overflow-y: visible;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Scroll, { contents: [], buffer: [], stack: [] }),
        `.sc {
  overflow: scroll;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Scroll, { contents: ['x'], buffer: [], stack: [] }),
        `.sc-x {
  overflow-x: scroll;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Scroll, { contents: ['x'], buffer: [], stack: ['focus'] }),
        `.sc-x:focus {
  overflow-x: scroll;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Float, { contents: ['right'], buffer: [], stack: [] }),
        `.fl-right {
  float: right;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.ZIndex, { contents: ['5'], buffer: [], stack: [] }),
        `.z-5 {
  z-index: 5;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Display, { contents: ['none'], buffer: [], stack: [] }),
        `.d-none {
  display: none;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Rounded, { contents: ['1rem'], buffer: [], stack: [] }),
        `.r-1rem {
  border-radius: 1rem;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Rounded, { contents: ['25px', '2rem'], buffer: [], stack: [] }),
        `.r-25px-2rem {
  border-radius: 25px 2rem;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Rounded, { contents: ['25px', '2rem'], buffer: ['.r-10'], stack: ['xl'] }),
        `@media (min-width: 1536px) {
.r-10 {
  border-radius: 25px 2rem;
}
}`,
      ],
      [resolveCSS(UnunuraIdentifier.Reset, { contents: ['meyer'], buffer: [], stack: [] }), NULLABLE],
      [resolveCSS(UnunuraIdentifier.Reset, { contents: ['novout'], buffer: [], stack: [] }), NULLABLE],
      [resolveCSS(UnunuraIdentifier.Margin, { contents: ['2', '10', '5'], buffer: [], stack: [] }), NULLABLE],
      [resolveCSS(UnunuraIdentifier.Padding, { contents: ['2', '10', '5'], buffer: [], stack: [] }), NULLABLE],
      [resolveCSS('wrong' as any, { contents: ['foo', 'baz', 'bar'], buffer: [], stack: [] }), NULLABLE],
    ]

    for (const [cl, result] of targets) {
      expect(cl).toStrictEqual(result)
    }
  })

  it('should get css inline class', () => {
    const targets = [
      [
        resolveCSS(UnunuraIdentifier.Typography, { contents: ['uppercase'], buffer: [], stack: [] }),
        `.typo-uppercase {
  text-transform: uppercase;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Typography, { contents: ['center'], buffer: [], stack: [] }),
        `.typo-center {
  text-align: center;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Typography, { contents: ['justify'], buffer: [], stack: [] }),
        `.typo-justify {
  text-align: justify;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Typography, { contents: ['capitalize'], buffer: [], stack: [] }),
        `.typo-capitalize {
  text-transform: capitalize;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Typography, { contents: ['indent-5'], buffer: [], stack: [] }),
        `.typo-indent-5 {
  text-indent: 5px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Typography, { contents: ['letter-5px'], buffer: [], stack: [] }),
        `.typo-letter-5px {
  letter-spacing: 5px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Typography, { contents: ['word-5px'], buffer: [], stack: [] }),
        `.typo-word-5px {
  word-spacing: 5px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Typography, { contents: ['line-30px'], buffer: [], stack: [] }),
        `.typo-line-30px {
  line-height: 30px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Typography, { contents: ['h-30px'], buffer: [], stack: [] }),
        `.typo-h-30px {
  line-height: 30px;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Typography, { contents: ['decoration-none'], buffer: [], stack: [] }),
        `.typo-decoration-none {
  text-decoration: none;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Typography, { contents: ['clip'], buffer: [], stack: [] }),
        `.typo-clip {
  text-overflow: clip;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Typography, { contents: ['space-pre'], buffer: [], stack: [] }),
        `.typo-space-pre {
  white-space: pre;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Typography, { contents: ['break-normal'], buffer: [], stack: [] }),
        `.typo-break-normal {
  word-break: normal;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Transform, { contents: ['rotateX-90deg'], buffer: [], stack: [] }),
        `.tf-rotatex-90deg {
  transform: rotateX(90deg);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Transform, { contents: ['rotateX--90deg'], buffer: [], stack: [] }),
        `.tf-rotatex--90deg {
  transform: rotateX(-90deg);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Transform, { contents: ['skewX-30deg'], buffer: [], stack: [] }),
        `.tf-skewx-30deg {
  transform: skewX(30deg);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Transform, { contents: ['rotateX-90deg', 'skewX-30deg'], buffer: [], stack: [] }),
        `.tf-rotatex-90deg-skewx-30deg {
  transform: rotateX(90deg) skewX(30deg);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Shadow, { contents: ['text', 'h-10', 'v-10', 'blur-30', 'black'], buffer: [], stack: [] }),
        `.sh-text-h-10-v-10-blur-30-black {
  text-shadow: 10px 10px 30px black;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Shadow, { contents: ['text', 'h-10', 'v-10', 'black'], buffer: [], stack: [] }),
        `.sh-text-h-10-v-10-black {
  text-shadow: 10px 10px black;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Filter, { contents: ['blur-4px'], buffer: [], stack: [] }),
        `.fi-blur-4px {
  filter: blur(4px);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Filter, { contents: ['backdrop', 'blur-4px'], buffer: [], stack: [] }),
        `.fi-backdrop-blur-4px {
  backdrop-filter: blur(4px);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Filter, {
          contents: ['blur-4px', 'contrast-1', 'hue-30deg', 'grayscale-50%', 'invert-50%', 'saturate-1', 'sepia-50%'],
          buffer: [],
          stack: [],
        }),
        `.fi-blur-4px-contrast-1-hue-30deg-grayscale-50-invert-50-saturate-1-sepia-50 {
  filter: blur(4px) contrast(1) grayscale(50%) hue-rotate(30deg) invert(50%) saturate(1) sepia(50%);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Filter, {
          contents: ['backdrop', 'blur-4px', 'contrast-1', 'hue-30deg', 'grayscale-50%', 'invert-50%', 'saturate-1', 'sepia-50%'],
          buffer: [],
          stack: [],
        }),
        `.fi-backdrop-blur-4px-contrast-1-hue-30deg-grayscale-50-invert-50-saturate-1-sepia-50 {
  backdrop-filter: blur(4px) contrast(1) grayscale(50%) hue-rotate(30deg) invert(50%) saturate(1) sepia(50%);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Style, { contents: ['cursor-pointer'], buffer: [], stack: [] }),
        `.st-cursor-pointer {
  cursor: pointer;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Style, {
          contents: [
            'accent-#FF00FF',
            'appearance',
            'cursor-pointer',
            'events-none',
            'resize-none',
            'touch-auto',
            'scroll-smooth',
            'select-text',
          ],
          buffer: [],
          stack: [],
        }),
        `.st-accent-ff00ff-appearance-cursor-pointer-events-none-resize-none-touch-auto-scroll-smooth-select-text {
  accent-color: #FF00FF;
  appearance: none;
  cursor: pointer;
  touch-action: auto;
  pointer-events: none;
  resize: none;
  scroll-behavior: smooth;
  user-select: text;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Shadow, { contents: ['black'], buffer: [], stack: [] }),
        `.sh-black {
  box-shadow: 5px 5px 5px 0px black;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Shadow, { contents: ['h-10', 'v-10'], buffer: [], stack: [] }),
        `.sh-h-10-v-10 {
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.5);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Shadow, { contents: ['inset', 'h-10', 'v-10'], buffer: [], stack: [] }),
        `.sh-inset-h-10-v-10 {
  box-shadow: inset 10px 10px 5px 0px rgba(0, 0, 0, 0.5);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Transition, {
          contents: ['delay-200ms', 'duration-1s', 'none', 'ease-in'],
          buffer: [],
          stack: [],
        }),
        `.tr-delay-200ms-duration-1s-none-ease-in {
  transition-delay: 200ms;
  transition-duration: 1s;
  transition-property: none;
  transition-timing-function: ease-in;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Gradient, {
          contents: ['30deg', 'rgba-255-0-255-0.5', '0%', 'rgba-0-200-0-1', '100%'],
          buffer: [],
          stack: [],
        }),
        `.gr-30deg-rgba-255-0-255-05-0-rgba-0-200-0-1-100 {
  background: rgba(255, 0, 255, 0.5);
  background: linear-gradient(30deg, rgba(255, 0, 255, 0.5) 0%, rgba(0, 200, 0, 1) 100%);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Animation, {
          contents: [
            'name-splin',
            'duration-2s',
            'delay-0.2s',
            'iteration-infinite',
            'direction-alternate',
            'timing-linear',
            'fill-both',
          ],
          buffer: [],
          stack: [],
        }),
        `.an-name-splin-duration-2s-delay-02s-iteration-infinite-direction-alternate-timing-linear-fill-both {
  animation-name: splin;
  animation-duration: 2s;
  animation-delay: 0.2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-fill-mode: both;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Collection, { contents: ['truncate'], buffer: [], stack: [] }),
        `.cl-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Collection, { contents: ['screen'], buffer: [], stack: [] }),
        `.cl-screen {
  min-height: 100vh;
  width: 100%;
  overflow-y: auto;
}`,
      ],
    ]

    for (const [css, result] of targets) {
      expect(css).toStrictEqual(result)
    }
  })

  it('should get css class in theme context', () => {
    const targets = [
      [
        resolveCSS(UnunuraIdentifier.Padding, { contents: ['5rem'], buffer: [], stack: ['sepia'] }),
        `.sepia .p-5rem-sepia {
  padding: 5rem;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Rounded, { contents: ['2rem'], buffer: [], stack: ['light'] }),
        `.light .r-2rem-light {
  border-radius: 2rem;
}`,
      ],
    ]

    for (const [css, result] of targets) {
      expect(css).toStrictEqual(result)
    }
  })

  it('should get css class in pseudo class context', () => {
    const targets = [
      [
        resolveCSS(UnunuraIdentifier.Padding, { contents: ['5rem'], buffer: [], stack: ['link'] }),
        `.p-5rem:link {
  padding: 5rem;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Rounded, { contents: ['2rem'], buffer: [], stack: ['valid'] }),
        `.r-2rem:valid {
  border-radius: 2rem;
}`,
      ],
    ]

    for (const [css, result] of targets) {
      expect(css).toStrictEqual(result)
    }
  })

  it('should get css class in pseudo element context', () => {
    const targets = [
      [
        resolveCSS(UnunuraIdentifier.Style, { contents: ['cursor-none'], buffer: [], stack: ['cue'] }),
        `.st-cursor-none::cue {
  cursor: none;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Style, { contents: ['cursor-none'], buffer: [], stack: ['selection'] }),
        `.st-cursor-none::selection {
  cursor: none;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Style, { contents: ['cursor-none'], buffer: [], stack: ['first-line'] }),
        `.st-cursor-none::first-line {
  cursor: none;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Rounded, { contents: ['2rem'], buffer: [], stack: ['selection', 'valid'] }),
        `.r-2rem::selection {
  border-radius: 2rem;
}`,
      ],
    ]

    for (const [css, result] of targets) {
      expect(css).toStrictEqual(result)
    }
  })

  it('should generate correct classes from raw context', () => {
    const targets = [
      [
        generateUniqueClass(['m', '10'], { contents: [], buffer: [], stack: [] }),
        `.m-10 {
  margin: 10px;
}`,
      ],
      [
        generateMultipleClass(['m', '0 10 0 0'], { contents: [], buffer: [], stack: [] }),
        `.m-0-10-0-0 {
  margin: 0px 10px 0px 0px;
}`,
      ],
    ]

    for (const [css, result] of targets) {
      expect(css).toStrictEqual(result)
    }
  })

  it('should set row class', () => {
    const targets = [
      [setterRow('foo', `foo: as`, ['foo']), `  foo: as;\n`],
      [setterRow('foo', `foo: as`, ['!', 'foo']), `  foo: as !important;\n`],
    ]

    for (const [css, result] of targets) {
      expect(css).toStrictEqual(result)
    }
  })

  it('should get css class with ununura external options', () => {
    const targets = [
      [
        resolveCSS(UnunuraIdentifier.Text, {
          contents: ['primary'],
          buffer: [],
          stack: [],
          ununura: { extend: { supporters: { colors: [['primary', '#00FF00']] } } } as any,
        }),
        `.text-primary {
  color: #00FF00;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Text, {
          contents: ['primary'],
          buffer: [],
          stack: [],
          ununura: { extend: { supporters: { colors: [['primary', 'rgba(255, 255, 255, 0.1)']] } } } as any,
        }),
        `.text-primary {
  color: rgba(255, 255, 255, 0.1);
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Text, {
          contents: ['roboto'],
          buffer: [],
          stack: [],
          ununura: { extend: { supporters: { fonts: [['roboto', 'Roboto']] } } } as any,
        }),
        `.text-roboto {
  font-family: 'Roboto', sans-serif;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Text, {
          contents: ['primary', 'roboto'],
          buffer: [],
          stack: [],
          ununura: { extend: { supporters: { colors: [['primary', '#00FF00']], fonts: [['roboto', 'Roboto']] } } } as any,
        }),
        `.text-primary-roboto {
  color: #00FF00;
  font-family: 'Roboto', sans-serif;
}`,
      ],
      [
        resolveCSS(UnunuraIdentifier.Text, {
          contents: ['primary', 'roboto', 'md'],
          buffer: [],
          stack: [],
          ununura: {
            extend: {
              supporters: { colors: [['primary', '#00FF00']], fonts: [['roboto', 'Roboto']], units: [['md', '1.5rem']] },
            },
          } as any,
        }),
        `.text-primary-roboto-md {
  color: #00FF00;
  font-size: 1.5rem;
  font-family: 'Roboto', sans-serif;
}`,
      ],
    ]

    for (const [css, result] of targets) {
      expect(css).toStrictEqual(result)
    }
  })
})

describe.concurrent('resolvers', () => {
  it('should get a resources from raw html', () => {
    const targets = [
      [getGlobalReset('reset:novout'), NOVOUT_RESET_CSS()],
      [getGlobalReset('reset:meyer'), MEYER_RESET_CSS()],
      [getGlobalReset('reset:foo'), ''],
      [getGlobalReset(), ''],
      [resolveIdentifierInCSS(UnunuraIdentifier.Text), 'font'],
      [resolveIdentifierInCSS(UnunuraIdentifier.Flexbox), 'flex'],
      [
        resolveTitleCssClass(UnunuraIdentifier.Margin, { contents: ['15', '0', '10', '0'], buffer: [], stack: [] }),
        '.m-15-0-10-0',
      ],
      [resolveTitleCssClass(UnunuraIdentifier.Flexbox, { contents: ['flex-1'], buffer: [], stack: [] }), '.f-flex-1'],
      [resolveTitleCssClass(UnunuraIdentifier.Flexbox, { contents: ['flex-1'], buffer: [], stack: ['hover'] }), '.f-flex-1'],
      [
        resolveTitleCssClass(UnunuraIdentifier.Background, { contents: ['rgba-255-255-255-0.3)'], buffer: [], stack: [] }),
        '.bg-rgba-255-255-255-03',
      ],
      [resolveTitleCssClass(UnunuraIdentifier.Background, { contents: ['#FF0000'], buffer: [], stack: [] }), '.bg-ff0000'],
      [
        resolveTitleCssClass(UnunuraIdentifier.Background, { contents: ['/local_image.png'], buffer: [], stack: [] }),
        '.bg-local-imagepng',
      ],
      [
        resolveTitleCssClass(UnunuraIdentifier.Background, {
          contents: ['/local_image.png'],
          buffer: [],
          stack: [],
          node: { flag: 'foo' } as any,
        }),
        '.bg-local-imagepng-foo',
      ],
    ]

    for (const [raw, result] of targets) {
      expect(raw).toStrictEqual(result)
    }
  })
})

describe.concurrent('purge', () => {
  it('should purge or not css generated files', () => {
    const targets = [
      [
        purgeCSS(`.bg-#000000 {
  background-color: #000000;
}
.p-10 {
  padding: 10px;
}
.bg-#000000 {
  background-color: #000000;
}`),
        `.bg-#000000 {
  background-color: #000000;
}
.p-10 {
  padding: 10px;
}`,
      ],
      [
        purgeCSS(`.bg-#000000 {
  background-color: #000000;
}
.p-35 {
  padding: 35px;
}`),
        `.bg-#000000 {
  background-color: #000000;
}
.p-35 {
  padding: 35px;
}`,
      ],
      [
        purgeCSS(`a wrong css file`),
        `.
a wrong css file`,
      ],
      [
        purgeOnlyCssClassTitle(`.text-base {
  font-size: 1rem;
}`),
        'text-base',
      ],
      [
        purgeOnlyCssClassTitle(`.border-white {
    border-color: white;
  }`),
        'border-white',
      ],
    ]

    for (const [raw, result] of targets) {
      expect(raw).toStrictEqual(result)
    }
  })
})

describe.concurrent('globals', () => {
  it('should get only global css', async () => {
    const files = [{ raw: `<template><div class="reset:novout" /></template>`, path: 'path/to/test.vue', filename: 'test.vue' }]

    const rawGlobals = getGlobals(files, {} as any)

    const target = await UnunuraGlobalGenerateReduced(files, rawGlobals, { jsx: false, scopedInTemplate: true } as any)

    expect(target).toStrictEqual(NOVOUT_RESET_CSS())
  })
})

describe.concurrent('support', () => {
  it('should get correct value', () => {
    const targets = [
      [getSupportedInteger(['400']), '400'],
      [getSupportedInteger(['xyz']), NULLABLE],
    ]

    for (const [raw, result] of targets) {
      expect(raw).toStrictEqual(result)
    }
  })
})