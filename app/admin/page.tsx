"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";

export default function AdminIndex() {
  const router = useRouter();
  const auth = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    router.replace(auth ? "/admin/dashboard" : "/admin/login");
  }, [auth, router]);

  return null;
}
