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

É possível ver como no arquivo `server/runtime/handlers/devHandler.js`

## Produção

O Vite faz o build tanto do código do servidor, como dos assets a serem usados pelas páginas como JavaScript, CSS, Imagens.

Tudo criado no diretório `output/` para cada ambiente (`client` e `server`).

Cada ambiente também tem um JSON `manifest.json` mapeando os arquivos gerados.

O `manifest.json` do `client` é usado pelo `server` para usar como referência aos assets usados pela página a ser renderizada.

## Plugin

Foi criado um plugin que ajuda tanto no desenvolvimento como no build.

### Desenvolvimento

Durante desenvolvimento, o plugin busca pelo padrão `@source(path/para/asset.ts)` e subistitui por `src="/path/para/asset.ts"`. Ajudando assim o Vite a carregar corretamente o arquivo no navegador

Também tem o `@content(path/para/asset.css)` onde ele simplesmente substitui pelo conteúdo de `path/para/asset.css`

### Build

Durante o build, o plugin busca pelo padrão de `@source(.*)` e `@content(.*)` para emitir os paths para o Rollup gerar os respectivos arquivos no bundle final do `client`

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
  htmlAttributes?: TemplateValue; // Atributos adicionais a <html>
  head?: TemplateValue; // Conteúdo adicional a <head>
  bodyAttributes?: TemplateValue; // Atributos adicionais ao <body>
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

