
"use client";

import { Briefcase, FileText, MessageSquare } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
    isNavOpen: boolean;
}

export function Sidebar({ isNavOpen }: SidebarProps) {
    return (
        <nav className={cn(
            "bg-card border-r flex-col items-center py-4 space-y-6",
            "hidden md:flex md:w-20",
            isNavOpen && "flex w-full absolute z-40 h-full"
        )}>
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
    );
}
