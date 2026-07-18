import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function useVerifyAdmin() {
  const [token, setToken] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || token.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }
    const callbackUrl = encodeURIComponent(searchParams.get("callbackUrl") || "/admin/home");
    window.location.href = `/api/auth/callback/email?email=${encodeURIComponent(email)}&token=${token}&callbackUrl=${callbackUrl}`;
  };

  return { email, token, setToken, handleSubmit };
}
