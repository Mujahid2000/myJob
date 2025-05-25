// lib/sanitizeHtml.ts
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html);
}
