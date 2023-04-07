const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const dotenv = require("dotenv");
let User = require( "./models/user.model");


dotenv.config();

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
        
    },
    async (_accessToken, _refreshToken, profile, done) => {
        const user = await User.findOne({gmailID: profile.id});
        if (user){
            return done(null, user);
        }
        else{
            const newUser = await User.create({
                username: profile.displayName,
                email: profile.emails[0].value,
                dp: profile.photos[0].value,
                gmailID: profile.id
            });
            return done(null, newUser);
        }
        
    }
    
    )
)

passport.serializeUser((user, done) => {
    done(null, user.gmailID);
})

passport.deserializeUser(async (id, done)=>{
    const user = await User.findOne({gmailID: id})
    done(null, user)
})

module.exports = passport