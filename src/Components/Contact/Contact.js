import React, { useState } from "react";

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
    let response = await fetch("http://localhost:5000/contact", {
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
    <div>
        <h1>Contact</h1>
        <p>Have suggestions for movies you would like us to review or cover? <br></br>
        Have general questions or feedback? Feel free to reach out to us!</p>
    <form onSubmit={handleSubmit}>
      <div>
        <input placeholder="Name" type="text" id="name" required />
      </div>
      <div>
        <input placeholder="Email" type="email" id="email" required />
      </div>
      <div>
        <textarea placeholder="Message" id="message" required />
      </div>
      <button type="submit">{status}</button>
    </form>
    </div>
  );
};

export default Contact;