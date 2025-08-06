import {useState} from 'react'
import {Route, Routes, Navigate} from "react-router-dom"
import { lazy, Suspense } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const Loader = lazy(()=>import('./components/Loader'))
const Signin = lazy(()=>import('./pages/Signin'))
const Notes = lazy(()=>import('./pages/Notes'))
const PageNotFound = lazy(()=> import('./pages/PageNotFound'))

const App = () => {
  
  const GoogleAuthWrapper = ()=>{
    return(
      <GoogleOAuthProvider clientId={clientID}>
          <Signin/>
      </GoogleOAuthProvider>
    )
  }


  return (
    <>
      <Routes>
        <Route path='/signin' element={<Suspense fallback={<Loader/>}> <GoogleAuthWrapper/></Suspense>}/>
        <Route path='/' element={<Navigate to="/signin"/>}/> 
        <Route path='/notes' element={<Suspense fallback={<Loader/>}>  <Notes/></Suspense>}/>
        <Route path='*' element={<Suspense fallback={<Loader/>}> <PageNotFound></PageNotFound></Suspense>}/>
      </Routes>
    </>
  )
}

export default App