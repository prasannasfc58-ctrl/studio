"use client";

import { useState, useMemo, useEffect } from 'react';
import { candidates as initialCandidates } from '@/lib/data';
import { CandidateDetails } from '@/components/candidate-details';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Briefcase, FileText, MessageSquare } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EmployeeTable } from '@/components/employee-table';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Candidate } from '@/lib/types';

const allCourses = Array.from(new Set(initialCandidates.flatMap(c => c.courses)));
const allStatuses = Array.from(new Set(initialCandidates.map(c => c.status)));

export function TalentTrackClientPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [caddScoreFilter, setCaddScoreFilter] = useState([0, 100]);
  const [courseFilter, setCourseFilter] = useState('All');

  const filteredAndSortedCandidates = useMemo(() => {
    return candidates
      .filter(candidate =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(candidate => 
        statusFilter === 'All' || candidate.status === statusFilter
      )
      .filter(candidate =>
        candidate.caddScore >= caddScoreFilter[0] && candidate.caddScore <= caddScoreFilter[1]
      )
      .filter(candidate =>
        courseFilter === 'All' || candidate.courses.includes(courseFilter)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [candidates, searchTerm, statusFilter, caddScoreFilter, courseFilter]);

  useEffect(() => {
    if (initialCandidates.length > 0) {
      if (filteredAndSortedCandidates.length > 0) {
        setSelectedCandidateId(filteredAndSortedCandidates[0].id);
      } else {
        setSelectedCandidateId(null);
      }
    }
  }, [filteredAndSortedCandidates]);

  useEffect(() => {
    if (filteredAndSortedCandidates.length > 0) {
      if (!selectedCandidateId || !filteredAndSortedCandidates.find(c => c.id === selectedCandidateId)) {
        setSelectedCandidateId(filteredAndSortedCandidates[0].id);
      }
    } else {
      setSelectedCandidateId(null);
    }
  }, [filteredAndSortedCandidates, selectedCandidateId]);
  
  const selectedCandidate = useMemo(() => {
    return candidates.find(c => c.id === selectedCandidateId) || null;
  }, [candidates, selectedCandidateId]);

  const handleStatusChange = (candidateId: string, newStatus: Candidate['status']) => {
    setCandidates(prevCandidates =>
      prevCandidates.map(c =>
        c.id === candidateId ? { ...c, status: newStatus } : c
      )
    );
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Navigation Sidebar */}
      <nav className="w-20 bg-card border-r flex flex-col items-center py-4 space-y-6">
        <Logo />
        <div className="flex flex-col space-y-4">
          <Button variant="ghost" size="icon" className="text-primary bg-primary/10 rounded-lg">
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
            <Card className="h-full">
              <CardHeader>
                  <CardTitle>Employee Directory</CardTitle>
                  <p className="text-muted-foreground text-sm">Manage your team and their information.</p>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 items-end">
                  <div>
                    <Label htmlFor="search-name">Filter by Name</Label>
                    <div className="relative mt-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search-name"
                        placeholder="e.g. Elena Vance"
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="status-filter">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger id="status-filter" className="w-full mt-1">
                        <SelectValue placeholder="Filter by Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Statuses</SelectItem>
                        {allStatuses.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="course-filter">Course</Label>
                    <Select value={courseFilter} onValueChange={setCourseFilter}>
                      <SelectTrigger id="course-filter" className="w-full mt-1">
                        <SelectValue placeholder="Filter by Course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Courses</SelectItem>
                        {allCourses.map(course => (
                          <SelectItem key={course} value={course}>{course}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>CADD Score: {caddScoreFilter[0]} - {caddScoreFilter[1]}</Label>
                    <Slider
                      value={caddScoreFilter}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setCaddScoreFilter(value)}
                      className="mt-1 pt-2"
                    />
                  </div>
                </div>

                <EmployeeTable
                  candidates={filteredAndSortedCandidates}
                  selectedCandidateId={selectedCandidateId}
                  onSelectCandidate={setSelectedCandidateId}
                />
              </CardContent>
            </Card>
          </main>

          {/* Candidate Details Panel */}
          <aside className="w-1/3 min-w-[350px] max-w-[450px] border-l bg-card overflow-y-auto p-6">
            <CandidateDetails 
              candidate={selectedCandidate}
              onStatusChange={handleStatusChange} 
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
