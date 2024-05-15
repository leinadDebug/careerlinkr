import Image from "next/image";
import Link from "next/link";
import logo from "../assets/web-development-macbook-pro-mockup-mockup-d3d1beb04e77e50573ee78334345462a.png";
import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <header className="shadow-sm ">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5  ">
        {/*Logo*/}
        <Link href={"/"} className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="CareerLinkr Logo" />
          <span className="text-3xl font-semibold tracking-tight">
            CareerLink<span className="text-3xl text-gray-500">r</span>
          </span>
        </Link>
        <Button asChild>
          <Link href={"jobs/new"}>Post a Job</Link>
        </Button>
      </nav>
    </header>
  );
}
