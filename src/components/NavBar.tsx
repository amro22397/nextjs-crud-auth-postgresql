import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { HomeIcon, LogIn, LogInIcon, LogOut, Sprout } from "lucide-react";
import ModeToggle from "./ModeTogggle";
import { stackServerApp } from "@/stack/server";
// import { getUserDetails } from "@/actions/user.action";
import { UserButton } from "@stackframe/stack";
import { getUserDetails } from "@/actions/user.action";

const NavBar = async () => {

  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  const userProfile = await getUserDetails(user?.id)

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/*Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold font-mono tracking-wider"
            >
              🌱 Plantventory
            </Link>
          </div>

          {/*Navbar components*/}

          {userProfile?.name && (
            <span>
              {`Hello ${userProfile.name.split(" ")[0]}`}
            </span>
          )}

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/plants">
                <Sprout className="w-4 h-4" />
                <span className="hidden lg:inline">Plants</span>
              </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>

            <ModeToggle />

            {user ? (
              <>
                {/*Sign out Button*/}
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signOut}>
                    <LogOut className="w-4 h-4" />

                    <span className="hidden lg:inline">Sign Out</span>
                  </Link>
                </Button>
                <>al </>

                <UserButton />
              </>
            ) : (
              <>
                {/*Sign Button*/}
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signIn}>
                    <LogIn className="w-4 h-4" />
                    <span className="hidden lg:inline">Sign In</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
