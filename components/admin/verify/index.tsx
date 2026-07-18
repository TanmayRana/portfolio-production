import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { KeyRound } from "lucide-react";

interface VerifyComponentProps {
  email: string;
  token: string;
  setToken: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function VerifyComponent({ email, token, setToken, handleSubmit }: VerifyComponentProps) {
  return (
    <div className="max-w-md w-full bg-background p-8 rounded-xl border shadow-lg space-y-6">
      <div className="text-center space-y-2">
        <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <KeyRound size={24} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Enter Code</h1>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit code to <strong>{email}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center py-4">
          <InputOTP maxLength={6} value={token} onChange={setToken}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-12 h-14 text-lg" />
              <InputOTPSlot index={1} className="w-12 h-14 text-lg" />
              <InputOTPSlot index={2} className="w-12 h-14 text-lg" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} className="w-12 h-14 text-lg" />
              <InputOTPSlot index={4} className="w-12 h-14 text-lg" />
              <InputOTPSlot index={5} className="w-12 h-14 text-lg" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type="submit" className="w-full">
          Verify & Sign In
        </Button>
      </form>
    </div>
  );
}
