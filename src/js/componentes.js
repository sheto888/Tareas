import { Todo, TodoList } from "../classes"
import { todoList } from ".."

//referencias en el HTML
const divTodolist   = document.querySelector('.todo-list')
const txtInput      = document.querySelector('.new-todo')
const btnBorrar     = document.querySelector('.clear-completed')
const ulFiltros     = document.querySelector('.filters')
const anchorFiltros = document.querySelectorAll('.filtro')


export const crearTodoHTML = (todo) => {
    const htmlTodo = `
                    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked': '' }> 
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
                    </li>`

    const div = document.createElement('div')
    div.innerHTML = htmlTodo

    divTodolist.append(div.firstElementChild)
}

//Eventos
txtInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value)
        todoList.nuevoTodo(nuevoTodo)
        crearTodoHTML(nuevoTodo)
        txtInput.value = ''
        
    }
})

divTodolist.addEventListener('click', (e) => {
    const nombreElemento = e.target.localName
    const todoElemento   = e.target.parentElement.parentElement
    const todoId         = todoElemento.getAttribute('data-id')
    
    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId)
        todoElemento.classList.toggle('completed')
    }
    else if(nombreElemento.includes('button')){
        todoList.borrarTodo(todoId)
        divTodolist.removeChild(todoElemento)
    }
    
})

btnBorrar.addEventListener('click', ()=>{
    todoList.borrarCompletados()
    for(let i = divTodolist.children.length - 1;i >= 0; i --){

        const elemento = divTodolist.children[i]
        if(elemento.classList.contains('completed')){
            divTodolist.removeChild(elemento)
        }
    }
})

ulFiltros.addEventListener('click', (e)=>{
   const filtro = e.target.text
   console.log(filtro);
   if(!filtro){return}

   anchorFiltros.forEach(elem => elem.classList.remove('selected'))
   e.target.classList.add('selected')

   for(const elem of divTodolist.children){
       elem.classList.remove('hidden')
       const completado = elem.classList.contains('completed')
  
        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    elem.classList.add('hidden')
                }
                break;
            case 'Completados':
                if(!completado){
                    elem.classList.add('hidden')
                }
                break;
            
        
            default:
                break;
        }
   
    }
})