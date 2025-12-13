import { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { PenTool, FileText, Target, TrendingUp, Award } from 'lucide-react';
import PDFViewer from '../components/PDFViewer';

function Quiz() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl shadow-2xl mb-6">
            <PenTool className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Practice Questions</h1>
          <p className="text-xl text-gray-600">Test your knowledge with PMP mastery builder questions</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <PenTool className="h-8 w-8 text-green-500" />
              <span>Mastery Builder Questions</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              The Mastery Builder Questions document contains comprehensive practice questions 
              designed to help you prepare for the PMP certification exam. These questions cover 
              all knowledge areas and process groups.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Target, title: 'Comprehensive Coverage', desc: 'Questions covering all PMP knowledge areas', color: 'from-blue-500 to-cyan-500' },
                { icon: TrendingUp, title: 'Exam-Style Questions', desc: 'Practice with questions similar to the actual exam', color: 'from-purple-500 to-pink-500' },
                { icon: Award, title: 'Track Your Progress', desc: 'Identify areas that need more study', color: 'from-green-500 to-emerald-500' }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className={`bg-gradient-to-br ${feature.color} p-6 rounded-xl text-white`}
                  >
                    <Icon className="h-8 w-8 mb-4" />
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-white/90 text-sm">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={() => setIsViewerOpen(!isViewerOpen)}
              className="btn-primary w-full text-lg py-4"
            >
              {isViewerOpen ? (
                <>
                  <FileText className="h-6 w-6 inline mr-2" />
                  Hide Questions
                </>
              ) : (
                <>
                  <FileText className="h-6 w-6 inline mr-2" />
                  Open Practice Questions PDF
                </>
              )}
            </button>
          </div>
        </motion.div>

        {isViewerOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="h-[calc(100vh-300px)] min-h-[600px]">
              <PDFViewer pdfUrl="/materials/Mastery Builder Questions_v3_Jan 2023.pdf" title="PMP Practice Questions" />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Quiz;
