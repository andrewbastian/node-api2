const express = require('express')
const commentRouter = require('./comments')
let db = require('../data/db')

const router = express.Router()

router.use('/:id/comments', commentRouter)

// 	_______CRUD_________



//______________________________________________________________
//GET ALL POSTS - return [] of all post {} - ( http://localhost:4000/api/posts/ )
router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'Something went wrong, you figure it out... Just kidding, ALL post data could not be retrived'
            })
        })
})


//______________________________________________________________
//GET POST by ID - return post {} from ID -( http://localhost:4000/api/posts/:id )
router.get('/:id', (req, res) => {

    const id = req.params.id

    db.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: `the post you requested with the id ${id} does not exsist.`
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: `Data for the post with id: ${id} could not be retrieved from the server`
            })
        })
})



//______________________________________________________________
// POST a post - ( http://localhost:4000/api/posts/ )
router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: 'Please provide titile and content for your post'
        })
    }
    db.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            console.log(error)
            res.status(500).json({
                error: 'error when trying to save post to server'
            })
        })
})


//______________________________________________________________
//PUT - ( http://localhost:4000/api/posts/:id )
router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const {
        title,
        contents
    } = req.body;

    if (!title || !contents) {
        res.status(404).json({
            message: `please provide updated content for post ${id}`
        })
    }

    try {
        const post = await db.findById(id)

        if (!post) {
            return res.status(404).json({
                error: `the post ${id} data could not be modified`
            })
        }

        await db.update(id, {
            title,
            contents
        })
        res.status(200).json(post)

    } catch (err) {
        res.status(500).json({
            error: `post no. ${id}'s data could not be modified`
        })
    }
})


//______________________________________________________________
//DELETE - ( http://localhost:4000/api/posts/:id )
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(i => {
            if (i > 0) {
                res.status(200).json({
                    message: `the post has been removed from the server`
                })
            } else {
                res.status(404).json({
                    message: `the post doesn't exist`
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: `The post could not be removed`
            })
        })
})



// Router export

module.exports = router;