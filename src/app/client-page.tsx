
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
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';

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
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="p-2 flex items-center gap-2">
            <Logo />
          </div>
          <div className="p-2 space-y-2">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {candidateStatuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 {hasActiveFilters && (
                    <Button variant="ghost" size="icon" onClick={handleClearFilters} className="shrink-0">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="p-2 border-t">
            <h2 className="text-base font-semibold">Candidates ({filteredCandidates.length})</h2>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2">
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
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center border-b bg-card px-4 md:px-6 shrink-0 gap-4">
          <SidebarTrigger className="md:hidden" />
          <h2 className="text-lg font-semibold hidden md:block">Candidate Details</h2>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <CandidateDetails candidate={selectedCandidate} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
