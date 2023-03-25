const router = require('express').Router();
const passport = require("passport");

const clientURL = "http://localhost:3000"


router.route("/login/success").get( (req, res) => {
    if (req.user){
        res.status(200).json({user:req.user})
        console.log(req.user)
    }else{
        res.status(401).json({message: "not authorized"})
    }
})

router.route("/login/failed").get( (req, res) =>{
    res.status(401).json({message:"failed"})
})

router.route("/google").get( passport.authenticate("google", ["profile", "email"]))

router.route("/google/callback").get(passport.authenticate("google", {
    successRedirect: clientURL,
    failureRedirect:"/login/failed"
}))

router.route("/logout").get((req, res)=>{
    req.logout({}, (err)=>{
        if (err) return res.status(500).json({message:"something went wrong"})
        res.redirect(clientURL)
    })
})

module.exports = router