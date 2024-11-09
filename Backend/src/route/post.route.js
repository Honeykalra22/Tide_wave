import { Router } from "express";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { addPost, deletePost } from "../controller/post.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { likePost } from "../controller/like.controller.js";

const router = Router()

router.use(verifyjwt)

router.route('/addpost/:userId').post(
    upload.fields([
        {
            name: "postFile",
            maxCount: 1
        }
    ]),
    addPost
    )
router.route('/deletepost/:postId').delete(deletePost)
router.route('/:postId/like').post(likePost)


export default router
