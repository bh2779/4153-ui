import axios from "axios"

export const BASE_URL = 'http://54.166.38.176:8000'

export const getDishReviews = async (id) => {
    const body = {
        'id': id
    }
    return await axios.get(BASE_URL + `/dishes/${id}/reviews`, body).then(res => {
        console.log(res)
    })
}