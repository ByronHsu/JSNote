# JSNote
> Try EveryThing with Javascript - CTLin

### Variable: ``let``, ``const``, ``var``
- 比較
	<table>
	  <tr>
	    <th></th>
	    <th>Scope</th>
	    <th>Reassignable</th>
	    <th>Redeclarable</th>
	    <th>Mutable</th>
	    <th>Temporal Dead Zone</th>
	  </tr>
	  <tr>
	    <th>const</th>
	    <td>Block</td>
	    <td>No</td>
	    <td>No</td>
	    <td>**Yes**</td>
	    <td>Yes</td>
	  </tr>
	  <tr>
	    <th>let</th>
	    <td>Block</td>
	    <td>Yes</td>
	    <td>No</td>
	    <td>Yes</td>
	    <td>Yes</td>
	  </tr>
	   <tr>
	    <th>var</th>
	    <td>Function</td>
	    <td>Yes</td>
	    <td>Yes</td>
	    <td>Yes</td>
	    <td>No</td>
	  </tr>
	</table>
- ``var``
	- ``var hoisting``
		- 概念：``var``的宣告會被自動提升到最上面(**function**或global)去，但assingment仍維持在原位
		- **A clear example**
		
		```js
		function do_something() {
		  console.log(bar); // undefined
		  var bar = 111;
		  console.log(bar); // 111
		}
		
		// is implicitly understood as: 
		function do_something() {
		  var bar;
		  console.log(bar); // undefined
		  bar = 111;
		  console.log(bar); // 111
		}
		```
- ``const``
	- ``const`` is **mutable** 
		- Why：如果他是 arr 或 obj，他可以push東西/更改property

- What is **Temporal Dead Zone**(TDZ)?
	- 概念：事實上，當control flow進入到一個新的scope，``const``,``let``也會自動``hoisting``，但與``var``不同的是，在他們還沒有被assign值的時候，若想access他們，會丟出``reference error``，從進入scope到被assign值的那個區間，就被稱作**TDZ**
	- Example
	
		```js
		// Accessing `x` here before control flow evaluates the `let x` statement
		// would throw a ReferenceError due to TDZ.
		// console.log(x);
		
		let x = 42;
		// From here on, accessing `x` is perfectly fine!
		console.log(x);
		```