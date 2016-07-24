//automatically adds click listeners to all the add buttons
document.getElementById('add').addEventListener('click', add);
document.getElementById('task').addEventListener('keypress',function(e){if(e.keyCode===13){add();}})
//shows all the to-dos
show();

//get all the to-do objects.
function get_todos() {
	//initiate array for them
    var todos = new Array;
	//get them from local storage
    var todos_str = localStorage.getItem('todo');
	//if there is at least one object already we need to convert it from JSON to string
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}
 
function add() {
	//get the input field
    var task = document.getElementById('task').value + ' - ' + getCurrentDate();
	//get all the other todos
    var todos = get_todos();
	//put this one at the bottom
    todos.push(task);
	//add the string to local storage with 'todo' tags
    localStorage.setItem('todo', JSON.stringify(todos));
	
	
    show();
	
	//empty input field
	document.getElementById('task').value = '';
 
    return false;
}
 
function remove() {
    //whatever you clicked on, gets its ID which will be a number
	var id = this.getAttribute('id');
	//get all other todos
    var todos = get_todos();
	//delay
	setTimeout(function(){
		//take out that todo
		todos.splice(id, 1);
		//re-add all the todos to the local storage
		localStorage.setItem('todo', JSON.stringify(todos));
	
		//show them all now
		show();
		return false;
	},(1000));
}
 
function show() {
	//get all todos
    var todos = get_todos();
	
	//begin unordered list
    var html = '<ul>';
	//iterate through all todos and put them into list tags, with in-order numerical IDs
    if(todos.length !== 0){
		for(var i=0; i<todos.length; i++) {
			html += '<li>' + todos[i] + '	' + '<input class="remove" type = "checkbox" id="' + i  + '"></input></li>';
		};
	}
	else{
		html += 'List is empty.';
	}
	
    html += '</ul>';
 
	//change the inner HTML to be what you just got
    document.getElementById('todos').innerHTML = html;
 
	//for each todo you just placed, give the checkboxes event listeners
    var checkboxes = document.getElementsByClassName('remove');
    for (var i=0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', remove);
    };
}

function getCurrentDate(){
	var today = new Date();
	var dd = today.getDate();
	//January is 0
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	
	//puts zero in front if needed
	if(dd < 10){
		dd = '0'+dd;
	}
	
	//puts zero in front if needed
	if(mm < 10){
		mm = '0'+mm;
	}
	
	today = mm+'/'+dd+'/'+yyyy;
	
	return today;
}

function edit(){
	//get the id value of which one you want to edit
	var id = this.getAttribute('id');
	
	
}
 
