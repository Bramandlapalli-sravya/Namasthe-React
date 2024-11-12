import React from "react";
import "../../Body/style.css";

const Contact = () => {

const handleSubmit = () => {
    const submittedText = document.getElementById('submitted-text');
    if(submittedText) return submittedText.innerHTML = 'Form submitted Succesfully';
}

    return (<form className="flex flex-col font-bold p-6 gap-6 items-center" onSubmit={handleSubmit}>
        <h1 className="text-3xl py-7 flex justify-self-center">Contact</h1>
        <label htmlFor="name" className="flex items-center gap-5 flex-col sm:flex-row">
            <span className="w-1/4">Name:</span>
            <input type="text" id="name" placeholder="Enter name" className="border px-6 py-3 w-80 sm:w-96" required/>
        </label>
        <label htmlFor="name" className="flex gap-5 items-center flex-col sm:flex-row">
            <span  className="w-1/4">Description:</span>
            <textarea  id="name" placeholder="Enter name" className="border px-6 py-3 w-80 sm:w-96" required/>
        </label>
        <button type="submit" className="flex justify-self-start w-fit px-5 py-2 bg-orange-600 text-white">Submit</button>
        <p id="submitted-text"></p>
    </form>)
}

export default Contact;