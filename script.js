// İşlem yapılacak olan etiketler seçilir.
const heading = document.querySelector("#heading");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#input-todo");
const firstList = document.querySelector("#a-list-group-items");
const secondList = document.querySelector("#b-list-group-items");

// Tüm eventleri çağıran komutdur.
eventListeners();

// Tüm eventleri bir arada tutan metotdur.
function eventListeners() {
    todoForm.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    firstList.addEventListener("click", deleteTodo);
    secondList.addEventListener("click", clearTodos);
}

// Todo ekleme metodudur.
function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if (newTodo === "") {
        showAlert("red", "Hata! Lütfen bir yapılacak iş girerek tekrar deneyiniz.");
    }
    else {
        showAlert("green", "Yapılacak İşler Listesine başarılı bir şekilde ekleme yaptınız.");
        addTodoToStorage(newTodo);
        addTodoUI(newTodo);
    }
    e.preventDefault();
}

// Hatalı veya başarılı bir şekilde giriş yapılırsa çalışacak mesaj metodudur.
function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `info ${type}`;
    alert.textContent = message;
    todoForm.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 2500);
}

// Local Storage'daki veriler yok ise dizi oluşturma var ise var olan verileri diziye dönüştürme metodudur.
function getTodosFromStorage() {
    let aTodos;
    if (localStorage.getItem("aTodos") === null) {
        aTodos = [];
    }
    else {
        aTodos = JSON.parse(localStorage.getItem("aTodos"));
    }
    return aTodos;
}

// Girilen metni (todo'yu) local storage'a ekleme metodudur.
function addTodoToStorage(newTodo) {
    let aTodos = getTodosFromStorage();
    aTodos.push(newTodo);
    localStorage.setItem("aTodos", JSON.stringify(aTodos));
}

// String değeri list-item olarak web sayfasına ekleme metodudur.
function addTodoUI(newTodo) {
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const i = document.createElement("i");
    span.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(span);
    i.className = "fa-sharp fa-solid fa-delete-left";
    listItem.appendChild(i);
    firstList.appendChild(listItem);
    todoInput.value = "";
}

// Sayfa yüklendiğinde storage'daki verileri sayfaya ekleme yapan metotdur.
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoUI(todo);
    });
    let deleteTodos = deleteTodosFromStorage();
    deleteTodos.forEach(function(todo){
        addDoneTodoUI(todo);
    });
}

// Todo'ları listeden etiketini silme işlemi metodudur.
function deleteTodo(e) {
    if(e.target.className == "fa-sharp fa-solid fa-delete-left") {
        e.target.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.textContent);
        addDoneTodoUI(e.target.parentElement.textContent);
        deleteTodoToStorage(e.target.parentElement.textContent);
        showAlert("green", "Başarılı bir şekilde silme işlemi gerçekleşti.");
    }
}

// Local Storage'dan todo silme metodudur.
function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo, index){
        if(todo === deletetodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("aTodos", JSON.stringify(todos));
}

// Yapılmış işler bölümünde ekleme yapan metotdur.
function addDoneTodoUI(newTodo) {
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const i = document.createElement("i");
    span.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(span);
    i.className = "fa-solid fa-trash";
    listItem.appendChild(i);
    secondList.appendChild(listItem);
}

// Yapılmış işlerin local storage'da yerini oluşturan metotdur.
function deleteTodosFromStorage(){
    let bTodos;
    if (localStorage.getItem("bTodos") === null)
    {
        bTodos = [];
    }
    else
    {
        bTodos = JSON.parse(localStorage.getItem("bTodos"));
    }
    return bTodos;
}

// Yapılmış işin local storage'a ekleme işini yapan metotdur.
function deleteTodoToStorage(newTodo){
    let bTodos = deleteTodosFromStorage();
    bTodos.push(newTodo);
    localStorage.setItem("bTodos", JSON.stringify(bTodos));
}

// Yapılmış işi silen metotdur.
function clearTodos(e) {
    if(e.target.className == "fa-solid fa-trash") {
        e.target.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.textContent);
        clearTodoFromStorage(e.target.parentElement.textContent);
        showAlert("green", "Başarılı bir şekilde silme işlemi gerçekleşti.");
    }
}

// Yapılmış işi local storage'dan silen metotdur.
function clearTodoFromStorage(deletetodo){
    let todos = deleteTodosFromStorage();
    todos.forEach(function(todo, index){
        if(todo === deletetodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("bTodos", JSON.stringify(todos));
}