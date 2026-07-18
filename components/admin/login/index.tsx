import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface LoginComponentProps {
  adminEmail: string;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function LoginComponent({ adminEmail, isLoading, handleSubmit }: LoginComponentProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="max-w-md w-full bg-background p-8 rounded-xl border shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Access</h1>
          <p className="text-sm text-muted-foreground">Click the button below to receive a one-time passcode at:</p>
          <p className="font-semibold text-primary">{adminEmail}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending code..." : "Send Login Code"}
          </Button>
        </form>
      </div>
    </div>
  );
}
