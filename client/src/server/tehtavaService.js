import axios from 'axios'
import {url} from '../config'


    let token = null

export const setToken = newToken => {
    token = `bearer ${newToken}`
}

export const muokkaa = async (muokattu) => {
    const id = muokattu._id
    await axios.put(`${url}/api/tehtavat/${id}`, muokattu)
}

export const lisaa = async content => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(`${url}/api/tehtavat`, content, config)
    return response.data    
}

export const poista = async (id) => {

    const config = {
        headers: { Authorization: token },
    }
    const poistettu = await axios.delete(`${url}/api/tehtavat/${id}`, config)
    poistettu.then(console.log('poistettu'))
}