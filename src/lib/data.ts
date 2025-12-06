import type { Candidate } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getAvatarUrl = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? image.imageUrl : 'https://picsum.photos/seed/placeholder/200/200';
};

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Elena Vance',
    avatar: getAvatarUrl('avatar-1'),
    email: 'elena.vance@example.com',
    phone: '555-0101',
    location: 'New York, NY',
    status: 'Available',
    courses: ['Advanced React', 'State Management Patterns'],
    caddScore: 85,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Jest'],
    topics: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    summary: 'Senior Frontend Engineer with 8 years of experience in building scalable web applications. Passionate about clean code and user experience.'
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    avatar: getAvatarUrl('avatar-2'),
    email: 'marcus.thorne@example.com',
    phone: '555-0102',
    location: 'San Francisco, CA',
    status: 'Interviewing',
    courses: ['Cloud Native Go', 'Microservices Architecture'],
    caddScore: 92,
    skills: ['Go', 'Kubernetes', 'Docker', 'PostgreSQL', 'gRPC', 'DevOps Automation'],
    topics: ['Distributed Systems', 'Backend Scalability', 'DevOps Automation'],
    summary: 'Backend developer specializing in cloud-native technologies and distributed systems. Proven track record of designing and deploying robust microservices.'
  },
  {
    id: '3',
    name: 'Chloe Rivera',
    avatar: getAvatarUrl('avatar-3'),
    email: 'chloe.rivera@example.com',
    phone: '555-0103',
    location: 'Austin, TX',
    status: 'Available',
    courses: ['UI/UX Design Principles', 'Figma for UI Design'],
    caddScore: 78,
    skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
    topics: ['Design Systems', 'User-Centered Design', 'Mobile App UX'],
    summary: 'Creative UI/UX designer with a strong focus on creating intuitive and visually appealing digital experiences. Proficient in all stages of the design process.'
  },
  {
    id: '4',
    name: 'David Chen',
    avatar: getAvatarUrl('avatar-4'),
    email: 'david.chen@example.com',
    phone: '555-0104',
    location: 'Seattle, WA',
    status: 'Hired',
    courses: ['Machine Learning with Python', 'Deep Learning Specialization'],
    caddScore: 95,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas', 'Natural Language Processing'],
    topics: ['Natural Language Processing', 'Computer Vision', 'Recommender Systems'],
    summary: 'Data Scientist with expertise in machine learning and deep learning models. Skilled in turning data into actionable insights.'
  },
  {
    id: '5',
    name: 'Sofia Petrova',
    avatar: getAvatarUrl('avatar-5'),
    email: 'sofia.petrova@example.com',
    phone: '555-0105',
    location: 'Chicago, IL',
    status: 'Interviewing',
    courses: ['Agile Project Management', 'Certified ScrumMaster'],
    caddScore: 88,
    skills: ['Agile Methodologies', 'Scrum', 'Jira', 'Product Roadmapping', 'Stakeholder Management', 'Team Leadership'],
    topics: ['Lean Product Development', 'Team Leadership', 'Release Planning'],
    summary: 'Experienced Project Manager with a knack for leading cross-functional teams in fast-paced environments. Certified ScrumMaster with a focus on agile principles.'
  },
  {
    id: '6',
    name: 'Leo Kim',
    avatar: getAvatarUrl('avatar-6'),
    email: 'leo.kim@example.com',
    phone: '555-0106',
    location: 'Boston, MA',
    status: 'Available',
    courses: ['Cybersecurity Fundamentals', 'Ethical Hacking'],
    caddScore: 82,
    skills: ['Network Security', 'Penetration Testing', 'Cryptography', 'Python', 'Wireshark', 'Cloud Security'],
    topics: ['Threat Analysis', 'Incident Response', 'Cloud Security'],
    summary: 'Cybersecurity analyst passionate about protecting digital assets. Experienced in identifying vulnerabilities and implementing robust security measures.'
  }
];

export const candidateStatuses: Candidate['status'][] = ['Available', 'Interviewing', 'Hired'];
