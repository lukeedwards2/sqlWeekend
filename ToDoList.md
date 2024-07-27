## Requirements:

* Create a front-end experience that allows a user to create a to-do item.
* When a to-do item is created:
    * It should be stored inside the database table.
    * The DOM should update and display the new to-do item.
* Each to-do item should have a button to 'Complete' or 'Delete' it.
* When a to-do item is completed:
    * Its `isComplete` value (in the database table) should be updated to `TRUE`.
    * A CSS class of `completed` should be applied to the to-do item.
        * This class should make it visually clear that the to-do is complete.
        * Example, the background of the to-do item could change from gray to green.
            * *Not a requirement, but*: It'd greatly improve the user experience if the "complete" button appears to be somehow checked-off or disabled when a to-do has been marked as completed.
* When a to-do item is deleted:
  * It should be removed from the database table.
  * The DOM should update to show that list no longer includes the deleted to-do item.

## User Stories:

The assumption I'm making here is that the to-do list data will be stored in a database table.

Each of these user stories translates to a feature!

* A user can see their list of to-dos.
* A user can create a new to-do.
* A user can mark to-do items as completed.
* A user can delete to-do items.

## Build Plan:

### Get set up.

* Create a new database named `weekend-to-do-app`.
* Inside the new database, run the `CREATE TABLE` and `INSERT INTO` queries found in `database.sql`.
* Check to see if the repository contains all the files we need.
    * Have all the files, but need to add a `defer` to where we source `client.js` in `index.html`.
* Check to see if the repository's `package.json` contains the dependencies we need.
    * All the necessary dependencies are there.
    * Do `npm install`.
* Confirm this 👆 is all good to go by starting the server and opening `http://localhost:5001` in the browser.
* Try running `npm test` to verify the tests run.

### A user can see their list of to-dos.

* Make a `<table>` in `index.html` with the `<thead>` and `<tbody>` sections.
* When the DOM loads, our `client.js` file will need to execute a function that makes an HTTP `GET /todos` request.
* In `todos.router`, make the `router.get` route.
* The route we just made will need to send a `SELECT * FROM` SQL query (using `pool.query()`!) to the database. (To get the to-do items!)
* Send the SQL query's resulting data back to the client.
* When the data arrives client-side, need to loop through the array of objects and render a `<tr>` for each to-do item. (Inside the `<tbody>`.)

### A user can create a new to-do.

* Create a `<form>` in `index.html` with a single `<input>` for collecting to-do text and a submit `<button`>.
* Need a function to run when the submit `<button>` gets clicked.
    * Function will need to get what the user typed into the input and make an HTTP `POST /todos` request that sends data that looks something like:
        * `{newTodoText: 'whatever the user typed'}`
* In `todos.router`, make the `router.post` route.
* The route we just made will need to send an `INSERT INTO` SQL query (using `pool.query`!) to the database. (To insert a new row.)
* If the `INSERT INTO` worked, send status 201 back to the client-side.
* When client-side receives status 201, need to call the function that gets the to-dos data and renders it.

### A user can delete to-do items.

* Create a `<button>` that will be called `delete` in `index.html`
* Need a function that will delete the rows that have been previously added when the user clicks the button
* Make a `delete` request in the function that will send the data
* Make the route in `router.post`
* Send status 201 back to the client side if the function works

### A user can mark to-do items as completed.

* Create a `<button>` called `complete` in `index.html`
* Will need a function in `client.js` that that will show that the user completed a to-do-list when clicked on
* This function should contain a `put` method in it to send to the server side
* In `todos.router` make a `put` route
* Send status 200 back to the client if the function works