"use client";
import { Button } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

interface LinkButtonProps {
  title: string;
  path: string;
  type?: "primary" | "default";
}

function LinkButton({ title, path, type = "default" }: LinkButtonProps) {
    const router = useRouter();
  return (
    <Button
      type={type}
      onClick={() => {
        router.push(path);
      }}
    >
      {title}
    </Button>
  );
}

export default LinkButton;
