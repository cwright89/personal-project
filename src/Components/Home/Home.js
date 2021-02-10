/** @jsxRuntime classic */
/** @jsx jsx */
import { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Header from '../../Components/Header/Header'
import './Home.css';
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
import { jsx,} from '@emotion/react/'



class Home extends Component {
    constructor (props){
        super(props)
        this.state= {
            posts: [],
            postText: '',
            comments: [],
            commentText: '',
            username: '',

        }
    }

    getPosts = () => {
        axios.get(`/api/posts/${this.props.user.user_id}`)
        .then(res => {
            this.setState({posts: res.data})
        })
        .catch(err => console.log(err))
    }

   

    getComments = () => {
        axios.get(`/api/comments/${this.props.user.user_id}`)
        .then(res => {
            this.setState({comments: res.data})
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){
        this.getComments();
        this.getPosts()
    }

    handlePostInput = (val) => {
        this.setState({postText: val})
    }

    createPost = () => {
        axios.post(`/api/post`, {id: this.props.user.user_id, postText: this.state.postText})
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
        axios.post(`/api/comment`, {id: this.props.user.user_id, commentText: this.state.commentText})
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
        console.log(this.state.posts)
        return(
            <section className='home'
            css={{
                backgroundImage: 'url(https://wallpaperaccess.com/full/1562163.jpg)',
                backgroundSize: 'cover',
                height: '150vh',

            }}
            >
                <Header />
                <section className='posts'>
                    <h1
                    css={{
                        fontSize: '35px'
                    }}
                    >Posts</h1>
                    {this.props.user.is_admin && (
                        <Fragment>
                        <textarea className="post-input"
                    
                        css={{
                            width: '600px',
                            height: '50px',
                            border: '3px solid #cccccc',
                            padding: '5px',
                            fontFamily: 'Tahoma, sans-serif',
                        }}
                        value={this.state.postText}
                        placeholder='Post Here'
                        onChange={e => this.handlePostInput(e.target.value)}/>
                    <button onClick={this.createPost} className="home-button">Add Post</button>
                        </Fragment>
                    )}
                
                    <div className = 'post-flex'>
                        {this.state.posts.map(post => (
                            <div key={post.post_id}>
                                
                                <div css={{
                                    backgroundColor: 'transparent',
                                    marginLeft: 100,
                                    marginRight: 100,
                                    color:'#f8f9fa',
                                    whiteSpace: 'pre-wrap',
                                    fontSize: '28',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    fontStyle: 'bold',
                                }}>
                                    {post.post_text}
                                
                                </div>
                                <button onClick={() => this.deletePost(post.post_id)} className="home-button">Delete</button>
                            </div>
                        ))}
                    </div>
                </section>
                <section classname='comments'>
                    
                    <h3
                    css={{
                        fontSize: '28px'
                    }}
                    >Comments</h3>
                    <textarea
                        className='comment-input'
                        css={{
                            width: '600px',
                            height: '50px',
                            border: '3px solid #cccccc',
                            padding: '5px',
                            fontFamily: 'Tahoma, sans-serif',
                            marginTop: '10px'
                    
                        }}
                        value={this.state.commentText}
                        placeholder='Comment Here'
                        onChange={e => this.handleCommentInput(e.target.value)}/>
                    <button onClick={this.createComment} className="home-button">Add Comment</button>
                    <div className = 'comment-flex'>
                        {this.state.comments.map(comment => (
                            <div key={comment.comment_id}>
                                <div css={{
                                    backgroundColor: 'transparent',
                                    marginLeft: 100,
                                    marginRight: 100,
                                    color:'#f8f9fa',
                                    whiteSpace: 'pre-wrap',
                                    fontSize: '28',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    fontStyle: 'bold',
                                }}
                                
                                >{comment.comment_text}</div><br></br>
                                <button onClick={() => this.deleteComment(comment.comment_id)} className="home-button">Delete</button>
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
        user: reduxState.user
    }
}

export default connect(mapStateToProps)(Home)