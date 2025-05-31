"use client";

import { useEffect, useState } from "react";
import createDOMPurify from 'dompurify';
import './custom.css'
interface SafeHtmlProps {
  html: string;
}

export default function SafeResponsibilities({ html }: SafeHtmlProps) {
  const [clean, setClean] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const DOMPurify = createDOMPurify(window);
      setClean(DOMPurify.sanitize(html));
    }
  }, [html]);

  return (
    <div
      className="prose prose-gray px-3 lg:px-0 max-w-none prose-sm sm:prose lg:prose-lg xl:prose-xl"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
