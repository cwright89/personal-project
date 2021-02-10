/** @jsxRuntime classic */
/** @jsx jsx */
import  { useState } from "react";
import Header from '../../Components/Header/Header'
import { jsx,} from '@emotion/react/'
import './Contact.css'

const Contact = () => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };


  return (
    <div
    css={{
      backgroundImage: 'url(https://wallpaperaccess.com/full/1210877.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '150vh',

  }}
    >
      <Header />
      <section
      css={{
        marginTop: '165px'
      }}
      >
        <h1
        css={{
          fontSize: '28px'
        }}>Contact</h1>
        <p
        css={{
          fontSize: '24px'
        }}>Have suggestions for movies you would like us to review or cover? <br></br>
        Have general questions or feedback? Feel free to reach out to us!</p>
    <form onSubmit={handleSubmit}>
      <div>
        <input placeholder="Name" type="text" id="name" required className="contact-input"/>
      </div>
      <div>
        <input placeholder="Email" type="email" id="email" required className="contact-input"/>
      </div>
      <div>
        <textarea placeholder="Message" id="message" required 
        css={{
          width:'350px'
        }}/>
      </div>
      <button type="submit" className='contact-button'>{status}</button>
    </form>
    </section>
    </div>

  );
};

export default Contact;