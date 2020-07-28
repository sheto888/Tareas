export class TodoList {

    constructor(){

        this.cargarLocalStorage()

    }

    nuevoTodo(todo){
        this.todos.push(todo)
        this.guardarLocalStorage()
    }

    borrarTodo(id){
       this.todos =  this.todos.filter( todo => todo.id != id )
       this.guardarLocalStorage()
    }

    marcarCompletado(id){
        for(const todo of this.todos){
            console.log(id, todo.id);
            if(todo.id == id){
                todo.completado = !todo.completado 
                this.guardarLocalStorage()
                break
            }
        }
    }

    borrarCompletados(){
        this.todos =  this.todos.filter( todo => !todo.completado )
        this.guardarLocalStorage()
    }

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos))

    }

    cargarLocalStorage(){

        this.todos = (localStorage.getItem('todo'))? JSON.parse(localStorage.getItem('todo')) : []

    }
}