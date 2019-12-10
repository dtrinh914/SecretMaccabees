const addBtn = document.querySelector('#addBtn');
const submitBtn = document.querySelector('#submitBtn');

//creates div containing name/email input field for another participant
function addPerson(){
    const id = ID();
    let person = document.createElement('tr');
    person.setAttribute('class', 'person add');
    person.setAttribute('data-key', id);
    person.innerHTML = `<td class='delete'>
                        <button class='deleteBtn'><i class=" fas fa-times"></i></button>
                        <input type="text" name='name' placeholder='Name'></td>
                        <td><input name='email' type='email' placeholder='Email'></td>`
    document.querySelector('#participants tbody').appendChild(person)
    const deleteBtn = document.querySelector(`.person[data-key=${id}] .deleteBtn`);
    deleteBtn.addEventListener('click', handleDelete);
}

//calls addPerson()
function handleAdd(evt){
    evt.preventDefault();
    for(let i = 0; i < 5; i++){
        addPerson();
    }
}

//adds an event listener to the wrapping div and adds a class causing it to animate
function handleDelete(evt){
    evt.preventDefault();
    const block = this.parentElement.parentElement;
    block.addEventListener('animationend', handleDeleteAnimation);
    block.classList.add('dltanimation');
}

//removes element after animation ends
function handleDeleteAnimation(){
    this.remove();
}

// validates form before submitting
function handleSubmit(evt){
    evt.preventDefault();
    alert('Error');
}

//adding event handlers to btns
addBtn.addEventListener('click', handleAdd);
// submitBtn.addEventListener('click', handleSubmit);


//function to generate unique ids 
var ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };