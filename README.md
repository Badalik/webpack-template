# Webpack template

Webpack template for quick start with **Typescript** for scripts, **Pug** for templates and **SCSS** for styles. 
**Eslint** is used for linting scripts and **Stylelint** used for linting scss.
## Install
```
npm install --legacy-peer-deps
```
## Pages
The pages are located in the <code>src/app/pages</code> and are added automatically to the build.
## Blocks
To add blocks (pug mixin + scss + script), you need to add them to the `src/app/blocks` and add 
`@forward` to the `src/app/blocks/_index.scss`
## SVG Sprite
The sprite is build automatically when the application is launched from the folder `src/icons`.
To manually build a sprite, run the command:
```
npm run icons
```
