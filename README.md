# Open Government Data Survey

## How to run

`yarn start`/`npm start` to start dev server with hot reload, it's live on `localhost:3000`.

`yarn run build`/`npm run build` to build prod bundle, it includes both treeshaking and uglify to optimize the code as much as possible.

`yarn test`/`npm test` run the tests with Jest and Enzyme, by default the test included only check for the correct render of base components & routes, all are passing.

## Eslint

This project uses AirBnB Javascript specs so you can write error-free react and javascript code, if you use Visual Studio Code, you can install eslint from the extension tab to activate this function, other editors just google _name of the editor + eslint_ you will find how to enable it for your editor.

## Tests

NOT CURRENTLY MAINTAINED

The testing environment is written in Jest and Enzyme.
The included tests are basic and only check the proper render of base components (snapshot), routes and redux actions + reducer.
While still fairly simple, the default tests are easy to manage and expand, providing a smoother curve into testing with JavaScript, React, and Redux. If you haven't used snapshot testing before, I'd suggest to read the [Jest documentation about them](https://facebook.github.io/jest/docs/snapshot-testing.html).



## Credits

Based on simple-redux-app: https://github.com/Kornil/simple-redux-app
