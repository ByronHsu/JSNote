# Redux

### Core concept

- state
	- always immutable
	- universal
	- ``getState`` for accessing the current state of the application
	- ``dispatch`` for dispatching an action
	- ``subscribe`` for listening on state changes
- action
	- which action do you want to do to ``state``
	- type, payload
- reducer
	- two args: (state,action)
	- use switch to handle different case

### React-Redux
- Provider
	- HOC
	- Provider wraps up your React application and makes it aware of the entire Redux’s store.
- mapStateToProps
	- map certain state to components' props
- mapDispatchToProps
	- map certain state to components' props
- Connect
	- connect(mapStateToProps, mapDispatchToProps)(Component);

### Reference

https://www.valentinog.com/blog/react-redux-tutorial-beginners/