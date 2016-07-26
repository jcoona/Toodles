//shows all the to-dos
show();

//automatically adds listeners to the create button and for entering in the text field
document.getElementById('add').addEventListener('click', function(){add(document.getElementById('task').value)});
document.getElementById('task').addEventListener('keypress',function(e){if(e.keyCode===13){add(this.value);}});

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
 
function add(task) {
	//add date to end of task
	task = task + ' - ' + getCurrentDate();
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

function remove(id,timeout) {
	//get all other todos
    var todos = get_todos();
	//delay
	setTimeout(function(){
		window.alert("Please wait");
		//take out that todo
		todos.splice(id, 1);
		//re-add all the todos to the local storage
		localStorage.setItem('todo', JSON.stringify(todos));
	
		//show them all now
		show();
		return false;
	},(timeout));
}
 
function show() {
	//get all todos
    var todos = get_todos();
	
	//begin unordered list
    var html = '<ul>';
	//iterate through all todos and put them into list tags, with in-order numerical IDs
    if(todos.length !== 0){
		for(var i=0; i<todos.length; i++) {
			html += '<li>' + todos[i] + '	' + '<img class ="edit" src="edit_icon.png" id="' + i + '"></img><input class="remove" type = "checkbox" id="' + i  + '"></input></li>';
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
        checkboxes[i].addEventListener('click', function(){remove(this.getAttribute('id'),1000);});
    };
	
	//set up edit buttons with event listeners
	var editbuttons = document.getElementsByClassName('edit')
	for(var i = 0; i < editbuttons.length; i++){
		editbuttons[i].addEventListener('click',edit);
	}
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
	//get the edit ID
	var id = this.getAttribute('id');
	
	var todos = get_todos();
	//get the todo we are looking for, but we have to take off the date for the autofill...
	var task = todos[id];
	var prefill = '';
	
	//takes date off of prefill
	for(var i = 0; i<task.length-13; i++){
		prefill = prefill + task[i];
	}
	
	//prompt user for change
	var change = prompt("Please edit your entry.",prefill);
	//if user doesnt make a change...
	if(change.length === 0){
		return false;
	}
	
	else{
	add(change);
	remove(id,0);
	return false;
	}
	
}
 
