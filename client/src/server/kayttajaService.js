import axios from 'axios'
import { url } from '../config'

const kirjaudu = async (body) => {
                          
    const lahetetty = await axios.post(`${url}/api/kirjautuminen`, body)
    return lahetetty.data

}

export default kirjaudu