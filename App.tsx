import React, { useState, useEffect } from 'react';
import { CATEGORIES, getIcon } from './constants';
import { HealthCategory, UserDetails } from './types';
import { generateHealthTips } from './services/geminiService';
import Disclaimer from './components/Disclaimer';
import ResultCard from './components/ResultCard';
import CustomProblemInput from './components/CustomProblem/CustomProblemInput';
import { HeartPulse, Loader2, Sparkles, ArrowLeft, User, Calendar } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1); 
  const [selectedCategory, setSelectedCategory] = useState<HealthCategory | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails>({ age: '', gender: '' });
  const [customProblem, setCustomProblem] = useState<string>('');
  const [aiResult, setAiResult] = useState<string>('');
  const [errors, setErrors] = useState<{ age?: string; gender?: string; customProblem?: string }>({});

  // CRITICAL: Ensure loading screen is removed as soon as the JS bundle executes and React mounts
  useEffect(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.style.opacity = '0';
      const timeout = setTimeout(() => {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleCategorySelect = (id: HealthCategory) => {
    setSelectedCategory(id);
    window.scrollTo(0, 0);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCustomProblem('');
    setUserDetails({ age: '', gender: '' });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: { age?: string; gender?: string; customProblem?: string } = {};
    let isValid = true;

    if (selectedCategory === HealthCategory.CUSTOM && !customProblem.trim()) {
        newErrors.customProblem = "कृपया अपनी समस्या यहाँ लिखें!";
        isValid = false;
    }
    if (!userDetails.age) {
        newErrors.age = "अपनी उम्र दर्ज करें!";
        isValid = false;
    } else {
        const ageNum = parseInt(userDetails.age, 10);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 115) {
            newErrors.age = "कृपया सही उम्र लिखें!";
            isValid = false;
        }
    }
    if (!userDetails.gender) {
        newErrors.gender = "लिंग का चयन करें!";
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!selectedCategory) return;

    setStep(2);
    const categoryLabel = CATEGORIES.find(c => c.id === selectedCategory)?.label || '';
    
    try {
      const result = await generateHealthTips(
          selectedCategory, 
          categoryLabel, 
          userDetails,
          customProblem
      );
      setAiResult(result);
      setStep(3);
      window.scrollTo(0, 0);
    } catch (error) {
      setAiResult("क्षमा करें, तकनीकी खराबी के कारण टिप्स नहीं मिल सके। कृपया दोबारा प्रयास करें।");
      setStep(3);
    }
  };

  const activeCategoryInfo = selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory) : null;

  return (
    <div className="min-h-screen pb-12 bg-gradient-to-b from-green-50 to-teal-50 antialiased">
      <header className="bg-teal-700 text-white py-5 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <HeartPulse className="w-9 h-9 text-green-300 animate-pulse" />
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">स्वास्थ्य साथी</h1>
              <p className="text-[10px] md:text-xs text-green-100 uppercase tracking-widest font-bold opacity-80">AI Health Guide</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8 max-w-4xl">
        {step === 1 && !selectedCategory && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-teal-900">नमस्ते! आज आप किस बारे में जानना चाहते हैं?</h2>
              <p className="text-gray-600">नीचे दिए गए विकल्पों में से एक चुनें</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className="p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-3 bg-white border-white hover:border-teal-300 hover:shadow-2xl hover:-translate-y-1 text-gray-800"
                >
                  <div className="p-3 rounded-2xl bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors">{getIcon(cat.icon)}</div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base">{cat.label}</h3>
                    <p className="text-[10px] text-gray-400 mt-1">{cat.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && selectedCategory && (
          <div className="animate-slide-up">
            <button onClick={handleBackToCategories} className="flex items-center text-teal-600 mb-6 font-bold hover:gap-1 transition-all">
              <ArrowLeft className="w-5 h-5 mr-1" /> वापस मुख्य मेनू पर
            </button>
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-teal-50">
              <div className="flex items-center gap-5 border-b border-gray-100 pb-8 mb-8">
                 <div className="p-4 rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-100">
                    {activeCategoryInfo && getIcon(activeCategoryInfo.icon, "w-8 h-8")}
                 </div>
                 <div>
                    <h3 className="font-bold text-2xl md:text-3xl text-teal-900 leading-tight">{activeCategoryInfo?.label}</h3>
                    <p className="text-sm text-gray-500 font-medium">बस एक कदम और...</p>
                 </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                {selectedCategory === HealthCategory.CUSTOM && (
                  <CustomProblemInput value={customProblem} onChange={setCustomProblem} error={errors.customProblem} />
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-teal-900 mb-3 ml-1 uppercase tracking-wider">आपकी उम्र (Age)</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
                      <input 
                        type="number" placeholder="उदा: 28"
                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all text-lg ${errors.age ? 'border-red-400 bg-red-50' : 'border-gray-100 focus:border-teal-500 focus:bg-white'}`}
                        value={userDetails.age}
                        onChange={(e) => setUserDetails({...userDetails, age: e.target.value})}
                      />
                    </div>
                    {errors.age && <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.age}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-teal-900 mb-3 ml-1 uppercase tracking-wider">लिंग (Gender)</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
                      <select 
                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none appearance-none transition-all text-lg ${errors.gender ? 'border-red-400 bg-red-50' : 'border-gray-100 focus:border-teal-500 focus:bg-white'}`}
                        value={userDetails.gender}
                        onChange={(e) => setUserDetails({...userDetails, gender: e.target.value as any})}
                      >
                        <option value="">चुनें...</option>
                        <option value="male">पुरुष (Male)</option>
                        <option value="female">महिला (Female)</option>
                        <option value="other">अन्य (Other)</option>
                      </select>
                    </div>
                    {errors.gender && <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.gender}</p>}
                  </div>
                </div>
                <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-teal-100 flex justify-center items-center gap-3 text-xl transform active:scale-[0.98] transition-all">
                  <Sparkles className="w-6 h-6 animate-pulse" /> स्वास्थ्य टिप्स प्राप्त करें
                </button>
              </form>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 animate-fade-in">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-teal-600 animate-spin" />
              <HeartPulse className="w-6 h-6 text-teal-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-teal-900">AI आपके लिए सबसे बेहतर उपाय ढूंढ रहा है...</h3>
              <p className="text-gray-500 font-medium">इसमें 5-10 सेकंड का समय लग सकता है</p>
            </div>
          </div>
        )}

        {step === 3 && <ResultCard content={aiResult} onBack={() => setStep(1)} />}

        <Disclaimer />
        <footer className="text-center text-gray-400 text-[10px] mt-16 mb-8 uppercase tracking-[0.2em] font-bold">
          <p>&copy; {new Date().getFullYear()} Swasthya Saathi AI • Health is Wealth</p>
        </footer>
      </main>
    </div>
  );
};

export default App;