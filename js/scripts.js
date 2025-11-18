
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
        div.className="tasks" + (el.done?" tasks-done":"")//<div class="tasks tasks-done"><>
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
    // validacion para evitar espacios
    const cleanText=input.value.trim()
    // validacion para evitar tareas vacias
    if (cleanText=="") {
        return Swal.fire({
            title: "Error",
            text: "Escribe una tarea antes de agregarla.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }
    // crear nuestro objeto 
    const newTask={
        id: Date.now(),//Simula ID de BD    genera demanera automatica la hora
        text:cleanText,
        done:false
    }
    // agregar a mi base datos (variable de tipo tasks)
    tasks=[...tasks,newTask] // con ES6 destructuring
    // limpiar input
    input.value=""
    // renderiza
    Swal.fire({
        title: "Tarea agregada",
        text: "Tu tarea ha sido añadida con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar"
    });
    renderTasks();
}

// marcar tareas como completado
const toggleDone=(id)=>{
    tasks=tasks.map(el=>
        el.id === id?{...el,done:!el.done}:el
    )
    renderTasks()
}

// editar una tarea
const editTask=(id)=>{
    const task=tasks.find(t=>t.id===id)
    Swal.fire({
        title: "Editar tarea",
        input: "text",
        inputValue: task.text,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
            if (!value.trim()) {
                return "El texto de la tarea no puede estar vacío.";
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            tasks=tasks.map(el=>
                el.id===id?{...el,text:result.value}:el
            )
            Swal.fire({
                title: "Tarea actualizada",
                text: "La tarea ha sido editada con éxito.",
                icon: "success",
                confirmButtonText: "Aceptar"
            });
            renderTasks();
        }
    });
}

// eliminar una tarea
const deleteTask=(id)=>{
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la tarea de forma permanente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            tasks=tasks.filter(t=>t.id!==id)
            Swal.fire({
                title: "Tarea eliminada",
                text: "La tarea ha sido eliminada con éxito.",
                icon: "success",
                confirmButtonText: "Aceptar"
            });
            renderTasks();
        }
    });
}