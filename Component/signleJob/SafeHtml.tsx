"use client";

import { useEffect, useState } from "react";
import createDOMPurify from 'dompurify';
import './custom.css'

interface SafeHtmlProps {
  html: string;
}

export default function SafeHtml({ html }: SafeHtmlProps) {
  const [clean, setClean] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const DOMPurify = createDOMPurify(window);
      setClean(DOMPurify.sanitize(html));
    }
  }, [html]);

  return (
    <div
      className="prose max-w-none prose-sm py-6 sm:prose lg:prose-lg xl:prose-xl"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
