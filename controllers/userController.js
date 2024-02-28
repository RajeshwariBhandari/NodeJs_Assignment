import User from "../models/userModels.js"
import {StatusCodes} from 'http-status-codes'

//Get all users data
export const allUsers= async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
  
    try {
      const users = await User.find()
        .limit(parseInt(limit))
        .skip((page - 1) * limit);
  
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

//creating users
export const createUser = async (req, res) => {
    const { name, email, age } = req.body
    const user = await User.create({ name, email, age })
    if (!name || !email || !age) {
        res.status(400).json({ Message: "Please provide all values" });
    }
    res.status(StatusCodes.CREATED).json({ user })
}

//Get a particular users data by passing id
export const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ msg: `no user with id ${id}` });
    }
    res.status(StatusCodes.OK).json({ user });
};

//update the particular user data by id
export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, email,age} = req.body
    const userUpdate = await User.findByIdAndUpdate(id,{name, email, age},{ new: true })
    if(!userUpdate){
        return res.status(404).json({msg:`no user with id ${id}`})
    }
    res.status(StatusCodes.OK).json(userUpdate)

}

//delete the particular user by their id
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        return res.status(404).json({ msg: `no user with id ${id}` });
    }
    res.status(StatusCodes.OK).json({msg:'user deleted', user:user})
}
