Technology stack
Languages & syntax choices
TypeScript


A superset of JavaScript that allows the use of static typing, interfaces and classes. Developed by Microsoft.
Differences to Java
Interfaces can have variables. These variables are passed onto the implementer of the interface.
Variables do not necessarily have to be typed. This allows compatibility with JavaScript packages that do not provide types.
Optional parameters are supported in TypeScript. This renders the Builder pattern somewhat redundent and is thus not used in our code base.
readonly is supported in TypeScript. We use this public readonly over accessor methods, in all 'model data' type objects.
ECMAScript 2015


The 6th major release of ECMAScript. A standardized JavaScript language. Provides us with classes and the core features of OO langages (E.g. classes).
JSX Harmony
JSX harmony is a language primarily built for React. The language was primarily used to make React components easier to read and faster to write.



Facebook's JavaScript library for rendering view type objects for use in graphical user interfaces for a set of state.
Node.js


Node.js is a server framework built from Chrome's JavaScript V8 engine. It was chosen for a number of reasons.
Babel


Babel essentially allows developers to transpile newer and alternative versions of JavaScript into older, more widely supported versions of JavaScript. We were unsure of whether the markers' used modern browsers so Babel ensured application compatiblity with their browsers.
Webpack


Webpack was used to tie all the languages and frameworks used in our product together and bundle the backend and frontend applications, each into single JavaScript files. In addition, Webpack was used as a means of hot module replacement which was handy for frontend development and rapid prototyping of features and functionality.
Frameworks & libraries we decided against
Redux


Redux is an exellent framework for managing state in an application and works well with React. However, Redux has a functional programming based nature which didn't fit in with the assignment (object oriented assignment).
