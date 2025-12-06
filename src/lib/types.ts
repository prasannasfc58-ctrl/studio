export type Candidate = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  status: 'Available' | 'Interviewing' | 'Hired';
  courses: string[];
  caddScore: number;
  skills: string[];
  topics: string[];
  summary: string;
};
