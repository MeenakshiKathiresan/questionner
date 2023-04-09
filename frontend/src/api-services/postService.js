import {URLS} from "../constants/urls"
import axios from "axios"


const getAllPosts = (setData) => {
    
    const reqUrl = URLS.baseUrl + URLS.postViewAll
    axios.get(reqUrl)

    .then(response =>{
        setData(response.data)
        
    })
    .catch((error) => {console.log(error)})

}

const getUserPosts = (user_id, setData) =>{
    console.log(user_id, "get posts")
    const reqUrl = URLS.baseUrl + URLS.postViewUser + '/' + user_id
    axios.get(reqUrl)

    .then(response =>{
        console.log("get data.", response.data)
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
const deletePost = async(post) =>{
    const reqUrl = URLS.baseUrl + URLS.post + '/' + post._id
    await axios
    .delete(reqUrl)
    .then((res) => console.log(res.data, "deleting"));
}

const deleteComment = async(comment) =>{
    const reqUrl = URLS.baseUrl + URLS.comments + '/' + comment._id
    await axios
    .delete(reqUrl)
    .then((res) => console.log(res.data, "deleting"));
}
export {getPost, getAllPosts, getUserPosts, getComments, addComment, deleteComment, deletePost}
