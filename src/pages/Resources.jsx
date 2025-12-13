import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ArrowLeft, FileText, BookOpen, FileQuestion, Briefcase } from 'lucide-react';
import { resources } from '../data/modules';
import PDFViewer from '../components/PDFViewer';

function Resources() {
  const [selectedResource, setSelectedResource] = useState(null);

  const resource = selectedResource !== null 
    ? resources.find(r => r.id === selectedResource) 
    : null;

  const getIcon = (type) => {
    switch (type) {
      case 'reference': return BookOpen;
      case 'case-study': return Briefcase;
      case 'practice': return FileQuestion;
      default: return FileText;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'reference': return 'from-blue-500 to-cyan-500';
      case 'case-study': return 'from-orange-500 to-red-500';
      case 'practice': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (resource) {
    const iconColor = getColor(resource.type);
    const renderIcon = () => {
      const Icon = getIcon(resource.type);
      return <Icon className="h-8 w-8" />;
    };
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className={`bg-gradient-to-r ${iconColor} p-6 text-white`}>
            <button
              onClick={() => setSelectedResource(null)}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors backdrop-blur-sm mb-4"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back to Resources</span>
            </button>
            <div className="flex items-center space-x-3">
              {renderIcon()}
              <div>
                <h2 className="text-3xl font-bold">{resource.title}</h2>
                <span className="inline-block mt-2 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                  {resource.type === 'reference' ? '📖 Reference' : 
                   resource.type === 'case-study' ? '📋 Case Study' : 
                   '✏️ Practice'}
                </span>
              </div>
            </div>
          </div>
          <div className="h-[calc(100vh-300px)] min-h-[600px]">
            <PDFViewer pdfUrl={resource.pdf} title={resource.title} />
          </div>
        </motion.div>
      </div>
    );
  }

  const groupedResources = {
    reference: resources.filter(r => r.type === 'reference'),
    'case-study': resources.filter(r => r.type === 'case-study'),
    practice: resources.filter(r => r.type === 'practice')
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Study Resources</h1>
          <p className="text-xl text-gray-600">Access reference materials, case studies, and practice questions</p>
        </div>

        {groupedResources.reference.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <span>Reference Materials</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedResources.reference.map((resource, index) => {
                const Icon = getIcon(resource.type);
                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 text-center"
                  >
                    <div className={`bg-gradient-to-br ${getColor(resource.type)} p-8`}>
                      <Icon className="h-12 w-12 text-white mx-auto" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 min-h-[3rem] flex items-center justify-center">
                        {resource.title}
                      </h3>
                      <button
                        onClick={() => setSelectedResource(resource.id)}
                        className="btn-primary w-full"
                      >
                        Open Resource →
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {groupedResources['case-study'].length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Briefcase className="h-8 w-8 text-orange-500" />
              <span>Case Studies</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedResources['case-study'].map((resource, index) => {
                const Icon = getIcon(resource.type);
                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 text-center"
                  >
                    <div className={`bg-gradient-to-br ${getColor(resource.type)} p-8`}>
                      <Icon className="h-12 w-12 text-white mx-auto" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 min-h-[3rem] flex items-center justify-center">
                        {resource.title}
                      </h3>
                      <button
                        onClick={() => setSelectedResource(resource.id)}
                        className="btn-primary w-full"
                      >
                        Open Case Study →
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {groupedResources.practice.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <FileQuestion className="h-8 w-8 text-green-500" />
              <span>Practice Materials</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedResources.practice.map((resource, index) => {
                const Icon = getIcon(resource.type);
                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 text-center"
                  >
                    <div className={`bg-gradient-to-br ${getColor(resource.type)} p-8`}>
                      <Icon className="h-12 w-12 text-white mx-auto" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 min-h-[3rem] flex items-center justify-center">
                        {resource.title}
                      </h3>
                      <button
                        onClick={() => setSelectedResource(resource.id)}
                        className="btn-primary w-full"
                      >
                        Open Practice Questions →
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
}

export default Resources;
