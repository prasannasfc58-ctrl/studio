export type Candidate = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  status: 'Available' | 'Interviewing' | 'Hired';
  courses: string[];
  caddScore: number;
  skills: string[];
  topics: string[];
  summary: string;
  education: {
    institution: string;
    degree: string;
    years: string;
  }[];
  experience: {
    company: string;
    role: string;
    years: string;
    description: string;
  }[];
};
