import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ComparePage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: comparisons, isLoading } = useQuery({
    queryKey: ["/api/comparisons"],
  });

  const voteMutation = useMutation({
    mutationFn: async ({ id, voteA }: { id: number; voteA: boolean }) => {
      const res = await apiRequest("POST", `/api/comparisons/${id}/vote`, { voteA });
      return await res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/comparisons"] });
      setLocation(`/results/${variables.id}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Error submitting vote",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!comparisons?.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>No active comparisons available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const comparison = comparisons[0];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Which photo looks better?
          </h1>
          <p className="text-muted-foreground">
            Click on the photo you prefer. Results will be revealed after voting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => voteMutation.mutate({ id: comparison.id, voteA: true })}
          >
            <Card>
              <CardContent className="p-2">
                <img
                  src={comparison.imageA}
                  alt="Photo A"
                  className="w-full h-auto rounded-md"
                />
                <Button className="w-full mt-4">Vote for A</Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => voteMutation.mutate({ id: comparison.id, voteA: false })}
          >
            <Card>
              <CardContent className="p-2">
                <img
                  src={comparison.imageB}
                  alt="Photo B"
                  className="w-full h-auto rounded-md"
                />
                <Button className="w-full mt-4">Vote for B</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mt-8 text-center space-x-4">
          <Link href="/auth" className="text-sm text-muted-foreground hover:underline">
            Admin Login
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href="/leaderboard" className="text-sm text-muted-foreground hover:underline">
            View Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}