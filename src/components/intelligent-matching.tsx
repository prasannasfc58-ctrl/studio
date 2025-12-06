"use client";

import { useState } from 'react';
import { Sparkles, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMatchingSummary } from '@/app/actions';
import type { IntelligentCandidateMatchingOutput } from '@/ai/flows/intelligent-candidate-matching';
import { useToast } from '@/hooks/use-toast';

interface IntelligentMatchingProps {
  candidateSkills: string[];
  listedTopics: string[];
}

export function IntelligentMatching({ candidateSkills, listedTopics }: IntelligentMatchingProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IntelligentCandidateMatchingOutput | null>(null);
  const { toast } = useToast();

  const handleMatch = async () => {
    setLoading(true);
    setResult(null);
    const response = await getMatchingSummary({
      candidateSkills: candidateSkills.join(', '),
      listedTopics: listedTopics.join(', '),
    });

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Matching Failed',
        description: response.error,
      });
    }
    setLoading(false);
  };

  return (
    <Card className="bg-accent/50 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="text-primary" />
          Intelligent Matching
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Use AI to analyze how well this candidate's skills align with the required topics.
        </p>
        <Button onClick={handleMatch} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Match Skills to Topics
            </>
          )}
        </Button>
        {result && (
          <div className="mt-4 space-y-3 rounded-lg border bg-background p-4">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">Match Result</h4>
              {result.isSuitable ? (
                <Badge variant="secondary" className="border-green-500 bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Suitable
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="mr-1 h-3 w-3" />
                  Not Suitable
                </Badge>
              )}
            </div>
            <p className="text-sm text-foreground/80">{result.matchSummary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
