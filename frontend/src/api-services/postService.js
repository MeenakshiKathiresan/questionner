import {URLS} from "../constants/urls"
import axios from "axios"


const getAllPosts = (setData, searchWord) => {
    const reqUrl = URLS.baseUrl + URLS.postViewAll
    const config = {
        params: {
            search: searchWord
        }
    }

    axios.get(reqUrl, config)

    .then(response =>{
        setData(response.data)
        
    })
    .catch((error) => {console.log(error)})

}

const getTagPosts = (setData, tag) => {
    const reqUrl = URLS.baseUrl + "/post/tag/" + tag

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

const addComment = async(getComment, comment) =>{
    const reqUrl = URLS.baseUrl + URLS.commentAdd + '/' + comment.post
    
    await axios
    .post(reqUrl, comment)
    .then((res) => {
        getComment(res.data)
        console.log(res.data, "comment added!")
    });
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

const upVoteComment = async(comment, user) => {
    const reqUrl = URLS.baseUrl + URLS.commentUpvote + '/' + comment._id
    await axios
    .put(reqUrl, {user:user._id})
    .then((res) => console.log(res))
}

const downVoteComment = async(comment, user) => {
    const reqUrl = URLS.baseUrl + URLS.commentDownvote + '/' + comment._id
    await axios
    .put(reqUrl, {user:user._id})
    .then((res) => console.log(res))
}

const addPost = async(post) =>{
    const reqUrl = URLS.baseUrl + URLS.addPost
    await axios
    .post(reqUrl, post)
    .then((res) => console.log(res.data));

}

const editPost = async(post) =>{
    const reqUrl = URLS.baseUrl + URLS.postEdit + '/' +post._id
    await axios
    .put(reqUrl, post)
    .then((res) => console.log(res.data));

}

export {getPost, getAllPosts, getUserPosts, getTagPosts, getComments, addComment, deleteComment, deletePost, upVoteComment, downVoteComment, addPost, editPost}
