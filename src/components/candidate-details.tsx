"use client";

import type { Candidate } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin } from 'lucide-react';
import { IntelligentMatching } from './intelligent-matching';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CandidateDetailsProps {
  candidate: Candidate | null;
}

const InfoRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="flex justify-between items-start text-sm py-1">
        <p className="text-muted-foreground">{label}</p>
        <div className="font-medium text-foreground text-right">{value}</div>
    </div>
);


export function CandidateDetails({ candidate }: CandidateDetailsProps) {
  if (!candidate) {
    return (
      <div className="flex h-full items-center justify-center text-center">
        <div>
          <p className="text-lg font-semibold">Select an employee</p>
          <p className="text-sm text-muted-foreground">Employee details will appear here.</p>
        </div>
      </div>
    );
  }

  const matchingSkills = candidate.skills.filter(skill => candidate.topics.includes(skill));
  const skillMatchPercentage = candidate.topics.length > 0 ? (matchingSkills.length / candidate.topics.length) * 100 : 0;

  return (
    <div className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 border-4 border-card shadow-md">
            <AvatarImage src={candidate.avatar} alt={candidate.name} />
            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold mt-4">{candidate.name}</h2>
          <p className="text-muted-foreground">{candidate.summary.split('.')[0]}</p>
          <div className="flex items-center gap-2 mt-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{candidate.location}</span>
          </div>
        </div>
        
        <Separator />

        <div>
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <div className="space-y-1">
                <InfoRow label="Phone" value={candidate.phone} />
                <InfoRow label="Email" value={<a href={`mailto:${candidate.email}`} className="text-primary hover:underline">{candidate.email}</a>} />
            </div>
        </div>
        
        <Separator />

        <div className="space-y-4">
          <div>
              <h4 className="text-sm font-semibold mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                  {candidate.topics.map(topic => (
                      <Badge key={topic} variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">{topic}</Badge>
                  ))}
              </div>
          </div>

          <div>
              <h4 className="text-sm font-semibold mb-2">User Skills</h4>
              <div className="flex flex-wrap gap-2">
                  {candidate.skills.map(skill => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className={
                          matchingSkills.includes(skill)
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-muted text-muted-foreground border"
                        }
                      >
                        {skill}
                      </Badge>
                  ))}
              </div>
          </div>

          <div>
              <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold">Skill Match</p>
                  <p className="text-sm font-bold text-foreground">{Math.round(skillMatchPercentage)}%</p>
              </div>
              <Progress value={skillMatchPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">You have completed {Math.round(skillMatchPercentage)}% of the required skills for this job.</p>
          </div>
        </div>

        <Separator />
        
        <InfoRow 
            label="CADD Score" 
            value={
                <div className="flex items-center gap-1.5">
                   <Star className="h-4 w-4 text-primary fill-current" />
                   <span className="font-bold text-base">{candidate.caddScore}</span>
                </div>
            } 
        />

        <IntelligentMatching candidateSkills={candidate.skills} listedTopics={candidate.topics} />

    </div>
  );
}
