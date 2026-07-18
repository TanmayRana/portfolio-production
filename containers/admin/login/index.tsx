"use client";

import LoginComponent from "@/components/admin/login";
import { useLoginAdmin } from "./Hooks";

export default function LoginContainer() {
  const { adminEmail, isLoading, handleSubmit } = useLoginAdmin();
  return <LoginComponent adminEmail={adminEmail} isLoading={isLoading} handleSubmit={handleSubmit} />;
}
