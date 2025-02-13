import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Loader2, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function LeaderboardPage() {
  const { data: comparisons, isLoading } = useQuery({
    queryKey: ["/api/comparisons"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const sortedComparisons = [...(comparisons || [])].sort(
    (a, b) => (b.votesA + b.votesB) - (a.votesA + a.votesB)
  );

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center justify-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Photo Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Most voted device photo comparisons
          </p>
        </div>

        <div className="grid gap-6">
          {sortedComparisons.map((comparison) => {
            const totalVotes = comparison.votesA + comparison.votesB;
            const percentageA = totalVotes === 0 ? 0 : (comparison.votesA / totalVotes) * 100;
            const percentageB = totalVotes === 0 ? 0 : (comparison.votesB / totalVotes) * 100;

            return (
              <Card key={comparison.id}>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <img
                        src={comparison.imageA}
                        alt={comparison.deviceA}
                        className="w-full h-auto rounded-md"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{comparison.deviceA}</h3>
                        <Progress value={percentageA} className="my-2" />
                        <p className="text-sm text-muted-foreground">
                          {comparison.votesA} votes ({percentageA.toFixed(1)}%)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <img
                        src={comparison.imageB}
                        alt={comparison.deviceB}
                        className="w-full h-auto rounded-md"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{comparison.deviceB}</h3>
                        <Progress value={percentageB} className="my-2" />
                        <p className="text-sm text-muted-foreground">
                          {comparison.votesB} votes ({percentageB.toFixed(1)}%)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    Total votes: {totalVotes}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/">
            <span className="text-sm text-muted-foreground hover:underline cursor-pointer">
              Back to Voting
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
