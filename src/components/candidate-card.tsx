import type { Candidate } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export function CandidateCard({ candidate, onSelect, isSelected }: CandidateCardProps) {
  
  const getStatusColor = (status: Candidate['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500';
      case 'Interviewing':
        return 'bg-blue-500';
      case 'Hired':
        return 'bg-gray-500';
    }
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isSelected ? 'border-primary ring-2 ring-primary' : 'border-border'
      )}
      onClick={() => onSelect(candidate.id)}
    >
      <CardContent className="flex items-start gap-4 p-4">
        <div className="relative shrink-0">
            <Avatar className="h-14 w-14 border">
              <AvatarImage src={candidate.avatar} alt={candidate.name} data-ai-hint="person portrait" />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className={cn(
                'absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full border-2 border-background',
                getStatusColor(candidate.status)
            )} />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{candidate.name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                <span>{candidate.caddScore}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {candidate.skills.slice(0, 4).join(', ')}{candidate.skills.length > 4 ? '...' : ''}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
