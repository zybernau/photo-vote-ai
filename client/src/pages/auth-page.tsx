import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Redirect } from "wouter";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();

  const loginForm = useForm({
    resolver: zodResolver(insertUserSchema),
  });

  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema),
  });

  if (user) {
    return <Redirect to="/admin" />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center">
      <div className="container grid lg:grid-cols-2 gap-8 px-4">
        <div className="space-y-8">
          <Card>
            <CardHeader className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">Login</h2>
              <p className="text-muted-foreground">
                Enter your credentials to access admin features
              </p>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="login-username">Username</Label>
                  <Input
                    id="login-username"
                    {...loginForm.register("username")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    {...loginForm.register("password")}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">Register</h2>
              <p className="text-muted-foreground">
                Create a new admin account
              </p>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={registerForm.handleSubmit((data) => registerMutation.mutate(data))}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="register-username">Username</Label>
                  <Input
                    id="register-username"
                    {...registerForm.register("username")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    {...registerForm.register("password")}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Register
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:flex hidden items-center justify-center">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Photo Comparison Admin
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload and manage device photo comparisons. Track voting results and manage active comparisons.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
