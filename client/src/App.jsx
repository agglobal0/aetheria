import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Essays from './pages/Essays';
import Blogs from './pages/Blogs';
import Category from './pages/Category';
import SingleEssay from './pages/SingleEssay';
import Search from './pages/Search';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminEssayEditor from './pages/AdminEssayEditor';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/essays" element={<Essays />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/essay/:slug" element={<SingleEssay />} />
                <Route path="/search" element={<Search />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                
                {/* Admin Protected Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/essay/new" element={<AdminEssayEditor />} />
                <Route path="/admin/essay/edit/:id" element={<AdminEssayEditor />} />
                
                {/* Fallback Route */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
