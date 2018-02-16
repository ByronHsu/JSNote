# React

### setup
- webpack
- babel

```sh
npm install --save--dev babel-loader babel-core 
npm install babel-preset-es2015 babel-preset-react
```

```js
// .babelrc
{
    "presets":[
        "es2015", "react"
    ]
}
```
- react

```sh
npm install react react-dom
```

### 原理

#### jsx
- JSX is a shortcut for using the React.createElement() API
- Each tag, like ``<div />``, is transformed into a call to React.createElement(). Any attributes become props of the instantiated component.

```js
// before
const a = <div />

const b = (
  <div
    foo='hello'
    bar={baz}>
    <span>42</span>
  </div>
)
// after
var a = React.createElement('div', null);

var b = React.createElement(
  'div',
  {
    foo: 'hello',
    bar: baz },
  React.createElement(
    'span',
    null,
    '42'
  )
);
```

### 基礎

#### react and react.dom
- react contains the APIs for creating components
- react-dom contains the APIs for rendering to the browser DOM
- we generally must import React even though we don't explicitly use it in our code - this is because our **JSX transformed behind the scenes to React.createElement.**

#### 常用API
- React.Component
	- React components are the building blocks of a React app. Components are classes that we instantiate using JSX syntax
	- normal tag in html will be processed automatically in react
- Stateless Functional Components (SFCs)
	- 不需要有state, 不需要對state操作, 就直接return jsx
```jsx
const app = (props) => <div>Hello {props.name}</div>;
```

