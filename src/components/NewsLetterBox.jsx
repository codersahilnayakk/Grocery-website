import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const NewsLetterBox = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    phone: '',
    email: '',
    message: '',
  });
  const [buttonText, setButtonText] = useState('SUBMIT');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const { name, subject, phone, email, message } = formData;

    // Validation
    if (!name.trim() || name.length < 3) {
      setButtonText('Invalid Name');
      setTimeout(() => setButtonText('SUBMIT'), 2000);
      return;
    }
    if (!subject.trim() || subject.length >= 100) {
      setButtonText('Invalid Subject');
      setTimeout(() => setButtonText('SUBMIT'), 2000);
      return;
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      setButtonText('Invalid Phone');
      setTimeout(() => setButtonText('SUBMIT'), 2000);
      return;
    }
    if (!email.trim() || !isValidEmail(email)) {
      setButtonText('Invalid Email');
      setTimeout(() => setButtonText('SUBMIT'), 2000);
      return;
    }
    if (!message.trim()) {
      setButtonText('Invalid Message');
      setTimeout(() => setButtonText('SUBMIT'), 2000);
      return;
    }

    setIsSubmitting(true);
    setButtonText('SENDING...');

    const serviceID = 'service_zgq58qi'; // Replace with your EmailJS service ID
    const templateID = 'template_hl632gn'; // Replace with your EmailJS template ID
    const userID = 'XtsX58k1Pp56-m8ob'; // Replace with your EmailJS user ID

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then(() => {
        setIsSubmitting(false);
        setButtonText('SUCCESS!');
        setFormData({ name: '', subject: '', phone: '', email: '', message: '' });
        setTimeout(() => setButtonText('SUBMIT'), 3000); // Reset button text after 3 seconds
      })
      .catch((error) => {
        setIsSubmitting(false);
        setButtonText('FAILED');
        setTimeout(() => setButtonText('SUBMIT'), 3000); // Reset button text after 3 seconds
        console.error('EmailJS Error:', error);
      });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">Contact Us</p>
      <p className="mt-3 text-gray-400">
        Feel free to reach out with any questions or feedback.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-1/2 mx-auto my-6 border p-4 flex flex-col gap-4"
      >
        <input
          className="w-full outline-none border p-2"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={onChangeHandler}
          required
        />
        <input
          className="w-full outline-none border p-2"
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={onChangeHandler}
          required
        />
        <input
          className="w-full outline-none border p-2"
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={onChangeHandler}
          required
        />
        <input
          className="w-full outline-none border p-2"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChangeHandler}
          required
        />
        <textarea
          className="w-full outline-none border p-2"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={onChangeHandler}
          required
        ></textarea>
        <button
          type="submit"
          className={`bg-black text-white text-xs px-10 py-4 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
