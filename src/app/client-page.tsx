"use client";

import { useState, useMemo, useEffect } from 'react';
import { candidates, candidateStatuses } from '@/lib/data';
import { CandidateCard } from '@/components/candidate-card';
import { CandidateDetails } from '@/components/candidate-details';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function TalentTrackClientPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  useEffect(() => {
    if (candidates.length > 0) {
      setSelectedCandidateId(candidates[0].id);
    }
  }, []);

  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const selectedCandidate = useMemo(() => {
    return candidates.find(c => c.id === selectedCandidateId) || null;
  }, [selectedCandidateId]);
  
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  }

  const hasActiveFilters = searchTerm !== '' || statusFilter !== 'all';

  return (
    <div className="flex h-screen flex-col">
       <header className="flex h-16 items-center border-b bg-card px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-6 w-full">
            <Logo />
            <Separator orientation="vertical" className="h-8" />
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or skill..."
                className="pl-10 w-full max-w-md"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {candidateStatuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
             {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              )}
          </div>
        </header>
        <main className="flex-1 overflow-hidden">
          <div className="grid h-full grid-cols-1 md:grid-cols-[400px_1fr]">
              <div className="flex flex-col border-r">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Candidates ({filteredCandidates.length})</h2>
                  <p className="text-sm text-muted-foreground">Select a candidate to view details</p>
                </div>
                <div className="overflow-y-auto flex-1 p-4 space-y-3">
                  {filteredCandidates.length > 0 ? (
                    filteredCandidates.map(candidate => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        onSelect={setSelectedCandidateId}
                        isSelected={selectedCandidateId === candidate.id}
                      />
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-16">
                      <p>No candidates match your criteria.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="overflow-y-auto p-4 bg-muted/30">
                  <CandidateDetails candidate={selectedCandidate} />
              </div>
          </div>
      </main>
    </div>
  );
}
