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
                        <td><input type='email' name='email' placeholder='Email'></td>`
    //appends html to DOM and adds event listener for delete button
    document.querySelector('#participants tbody').appendChild(person)
    const deleteBtn = document.querySelector(`.person[data-key=${id}] .deleteBtn`);
    deleteBtn.addEventListener('click', handleDelete);
}

//creates 5 more participants by calling addPerson
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
    let errorMsgs = [];

    deleteEmptyRows();
    checkEmptyInputs(errorMsgs);
    validateEmailInputs(errorMsgs);
    generateErrorMessage(errorMsgs);

    if(errorMsgs.length === 0){
        document.forms['participants'].submit();
    }
}

//create an errorSection with a list of errors from an array and append to the body
function generateErrorMessage(errorArr){
    //check to see if errorSection already exist in Html/if not create new element
    let errorSection = document.querySelector('.error-messages');
    let errorLis  = '';
    errorArr.forEach( error => {
        errorLis = errorLis + `<li>${error}</li>`
    });
    errorSection.innerHTML= `<p>The following is a list of errors that need to be corrected:</p>
                             <ul>${errorLis}</ul>`;
}

//adding event handlers to btns
addBtn.addEventListener('click', handleAdd);
submitBtn.addEventListener('click', handleSubmit);


//                   //
// UTILITY FUNCTIONS //
//                   //

//function to generate unique ids 
var ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };
//check to see if string is blank or only white-space
function isStrEmpty(str){
    if(str === undefined || str === null){
        return true;
    }
    if (/\S/.test(str)){
        return false;
    }
    return true;
}

//                          //
//FORM VALIDATION FUNCTIONS //
//                          // 

//checks to see which items in a group of fields are empty
//returns the data-key of the parent of those empty fields
function areFieldsEmpty(field){
    const selected = document.querySelectorAll(field);
    const empty = [];
    selected.forEach( item => {
        if(isStrEmpty(item.value)){
            let parentID = item.parentElement.parentElement.getAttribute('data-key');
            empty.push(parentID);
        }
    });
    return empty;
}

//checks to see if the id belongs to a required field
function isReq(id){
    switch(id){
        case '_req1':
        case '_req2':
        case '_req3':
            return true;
        default:
            return false;
    }
}

//checks if a row has an empty participant and empty email value and then deletes those rows
function deleteEmptyRows(){
    const noName = areFieldsEmpty("input[name='name']");
    const noEmail = areFieldsEmpty("input[name='email']");
    let map = {};
    noName.forEach(id => map[id] = true);

    //if the id is in the noName array + noEmail array and is not a required field, the row is deleted
    noEmail.forEach(id => {
        if(map[id] && !isReq(id)){
            document.querySelector(`.person[data-key=${id}]`).remove();
        }
    })
}

//Validates all input fields to make sure that they are not empty
function checkEmptyInputs(errorArr){
    let problems = 0;
    const inputs = document.querySelectorAll("input");
    
    inputs.forEach(input => {
        if(isStrEmpty(input.value)){
            input.classList.add('highlighted');
            problems++;
        } else {
            input.classList.remove('highlighted')
        }
        input.setAttribute('aria-required', true);
    }) 

    if(problems > 1){
        errorArr.push('There are multiple empty fields that need to be filled out.');
    }
    else if(problems === 1){
        errorArr.push('There is an empty field that needs to be filled out.');
    }
}

//Validate all email fields and highlights the problem ones
function validateEmailInputs(errorArr){
    let problems = 0;
    const emails = document.querySelectorAll("input[name='email']");
    emails.forEach( email => {
        if(!validateEmail(email.value)){
            email.classList.add('highlighted');
            email.setAttribute('aria-invalid', true);
            problems++;
        } else {
            email.classList.remove('highlighted');
            email.setAttribute('aria-invalid', false);
        }
    })

    if(problems > 1){
        errorArr.push('There are multiple fields with an invalid email address.');
    } 
    else if(problems === 1){
        errorArr.push('There is a field with an invalid email address.')
    }
}

// Validate email function
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}