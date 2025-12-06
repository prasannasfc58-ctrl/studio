import type { Candidate } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Mail, Phone, Briefcase, BookOpen, Star } from 'lucide-react';
import { IntelligentMatching } from './intelligent-matching';

interface CandidateDetailsProps {
  candidate: Candidate | null;
}

const DetailItem = ({ icon: Icon, label, children }: { icon: React.ElementType, label: string, children: React.ReactNode }) => (
  <div className="flex items-start gap-4">
    <Icon className="mt-1 h-5 w-5 text-muted-foreground" />
    <div className="flex-1">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="text-base text-foreground">{children}</div>
    </div>
  </div>
);


export function CandidateDetails({ candidate }: CandidateDetailsProps) {
  if (!candidate) {
    return (
      <Card className="flex h-full min-h-[calc(100vh-8rem)] items-center justify-center">
        <CardContent className="flex flex-col items-center justify-center text-center">
            <Briefcase className="h-16 w-16 text-muted-foreground/30" />
            <h3 className="mt-4 text-lg font-semibold">Select a candidate</h3>
            <p className="mt-1 text-sm text-muted-foreground">
                Candidate details will be shown here.
            </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: Candidate['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Interviewing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Hired':
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
          <Avatar className="h-20 w-20 border">
            <AvatarImage src={candidate.avatar} alt={candidate.name} data-ai-hint="person portrait" />
            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{candidate.name}</CardTitle>
            <Badge className={`mt-2 ${getStatusColor(candidate.status)}`}>{candidate.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Information</h3>
            <DetailItem icon={Mail} label="Email"><a href={`mailto:${candidate.email}`} className="text-primary hover:underline">{candidate.email}</a></DetailItem>
            <DetailItem icon={Phone} label="Phone">{candidate.phone}</DetailItem>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="font-semibold">Professional Summary</h3>
            <p className="text-sm text-muted-foreground">{candidate.summary}</p>
          </div>
          <Separator />
          <div className="space-y-4">
             <h3 className="font-semibold">Skills</h3>
             <div className="flex flex-wrap gap-2">
              {candidate.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
             </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><BookOpen className="h-4 w-4" />Courses Completed</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {candidate.courses.map(course => <li key={course}>{course}</li>)}
              </ul>
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2"><Star className="h-4 w-4" />CADD Score</h3>
                <div className="flex items-center gap-3">
                    <Progress value={candidate.caddScore} className="h-2"/>
                    <span className="font-semibold text-primary">{candidate.caddScore}%</span>
                </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
             <h3 className="font-semibold">Topics of Interest</h3>
             <div className="flex flex-wrap gap-2">
              {candidate.topics.map(topic => <Badge key={topic} variant="outline">{topic}</Badge>)}
             </div>
          </div>
          <Separator />
          <IntelligentMatching candidateSkills={candidate.skills} listedTopics={candidate.topics} />
        </CardContent>
    </Card>
  );
}
