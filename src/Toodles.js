//randomize background images
var backgrounds = ['tamra.gif','nene.gif','tati.gif','kylie.gif','bicth.gif','emma.gif','mariah.gif','laganja.gif','alyssa.gif','kim.gif','willam.gif','kenya.gif','bianca.gif','brandi.gif'];
$('body').css({'background-image': 'url(images/backgrounds/' + backgrounds[Math.floor(Math.random() * backgrounds.length)] + ')'});

//shows all the to-dos
show('todo');
show('wishlist');

//automatically adds listeners to the create button and for entering in the text field
var buttons = document.getElementsByClassName('add');
for(var a=0; a<buttons.length; a++){
	var buttontype = buttons[a].getAttribute('data-type');
	if(buttontype.localeCompare('todo')==0){
		buttons[a].addEventListener('click', function(){add(document.getElementById('todo').value,'todo')});
	}
	else{
		buttons[a].addEventListener('click', function(){add(document.getElementById('wishlist').value,'wishlist')});
	}
}
var inputs = document.getElementsByClassName('task');
for(var b=0; b<inputs.length; b++){
	var inputtype = inputs[b].getAttribute('data-type');
	if(inputtype.localeCompare('todo')==0){
		inputs[b].addEventListener('keypress', function(e){if(e.keyCode===13){add(document.getElementById('todo').value,'todo')}});
	}
	else{
		inputs[b].addEventListener('keypress', function(e){if(e.keyCode===13){add(document.getElementById('wishlist').value,'wishlist')}});
	}
}

//get all the to-do objects.
function get_todos(type) {
	//initiate array for them
    var todos = new Array;
	//get them from local storage
    var todos_str = localStorage.getItem(type);
	//if there is at least one object already we need to convert it from JSON to string
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}
 
 //add a task
function add(task, type) {
	//add date to end of task
	task = task + ' - ' + getCurrentDate();
	//get all the other todos
    var todos = get_todos(type);
	//put this one at the bottom
    todos.push(task);
	//add the string to local storage with 'todo' tags
    localStorage.setItem(type, JSON.stringify(todos));
	
	
    show(type);
	
	//empty input field
	document.getElementById(type).value = '';
 
    return false;
}

//remove a task
function remove(id,timeout,type) {
	//get all other todos
    var todos = get_todos(type);
	//delay
	setTimeout(function(){
		//take out that todo
		todos.splice(id, 1);
		//re-add all the todos to the local storage
		localStorage.setItem(type, JSON.stringify(todos));
	
		//show them all now
		show(type);
		return false;
	},(timeout));
}
 
 //show all tasks
function show(type) {
	//get all todos
    var todos = get_todos(type);
	
	//begin unordered list
    var html = '<ul>';
	//iterate through all todos and put them into list tags, with in-order numerical IDs
    if(todos.length !== 0){
		for(var i=0; i<todos.length; i++) {
			html += '<li>' + todos[i] + '	' + '<img class ="edit" src="images/edit_icon.png" id="' + i + '" data-type = "' + type + '"></img><input class="remove" type = "checkbox" id="' + i  + '"></input></li>';
		};
	}
	else{
		html += 'List is empty.';
	}
	
    html += '</ul>';
 
	//change the inner HTML to be what you just got
	var div = type + 'div';
    document.getElementById(div).innerHTML = html;
 
	//for each todo you just placed, give the checkboxes event listeners
    var checkboxes = document.getElementsByClassName('remove');
    for (var i=0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', function(){remove(this.getAttribute('id'),1000,type);});
    };
	
	//set up edit buttons with event listeners
	var editbuttons = document.getElementsByClassName('edit');
	for(var i = 0; i < editbuttons.length; i++){
		editbuttons[i].addEventListener('click',edit);
	}
}

//get the current date
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

//edit a task
function edit(){
	//get the edit ID
	var id = this.getAttribute('id');
	var type = this.getAttribute('data-type');
	
	var todos = get_todos(type);
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
	add(change, type);
	remove(id,0, type);
	return false;
	}	
}