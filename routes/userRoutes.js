import express from 'express'
const router = express.Router()

import {
    allUsers,
    createUser,
    deleteUser,
    getUser,
    updateUser
  
} from "../controllers/userController.js"

router.route('/').get(allUsers).post(createUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)


export default router