"use client";

import { useState, useMemo, useEffect } from 'react';
import { candidates } from '@/lib/data';
import { CandidateDetails } from '@/components/candidate-details';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, UserPlus, ChevronsUpDown, MoreHorizontal, FileText, MessageSquare } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EmployeeTable } from '@/components/employee-table';

export function TalentTrackClientPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('Alphabetical A-Z');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  useEffect(() => {
    if (candidates.length > 0) {
      setSelectedCandidateId(candidates[0].id);
    }
  }, []);

  const filteredAndSortedCandidates = useMemo(() => {
    const filtered = candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortOrder === 'Alphabetical A-Z') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'Alphabetical Z-A') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [searchTerm, sortOrder]);
  
  const selectedCandidate = useMemo(() => {
    return candidates.find(c => c.id === selectedCandidateId) || null;
  }, [selectedCandidateId]);

  return (
    <div className="flex h-screen bg-background">
      {/* Navigation Sidebar */}
      <nav className="w-20 bg-card border-r flex flex-col items-center py-4 space-y-6">
        <Logo />
        <div className="flex flex-col space-y-4">
          <Button variant="ghost" size="icon" className="text-primary bg-primary/10">
            <Briefcase className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <FileText className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between h-16 px-6 border-b bg-card">
          <h1 className="text-xl font-semibold">Employees</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Employees</span>
            <span className="text-sm text-muted-foreground">Documents</span>
            <span className="text-sm text-muted-foreground">Message</span>
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjQ5NzY5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Employee Directory */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Employee Directory</h2>
                  <p className="text-muted-foreground">Manage your team and their information.</p>
                </div>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" /> Add Employee
                </Button>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Filter by Name"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alphabetical A-Z">Alphabetical A-Z</SelectItem>
                      <SelectItem value="Alphabetical Z-A">Alphabetical Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <EmployeeTable
                candidates={filteredAndSortedCandidates}
                selectedCandidateId={selectedCandidateId}
                onSelectCandidate={setSelectedCandidateId}
              />
            </div>
          </main>

          {/* Candidate Details Panel */}
          <aside className="w-1/3 min-w-[350px] max-w-[450px] border-l bg-card overflow-y-auto p-6">
            <CandidateDetails candidate={selectedCandidate} />
          </aside>
        </div>
      </div>
    </div>
  );
}

function Briefcase(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    )
}
