/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg' {
  interface BrowserSpriteSymbol {
    id: string;
    viewBox: string;
    content: string;
    node: SVGSymbolElement;
  }
}

