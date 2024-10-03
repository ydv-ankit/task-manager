"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/auth"}>
        <Button>Authenticate</Button>
      </Link>
    </div>
  );
}
