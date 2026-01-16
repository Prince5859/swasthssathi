import React, { useState, useMemo } from 'react';
import { Search, Sparkles, AlertCircle } from 'lucide-react';

interface CustomProblemInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string; // New prop for custom error message
}

// Define the structure for suggestions with keywords for better matching
interface SuggestionItem {
  text: string;
  keywords: string[];
}

// Comprehensive list of health issues with related keywords (Tags)
const HEALTH_SUGGESTIONS: SuggestionItem[] = [
  // Stomach & Digestion (Keywords: pet, stomach, digest)
  { text: "पेट दर्द (Stomach Pain)", keywords: ["pet", "stomach", "pain", "dard", "abdomen", "digest"] },
  { text: "गैस और एसिडिटी (Gas & Acidity)", keywords: ["gas", "acidity", "jalan", "bloating", "pet", "stomach", "afara"] },
  { text: "कब्ज (Constipation)", keywords: ["kabz", "constipation", "pet", "stomach", "toilet", "fresh"] },
  { text: "दस्त (Loose Motion)", keywords: ["dast", "loose", "motion", "pet", "stomach", "diarrhea"] },
  
  // Head, Fever, Cold
  { text: "सिरदर्द (Headache)", keywords: ["head", "sir", "sar", "pain", "dard", "migraine", "matha"] },
  { text: "बुखार (Fever)", keywords: ["bukhar", "fever", "tapman", "garam", "temperature"] },
  { text: "सर्दी-जुकाम (Cold & Cough)", keywords: ["sardi", "jukam", "khansi", "cold", "cough", "flu", "gala", "naak"] },
  { text: "गले में खराश (Sore Throat)", keywords: ["gala", "throat", "kharash", "pain", "khansi"] },

  // Pain (Joints, Body)
  { text: "कमर दर्द (Back Pain)", keywords: ["kamar", "back", "pain", "dard", "slip disc", "spine"] },
  { text: "घुटनों का दर्द (Knee Pain)", keywords: ["ghutna", "knee", "pain", "dard", "joint", "gathiya", "pair"] },
  { text: "जोड़ों का दर्द (Joint Pain)", keywords: ["jod", "joint", "pain", "dard", "arthritis", "body pain"] },
  { text: "दांत दर्द (Toothache)", keywords: ["dant", "tooth", "pain", "dard", "teeth", "musauda"] },
  { text: "आंखों में जलन/दर्द (Eye Strain)", keywords: ["aankh", "eye", "jalan", "strain", "pain", "vision", "najar"] },

  // Skin & Hair
  { text: "बाल झड़ना (Hair Fall)", keywords: ["baal", "hair", "fall", "jhadna", "ganjapan", "tutna"] },
  { text: "डैंड्रफ (Dandruff)", keywords: ["dandruff", "rusi", "baal", "hair", "scalp"] },
  { text: "पिम्पल्स/मुंहासे (Acne & Pimples)", keywords: ["pimple", "acne", "muhase", "skin", "chehra", "face", "daane"] },
  { text: "चेहरे पर चमक (Glowing Skin)", keywords: ["glow", "skin", "chamian", "face", "chehra", "fair", "rang"] },
  { text: "काले घेरे (Dark Circles)", keywords: ["dark", "circle", "aankh", "eye", "kale", "ghere"] },

  // Weight & Energy
  { text: "वजन कम करना (Weight Loss)", keywords: ["wajan", "weight", "loss", "motapa", "fat", "kam", "pet kam"] },
  { text: "वजन बढ़ाना (Weight Gain)", keywords: ["wajan", "weight", "gain", "mota", "dubla", "thin", "kamjor"] },
  { text: "थकान और कमजोरी (Fatigue & Weakness)", keywords: ["thakan", "kamjori", "weakness", "energy", "fatigue", "taqat"] },
  
  // Mental & Sleep
  { text: "नींद न आना (Insomnia)", keywords: ["neend", "sleep", "insomnia", "sona", "rest", "jagran"] },
  { text: "तनाव और चिंता (Stress & Anxiety)", keywords: ["stress", "anxiety", "tension", "chinta", "dimag", "depression"] },
];

const CustomProblemInput: React.FC<CustomProblemInputProps> = ({ value, onChange, error }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Enhanced filter logic to search in keywords too
  const filteredSuggestions = useMemo(() => {
    const input = value.trim().toLowerCase();
    
    if (input === '') {
      // Return a mix of common issues when empty
      return HEALTH_SUGGESTIONS.slice(0, 6);
    }

    return HEALTH_SUGGESTIONS.filter(item => {
      // Match with visible text
      if (item.text.toLowerCase().includes(input)) return true;
      // Match with hidden keywords (tags) for related suggestions
      if (item.keywords.some(k => k.includes(input))) return true;
      return false;
    });
  }, [value]);

  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="animate-fade-in relative mb-8">
        {/* Playful Label */}
        <label className="block text-xl font-bold text-teal-900 mb-3 ml-1 flex items-center gap-2">
            <span className="text-3xl animate-bounce">🤔</span> 
            अपनी समस्या यहाँ विस्तार से लिखें...
        </label>
        
        <div className="relative group">
            {/* Cartoon Style Textarea with Hard Shadow */}
            <textarea
                className={`w-full pl-6 pr-12 py-5 bg-white border-4 rounded-3xl 
                outline-none text-gray-700 placeholder-teal-300 min-h-[160px] 
                transition-all resize-none text-lg font-medium tracking-wide
                ${error 
                  ? 'border-rose-500 shadow-[6px_6px_0px_0px_rgba(244,63,94,0.4)] focus:border-rose-600' 
                  : 'border-teal-400 shadow-[6px_6px_0px_0px_rgba(13,148,136,0.4)] focus:border-teal-600 focus:shadow-[2px_2px_0px_0px_rgba(13,148,136,0.8)] focus:translate-x-[2px] focus:translate-y-[2px]'
                }`}
                placeholder="जैसे: मुझे कल रात से बहुत तेज बुखार है और सिर में दर्द भी हो रहा है..."
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                    setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                    // Delay hiding to allow click event on suggestion
                    setTimeout(() => setShowSuggestions(false), 200);
                }}
                // removed 'required' attribute to handle validation manually
            ></textarea>

            {/* Floating Fun Icon */}
            <div className={`absolute -top-4 -right-2 p-2 rounded-full border-4 border-white shadow-lg transform rotate-12 group-focus-within:rotate-0 transition-transform ${error ? 'bg-rose-500 text-white' : 'bg-yellow-400 text-teal-900'}`}>
                {error ? <AlertCircle className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
            </div>

            {/* Cartoon Error Bubble */}
            {error && (
              <div className="absolute -bottom-5 left-8 z-10 animate-bounce">
                <div className="bg-rose-500 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black transform -rotate-2 relative">
                  {error}
                  {/* Triangle pointer */}
                  <div className="absolute -top-2 left-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black"></div>
                  <div className="absolute -top-[5px] left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-rose-500 z-10"></div>
                </div>
              </div>
            )}
        </div>

        {/* Suggestions Dropdown - Cartoon Card Style */}
        {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-20 left-2 right-2 mt-4 bg-white border-4 border-teal-200 rounded-2xl shadow-xl max-h-72 overflow-y-auto animate-slide-up custom-scrollbar">
                <div className="p-3 bg-teal-50 border-b-4 border-teal-100 font-bold text-teal-700 flex items-center gap-2 sticky top-0 z-10">
                    <Search className="w-5 h-5" />
                    क्या आपकी समस्या इनमें से है?
                </div>
                <div className="p-2 space-y-2">
                    {filteredSuggestions.map((issue, index) => (
                        <button
                            key={index}
                            type="button"
                            className="w-full text-left px-5 py-3 bg-white hover:bg-yellow-50 text-gray-700 hover:text-teal-900 
                            rounded-xl border-2 border-transparent hover:border-yellow-400 transition-all 
                            flex items-center gap-3 group shadow-sm hover:shadow-md"
                            onMouseDown={(e) => {
                                // Prevent blur from firing before click
                                e.preventDefault();
                                handleSelectSuggestion(issue.text);
                            }}
                        >
                            <span className="w-3 h-3 rounded-full bg-teal-200 group-hover:bg-yellow-500 transition-colors border-2 border-transparent group-hover:border-yellow-600"></span>
                            <span className="font-medium text-base">{issue.text}</span>
                        </button>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};

export default CustomProblemInput;