
export interface Item {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'personal' | 'health' | 'finance' | 'education' | 'travel';
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}
