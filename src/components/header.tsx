
"use client";

import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
    onNavToggle: () => void;
    isNavOpen: boolean;
}

export function Header({ onNavToggle, isNavOpen }: HeaderProps) {
    return (
        <header className="flex items-center justify-between h-16 px-6 border-b bg-card">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={onNavToggle}>
                    {isNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
                <h1 className="text-xl font-semibold">Employees</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Employees</span>
                    <span className="text-sm text-muted-foreground">Documents</span>
                    <span className="text-sm text-muted-foreground">Message</span>
                </div>
                <Avatar className="h-9 w-9">
                    <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjQ5NzY5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}
