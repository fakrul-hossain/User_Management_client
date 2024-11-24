
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

const [users, setUsers] = useState([]);

const handleSubmit = (e)=>{
  e.preventDefault()
  const form = e.target
  const name = form.name.value
  const email = form.email.value
  const message = form.message.value
  
  const user = {name,email,message}
  fetch("http://localhost:5000/users",{
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json)
  .then(data =>{
    const newUser = [...users,data]
    setUsers(newUser)
  })
  form.reset();
}




useEffect(()=>{
  fetch('http://localhost:5000/users')
  .then(res=> res.json())
  .then(data => setUsers(data))
},[])


  return (
    <div>

      <h1 className='text-center mt-48'>All Nayoks And Naykas Is Here: {users.length}</h1>
      {
        users.map(user => <div className='text-center space-y-16' key={user.id}>
            <p>Name: {user.name}</p>
            
        </div>)
      }
<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Actor/Actress
        </h2>

        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 font-medium mb-2"
          >
            About Actor/Actress
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your message"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  )
}

export default App
