import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Search, FileText, CheckCircle2, Lightbulb } from 'lucide-react';

function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-primary-500 to-purple-600 p-4 rounded-2xl shadow-2xl mb-6">
            <BookMarked className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">PMP Glossary</h1>
          <p className="text-xl text-gray-600">Quick reference for PMP terminology and definitions</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search glossary terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
              />
            </div>
            <button
              onClick={() => setIsViewerOpen(!isViewerOpen)}
              className="btn-primary whitespace-nowrap"
            >
              {isViewerOpen ? (
                <>
                  <FileText className="h-5 w-5 inline mr-2" />
                  Hide PDF
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 inline mr-2" />
                  View Full Glossary PDF
                </>
              )}
            </button>
          </div>
        </div>

        {isViewerOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="h-[calc(100vh-300px)] min-h-[600px]">
              <iframe
                src="/materials/Glossary - PMP .pdf"
                title="PMP Glossary"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <BookMarked className="h-8 w-8 text-primary-500" />
                <span>About the Glossary</span>
              </h2>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                The PMP Glossary contains comprehensive definitions of all project management 
                terms, concepts, and terminology used throughout the PMP certification exam 
                and training materials.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Use the search function above to quickly find specific terms, or click 
                "View Full Glossary PDF" to browse the complete glossary document.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Search, title: 'Searchable Terms', desc: 'Quickly find definitions' },
                  { icon: BookMarked, title: 'Comprehensive', desc: 'All PMP terminology' },
                  { icon: Lightbulb, title: 'Quick Reference', desc: 'Easy to use guide' }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200"
                    >
                      <div className="bg-primary-100 p-3 rounded-lg w-fit mb-4">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Glossary;
