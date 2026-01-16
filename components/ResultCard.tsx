import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Share2 } from 'lucide-react';

interface ResultCardProps {
  content: string;
  onBack: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ content, onBack }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in mb-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <button 
          onClick={onBack}
          className="flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          वापस जाएं
        </button>
        <button className="text-gray-500 hover:text-teal-600" title="Share">
            <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Added specific prose classes for better heading and list styling */}
      <div className="prose prose-teal max-w-none text-gray-800 leading-relaxed font-hind prose-headings:text-teal-900 prose-headings:font-bold prose-p:text-gray-700 prose-li:marker:text-teal-600 prose-strong:text-teal-800">
         <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <div className="mt-8 text-center border-t pt-6">
        <button 
          onClick={onBack}
          className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-teal-700 transition-transform active:scale-95"
        >
          नई समस्या चुनें
        </button>
      </div>
    </div>
  );
};

export default ResultCard;