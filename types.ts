export enum HealthCategory {
  WEIGHT_LOSS = 'weight_loss',
  WEIGHT_GAIN = 'weight_gain',
  STOMACH_ISSUES = 'stomach_issues',
  FATIGUE = 'fatigue',
  HAIR_CARE = 'hair_care',
  SKIN_CARE = 'skin_care',
  SLEEP = 'sleep',
  IMMUNITY = 'immunity',
  MENS_HEALTH = 'mens_health',
  WOMENS_HEALTH = 'womens_health',
  CUSTOM = 'custom'
}

export interface UserDetails {
  age: string;
  gender: 'male' | 'female' | 'other' | '';
}

export interface CategoryInfo {
  id: HealthCategory;
  label: string; // Hindi Label
  icon: string;
  description: string;
}