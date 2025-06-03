import{useState} from "react"

import Todo from "./Todo"

export default function Formulario({crearTarea}){

    let [textoInput, setTextoInput] = useState("")
    let[error,setError] = useState(false)

    return <form onSubmit = {evento => {
        evento.preventDefault()

            setError(false)
            
            if( textoInput.trim() != ""){
            
                fetch("https://api-todo-nvvq.onrender.com/tareas/nueva", {
                    method: "POST",
                    body: JSON.stringify({tarea: textoInput.trim()}),
                    headers: {
                        "Content-type" : "application/json"
                    }
                })
                .then(respuesta => respuesta.json())
                .then(({id,error}) => {
                    if(!error){
                    
                        crearTarea({
                            id,
                            tarea : textoInput.trim(),
                            terminada : false
                        })
                        return setTextoInput("")
                    }console.log()
                })
                
              
            }

            setError(true)

    }}>
        <input type="text" placeholder="¿Qué hay que hacer?" value={textoInput} onChange={evento => setTextoInput(evento.target.value) }/>
        <input type="submit" value="crear una tarea"/>
    </form>
    
    }