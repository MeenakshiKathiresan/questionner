import {URLS} from "../constants/urls"
import axios from "axios"

const getAllPosts = (setData) => {
    
    const reqUrl = URLS.baseUrl + URLS.postViewAll
    axios.get(reqUrl)

    .then(response =>{
        console.log(response.data)
        setData(response.data)
        
    })
    .catch((error) => {console.log(error)})

}

const getPost = async (postID, setData) => {
    const reqUrl = URLS.baseUrl + '/post/' + postID
    console.log(reqUrl)
    await axios.get(reqUrl)
    .then(response =>{
        setData(response.data)
        
    })
    .catch((error) => {console.log(error)})


}

const getComments = async (postID, setComments) => {
    const reqUrl = URLS.baseUrl + URLS.comments + '/' + postID
    await axios.get(reqUrl)
    .then(comments => setComments(comments.data))
    .catch(error =>{console.log(error)})
}

const addComment = async(comment) =>{
    const reqUrl = URLS.baseUrl + URLS.commentAdd + '/' + comment.post
    await axios
    .post(reqUrl, comment)
    .then((res) => console.log(res.data));
}

export {getPost, getAllPosts, getComments, addComment}
