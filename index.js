// const taskContainer = document.getElementsByClassName("task_container");
// console.log(taskContainer);       //this will give in the form of array

//to directly access the values we will use the approach given below

const taskContainer = document.querySelector(".task_container");
console.log(taskContainer); 

let globalStore = [];

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" >
              <div class="card ">
                <div class="card-header d-flex justify-content-end gap-2">
                  <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
                  <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
                  <i class="fas fa-trash-alt"id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>
                </div>
                <img src=${taskData.imageUrl} class="card-img-top" alt="scenery">
                <div class="card-body">
                  <h5 class="card-title">${taskData.taskTitle}</h5>
                  <p class="card-text">${taskData.taskDescription}</p>
                  <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                </div>
                <div class="card-footer">
                  <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
                </div>
              </div>
            </div>
            `;


const loadInitialCardData = () =>{
  // access local storage to get tasky card data
  const getCardData = localStorage.getItem("tasky");

  // convert from string to normal object
  const {cards} = JSON.parse(getCardData);


  // loop over those array of task object to create HTML card 
  cards.map((cardObject) => {
    // inject it to DOM
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
    // update our globalStore
    globalStore.push(cardObject);

  })

  
};

const saveChanges = () => {
    const taskData ={ 
        id: `${Date.now()}` ,      //unique number for id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };
    //taskContainer.push(taskData);   //will give an error
    
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));

    globalStore.push(taskData);

    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};

const deleteCard = (event) =>{
  event=window.event;
  // id
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  // match the id of element with the id inside the globalStore

  // if match found remove
  globalStore = globalStore.filter((cardObject) => cardObject.id !==targetID);
  localStorage.setItem("tasky", JSON.stringify({cards:globalStore}))
  // contact parent
  if(tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
  

};

// issues

// page refresh will cause the data to be deleted--->local storage-->limit is 5MB

// API-->Application Programming Interface

// local storage--> Application
// Programming--> acces application via programming
// Interface-->acts as a mediator

// Features
// Delete the card
// Edit the card
// open the card