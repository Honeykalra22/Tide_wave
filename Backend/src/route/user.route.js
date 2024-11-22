
import { Router } from 'express'
import { changeAvatar, changeCoverImage, changeProfileDetails, getCurrentUser, getUserDetails, loginUser, logoutUser, registerUser, updatePassword } from '../controller/user.controller.js'
import { upload } from '../middleware/multer.middleware.js'
import { verifyjwt } from '../middleware/auth.middleware.js'
import { followedBy, followedTo, followTheUser } from '../controller/follow.controller.js'

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
router.route('/changeAvatar').patch(verifyjwt, 
    upload.single('avatar'),
    changeAvatar
)
router.route('/changeProfileDetail').patch(verifyjwt, changeProfileDetails)
router.route('/changeCoverImage').patch(verifyjwt, 
    upload.single('coverImage'),
    changeCoverImage
)
router.route('/getCurrentUser').get(verifyjwt, getCurrentUser)
router.route('/follow/:targetId').post(verifyjwt, followTheUser)
router.route('/follower').get(verifyjwt, followedBy)
router.route('/following').get(verifyjwt, followedTo)
router.route('/details').get(verifyjwt, getUserDetails)

export default router