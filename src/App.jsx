import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Modules from './pages/Modules';
import Resources from './pages/Resources';
import Glossary from './pages/Glossary';
import Quiz from './pages/Quiz';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home key="home" onNavigate={setCurrentPage} />;
      case 'modules':
        return <Modules key="modules" />;
      case 'resources':
        return <Resources key="resources" />;
      case 'glossary':
        return <Glossary key="glossary" />;
      case 'quiz':
        return <Quiz key="quiz" />;
      default:
        return <Home key="home" onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
