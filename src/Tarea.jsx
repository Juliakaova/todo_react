import {useState} from "react"

export default function Tarea({id, tarea, terminada,borrarTarea,actualizarEstado,actualizarTexto}){

    let [editando,setEditando] = useState(false)
    let [tareaTemporal,setTareaTemporal] = useState(tarea)

    return <div className="tarea">
                <h2 className={ !editando ? "visible" : "" }>{ tarea }</h2>
                <input className={ editando ? "visible" : "" } type="text" value={tareaTemporal} onChange={ evento => setTareaTemporal(evento.target.value) } />
                <button className="boton" onClick={ async () => {
                    
                    if(editando){
                        //intentar guardar
                        if(tareaTemporal.trim() != "" && tareaTemporal.trim() != tarea){

                            let {status} = await fetch("https://api-todo-mb48.onrender.com/tareas/actualizar/texto/" + id, {
                                            method : "PUT",
                                            body : JSON.stringify({ tarea : tareaTemporal.trim()}),
                                            headers : {
                                                "Content-type" : "application/json"
                                            }
                                        })

                            if(status == 204){
                                actualizarTexto(id,tareaTemporal.trim())
                                setTareaTemporal(tareaTemporal.trim())
                            }else{
                                console.log("..error")
                            }

                        }else{
                            setTareaTemporal(tarea)
                        }
                        setEditando(false)
                    }else{
                        //empezar a editar
                        setEditando(true)
                    }

                } }>{ editando ? "guardar" : "editar" }</button>
                <button className="boton" onClick={ () => {
        fetch("https://api-todo-nvvq.onrender.com/tareas/actualizar/estado/" +id, {
            method: "PUT"
        })
        .then(({status}) => {
            if(status == 204){
                return actualizarEstado(id)
            }
            console.log("error")
        })} } ><span></span></button>
    </div>
    
    }
   