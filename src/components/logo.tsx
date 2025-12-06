import { Briefcase } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Briefcase className="h-7 w-7 text-primary" />
      <h1 className="text-xl font-bold tracking-tighter text-foreground">
        Talent Track
      </h1>
    </div>
  );
}
