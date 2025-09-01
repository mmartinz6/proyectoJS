async function getSolicitud() {
    try {
        
        const response = await fetch ('http://localhost:3001/solicitudes',{
           
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const solicitudes = await response.json()

        return solicitudes

    } catch (error) {
        console.error("Hay un error al obtener la solicitud", error)

        throw error
    }
}

async function postSolicitud(solicitud) {
    try {
        
        const response = await fetch ('http://localhost:3001/solicitudes',{
           
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body:JSON.stringify(solicitud)
        })

        const solicitudes = await response.json()

        return solicitudes

    } catch (error) {
        console.error("Hay un error al crear la solicitud", error)

        throw error
    }
}

// Actualizar el estado de una solicitud (PUT)
async function putSolicitud(id, estado) {
    const response = await fetch(`http://localhost:3001/solicitudes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estadoSolicitus: estado }) // Cambiamos solo el estado
    });

    if (!response.ok) throw new Error("Error al actualizar la solicitud");
    return await response.json();
}

export { getSolicitud, postSolicitud, putSolicitud };