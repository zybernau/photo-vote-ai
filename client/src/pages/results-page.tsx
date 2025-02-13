import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ResultsPage() {
  const { id } = useParams();

  const { data: comparison, isLoading } = useQuery({
    queryKey: [`/api/comparisons/${id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!comparison) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Comparison not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalVotes = comparison.votesA + comparison.votesB;
  const percentageA = totalVotes === 0 ? 0 : (comparison.votesA / totalVotes) * 100;
  const percentageB = totalVotes === 0 ? 0 : (comparison.votesB / totalVotes) * 100;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Results</h1>
          <p className="text-muted-foreground">
            Here's how others voted and which devices took these photos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-4 space-y-4">
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
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
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
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link href="/">
            <Button>Vote on Another Comparison</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
