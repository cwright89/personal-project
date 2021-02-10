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
                        <div css={{
                                    backgroundColor: 'transparent',
                                    marginLeft: 200,
                                    marginRight: 200,
                                    color:'#f8f9fa',
                                    whiteSpace: 'pre-wrap',
                                    fontSize: '28',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    fontStyle: 'bold',
                                }}>Lucas ipsum dolor sit amet mace hutt mara naboo fisto calrissian jabba lobot calamari hutt. Solo jade darth dagobah thrawn solo hutt. Leia ackbar droid padmé kashyyyk endor. Leia lars jabba r2-d2 darth calrissian mara chewbacca. Wedge grievous kenobi mothma. Luke calrissian antilles leia kamino. Darth ewok bothan binks wedge moff hutt jabba. Organa jinn kessel sidious tusken raider luke leia jango. Hutt wampa skywalker hoth bothan hoth wicket utapau. Lando moff solo sebulba boba jabba. Fett organa solo yavin.

Wicket darth darth thrawn coruscant luke han jango solo. Watto padmé amidala antilles maul darth moff dagobah hutt. Hutt qui-gonn hutt solo r2-d2 biggs. Kashyyyk yoda wicket c-3po fisto r2-d2 boba. Amidala fisto wedge ahsoka dooku yoda obi-wan grievous darth. Jar secura palpatine tusken raider mustafar naboo jabba. Ahsoka dantooine darth antilles endor jango cade kessel yavin. Skywalker mace wedge mustafar yoda luke. Ben ewok fett lobot darth mace. C-3po antilles obi-wan tatooine coruscant yavin jawa leia organa.

Luke jabba obi-wan zabrak moff mon. Binks ben maul fisto organa yoda skywalker sith secura. <br></br>
<br></br>

Dantooine skywalker endor organa ponda antilles bothan fisto. K-3po naboo kessel yavin lando. Fett amidala owen skywalker leia ponda hutt. Sidious yoda amidala solo solo. Droid zabrak ventress mace mandalorians. Hutt lando yoda naboo yoda lando han. Jar chewbacca mara windu kashyyyk ben. Hutt darth bespin antilles antilles yavin dooku hutt solo. Moff leia windu fett coruscant naboo kenobi. Kessel skywalker leia kit leia yoda darth.

Amidala naboo darth dooku darth. Amidala kessel hutt ponda mon hoth mandalorians aayla. Jade anakin jabba ewok c-3po c-3po. Qui-gonn antilles organa sidious skywalker moff darth. Organa padmé dagobah antilles biggs. Fisto qui-gon coruscant leia sebulba. Darth fett moff leia chewbacca wedge. Tusken raider sith secura mothma solo. Jabba leia bespin ackbar solo grievous thrawn kessel solo. Grievous calamari c-3p0 wicket antilles. Organa solo ewok vader. Leia mara skywalker moff bothan anakin. Ewok coruscant kenobi anakin kessel skywalker darth.

Solo amidala binks antilles alderaan naboo yavin mon. <br></br><br></br>

Coruscant dooku maul hoth binks skywalker calrissian. Lando mon leia ackbar binks aayla solo hutt. Skywalker dagobah antilles leia watto moff vader lando lando. Yoda yoda mothma kessel han c-3p0 wookiee jabba skywalker. Mara ewok palpatine solo moff kessel skywalker twi'lek. Endor cade leia dagobah hutt grievous binks jabba. Aayla moff grievous jade owen. Jinn jango darth qui-gonn. Jar moff darth ackbar mara tusken raider. Greedo vader k-3po solo jinn calrissian organa.

Skywalker hutt moff hutt vader kessel. Darth moff tusken raider dantooine organa fisto solo han. Fett ben leia aayla skywalker. Jawa hutt hutt mon bespin jawa antilles wookiee thrawn. Coruscant sidious lobot darth zabrak tatooine. Darth coruscant mustafar naboo darth. Maul solo darth jar darth skywalker. Darth yavin luke jinn gonk ackbar. Hutt mothma organa gonk coruscant jinn jade watto. Lando hutt dantooine mon mace calamari windu grievous mace. Darth secura chewbacca thrawn moff skywalker darth grievous aayla.</div>
                        
                        {this.state.posts.map(post => (
                            <div key={post.post_id}>
                                
                                <div css={{
                                    backgroundColor: 'transparent',
                                    marginTop: 25,
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