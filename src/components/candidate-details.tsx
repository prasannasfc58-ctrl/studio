"use client";

import type { Candidate } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Edit, Send } from 'lucide-react';
import { IntelligentMatching } from './intelligent-matching';

interface CandidateDetailsProps {
  candidate: Candidate | null;
}

const InfoRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="flex justify-between items-center text-sm">
        <p className="text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground text-right">{value}</p>
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
          <Avatar className="h-24 w-24 border-4 border-card">
            <AvatarImage src={candidate.avatar} alt={candidate.name} />
            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold mt-4">{candidate.name}</h2>
          <p className="text-muted-foreground">{candidate.summary.split('.')[0]}</p>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4"/> Edit Info</Button>
            <Button size="sm"><Send className="mr-2 h-4 w-4"/> Send Message</Button>
          </div>
        </div>
        
        <Separator />

        <div>
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <div className="space-y-2">
                <InfoRow label="Phone Number" value={candidate.phone} />
                <InfoRow label="Email" value={<a href={`mailto:${candidate.email}`} className="text-primary hover:underline">{candidate.email}</a>} />
            </div>
        </div>
        
        <Separator />

        <div>
            <h3 className="font-semibold mb-2">Work Information</h3>
            <div className="space-y-2">
                <InfoRow label="Employee ID" value={candidate.id} />
                <InfoRow label="Department" value={candidate.skills.slice(0,1).join(', ')} />
            </div>
        </div>
        
        <Separator />

        <div>
            <h3 className="font-semibold mb-2">Personal Information</h3>
            <div className="space-y-2">
                <InfoRow label="First Name" value={candidate.name.split(' ')[0]} />
                <InfoRow label="Last Name" value={candidate.name.split(' ')[1]} />
                <InfoRow label="Gender" value="-" />
                <InfoRow label="Address" value="-" />
                <InfoRow label="City" value="-" />
                <InfoRow label="State & Country" value="-" />
            </div>
        </div>

        <IntelligentMatching candidateSkills={candidate.skills} listedTopics={candidate.topics} />

    </div>
  );
}
