// base de datos simulada
// esta variablesimula una respuesta de tipo json desde el servidor
let tasks=[]

// existen 2 : renderizado por hidratacion y por 
// funcion para renderizar (aacion de crear elementos en mi navegador) tareas
// renderizar: es la accion que realiza el navegador ante la accion de un usuario
const renderTasks=()=>{
    const containerTasks=document.querySelector("#tasks")
    containerTasks.innerHTML=""
    tasks.forEach((el)=>{
        const div=document.createElement("div") // esto creara un div automatico
        div.className="tasks" + (el.done?"tasks-done":"") //agregaras al div la clase tasks y si es que mi tasks es de tipo done agregaras div. sera como hacer esto en css "<div class="tasks.done"></div>"
        div.innerHTML=`
        <span>${el.text}</span>
        <div>
          <button onclick="toggleDone(${el.id})">✅</button>
          <button onclick="editTask(${el.id})">🖋️</button>
          <button onclick="deleteTask(${el.id})">🗑️</button>
        <div>
        `
        containerTasks.appendChild(div)
    })
}

// creando funcion para agregar una tarea
const addTask=()=>{
    const input=document.querySelector("#taskInput")
    // alidacion para evitar espacios
    const cleanText=input.value.trim()
    // validacion para evitar tareas vacias
    if (cleanText=="") return alert("Escribe una tarea")
    // crear nuestro objeto 
    const newTask={
        id: Date.now(),//Simula ID de BD    genera demanera automatica la hora
        text:cleanText,
        done:false
    }
    //agregar a mi base datos (variable de tipo tasks)
    //tasks.push(newTask) //usando metodos
    tasks=[...tasks,newTask] // con es6 destructurin
    // limpiar input
    input.value=""
    // renderiza
    renderTasks()
}

//marcar taeas como completado
const toggleDone=(id)=>{
    tasks=tasks.map(el=>
        el.id === id?{...el,done:!el.done}:el
    )
    renderTasks()
}