import {Router} from 'express'
import { Message } from '../model/Message.model.js'
import { verifyjwt } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/:roomId', verifyjwt, async(req, res) => {
    try{
        const message = await Message.find({roomId: req.params.roomId}).populate("sender", 'username')
        res.status(200).json(message)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

// save a new message
router.post('/', verifyjwt, async(req, res) => {
    const {sender, content, roomId} = req.body
    try {
        const message = new Message({sender, content, roomId})
        await message.save()
        res.status(201).json(message)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default router