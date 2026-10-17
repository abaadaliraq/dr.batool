"use client";

import { useState, type ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createStyleRegistry, StyleRegistry } from "styled-jsx";

export default function StyledJsxRegistry({ children }: { children: ReactNode }) {
  // Each server render owns its registry; styles also flush between streamed chunks.
  const [registry] = useState(() => createStyleRegistry());

  useServerInsertedHTML(() => {
    const styles = registry.styles();
    registry.flush();
    return <>{styles}</>;
  });

  return <StyleRegistry registry={registry}>{children}</StyleRegistry>;
}
