const router = require('express').Router()
const Users = require('../model/userModel')


//Get
router.route('/').get((req,res) => {
    Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error : "+ err))
})


//Post
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const position = req.body.position;

    const newUser = new Users(({username, position}))

    newUser.save()
        .then(() => res.json("User added!!!"))
        .catch(err => res.status(400).json("Error : "+ err))
})

//update
router.route('/:id').post((req,res) => {
    Users.findById(req.params.id)
    .then(user => {
        user.username = req.body.username;
        user.position =req.body.position;

        user.save()
        .then(() => res.json("User Updated"))
        .catch(err => res.status(400).json("Error : "+ err))
    } )
})

//Delete
router.route('/:id').delete((req,res) => {
    Users.findByIdAndDelete(req.params.id)
    .then(() => res.json("User Deleted"))
    .catch(err => res.status(400).json("Error : "+ err))
})


module.exports = router