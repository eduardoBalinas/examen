import React from "react"
import axios from "axios"
const Table = ({ data, token, setReload, reload, setIsOpen }) => {

    const handleDelete = (id) => {
        let opcion = confirm("Vas a borrar la publicacion: " + id)
        if(opcion === false) return
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/api/posts/delete/' + id,
            headers: { 
              'Authorization': 'Bearer ' + token
            }
          };
          
          axios.request(config)
          .then((response) => {
            setReload(!reload)
        })
          .catch((error) => {
            console.log(error);
          });
    }

    return (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Autor</th>
                    <th scope="col">Contenido</th>
                    <th scope="col">Fecha de publicacion</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.length > 0 ? <>
                        {
                            data.map((d) => (
                                <tr key={d.id}>
                                    <th scope="row">{d.id}</th>
                                    <td>{d.title}</td>
                                    <td>{d.autor}</td>
                                    <td>{d.contenido.split(" ").slice(0, 10).join(" ")}</td>
                                    <td>{d.createdAt.split("T")[0]}</td>
                                    <td>
                                        <div className="d-flex ">
                                            <div className="p-2" onClick={() => handleDelete(d.id)} style={{ cursor: "pointer" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                </svg>                            </div>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        }
                    </>
                        : null
                }

            </tbody>
        </table>

    )
}

export default Table