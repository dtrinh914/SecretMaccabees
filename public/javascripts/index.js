const addBtn = document.querySelector('#addBtn');
const deleteBtn = document.querySelectorAll('.deleteBtn');

//creates div containing name/email input field for another participant
function addPerson(){
    const id = ID();
    let person = document.createElement('div');
    person.setAttribute('class', 'person');
    person.setAttribute('data-key', id);
    person.innerHTML = `<button class='deleteBtn'>X</button>
                        <input type="text" name='name' placeholder='Name'>
                        <input name='email' type='email' placeholder='Email'>`
    document.querySelector('#participants').appendChild(person)
    document.querySelector(`.person[data-key=${id}] .deleteBtn`).addEventListener('click', handleDelete); 
}

//handling execution of buttons
function handleAdd(evt){
    evt.preventDefault();
    addPerson();
}

function handleDelete(evt){
    evt.preventDefault();
    this.parentElement.remove();
}

//adding event handlers to btns
deleteBtn.forEach( btn =>{ btn.addEventListener('click', handleDelete)});
addBtn.addEventListener('click', handleAdd)

//function to generate unique ids 
var ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };