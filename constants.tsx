import { HealthCategory, CategoryInfo } from './types';
import { 
  Scale, 
  Utensils, 
  Flame, 
  BatteryLow, 
  Scissors, 
  Sparkles, 
  Moon, 
  ShieldCheck, 
  User, 
  UserCheck,
  MessageCircle
} from 'lucide-react';
import React from 'react';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: HealthCategory.CUSTOM,
    label: 'अपनी समस्या लिखें',
    icon: 'MessageCircle',
    description: 'यहाँ लिखकर सवाल पूछें'
  },
  {
    id: HealthCategory.WEIGHT_LOSS,
    label: 'वजन कम करें',
    icon: 'Scale',
    description: 'मोटापा घटाने के घरेलू उपाय'
  },
  {
    id: HealthCategory.WEIGHT_GAIN,
    label: 'वजन बढ़ाएं',
    icon: 'Utensils',
    description: 'दुबलेपन से छुटकारा पाएं'
  },
  {
    id: HealthCategory.STOMACH_ISSUES,
    label: 'पेट की समस्या',
    icon: 'Flame',
    description: 'गैस, कब्ज और एसिडिटी'
  },
  {
    id: HealthCategory.FATIGUE,
    label: 'कमजोरी और थकान',
    icon: 'BatteryLow',
    description: 'ऊर्जा और ताकत बढ़ाएं'
  },
  {
    id: HealthCategory.HAIR_CARE,
    label: 'बालों की देखभाल',
    icon: 'Scissors',
    description: 'झड़ना रोकें, डैंड्रफ हटाएँ'
  },
  {
    id: HealthCategory.SKIN_CARE,
    label: 'स्किन केयर',
    icon: 'Sparkles',
    description: 'दाग-धब्बे और ग्लोइंग स्किन'
  },
  {
    id: HealthCategory.SLEEP,
    label: 'नींद की समस्या',
    icon: 'Moon',
    description: 'अच्छी और गहरी नींद के लिए'
  },
  {
    id: HealthCategory.IMMUNITY,
    label: 'इम्यूनिटी बढ़ाएं',
    icon: 'ShieldCheck',
    description: 'रोग प्रतिरोधक क्षमता'
  },
  {
    id: HealthCategory.MENS_HEALTH,
    label: 'पुरुष स्वास्थ्य',
    icon: 'User',
    description: 'सामान्य स्वास्थ्य जानकारी'
  },
  {
    id: HealthCategory.WOMENS_HEALTH,
    label: 'महिला स्वास्थ्य',
    icon: 'UserCheck',
    description: 'सामान्य स्वास्थ्य जानकारी'
  },
];

export const getIcon = (iconName: string, className?: string) => {
  const props = { className: className || "w-6 h-6" };
  switch (iconName) {
    case 'Scale': return <Scale {...props} />;
    case 'Utensils': return <Utensils {...props} />;
    case 'Flame': return <Flame {...props} />;
    case 'BatteryLow': return <BatteryLow {...props} />;
    case 'Scissors': return <Scissors {...props} />;
    case 'Sparkles': return <Sparkles {...props} />;
    case 'Moon': return <Moon {...props} />;
    case 'ShieldCheck': return <ShieldCheck {...props} />;
    case 'User': return <User {...props} />;
    case 'UserCheck': return <UserCheck {...props} />;
    case 'MessageCircle': return <MessageCircle {...props} />;
    default: return <Sparkles {...props} />;
  }
};