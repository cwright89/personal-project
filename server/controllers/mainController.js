module.exports = {
    createPost: (req, res) => {
        const { id, postTitle, postText } = req.body
        const db = req.app.get('db')

        db.post.create_blog_post(id, postTitle, postText)
          .then(() => res.sendStatus(200))
          .catch(err => res.status(500).send(err))
    },
    getPosts: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')

        db.post.get_user_blog_posts(id)
          .then(posts => res.status(200).send(posts))
          .catch(err => res.status(500).send(err))
    },
    deletePost: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')

        db.post.delete_blog_post(id)
          .then(() => res.sendStatus(200))
          .catch(err => res.status(500).send(err))
    },
    updateUsername: (req, res) => {
        const { id } = req.params
        const { username } = req.body
        const db = req.app.get('db')

        db.users.update_username(username, id)
          .then(user => res.status(200).send(user))
          .catch(err => res.status(500).send(err))
    },
    updateProfilePic: (req, res) => {
        const { id } = req.params
        const { ProfilePicture } = req.body
        const db = req.app.get('db')

        db.users.update_profilepic(ProfilePicture, id)
        .then(user => res.status(200).send(user))
        .catch(err => res.status(500).send(err))
    },

    createComment: (req, res) =>{
        const { id, commentText } = req.body
        const db = req.app.get('db')

        db.post.create_comment(id, commentText)
          .then(() => res.sendStatus(200))
          .catch(err => res.status(500).send(err))
    },
    getComments: (req, res) =>{
        const { id } = req.params
        const db = req.app.get('db')

        db.post.get_comment(id)
          .then(posts => res.status(200).send(posts))
          .catch(err => res.status(500).send(err))
    },
    deleteComment: (req, res) =>{
        const { id } = req.params
        const db = req.app.get('db')

        db.post.delete_comment(id)
          .then(() => res.sendStatus(200))
          .catch(err => res.status(500).send(err))
    }
}