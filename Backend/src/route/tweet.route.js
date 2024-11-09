import { Router } from "express";
import { addTweet, deleteTweet } from "../controller/tweet.controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { likePost } from "../controller/like.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const tweetrouter = Router()

tweetrouter.use(verifyjwt, upload.none())

tweetrouter.route('/addtweets').post( addTweet)
tweetrouter.route('/delete/:id').delete( deleteTweet)
tweetrouter.route('/liked/:id').post( likePost)


export default tweetrouter


// liked function is not checked, other all functions are checked and varified 