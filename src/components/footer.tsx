import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-5xl mx-auto space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">CareerLinkr</h3>
            <p>Connecting talent with opportunities</p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href={"/about"} className="hover:underline">
              About Us
            </Link>
            <Link href={"/contact"} className="hover:underline">
              Contact Us
            </Link>
            <Link href={"/terms"} className="hover:underline">
              Terms of Service
            </Link>
            <Link href={"/privacy"} className="hover:underline">
              Privact Policy
            </Link>
            <div className="text-center text-sm text-muted-foreground">
              &#174; {new Date().getFullYear()} CareerLinkr, Inc. All rights
              reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
