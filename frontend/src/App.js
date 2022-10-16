import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Blogs from './Pages/Blogs/Blogs';
import BlogCreate from './Pages/Blogs/BlogCreate';
import BlogDetails from './Pages/Blogs/BlogDetails';
import React, { useEffect, useState } from 'react';
import ThemeContextProvider  from "./contexts/ThemeContext";
import Signup from './Pages/User/Signup';
import Login from './Pages/User/Login';
import FaceRegonition from './Pages/User/faceRegonition';
import { useAuthContext } from './hooks/useAuthContext';


function App() {
  const {user} = useAuthContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user || user === null) {
      setIsLoaded(true);
    }
  }, [user])

  return (
    <>
      { isLoaded && 
      <div className="App">
        <BrowserRouter>
          <ThemeContextProvider>
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/faceRegonition" element= {!user ? <FaceRegonition /> : <Navigate to="/" />} />
                <Route  exact path="/" element= {user ? <Home /> : <Navigate to="/login" />} />
                <Route  exact path="/blogs" element= {user ? <Blogs /> : <Navigate to="/login" />} />
                <Route  exact path="/blogs/create" element= {user ? <BlogCreate /> : <Navigate to="/login" />} />
                  <Route  path="/blogs/:id" element= {user ? <BlogDetails /> : <Navigate to="/login" />} />
                <Route path="/signup" element= {!user ? <Signup /> : <Navigate to="/" />} />
                <Route path="/login" element= {!user ? <Login /> : <Navigate to="/" />} />
              </Routes>
            </div>
          </ThemeContextProvider>
        </BrowserRouter>
      </div> }
    </>
  );
}

export default App;
