# Vite + SSR + Express

Este é um repositório de experimento de uso do [Vite](https://vitejs.dev/) no desenvolvimento de uma aplicação SSR com Express. Também tem integração com o [Vitest](https://vitest.dev/) na execução dos testes. Ambos focados em rapidez.

## Propósito

É melhorar a **experiência no desenvolvimento** usando o Vite.

Vite faz uso do [Rollup e ESBuild](https://vitejs.dev/guide/why.html)

# Execução

## Desenvolvimento

Rodar `yarn dev`

## Produção

Rodar `yarn build` e em seguida `yarn preview`


## Testes

Rodar `yarn test` (Para sair basta apertar 'q')

# Como funciona

O Vite é usado apenas no modo de desenvolvimento e na hora de fazer um build para produção.

Em ambos ambientes, é usado um servidor Express. Diferenciando apenas a forma como as páginas são entregues

## Desenvolvimento

O Vite é [plugado como um middleware](https://vitejs.dev/guide/api-javascript.html#createserver) do Express. Ele também [transforma o HTML](https://vitejs.dev/guide/api-plugin.html#transformindexhtml) renderizado onde vai injetar o script responsável pelo HMR

É possível ver como, no arquivo `server/runtime/handlers/devHandler.js`

## Produção

O Vite faz o build tanto do código do servidor, como dos assets a serem usados pelas páginas como JavaScript, CSS, Imagens.

Tudo é gerado no diretório `output/` para cada ambiente (`client` e `server`).

Cada ambiente também tem um JSON `manifest.json` mapeando os arquivos gerados.

O `manifest.json` do `client` é usado pelo `server` para usar como referência aos assets usados pela página a ser renderizada.

## Plugin

Foi criado um plugin que ajuda no build.

### Build

Durante o build, o plugin busca pelo padrão de `@source(.*)` e `@content(.*)` nos arquivos de páginas para emitir os paths para o Rollup gerar os respectivos arquivos no bundle final do `client`

## definePage*()

São funções presente no arquivo `src/page.ts` que ajudam a construir as páginas como inserindo meta tags, tags como `<title>`, `<script>`, etc.

São baseadas no [Unhead](https://unhead.harlanzw.com/)

### Scripts

Na função `definePageScripts()` o atributo `type="module"` é adicionado automaticamente em desenvolvimento, mas não em produção. É necessário em desenvolvimento para o Vite trabalhar corretamente com impmort dos módulos.

## @source

Pra ajudar a usar assets que usam atributo `src=""`.

Funciona como uma função: `@source(path)`

- `path`: Caminho do arquivo a partir da raiz do projeto, então deve começar com `src/...`

Exemplos:

Se o código tiver:

```ts
`<img @source(src/images/exemplo.png) />`
```

Resultará em:

```html
<img src="/src/images/exemplo.png" />
```

## @content

Funciona como uma função: `@content(path)`.

A ideia é simplesmente substituir pelo conteúdo de `path`. A princípio foi desenhado pra usar com CSS.

- `path`: Caminho do arquivo a ser lido

Se o código tiver:

```ts
`<style type="text/css">@content(src/styles/main.css)</style>`
```

Em desenvolvimento, resultará:

```html
<style type="text/css">
body {
  padding: 8px;
}
</style>
```

Em produção, resultará:

```html
<style type="text/css">
body {padding: 8px;}
</style>
```

## Rotas

As rotas são baseadas em arquivos presentes no diretório `pages/`.

Para criar uma página, crie um arquivo com sufixo `*.page.ts`

```ts
export default definePage(() => {
  return {
    body: `<h1>Hello world!</h1>`
  }
})
```

O que uma página pode retornar está descrito no `type PageContent` em `types.ts`:


```ts
export declare type PageContent = {
  head?: TemplateValue; // Conteúdo adicional a <head>
  body?: TemplateValue; // Conteúdo do body
  footer?: TemplateValue; // Conteúdo adicional no final do <body> e antes do </body>
}
```

OBS: Cada atributo de PageContent deve ser retornado com template strings. É uma limitação do plugin quando vai substituir código. E usar template string ajuda a contornar essa limitação

```
return {
  head: `<script ...>`
}
```

Para definir um parâmetro só usar `pages/[slug].page.ts`.

A página recebe os parâmetros como primeiro argumento

```ts
export default definePage((params) => {
  return {
    body: `<h1>Hello ${params.slug}!</h1>`
  }
})
```

## CSS

O Vite já traz suporte nativo ao PostCSS. Pra saber mais, só conferir [aqui](https://vitejs.dev/guide/features.html#css) a documentação

O uso de `@import` dentro dos arquivos `.css` devem usar o caminho desde a raiz do projeto, para não haver problemas durante desenvolvimento e build.

```css
@import '/src/assets/styles/base.css';
```