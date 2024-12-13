//######################################
//############## To-Do App
//############## Author: Keys
//######################################
//Select the required elements
const addBtn = document.querySelector(".add-button");
const todoLists = document.querySelector(".todo-lists");
const textBox = document.querySelector("#todo-text-area");
const todoApp = document.querySelector(".todo-app");
const clearBtn = document.querySelector(".clear-button");
const toolTip = document.querySelector(".tooltiptext");
const todoForm = document.querySelector("form");
const completedTasks = document.querySelector(".completed-tasks-lists");
const numberOfCompletedTasks = document.querySelector(".no-of-completed-tasks");
const completedTasksSec = document.querySelector(".completed-tasks");
const summary = document.querySelector("summary");


//######################################################
//######### Control the height of the tasks list
//######################################################
function controlTasksHeight() {
    //When the page reloads
    if(!completedTasksSec.open){
        //When the dropdown is collapsed after reloading page
        todoLists.style.height = "455px"
    }else {
        //When the dropdown is expanded after reloading page
        todoLists.style.height = "250px"
    }

    //When the drop down is clicked
    summary.addEventListener("click", function() {
        if(!completedTasksSec.open){
            //When the dropdown is expanded through clicking
            switch(completedTasks.childNodes.length){
                case 1:
                    todoLists.style.height = "361px"
                    break
                case 2:
                    todoLists.style.height = "325px"
                    break
                case 3:
                    todoLists.style.height = "289px"
                    break
                case 4:
                    todoLists.style.height = "253px"
                    break
                default:
                    todoLists.style.height = "247px"
            }
        } else {
            //When the dropdown collapses through clicking
            todoLists.style.height = "397px"
        }
    })

        let noOfCompTasks = JSON.parse(localStorage.getItem("noOfCompTasks"))

    //When the page is reloaded
    if(noOfCompTasks == null || noOfCompTasks == undefined || noOfCompTasks == 0) {
        // If the completed tasks number doesn't exist or 0 on local storage
        todoLists.style.height = "455px"
    } else {
        // If the completed tasks number exists on local storage
        if(!completedTasksSec.open) {
            //When the drop down is collapsed
            todoLists.style.height = "397px"
        } else {
            switch(completedTasks.childNodes.length){
                case 1:
                    todoLists.style.height = "361px"
                    break
                case 2:
                    todoLists.style.height = "325px"
                    break
                case 3:
                    todoLists.style.height = "289px"
                    break
                case 4:
                    todoLists.style.height = "253px"
                    break
                default:
                    todoLists.style.height = "247px"
            }
        }
    }
}


//#####################################################################
//########## Controls the state of the drop-down for completed tasks
//#####################################################################
function trackDropDownState() {
    let noOfCompTasks = JSON.parse(localStorage.getItem("noOfCompTasks"))
    
    if(noOfCompTasks == null || noOfCompTasks == undefined || noOfCompTasks == 0) {
        localStorage.setItem("dropDownState", "close")
    }

    summary.addEventListener("click", function() {
        if(!completedTasksSec.open){
            //When the dropdown is expanded through clicking
            localStorage.setItem("dropDownState", "open")
        } else {
            //When the dropdown collapses through clicking
            localStorage.setItem("dropDownState", "close")
        }
    })
}


trackDropDownState()

controlTasksHeight()

function alterDropDownState() {
    let dropDownState = localStorage.getItem("dropDownState")
    let noOfCompTasks = JSON.parse(localStorage.getItem("noOfCompTasks"))

    if(dropDownState == null || dropDownState == undefined) {
        completedTasksSec.open = false
    }else if(dropDownState === "open") {
        completedTasksSec.open = true
    } else {
        completedTasksSec.open = false
    }
    
    if(noOfCompTasks == null || noOfCompTasks == undefined || noOfCompTasks == 0) {
        completedTasksSec.open = false
    }
}

//######################################################
//######### Track the the number of completed tasks
//######################################################
function updateCompTasksNum() {
    let noOfCompTasks = JSON.parse(localStorage.getItem("noOfCompTasks"))

    if(noOfCompTasks == null || noOfCompTasks== undefined || noOfCompTasks == 0) {
        // If the completed tasks number doesn't exist or 0 on local storage
        completedTasksSec.style.display = "none"
        numberOfCompletedTasks.innerHTML =  " " + 0
    } else {
        completedTasksSec.style.display = "block"
        numberOfCompletedTasks.innerHTML =  " " + noOfCompTasks
    }
}


//######################################
//###### Store todos on local storage
//######################################
function storeOnLocalStorage() {
    let todo = {};
    let todos = [];

    //Check if localStorage has the todos created
    if(localStorage.getItem("todos") == null || localStorage.getItem("todos") == undefined) {
        //When the todos is not created
        localStorage.setItem("genID", JSON.stringify(0)) //Create the user id to distinguish the todos
        
        let id = JSON.parse(localStorage.getItem("genID")) //Retrieve the ids from local storage
        todo["id"] = id++ //Increment the id value whenever a new todo is created
        todo["task"] = textBox.value.trim()
        todo["taskStatus"] = "uncomplete" //Set the taskStatus of all todos to incomplete
        todos.push(todo)

        //Re-set to local storage
        localStorage.setItem("todos", JSON.stringify(todos))
        localStorage.setItem("genID", JSON.stringify(id)) //Update local storage with the new id increment value
    } else {
        //When the todos is created
        let localStorageTodos = JSON.parse(localStorage.getItem("todos"))
        //Fetch the current id value from local storage
        let id = JSON.parse(localStorage.getItem("genID")) 
        todo["id"] = id++ //Increment the id when the value when a new todo is created
        todo["task"] = textBox.value
        todo["taskStatus"] = "uncomplete" //Set the taskStatus of all todos to incomplete
        localStorageTodos.push(todo)

       // Re-set to local Storage
        localStorage.setItem("todos", JSON.stringify(localStorageTodos))
        localStorage.setItem("genID", JSON.stringify(id))
    }
}

//#########################################################
//##### Play sound function
//##### When a task check box is checked play ding sound
//#########################################################
function completeTaskWithSound(checkbox) {
    if(checkbox.checked) {
        let audio = new Audio("achievement.wav")
        audio.play()
    }
}

//##################################################
//##### Check box function
//#### When the check box is checked or unchecked
//##################################################
function completeTask(key, event, checkbox) {
    let locStoTodos = JSON.parse(localStorage.getItem("todos"))
    let taskNameElem = event.target.nextElementSibling
    let task = taskNameElem.innerText
    let tasksLeft = []
    let tasksLeftTwo = []

    locStoTodos.forEach(todo => {
        if(checkbox.checked) {
            //When the checkbox is checked
            if(todo["task"] == task && todo["id"] == key) {
                todo["taskStatus"] = "complete"
            }
            //Cross the text when the checkbox is checked to indicate complete
            taskNameElem.classList.remove("uncomplete")
            taskNameElem.classList.add("complete")
            
            tasksLeft.push(event.target.parentElement)
            tasksLeft.forEach(completedTask => {
                completedTasks.appendChild(completedTask)
            })
        } else {
            //When the checkbox is unchecked
            if(todo["task"] == task && todo["id"] == key) {
                todo["taskStatus"] = "uncomplete"
            }
            //Undo crossing when the checkbox is unchecked to indicate uncomplete
            taskNameElem.classList.remove("complete")
            taskNameElem.classList.add("uncomplete")

            tasksLeftTwo.push(event.target.parentElement)
            tasksLeftTwo.forEach(completedTask => {
                todoLists.appendChild(completedTask)
            })
        }
    })
    localStorage.setItem("todos", JSON.stringify(locStoTodos))
}

function sortCompletedTasks(key, checkbox) {
    let locStoTodos = JSON.parse(localStorage.getItem("todos"))
    
    locStoTodos.forEach(todo => {
        if(checkbox.checked){
            if(todo["id"] == key) {
                todo["taskStatus"] = "complete " + JSON.parse(localStorage.getItem("noOfCompTasks"))
            }
        }
    })
    localStorage.setItem("todos", JSON.stringify(locStoTodos))
}

//#############################################
//#### Delete button function
//## When the delete button is clicked
//############################################
function deleteTask(event, key) {
    let taskParentElement = event.target.parentElement
    let taskElem = event.target.previousElementSibling
    let task = taskElem.innerText
    let locStoTodos = JSON.parse(localStorage.getItem("todos"))
    let noOfCompTasks = JSON.parse(localStorage.getItem("noOfCompTasks"))

    locStoTodos.forEach((todo, index) => {
        if(task == todo["task"] && key == todo["id"]) {
            locStoTodos.splice(index,1)
        }
    })
    //Re-set to local storage
    localStorage.setItem("todos",JSON.stringify(locStoTodos))
    taskParentElement.remove()

    //Re-set the id to '0' when there is no todo stored on local storage(ie when all the todos have been deleted or when all todos is cleared)
    if(JSON.parse(localStorage.getItem("todos")).length == 0) {
        localStorage.setItem("genID",JSON.stringify(0))
    }

    // Check if there are completed tasks
    if(noOfCompTasks != null || noOfCompTasks != undefined) {
        noOfCompTasks = completedTasks.childNodes.length
        localStorage.setItem("noOfCompTasks", noOfCompTasks)
        updateCompTasksNum()
    }

    controlTasksHeight()
    trackDropDownState()
}

//################################################################################
//###### Main function
//###### The function to create the template when the page is active or reloads
//################################################################################
function toDo() {
    //Fetch the todos from local storage
    let locStoTodos = JSON.parse(localStorage.getItem("todos"))
    let compTasks = []

    //Build the templates from local storage
    
    //Clear completed tasks and uncompleted tasks and re-fetch everything from local storage again
    todoLists.innerHTML = ''
    completedTasks.innerHTML = ''

    //Loop the local storage and input the tasks in the template
    for(let i=0; i < locStoTodos.length; i++) {
        let task = locStoTodos[i]["task"]
        let taskStatus = locStoTodos[i]["taskStatus"]
        
        //Inserting the template when the page reloads       

        //When the page reloads run a check on the status of the task
        if(locStoTodos[i]["taskStatus"] === "uncomplete") {
            todoLists.innerHTML += 
            `<li id=${locStoTodos[i]["id"]}>
                <input type="checkbox"><span class="task ${taskStatus}">${task}</span><button class="delete-button">&times</button>
            </li>` //Attach the ids in local storage to the id attribute of the li elements and uncomplete class to the task
        } else if(locStoTodos[i]["taskStatus"].includes("complete", 0)) {
            completedTasks.innerHTML = ''
            compTasks.push(locStoTodos[i])
            let sortedCompTasks = compTasks.sort((a, b) => {
                return a["taskStatus"][9] - b["taskStatus"][9]
            })
            sortedCompTasks.forEach(completedTask => {
                completedTasks.innerHTML += 
                `<li id=${completedTask["id"]}>
                    <input type="checkbox" checked><span class="task ${completedTask["taskStatus"]}">${completedTask["task"]}</span><button class="delete-button">&times</button>
                </li>` //Attach the ids in local storage to the id attribute of the li elements and complete class to the task
            })
        }

        /*---------------------------------
            When page is not reloaded 
        -----------------------------------*/      
        //Fetching all the todos in the ul element
        let todoList = todoLists.children

        //Looping through all the todos and grabing the checkbox and the delete button
        for(let i=0; i < todoList.length; i++) {
            let delBtn = todoList[i].lastElementChild //Checkbox 
            let checkBox = todoList[i].firstElementChild //Delete button
            let key = todoList[i].getAttribute("id") //Assign the id value as the key
    
            //When the checkbox is clicked
            checkBox.addEventListener("click", function(event) {
                completeTaskWithSound(checkBox)
                completeTask(key, event, checkBox)
    
                //When the page is not reloaded arrange the todo lists in the completed section
                let todosInCompSec = []
                let compTasksInCompSec = completedTasks.childNodes

                compTasksInCompSec.forEach((compTask) => {
                    todosInCompSec.push(compTask)
                })

                todosInCompSec.forEach((task) => {
                    completedTasks.appendChild(task)
                })


                //When the page is not reloaded arrange the todo lists in the uncompleted section
                let todosInUncompSec = []
                let compTasksInUncompSec = todoLists.childNodes

                compTasksInUncompSec.forEach((compTask) => {
                    todosInUncompSec.push(compTask)
                })

                let sortedTodosInUnComp = todosInUncompSec.sort((a, b) => {
                    return a.id - b.id
                })

                sortedTodosInUnComp.forEach((task) => {
                    todoLists.appendChild(task)
                })

                numberOfCompletedTasks.innerHTML = " " + todosInCompSec.length

                localStorage.setItem("noOfCompTasks", JSON.stringify(todosInCompSec.length))

                //Check if the drop down state is created on local storage
                if(localStorage.getItem("dropDownState") == null){
                    //Prevent the check box from altering the drop down state if the drop down state is created on local storage
                    localStorage.setItem("dropDownState", "close")
                }

                alterDropDownState()
                trackDropDownState()
                updateCompTasksNum()
                sortCompletedTasks(key, checkBox)
                controlTasksHeight()
            })
                
            //When the delete button is clicked
            delBtn.addEventListener("click", function(event) {
                deleteTask(event, key)
            })
            }
        }


        /*---------------------------------
            When page is reloaded 
        -----------------------------------*/      
        //Fetching all completed todos
        let completedTodoLists = completedTasks.children

        //Looping through all the completed todos and grabing the checkbox and the delete button
        for(let i=0; i < completedTodoLists.length; i++) {
            let delBtn = completedTodoLists[i].lastElementChild //Checkbox 
            let checkBox = completedTodoLists[i].firstElementChild //Delete button
            let key = completedTodoLists[i].getAttribute("id") //Assign the id value as the key
    
            //When the checkbox is clicked
            checkBox.addEventListener("click", function(event) {
                completeTaskWithSound(checkBox)
                completeTask(key, event, checkBox)
    
                let arrayOfUncompTasks = []
                let UncompTasks = todoLists.childNodes
                let compTasks = completedTasks.childNodes
                
                UncompTasks.forEach((compTask) => {
                    arrayOfUncompTasks.push(compTask)
                })
    
                let sortedArrayOfUncompTasks = arrayOfUncompTasks.sort((a, b) => {
                    return a.id - b.id
                })
    
                sortedArrayOfUncompTasks.forEach((task) => {
                    todoLists.appendChild(task)
                })
                
                numberOfCompletedTasks.innerHTML = " " + compTasks.length
                
                localStorage.setItem("noOfCompTasks", JSON.stringify(compTasks.length))

                alterDropDownState()
                updateCompTasksNum()
                trackDropDownState()
                controlTasksHeight()
            })
            
            //When the delete button is clicked
            delBtn.addEventListener("click",function(event) {
                deleteTask(event, key)
            })
        }
    
    localStorage.setItem("todos", JSON.stringify(locStoTodos))

    textBox.value = "" //Clear the text box
}


//##########################################################
//###### Validate input
//##### Check whether the inputs in the text box is valid
//##########################################################
function matchInputInTextBox() {
    let whiteSpaceOnlyPattern = /^\s+$/ //White space only pattern
    if(!textBox.value) {
        //Display error message
        toolTip.style.opacity = 1
        toolTip.style.visibility = "visible"

        //Remove error message after 2s
        setTimeout(function() {
            toolTip.style.opacity = 0
        },2000)

    } else if(whiteSpaceOnlyPattern.test(textBox.value)) {
        //Check whether the text box contains only white spaces
        
        //Display the error message
        toolTip.style.opacity = 1
        toolTip.style.visibility = "visible"

        //Remove error message after 2s
        setTimeout(function() {
            toolTip.style.opacity = 0
        },2000)

        //Empty the textBox for the entry of a valid todo
        textBox.value = "" //Clear the text box
    } else {
        //When it passes all checks
        storeOnLocalStorage()
        toDo()
    }
}


//######################################
//###### Add button function
//#####################################
todoForm.addEventListener("submit", function(event) { 
    event.preventDefault()
    matchInputInTextBox()
})


//######################################
//###### Page Reloads
//##### When the page reloads
//#####################################
window.addEventListener("load", function() {
    //Stops flushing tooltip when the page reloads
    toolTip.style.visibility = "hidden"

    //Check if the local storage is not empty
    try {
        toDo()
        alterDropDownState()
        updateCompTasksNum()
        controlTasksHeight()
    } catch(e) {

    }
})


//#########################################
//###### clear Everything
//##### When the clear button is clicked
//#########################################
clearBtn.addEventListener("click",function() {
    //When the clear button is clicked clear everything from local storage
    localStorage.clear()
    completedTasksSec.style.display = "none"
    numberOfCompletedTasks.innerHTML =  " " + 0
    todoLists.innerHTML = ""
    completedTasks.innerHTML = ""
    controlTasksHeight()

    //Set the drop down state to close
    completedTasksSec.open = false
})


//######################################
//###### Enter key event
//##### When the enter key is pressed
//######################################
textBox.addEventListener("keypress",function(event) {
    if(event.key === "Enter") {
        event.preventDefault()
        if(matchInputInTextBox()) {
            storeOnLocalStorage()
            toDo()
        }
        textBox.value = "" //Clear the text box
    }
})