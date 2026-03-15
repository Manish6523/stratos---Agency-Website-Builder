import { ModeToggle } from "@/components/global/mode-toggle";
import { ThemePicker } from "@/components/global/theme-picker";
import Userbutton from "@/components/global/user-button";
import { Button } from "@/components/ui/button";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type Props = {
  user?: null | User;
};

const Navigation = ({ user }: Props) => {
  return (
    <div className="backdrop-blur-sm fixed top-0 left-0 right-0 px-8 p-4 flex items-center justify-between z-20">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src={"/assets/logo.svg"}
          width={25}
          height={25}
          alt="stratos logo"
        />
        <span className="text-xl font-bold">Stratos.</span>
      </Link>
      <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ul className="flex items-center justify-center gap-8">
          <Link href={"/site/pricing"}>Pricing</Link>
          <Link href={"/site/about"}>About</Link>
          <Link href={"/site/documentation"}>Documentation</Link>
          <Link href={"/site/features"}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <ThemePicker />
        <Link href={"/agency"}>
          <Button size={"sm"}>Login</Button>
        </Link>
        <Userbutton />
      </aside>
    </div>
  );
};

export default Navigation;
