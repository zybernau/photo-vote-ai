import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertComparisonSchema } from "@shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut } from "lucide-react";

export default function AdminPage() {
  const { logoutMutation } = useAuth();
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(insertComparisonSchema),
  });

  const { data: comparisons, isLoading } = useQuery({
    queryKey: ["/api/comparisons"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await apiRequest("POST", "/api/comparisons", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/comparisons"] });
      form.reset();
      toast({
        title: "Success",
        description: "Comparison created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating comparison",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => logoutMutation.mutate()}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold tracking-tight">Create Comparison</h2>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit((data) => createMutation.mutate(data))}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deviceA">Device A Name</Label>
                  <Input id="deviceA" {...form.register("deviceA")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deviceB">Device B Name</Label>
                  <Input id="deviceB" {...form.register("deviceB")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageA">Image A URL</Label>
                  <Input id="imageA" {...form.register("imageA")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageB">Image B URL</Label>
                  <Input id="imageB" {...form.register("imageB")} />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Comparison
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold tracking-tight">Active Comparisons</h2>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid gap-4">
                {comparisons?.map((comparison) => (
                  <Card key={comparison.id}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold">Device A: {comparison.deviceA}</h3>
                          <p className="text-sm text-muted-foreground">
                            Votes: {comparison.votesA}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Device B: {comparison.deviceB}</h3>
                          <p className="text-sm text-muted-foreground">
                            Votes: {comparison.votesB}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
