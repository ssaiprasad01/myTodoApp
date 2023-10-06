let todoItemsContainer=document.getElementById("todoItemsContainer");
let addbutton=document.getElementById("addTodoButton");
// let todoList = [
//     {
//       text: "Learn HTML",
//       uniqueNo: 1
//     },
//     {
//       text: "Learn CSS",
//       uniqueNo: 2
//     },
//     {
//       text: "Learn JavaScript",
//       uniqueNo: 3
//     }
// ];
function getTodoList(){
    let stringifiedTodoList=localStorage.getItem("todoList");
    let parsedTodoList=JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null){
        return[];
    } else{
        return parsedTodoList;

    }
}
let todoList=getTodoList();

let todoLength=todoList.length;
function saveTodo(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}

function onAddTodo(){
    let userInputElement=document.getElementById("input-value");
    let userValue=userInputElement.value;

    if (userValue === ""){
        alert("Enter Valid Text");
        return
    }
    todoLength=todoLength+1;
    let newTodo={
        text:userValue,
        uniqueNo:todoLength
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value="";

}

addbutton.onclick=function(){
    onAddTodo()
    saveTodo()

};


function onDeleteTodo(todoId){
    let todoElement=document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteItemIndex=todoList.findIndex(function(each){
        let eachId="todo"+each.uniqueNo;
        if (eachId === todoId){
            return true;
        } else{
            return false;
        }
    });
    todoList.splice(deleteItemIndex,1);
}

function onTodostatusChange(checkboxId,labelId){
    let checkboxElement=document.getElementById(checkboxId);
    let labelElement=document.getElementById(labelId);
    labelElement.classList.toggle('checked');
}

function createAndAppendTodo(todo){
    let todoId='todo'+todo.uniqueNo;
    let checkboxId='checkbox'+todo.uniqueNo;
    let labelId='label'+todo.uniqueNo;

    let todoElement=document.createElement("li");
    todoElement.classList.add("todo-item-container","d-flex","flex-row","col-4");
    todoElement.id=todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement=document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;

    inputElement.onclick=function(){
        onTodostatusChange(checkboxId,labelId);
    }

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer=document.createElement("div");
    labelContainer.classList.add("label-container","d-flex","flex-row","col-8");
    todoElement.appendChild(labelContainer);

    let labelElement=document.createElement("label");
    labelElement.setAttribute("for","checkbox-input");
    labelElement.id=labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("p");
    deleteIcon.textContent='x';
    deleteIcon.classList.add("delete-icon")
    deleteIcon.onclick=function(){
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
    

}
for (let todo of todoList){
    createAndAppendTodo(todo);

}
