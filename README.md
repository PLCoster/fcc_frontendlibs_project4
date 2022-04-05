# Free Code Camp: Front End Libs Project 4 - JavaScript Calculator

## JavaScript Calculator

### Project Aims:

The aim of this project was to build a calculator with functionality similar to: https://codepen.io/freeCodeCamp/full/wgGVVX

This project was built using the following technologies:

- **HTML**
- **JavaScript** with **[Node.js](https://nodejs.org/en/) / [NPM](https://www.npmjs.com/)** for package management
- **[React](https://reactjs.org/)** for application view with React Hooks to handle the application state
- **[Bootstrap](https://getbootstrap.com/)** for styling with some custom **SASS / SCSS**
- **[FontAwesome](https://fontawesome.com/)** for icons
- **[Create-React-App](https://create-react-app.dev/)** for initial app template with bundling
- **[Jest](https://jestjs.io/)** and **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** for testing
- **[GitHub Actions](https://github.com/features/actions)** for automated CI/CD workflows

### Project Requirements:

- User Story #1: My calculator should contain a clickable element containing an = (equal sign) with a corresponding id="equals".

- User Story #2: My calculator should contain 10 clickable elements containing one number each from 0-9, with the following corresponding IDs: id="zero", id="one", id="two", id="three", id="four", id="five", id="six", id="seven", id="eight", and id="nine".

- User Story #3: My calculator should contain 4 clickable elements each containing one of the 4 primary mathematical operators with the following corresponding IDs: id="add", id="subtract", id="multiply", id="divide".

- User Story #4: My calculator should contain a clickable element containing a . (decimal point) symbol with a corresponding id="decimal".

- User Story #5: My calculator should contain a clickable element with an id="clear".

- User Story #6: My calculator should contain an element to display values with a corresponding id="display".

- User Story #7: At any time, pressing the clear button clears the input and output values, and returns the calculator to its initialized state; 0 should be shown in the element with the id of display.

- User Story #8: As I input numbers, I should be able to see my input in the element with the id of display.

- User Story #9: In any order, I should be able to add, subtract, multiply and divide a chain of numbers of any length, and when I hit =, the correct result should be shown in the element with the id of display.

- User Story #10: When inputting numbers, my calculator should not allow a number to begin with multiple zeros.

- User Story #11: When the decimal element is clicked, a . should append to the currently displayed value; two . in one number should not be accepted.

- User Story #12: I should be able to perform any operation (+, -, \*, /) on numbers containing decimal points.

- User Story #13: If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign). For example, if 5 + _ 7 = is entered, the result should be 35 (i.e. 5 _ 7); if 5 _ - 5 = is entered, the result should be -25 (i.e. 5 _ (-5)).

- User Story #14: Pressing an operator immediately following = should start a new calculation that operates on the result of the previous evaluation.

- User Story #15: My calculator should have several decimal places of precision when it comes to rounding (note that there is no exact standard, but you should be able to handle calculations like 2 / 7 with reasonable precision to at least 4 decimal places).

Note On Calculator Logic: It should be noted that there are two main schools of thought on calculator input logic: immediate execution logic and formula logic. Our example utilizes formula logic and observes order of operation precedence, immediate execution does not. Either is acceptable, but please note that depending on which you choose, your calculator may yield different results than ours for certain equations (see below example). As long as your math can be verified by another production calculator, please do not consider this a bug.

EXAMPLE: 3 + 5 x 6 - 2 / 4 =

- Immediate Execution Logic: 11.5
- Formula/Expression Logic: 32.5

### Project Writeup:

For the fourth Free Code Camp: Front End Libraries Project, I decided to build the project using the React Library, utilising Create React App to create the intial app template and handle bundling / building the project. The application state is controlled using React Hooks (`useState`, `useEffect`).

Going beyond the required User Stories outlined above, this JavaScript Calculator allows users to input calculations requiring parentheses, powers and natural logarithms. Furthermore, completed calculations are stored in a calculation history display beneath the calculator, and previous calculations can be reloaded into the calculator by clicking on the history item if desired. In addition the history display can be cleared by clicking the trash-can icon.

A basic test suite in Jest / React Testing Library has been created, and these tests are run as part of a Github Actions CI/CD workflow. When changes to the project are pushed to the main branch, the project dependencies are installed and the test suite is run. If the test suite completes successfully, a production build of the project is created, and then deployed onto GitHub pages (on the gh-pages branch).

### Project Files:

- `/public` - this folder contains all public content for the app, including favicon images, the web manifest, and the basic index.html template onto which the React component tree is rendered.

- `/src/index.js` - this is the entry point to the Reac application, it renders the react component tree on the DOM, as well as importing Bootstrap styles for the application.

- `/src/App.js` - is the top level component of the application, a simple container component that renders the `NavBar` and `Calculator` components.

- `/src/App.test.js` - test suite for the calculator application, including tests that various components render and logical tests for calulator and history display functionality.

### Components:

- `NavBar.js` is a presentational navbar component, providing links to other projects / sites.

- `Calculator.js` is the major stateful component of the application. It contains various state variables (`formula`, `number`, `history`, etc.) as well as various handler and helper functions to update the calculator state in a logical manner based on input buttons pressed. This component also initialises document event listeners for `keyDown` and `keyUp` events in order to allow the calculator to be controlled via sensible keyboard input. State variables and handler functions are passed to its child components (`ButtonsDisplay` and `HistoryDisplay`):

  - `ButtonsDisplay.js` is the component responsible for rendering all the calculator buttons, and attaching the required onClick events to each button. This is achieved using the JS map higher order function, applied to an array of objects containing button information.

  - `HistoryDisplay.js` is the component responsible for displaying all previous calculations made in a scrollable list, with onClick events loading the historical calculation into the calculator itself. As with `ButtonsDisplay.js` this is achieved using the JS map higher order function on the `history` state (passed to `HistoryDisplay` as props by `Calculator`). A FontAwesome trashcan icon is also rendered with an onclick function that clears the `history` state held in `Calculator`.

### Usage:

Requires Node.js / NPM in order to install required packages. After downloading the repo, install required dependencies with:

`npm install`

The CRA development server can then be started with:

`npm start`

The development can then be viewed at `http://localhost:3000/` in the browser.

A production build can be created in the `dist/` folder by running:

`npm run build`

The build can be easily served by installing `serve`:

`npm install -g serve`
`serve -s build`

The test suite can be run with:

`npm test`
