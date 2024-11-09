import { Router } from "express";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { CommentOnPost } from "../controller/comment.controller.js";



const router = Router()
router.use(verifyjwt)

router.route('/post/:postId').post(CommentOnPost)
// router.route('/tweet/:id').post(CommentOnPost)

export default router