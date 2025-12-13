import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { BookOpen, FileText, PenTool, BookMarked, CheckCircle2 } from 'lucide-react';
import { modules } from '../data/modules';

function Home({ onNavigate }) {
  const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
  const progress = (completedModules.length / modules.length) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 p-4 rounded-2xl shadow-2xl">
              <BookOpen className="h-16 w-16 text-white" />
            </div>
          </motion.div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to PMP Training
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your comprehensive guide to Project Management Professional certification
          </p>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
            <span className="text-3xl font-bold text-primary-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 mb-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-primary-500 to-purple-600 h-6 rounded-full flex items-center justify-end pr-2"
            >
              <span className="text-xs font-semibold text-white">
                {completedModules.length} of {modules.length}
              </span>
            </motion.div>
          </div>
          <p className="text-sm text-gray-500">Complete modules to track your progress</p>
        </motion.div>

        {/* Quick Access Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { id: 'modules', icon: BookOpen, title: 'Training Modules', desc: `Access all ${modules.length} training modules`, color: 'from-blue-500 to-cyan-500' },
            { id: 'resources', icon: FileText, title: 'Study Resources', desc: 'PMBOK Guide, Agile Practice Guide, and case studies', color: 'from-purple-500 to-pink-500' },
            { id: 'quiz', icon: PenTool, title: 'Practice Questions', desc: 'Test your knowledge with mastery builder questions', color: 'from-green-500 to-emerald-500' },
            { id: 'glossary', icon: BookMarked, title: 'Glossary', desc: 'Quick reference for PMP terminology', color: 'from-orange-500 to-red-500' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className={`bg-gradient-to-br ${item.color} p-6`}>
                  <Icon className="h-12 w-12 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{item.desc}</p>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="w-full btn-primary text-sm"
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Modules Overview */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Training Modules Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <motion.div
                key={module.id}
                variants={itemVariants}
                whileHover={{ x: 4, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-l-4 border-primary-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Module {module.id}
                  </span>
                  {completedModules.includes(module.id) && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{module.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                <button
                  onClick={() => {
                    onNavigate('modules');
                    setTimeout(() => {
                      const event = new CustomEvent('openModule', { detail: module.id });
                      window.dispatchEvent(event);
                    }, 100);
                  }}
                  className="btn-secondary text-sm w-full"
                >
                  Open Module →
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
