
import { Router } from 'express'
import { changeAvatar, changeCoverImage, changeProfileDetails, getCurrentUser, loginUser, logoutUser, registerUser, updatePassword } from '../controller/user.controller.js'
import { upload } from '../middleware/multer.middleware.js'
import { verifyjwt } from '../middleware/auth.middleware.js'

const router = Router()

router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyjwt, logoutUser)
router.route('/updatepassword').post(updatePassword)
router.route('/changeAvatar').patch(verifyjwt, changeAvatar)
router.route('/changeProfileDetail').get(verifyjwt, changeProfileDetails)
router.route('/changeCoverImage').get(verifyjwt, changeCoverImage)
router.route('/getCurrentUser').get(verifyjwt, getCurrentUser)

export default router