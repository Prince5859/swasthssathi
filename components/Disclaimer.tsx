import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-orange-50 border-t border-orange-200 p-4 mt-8 text-sm text-orange-800 flex items-start gap-3 rounded-md">
      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p>
        <strong>अस्वीकरण (Disclaimer):</strong> यह जानकारी केवल सामान्य ज्ञान और जागरूकता के लिए है। 
        इसे चिकित्सा सलाह (Medical Advice) न समझें। किसी भी बीमारी या गंभीर लक्षण के लिए 
        हमेशा अपने डॉक्टर या विशेषज्ञ से सलाह लें।
      </p>
    </div>
  );
};

export default Disclaimer;