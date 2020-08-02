
let tasks = []; 

function add(text)
{

	// making a task object 
	const newTask = { 
		text,
		checked: false,
		id: Date.now(),
	};

	tasks.push(newTask);
	
	// 'printing' each task to the screen
	const list = document.querySelector('.myList');

	// insertAdjacentHTML uses myList as a reference point to start adding each todo-item
	list.insertAdjacentHTML('beforeend', `
    <li class="todo-item not-done" data-key="${newTask.id}">
      <input class="js-tick" id="${newTask.id}" type="checkbox"/>
      <span>${newTask.text}</span>
      <button type='button' class="js-delete-todo"></button>
    </li>
  	`);

}


function strikeThrough(key)
{	

	// locate the index which holds the id of the passed key
	const index = tasks.findIndex(item => item.id == Number(key));
	tasks[index].checked = !tasks[index].checked // checked is defaulted to false - do the opposite of checked

	// grab the item with the specific key
	const item = document.querySelector(`[data-key='${key}']`);

	if (tasks[index].checked)
	{
    	item.classList.add('done');
    	item.classList.remove('not-done');
  	} else 
  	{
    	item.classList.remove('done');
  	}

}

function deleteTask(key)
{
	// find key item and remove from dom
	const item = document.querySelector(`[data-key='${key}']`);
  	item.remove();

  	const list = document.querySelector('.js-todo-list');
  	if (tasks.length === 0) list.innerHTML = '';
}

function hideDones(item) 
{
	item.style.display = 'none';
}

function hideNotDones(item)
{
	item.style.display = 'none';
}

function displayUncompletedTasks(item)
{
	item.style.display= 'block';
}

function showCompletes(item)
{
	item.style.display='block'
}

function showAllItems(item)
{
	item.style.display = 'block';
}


let form = document.querySelector('form');  
form.addEventListener("submit", event =>{

	// prevents page refreshing
	event.preventDefault();

	// add task to array
	let input = document.querySelector('input');
	const taskEntered = input.value.trim();
	if (taskEntered !== '')
	{
		add(taskEntered);
		input.value = '';
	}
	
});


const list = document.querySelector('.myList');
list.addEventListener('click', event => {
	// if element that was clicked in the list was a tick box
	if (event.target.classList.contains('js-tick'))
	{	
		// find key value from tick box parent element (<li>)
		const key = event.target.parentElement.dataset.key;
		strikeThrough(key);
	}

	if (event.target.classList.contains('js-delete-todo'))
	{
		const item = event.target.parentElement.dataset.key;
		deleteTask(item);
	}

});

const clearAll = document.querySelector('.clearAll');
clearAll.addEventListener('click', event =>{
	const fullList = document.querySelector('.myList');
	fullList.innerHTML = ' ';
});

const uncompletedButton = document.querySelector('.uncompletedOnlyButton');
uncompletedButton.addEventListener('click', event =>{
	var hide = document.querySelectorAll('.done');
	hide.forEach(hideDones);

	var show = document.querySelectorAll("li:not(.done)");
	show.forEach(displayUncompletedTasks);

});

const completedButton = document.querySelector('.completedButton');
completedButton.addEventListener('click', event =>{
	var hide = document.querySelectorAll("li:not(.done)");
	hide.forEach(hideNotDones);


	var show = document.querySelectorAll('.done');
	show.forEach(showCompletes);
});

const showAll = document.querySelector('.allTasks');
showAll.addEventListener('click', event =>
{
	var list = document.querySelectorAll('.todo-item');
	list.forEach(showAllItems);
});