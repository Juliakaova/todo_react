import {useState,useEffect} from "react"

import Formulario  from "./Formulario"
import Tarea from "./Tarea"

export default function Todo(){

     let [tareas,setTareas] = useState ([])

     useEffect(() => {
        fetch("https://api-todo-nvvq.onrender.com/tareas")
        .then(respuesta=> respuesta.json())
        .then(tareas => setTareas(tareas))

     }, [])

     function crearTarea(tarea){
        setTareas([...tareas,tarea])

    
     }
     function borrarTarea(id){
        setTareas(tareas.filter(tarea => tarea.id !=id))
     }

     function actualizarEstado(id){
        setTareas(tareas.map( tarea => {
            if(tarea.id == id){
                tarea.terminada = !tarea.terminada
            }

            return tarea
        }))
     }

     function actualizarTexto(id,texto){
        setTareas(tareas.map( tarea => {
            if(tarea.id == id){
                tarea.tarea = texto
            }

            return tarea
        }))
     }

     

    return <>
    <Formulario crearTarea={crearTarea} />
        <section className="tareas">
            {tareas.map(({id, tarea, terminada}) => <Tarea key={id} id={id} tarea={tarea} terminada={terminada} borrarTarea={borrarTarea} actualizarEstado={actualizarEstado} actualizarTexto={actualizarTexto}/>)}
        </section>
    </>
}