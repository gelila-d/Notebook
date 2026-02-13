import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import { toast } from 'react-hot-toast'

export default function App() {
  return (
    <div data-theme="cupcake">
      <button className='btn btn-primary'>click me</button>
      <button className='btn btn-secondary'>click me</button>
      <button className='btn btn-accent'>click me</button>
      <button className='btn btn-ghost'>click me</button>
      <button className='btn btn-link'>click me</button>
     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}
