import { Suspense } from "react";
import VerifyContainer from "@/containers/admin/verify";

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyContainer />
      </Suspense>
    </div>
  );
}
