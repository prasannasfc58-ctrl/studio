"use client";

import type { Candidate } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface EmployeeTableProps {
  candidates: Candidate[];
  selectedCandidateId: string | null;
  onSelectCandidate: (id: string) => void;
}

export function EmployeeTable({ candidates, selectedCandidateId, onSelectCandidate }: EmployeeTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>CADD Score</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map(candidate => (
            <TableRow 
              key={candidate.id}
              className={cn("cursor-pointer", selectedCandidateId === candidate.id && "bg-muted/50")}
              onClick={() => onSelectCandidate(candidate.id)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={candidate.avatar} alt={candidate.name} />
                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground">{candidate.phone}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 2).map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-primary/80" />
                  <span className="font-semibold">{candidate.caddScore}</span>
                </div>
              </TableCell>
              <TableCell>{candidate.location}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
