const express = require('express')
//const commentRouter = require('/comments')
let db = require('../data/db')

const router = express.Router()

//router.use('/:id/comments', commentRouter)

//GET ALL POSTS - return [] of all post {}
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

//GET POST by ID - return post {} from ID
//  router.get('/:id', (req, res) => {

//     const id = req.params.id

//     db.findById(id)
//         .then(post => {
//             if (post) {
//                 res.status(200).json(post)
//             } else {
//                 res.status(404).json({
//                     message: `the post you requested with the id ${id} does not exsist.`
//                 })
//             }
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 error: `Data for the post with id: ${id} could not be retrieved from the server`
//             })
//         })
// })
module.exports = router;