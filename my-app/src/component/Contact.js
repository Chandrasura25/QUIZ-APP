import React from 'react'
import '../styles/Contact.css'
const Contact = () => {
  return (
    <>
    <div className="contact-body">
    <div class="contact-container">
        <div class="contact-box">
            <div class="left"></div>
            <div class="right">
                <h2>Contact Us</h2>
                <input type="text" name="" id="" class="field-input" placeholder="Your Name"/>
                <input type="email" name="" id="" class="field-input" placeholder="Your Email"/>
                <input type="text" name="" id="" class="field-input" placeholder="Your Phone"/>
                <textarea name="" id="" placeholder="Message" class="field-input area"></textarea>
                <button class="btn">Send</button>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Contact