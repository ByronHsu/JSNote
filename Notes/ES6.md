# 常用語法

### Arrow function
- More concise
- ``this`` is picked up from surroundings
- implicit return

### Destructuring objects and arrays

- Object

	```js
	const person = {
	  firstName: "Nick",
	  lastName: "Anderson",
	  age: 35,
	  sex: "M"
	}
	```
	- assignment
	
	```js
	// 將person.firstName assign給first
	// 將person.age assign給age
	// 將person.city assign給city, 但他有一個default value = 'Paris'
	const { firstName: first, age, city = "Paris" } = person; // That's it !
	```
	
	- function args

	```js
	function joinFirstLastName({ firstName, lastName }) {	
		return firstName + '-' + lastName;
	}
	
	joinFirstLastName(person); // "Nick-Anderson"
	```
- Array

	- assignment
	
	```js
		const [x, y] = myArray;
	```

### Spread

- Array

```js
const arr1 = ["a", "b", "c"];
const arr2 = [...arr1, "d", "e", "f"]; // ["a", "b", "c", "d", "e", "f"]

function myFunc(...arguments) {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

myFunc("Nick", "Anderson", 10, 12, 6);
```
- Object

```js
const myObj = { x: 1, y: 2, a: 3, b: 4 };
const { x, y, ...z } = myObj; // object destructuring here
```