async function getUsuarios() {
    try {
        
        const response = await fetch ('http://localhost:3001/usuarios',{
           
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const users = await response.json()

        return users

    } catch (error) {
        console.error("Hay un error al obtener los usuarios", error)

        throw error
    }
}

async function postUsuarios(usuario) {
    try {
        
        const response = await fetch ('http://localhost:3001/usuarios',{
           
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body:JSON.stringify(usuario)
        })

        const users = await response.json()

        return users

    } catch (error) {
        console.error("Hay un error al crear el usuario", error)

        throw error
    }
}

export{getUsuarios, postUsuarios}