import { Router } from "express";
import { addTweet, deleteTweet, displayAllTweetsAnduser } from "../controller/tweet.controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { likePost } from "../controller/like.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const tweetrouter = Router()

tweetrouter.use(verifyjwt, upload.none())

tweetrouter.route('/addtweets').post( addTweet)
tweetrouter.route('/delete/:id').delete( deleteTweet)
tweetrouter.route('/:tweetId/like').post( likePost)
tweetrouter.route('/details').get(displayAllTweetsAnduser)

export default tweetrouter


// liked function is not checked, other all functions are checked and varified 