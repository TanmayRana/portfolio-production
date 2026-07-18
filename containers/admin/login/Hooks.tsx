import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export function useLoginAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@example.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("email", {
        email: adminEmail,
        redirect: false,
        callbackUrl: "/admin/home",
      });
      if (res?.error) {
        toast.error("Failed to send login code");
      } else {
        toast.success("Login code sent! Check your email.");
        window.location.href = `/admin/login/verify?email=${encodeURIComponent(adminEmail)}`;
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { adminEmail, isLoading, handleSubmit };
}
