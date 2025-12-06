"use client";

import type { Candidate } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, Pause } from 'lucide-react';

interface EditStatusDialogProps {
  candidate: Candidate | null;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (candidateId: string, newStatus: Candidate['status']) => void;
}

export function EditStatusDialog({ candidate, onOpenChange, onStatusChange }: EditStatusDialogProps) {
  if (!candidate) return null;

  const possibleStatuses: Candidate['status'][] = ['On Hold', 'Selected', 'Rejected'];
  const otherStatuses = possibleStatuses.filter(s => s !== candidate.status);

  const getButtonVariant = (status: Candidate['status']) => {
    switch (status) {
      case 'Selected':
        return 'default';
      case 'Rejected':
        return 'destructive';
      case 'On Hold':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getButtonIcon = (status: Candidate['status']) => {
    switch (status) {
      case 'Selected':
        return <Check className="mr-2 h-4 w-4" />;
      case 'Rejected':
        return <X className="mr-2 h-4 w-4" />;
      case 'On Hold':
        return <Pause className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const handleStatusClick = (newStatus: Candidate['status']) => {
    onStatusChange(candidate.id, newStatus);
    onOpenChange(false);
  };

  return (
    <Dialog open={!!candidate} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Status for {candidate.name}</DialogTitle>
          <DialogDescription>
            Current status: <span className="font-semibold">{candidate.status}</span>.
            Choose a new status below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {otherStatuses.map(status => (
            <Button
              key={status}
              variant={getButtonVariant(status)}
              className={status === 'Selected' ? 'bg-green-500 hover:bg-green-600 text-white' : ''}
              onClick={() => handleStatusClick(status)}
            >
              {getButtonIcon(status)}
              {status}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
