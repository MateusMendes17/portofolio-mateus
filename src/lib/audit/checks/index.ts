import type { Finding } from "../types";
import { checkSecurity } from "./security";
import { checkSeo } from "./seo";
import { checkMobile } from "./mobile";
import { checkAccessibility } from "./accessibility";
import { checkContent } from "./content";
import { checkWeight } from "./weight";

export interface CheckInput {
  html: string;
  headers: Record<string, string>;
  finalUrl: string;
  status: number;
}

export function runAllChecks(input: CheckInput): Finding[] {
  return [
    ...checkSecurity({ html: input.html, headers: input.headers, finalUrl: input.finalUrl, status: input.status }),
    ...checkSeo(input.html),
    ...checkMobile(input.html),
    ...checkAccessibility(input.html),
    ...checkContent(input.html),
    ...checkWeight(input.html),
  ];
}

export { checkSecurity, checkSeo, checkMobile, checkAccessibility, checkContent, checkWeight };
