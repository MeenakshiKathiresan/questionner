const URLS = {

    baseUrl : "http://localhost:5000",
    //Login
    loginSuccess : "/auth/login/success",
    loginCallBack: "/auth/google/callback",
    logOut: "/auth/logout",

    //Post
    post: "/post",
    postAdd: "/post/add",
    postViewAll: "/post",
    postViewUser: "/post/user",
    postEdit: "/post/update",

    //comments
    comments: "/comments",
    commentAdd: "/comments/add",
    commentUpvote: "/comments/upvote",
    commentDownvote: "/comments/downvote",

    //Users
    users: "/users",
    userStats: "/users/stats"
    
}

export {URLS}