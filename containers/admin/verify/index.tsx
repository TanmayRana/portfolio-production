"use client";

import VerifyComponent from "@/components/admin/verify";
import { useVerifyAdmin } from "./Hooks";

export default function VerifyContainer() {
  const { email, token, setToken, handleSubmit } = useVerifyAdmin();
  return <VerifyComponent email={email} token={token} setToken={setToken} handleSubmit={handleSubmit} />;
}
