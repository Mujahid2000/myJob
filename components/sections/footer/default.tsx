'use client'
import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "../../ui/footer";
import LaunchUI from "../../logos/launch-ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { disableNavWithFooter } from "@/Hooks/disableNavWithFooter";

export default function FooterSection() {
  const path = usePathname();
  return (
    <>
    {
      !disableNavWithFooter.includes(path) && (
        <footer className="w-full bg-[#18191C] px-4">
      <div className="mx-auto bg-[#18191C] max-w-7xl">
        <Footer className="bg-[#18191C] text-white">
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <LaunchUI />
                <h3 className="text-xl font-bold">MyJobs</h3>
              </div>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Product</h3>
              <Link
                href="/"
                className="text-sm text-muted-foreground"
              >
                Changelog
              </Link>
              <Link
                href="/"
                className="text-sm text-muted-foreground"
              >
                Documentation
              </Link>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Company</h3>
              <Link
                href="/"
                className="text-sm text-muted-foreground"
              >
                About
              </Link>
              <Link
                href="/"
                className="text-sm text-muted-foreground"
              >
                Careers
              </Link>
              <Link
                href="/"
                className="text-sm text-muted-foreground"
              >
                Blog
              </Link>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Contact</h3>
              <Link
                href="/"
                className="text-sm text-muted-foreground"
              >
                Discord
              </Link>
              <Link
                href="/"
                className="text-sm text-muted-foreground"
              >
                Twitter
              </Link>
              <Link
                href="/"
                className="text-sm text-muted-foreground"
              >
                Github
              </Link>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold">Contact</h3>
              <Link
                href="/"
                className="text-sm text-muted-foreground"
              >
                Discord
              </Link>
              <Link
                href="/"
                className="text-sm text-muted-foreground"
              >
                Twitter
              </Link>
              <Link
                href="/"
                className="text-sm text-muted-foreground"
              >
                Github
              </Link>
            </FooterColumn>
          </FooterContent>
          <FooterBottom>
            <div>© 2025 Mikołaj Dobrucki. All rights reserved</div>
            <div className="flex items-center gap-4">
              <Link href="/">Privacy Policy</Link>
              <Link href="/">Terms of Service</Link>
              
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
      )
    }
    </>
  );
}
