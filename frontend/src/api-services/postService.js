import {URLS} from "../constants/urls"
import axios from "axios"

const getAllPosts = (setData) => {
    
    const reqUrl = URLS.baseUrl + URLS.postViewAll
    axios.get(reqUrl)

    .then(response =>{
        console.log(response)
        setData(response.data)
        
    })
    .catch((error) => {console.log(error)})

}

const getPost = (postID, setData) => {
    const reqUrl = URLS.baseUrl + '/post/' + postID
    console.log(reqUrl)
    axios.get(reqUrl)
    .then(response =>{
        setData(response.data)
        
    })
    .catch((error) => {console.log(error)})


}

export {getPost, getAllPosts}
