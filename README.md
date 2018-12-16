# My Webpack Set-up

This project is a default [Webpack][] and [Sass][] configuration that I can use as a basis in many of my projects.

Currently a work in progress, needs more refinement and testing.

## Installation

Navigate to your project folder in the terminal and run "npm install" which will install the packages listed in the package.json and you're ready to go.

## Details

Webpack has been configured to do the following:

- Compile Sass to CSS
- Auto-prefix CSS (write W3C syntax, vendor prefixes added automagically based on Browserslist config in package.json)
- Minify CSS
- Transpile JS with [Babel][] (based on Browserslist config in package.json)
- Minify JS
- Generates Sourcemaps for CSS and JS

[Sass]: http://sass-lang.com/
[Webpack]: https://webpack.js.org/
[Babel]: https://babeljs.io/