const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const Todo = require('../models/Todo')
const List = require('../models/List')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// auth actions (on server)

router.post('/log_in', async(req, res) => {
    // get data from request
    const { email, password } = req.body
    // find user in db
    const user = await User.findOne({email})
    // if user was found
    if (user) {
        // check pass
        const match = await bcrypt.compare(password, user.password)
        // if match
        if (match) {
            // create token
            const token = jwt.sign({ userId: user._id }, 'secret-key')
            res.send({token})
        // if doesn't match
        } else {
            // status 401 and send a message
            res.status(401).send('Invalid password');
        }
    } else {
        // user not found
        res.status(401).send('User not found')
    }
})

router.post('/sign_up', async(req, res) => {
    // get data from form
    const { email, password } = req.body
    // find user in db
    const isUser = await User.findOne({email})
    // if is
    if (isUser) {
        // status 400 and send message
        res.status(400).send('User already exists')
    } else {
        // create new user
        const user = new User({ email, password })
        // hash password
        const hash = await bcrypt.hash(password, 10)
        // 
        user.password = hash
        // save user in db
        await user.save()
        // send message
        res.send('User registered')
        console.log('user registered');
    }
})

// actions for gettind, adding, deleting and editing todos

// get todo
router.get('/get_todos', async(req, res) => {
    try {
        const todos = await Todo.find()
        res.send(todos)
    } catch (err) {
        console.log(err);
    }
})

// add todo
router.post('/todos', async(req, res) => {
    try {
        // get todo body from request
        const {
            title,
            id,
            familyList,
            statusSelected,
            statusImportant,
            userEmail 
        } = req.body
        // create new todo
        const newTodo = new Todo({ 
            title,
            id,
            familyList,
            statusSelected,
            statusImportant,
            userEmail
         })
        await newTodo.save()
        res.send(newTodo)
    } catch(err) {
        console.log(err);
        res.send(500).send('Server error')
    }
})

// edit method
router.put('/todos/:id', async (req, res) => {
    try {
        // get todo body from req
        const {
            title,
            statusSelected,
            statusImportant
        } = req.body
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id,
            { title, statusSelected, statusImportant }
        )
        res.send(updatedTodo)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
})

// delete method
router.delete('/todos/:id', async (req, res) => {
    try {
      const deletedTodo = await Todo.findByIdAndDelete(req.params.id)
      res.send(deletedTodo)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
})

// creating list
router.post('/lists', async(req, res) => {
    try {
        // getting body of list
        const {
            title,
            id,
            userEmail
        } = req.body
        // creating new list
        const newList = new List({ 
            title,
            id,
            userEmail
         })
        await newList.save()
        res.send(newList)
    } catch(err) {
        console.log(err);
        res.send(500).send('Server error')
    }
})
// get list
router.get('/get_lists', async(req, res) => {
    try {
        const lists = await List.find()
        res.send(lists)
    } catch (err) {
        console.log(err);
    }
})
// delete list
router.delete('/lists/:id', async (req, res) => {
    try {
      const deletedList = await List.findByIdAndDelete(req.params.id)
      res.send(deletedList)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
})


module.exports = router;