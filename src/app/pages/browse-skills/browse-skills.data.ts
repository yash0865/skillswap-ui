export interface SkillCategory {
  key: string;
  label: string;
  icon: string;      // emoji used as a lightweight icon
  count: number;
}

export interface SkillTag {
  text: string;
  variant: 'teach' | 'learn';
}

export interface SkillProfile {
  id: number;
  name: string;
  verified: boolean;
  title: string;
  status: 'online' | 'offline' | 'both';
  avatarUrl: string;
  teachTags: string[];
  learnTags: string[];
  rating: number;
  reviews: number;
  location: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  { key: 'all', label: 'All Categories', icon: 'ðŸ”²', count: 0 },
  { key: 'programming', label: 'Programming', icon: 'ðŸ’»', count: 324 },
  { key: 'design', label: 'Design', icon: 'ðŸŽ¨', count: 156 },
  { key: 'business', label: 'Business', icon: 'ðŸ’¼', count: 142 },
  { key: 'marketing', label: 'Marketing', icon: 'ðŸ“£', count: 98 },
  { key: 'language', label: 'Language', icon: 'ðŸˆ´', count: 87 },
  { key: 'music', label: 'Music', icon: 'ðŸŽµ', count: 64 },
  { key: 'lifestyle', label: 'Lifestyle', icon: 'ðŸŒ¿', count: 53 },
];

export const SKILL_AVATAR_URLS: Record<number, string> = {
  1: 'https://i.pravatar.cc/200?img=13',
  2: 'https://i.pravatar.cc/200?img=5',
  3: 'https://i.pravatar.cc/200?img=12',
  4: 'https://i.pravatar.cc/200?img=32',
  5: 'https://i.pravatar.cc/200?img=14',
  6: 'https://i.pravatar.cc/200?img=9',
  7: 'https://i.pravatar.cc/200?img=15',
  8: 'https://i.pravatar.cc/200?img=20',
};
