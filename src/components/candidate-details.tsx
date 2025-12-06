"use client";

import type { Candidate } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Edit, Send, Star, MapPin } from 'lucide-react';
import { IntelligentMatching } from './intelligent-matching';
import { Badge } from '@/components/ui/badge';

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
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4"/> Edit Info</Button>
            <Button size="sm"><Send className="mr-2 h-4 w-4"/> Send Message</Button>
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

        <div>
            <h3 className="font-semibold mb-2">Skills & Score</h3>
             <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                    {candidate.skills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                </div>
                <InfoRow 
                    label="CADD Score" 
                    value={
                        <div className="flex items-center gap-1.5">
                           <Star className="h-4 w-4 text-primary fill-current" />
                           <span className="font-bold text-base">{candidate.caddScore}</span>
                        </div>
                    } 
                />
            </div>
        </div>

        <IntelligentMatching candidateSkills={candidate.skills} listedTopics={candidate.topics} />

    </div>
  );
}
