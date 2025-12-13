import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ArrowLeft, CheckCircle2, Circle, FileText } from 'lucide-react';
import { modules } from '../data/modules';
import PDFViewer from '../components/PDFViewer';

function Modules() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState(
    JSON.parse(localStorage.getItem('completedModules') || '[]')
  );

  useEffect(() => {
    const handleOpenModule = (e) => {
      setSelectedModule(e.detail);
    };
    window.addEventListener('openModule', handleOpenModule);
    return () => window.removeEventListener('openModule', handleOpenModule);
  }, []);

  const toggleModuleComplete = (moduleId) => {
    const updated = completedModules.includes(moduleId)
      ? completedModules.filter(id => id !== moduleId)
      : [...completedModules, moduleId];
    setCompletedModules(updated);
    localStorage.setItem('completedModules', JSON.stringify(updated));
  };

  const module = selectedModule !== null ? modules.find(m => m.id === selectedModule) : null;

  if (module) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-primary-500 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={() => setSelectedModule(null)}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Back to Modules</span>
              </button>
              <label className="flex items-center space-x-2 cursor-pointer bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors backdrop-blur-sm">
                <input
                  type="checkbox"
                  checked={completedModules.includes(module.id)}
                  onChange={() => toggleModuleComplete(module.id)}
                  className="hidden"
                />
                {completedModules.includes(module.id) ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
                <span className="font-semibold">Mark Complete</span>
              </label>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl font-bold mb-2">{module.title}</h2>
              <p className="text-white/90">{module.description}</p>
            </div>
          </div>
          <div className="h-[calc(100vh-300px)] min-h-[600px]">
            <PDFViewer pdfUrl={module.pdf} title={module.title} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Training Modules</h1>
          <p className="text-xl text-gray-600">Select a module to begin your training</p>
        </div>

        <div className="space-y-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-primary-500 to-purple-600 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Module {module.id}
                      </span>
                      {completedModules.includes(module.id) && (
                        <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Completed</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600 mb-6">{module.description}</p>
                <button
                  onClick={() => setSelectedModule(module.id)}
                  className="btn-primary"
                >
                  Open Module →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Modules;
