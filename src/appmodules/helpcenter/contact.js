import React from "react";
import { Link } from "react-router-dom";
function Contact() {
    const phone = "918395977076";
const message = "Hello, I want to contact you";
  return (
    <div className="contact-wrapper">
      <div className="contact-card">

        <h1 className="contact-title">Contact Me</h1>

        <div className="contact-item name">
          <span>Name</span>
          <h2>Adesh</h2>
        </div>

       <div className="contact-item phone">
  <span>Phone</span><a href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`} className="text-decoration-none" target="_blank" rel="noopener noreferrer"> <h2>8395977076</h2></a>
</div>

        <div className="contact-item phone">
          <span>Git</span>
          <a href="https://github.com/adesh0445" className="text-decoration-none" target="_blank" rel="noopener noreferrer"><h2>Git Link</h2></a>
        </div>

        <div className="contact-item email">
          <span>Email Id</span>
          <h2>officialadesh0001@gmail.com</h2>
        </div>

      </div>
    </div>
  );
}

export default Contact;
