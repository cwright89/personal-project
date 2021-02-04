import { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './Home.css';


class Home extends Component {
    constructor (props){
        super(props)
        this.state= {
            posts: [],
            postText: '',
            comments: [],
            commentText: '',
        }
    }

    getPosts = () => {
        axios.get(`/api/posts/${this.props.user_id}`)
        .then(res => {
            this.setState({posts: res.data})
        })
        .catch(err => console.log(err))
    }

   

    getComments = () => {
        axios.get(`/api/comments/${this.props.user_id}`)
        .then(res => {
            this.setState({comments: res.data})
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.getComments()
        this.getPosts()
    }

    handlePostInput = (val) => {
        this.setState({postText: val})
    }

    createPost = () => {
        axios.post(`/api/post`, {id: this.props.user_id, postText: this.state.postText})
        .then(() => {
            this.getPosts()
            this.setState({postText: ''})
        })
        .catch(err => console.log(err))
    }

    deletePost = (id) => {
        axios.delete(`/api/post/${id}`)
        .then(() => {
            this.getPosts()
        })
        .catch(err => console.log(err))
    }

    handleCommentInput = (val) => {
        this.setState({commentText: val})
    }

    createComment = () => {
        axios.post(`/api/comment`, {id: this.props.user_id, commentText: this.state.commentText})
        .then(() => {
            this.getComments()
            this.setState({commentText: ''})
        })
        .catch(err => console.log(err))
    }
    deleteComment = (id) => {
        axios.delete(`/api/comment/${id}`)
        .then(() => {
            this.getComments()
        })
        .catch(err => console.log(err))
    }



    render(){
        return(
            <section className='home'>
                <section className='posts'>
                    <h1>Posts</h1>
                    <input
                        className='post-input'
                        value={this.state.postText}
                        placeholder='Post Here'
                        onChange={e => this.handleCommentInput(e.target.value)}/>
                    <button onClick={this.createPost}>Add Post</button>
                    <div className = 'post-flex'>
                        {this.state.comments.map(post => (
                            <div key={post.post_id}>
                                <div>{post.post_text}</div>
                                <button onClick={() => this.deletePost(post.post_id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </section>
                <section classname='comments'>
                    
                    <h3>Comments</h3>
                    <input
                        className='comment-input'
                        value={this.state.commentText}
                        placeholder='Comment Here'
                        onChange={e => this.handleCommentInput(e.target.value)}/>
                    <button onClick={this.createComment}>Add Comment</button>
                    <div className = 'comment-flex'>
                        {this.state.comments.map(comment => (
                            <div key={comment.comment_id}>
                                <div>{comment.comment_text}</div>
                                <button onClick={() => this.deleteComment(comment.comment_id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </section>


            </section>
        )
    }

}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.user.user_id
    }
}

export default connect(mapStateToProps)(Home)