import { Component } from 'react'
import axios from 'axios'

class Contact extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            subject:'',
            message:''
        }
    }
    onNameChange(event) {
        this.setState({name: event.target.value})
    }
    onEmailChange(event) {
        this.setState({email: event.target.value})
    }
    onSubjectChange(event) {
        this.setState({subject: event.target.value})
    }
    onMsgChange(event) {
        this.setState({message: event.target.value})
    }

    submitEmail(e){
        e.preventDefault();
        axios({
          method: "POST", 
          url:"/send", 
          data:  this.state
        }).then((response)=>{
          if (response.data.status === 'success'){
              alert("Message Sent."); 
              this.resetForm()
          }else if(response.data.status === 'fail'){
              alert("Message failed to send.")
          }
        })
}
resetForm(){
        this.setState({name: '', email: '',subject:'', message: ''})
}

    render(){
        return (
            <div className="section">
                <h2 className='title'>Contact Us</h2>
                <p>Want us to cover or review a specific movie? Want to provide feedback on how we can make the site better? Please do not hesitate to reach out. Thanks!</p>
                <form id='contact-form'  method="POST">
                    <div className="form-group">
                    <div className='row'>
                    <input placeholder="Name" id="name" type="text" className='form-control'
                    required value={this.state.name} onChange={this.onNameChange.bind(this)}/>
                    <input placeholder='Email' id="email" type="email" className="form-control"
                    aria-describedby="emailHelp" required value={this.state.email} onChange={this.onEmailChange.bind(this)}/>
                    </div>
                    </div>
                    <div className="form-group">
                        <input placeholder = "Subject" id="subject" type="text" className="form-control"
                        required value={this.state.subject} onChange={this.onSubjectChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <textarea placeholder = "Message" id="message" className="form-control"
                        rows="1" required value={this.state.message} onChange={this.onMsgChange.bind(this)}/>
                    </div>
                    <button type="submit" className="primary-btn submit">Submit</button>
                </form>
            </div>
        )
    }
}


export default Contact