
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
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 text-primary bg-primary/10 rounded-lg">
                    <Briefcase className="h-6 w-6" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 text-muted-foreground">
                    <FileText className="h-6 w-6" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 text-muted-foreground">
                    <MessageSquare className="h-6 w-6" />
                </button>
            </div>
        </nav>
    );
}
