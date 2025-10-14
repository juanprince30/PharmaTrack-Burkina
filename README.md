# PharmaTrackBurkina

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

```
PharmaTrack-Burkina
├─ .angular
├─ .editorconfig
├─ angular.json
├─ db.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ css
│  │  ├─ aos.css
│  │  ├─ bootstrap
│  │  │  ├─ bootstrap-grid.css
│  │  │  ├─ bootstrap-reboot.css
│  │  │  └─ bootstrap.css
│  │  ├─ bootstrap.min.css
│  │  ├─ bootstrap.min.css.map
│  │  ├─ jquery-ui.css
│  │  ├─ magnific-popup.css
│  │  ├─ owl.carousel.min.css
│  │  ├─ owl.theme.default.min.css
│  │  └─ style.css
│  ├─ fonts
│  │  └─ icomoon
│  │     ├─ demo-files
│  │     │  ├─ demo.css
│  │     │  └─ demo.js
│  │     ├─ demo.html
│  │     ├─ fonts
│  │     │  ├─ icomoon.eot
│  │     │  ├─ icomoon.svg
│  │     │  ├─ icomoon.ttf
│  │     │  └─ icomoon.woff
│  │     ├─ Read Me.txt
│  │     ├─ selection.json
│  │     └─ style.css
│  ├─ images
│  │  ├─ bg_1.jpg
│  │  ├─ bg_2.jpg
│  │  ├─ hero_1.jpg
│  │  ├─ person_1.jpg
│  │  ├─ person_2.jpg
│  │  ├─ person_3.jpg
│  │  ├─ person_4.jpg
│  │  ├─ person_5.jpg
│  │  ├─ products_1.png
│  │  ├─ product_01.png
│  │  ├─ product_02.png
│  │  ├─ product_03.png
│  │  ├─ product_04.png
│  │  ├─ product_05.png
│  │  ├─ product_06.png
│  │  ├─ product_07_large.png
│  │  ├─ shoe.png
│  │  ├─ wave.svg
│  │  └─ women.jpg
│  ├─ js
│  │  ├─ aos.js
│  │  ├─ bootstrap.min.js
│  │  ├─ jquery-3.3.1.min.js
│  │  ├─ jquery-ui.js
│  │  ├─ jquery.magnific-popup.min.js
│  │  ├─ main.js
│  │  ├─ owl.carousel.min.js
│  │  ├─ popper.min.js
│  │  └─ slick.min.js
│  └─ scss
│     ├─ bootstrap
│     │  ├─ bootstrap-grid.scss
│     │  ├─ bootstrap-reboot.scss
│     │  ├─ bootstrap.scss
│     │  ├─ mixins
│     │  │  ├─ _alert.scss
│     │  │  ├─ _background-variant.scss
│     │  │  ├─ _badge.scss
│     │  │  ├─ _border-radius.scss
│     │  │  ├─ _box-shadow.scss
│     │  │  ├─ _breakpoints.scss
│     │  │  ├─ _buttons.scss
│     │  │  ├─ _caret.scss
│     │  │  ├─ _clearfix.scss
│     │  │  ├─ _float.scss
│     │  │  ├─ _forms.scss
│     │  │  ├─ _gradients.scss
│     │  │  ├─ _grid-framework.scss
│     │  │  ├─ _grid.scss
│     │  │  ├─ _hover.scss
│     │  │  ├─ _image.scss
│     │  │  ├─ _list-group.scss
│     │  │  ├─ _lists.scss
│     │  │  ├─ _nav-divider.scss
│     │  │  ├─ _pagination.scss
│     │  │  ├─ _reset-text.scss
│     │  │  ├─ _resize.scss
│     │  │  ├─ _screen-reader.scss
│     │  │  ├─ _size.scss
│     │  │  ├─ _table-row.scss
│     │  │  ├─ _text-emphasis.scss
│     │  │  ├─ _text-hide.scss
│     │  │  ├─ _text-truncate.scss
│     │  │  ├─ _transition.scss
│     │  │  └─ _visibility.scss
│     │  ├─ utilities
│     │  │  ├─ _align.scss
│     │  │  ├─ _background.scss
│     │  │  ├─ _borders.scss
│     │  │  ├─ _clearfix.scss
│     │  │  ├─ _display.scss
│     │  │  ├─ _embed.scss
│     │  │  ├─ _flex.scss
│     │  │  ├─ _float.scss
│     │  │  ├─ _position.scss
│     │  │  ├─ _screenreaders.scss
│     │  │  ├─ _shadows.scss
│     │  │  ├─ _sizing.scss
│     │  │  ├─ _spacing.scss
│     │  │  ├─ _text.scss
│     │  │  └─ _visibility.scss
│     │  ├─ _alert.scss
│     │  ├─ _badge.scss
│     │  ├─ _breadcrumb.scss
│     │  ├─ _button-group.scss
│     │  ├─ _buttons.scss
│     │  ├─ _card.scss
│     │  ├─ _carousel.scss
│     │  ├─ _close.scss
│     │  ├─ _code.scss
│     │  ├─ _custom-forms.scss
│     │  ├─ _dropdown.scss
│     │  ├─ _forms.scss
│     │  ├─ _functions.scss
│     │  ├─ _grid.scss
│     │  ├─ _images.scss
│     │  ├─ _input-group.scss
│     │  ├─ _jumbotron.scss
│     │  ├─ _list-group.scss
│     │  ├─ _media.scss
│     │  ├─ _mixins.scss
│     │  ├─ _modal.scss
│     │  ├─ _nav.scss
│     │  ├─ _navbar.scss
│     │  ├─ _pagination.scss
│     │  ├─ _popover.scss
│     │  ├─ _print.scss
│     │  ├─ _progress.scss
│     │  ├─ _reboot.scss
│     │  ├─ _root.scss
│     │  ├─ _tables.scss
│     │  ├─ _tooltip.scss
│     │  ├─ _transitions.scss
│     │  ├─ _type.scss
│     │  ├─ _utilities.scss
│     │  └─ _variables.scss
│     ├─ style.scss
│     ├─ _site-base.scss
│     ├─ _site-blocks.scss
│     └─ _site-navbar.scss
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app.component.css
│  │  ├─ app.component.html
│  │  ├─ app.component.spec.ts
│  │  ├─ app.component.ts
│  │  ├─ app.config.ts
│  │  └─ app.routes.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```