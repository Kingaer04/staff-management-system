import express from 'express'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import passport from 'passport'
import session from "express-session" // for cookie session
import cookieParser from "cookie-parser"
import router from './routes/indexRoute.js'
import Admin from './models/admin.js'


dotenv.config()

const app = express()

app.use(cookieParser("secret_passcode"))
app.use(session({
    secret: "secret_passcode",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,  // Ensure the cookie is httpOnly for security
        secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
        maxAge: 3600000  // 1 hour
    }
}));
app.use(passport.initialize())
app.use(passport.session()) // Passport to use session that has been setup
passport.use(Admin.createStrategy()) // configure the user's login strategy
passport.serializeUser(Admin.serializeUser()) // for encrypting
passport.deserializeUser(Admin.deserializeUser()) //for decrypting

app.use(express.json())
app.use(express.urlencoded({extended: false}))


const db = mongoose.connection
mongoose.connect(process.env.MONGO)

db.once("open", () => {
    console.log("Database connected successfully!")
})


app.use('/', router)

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), () => {
    console.log(`Server is running on https://localhost/${app.get('port')}`)
}) 
