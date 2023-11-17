'use client'

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";
import { isTeacher } from "@/lib/teacher";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  // let x;
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href={`/`}>
            <Button variant={'ghost'} size={'sm'} >
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href={`/teacher/courses`}>
            <Button variant={'ghost'} size={'sm'}>
              <LogIn className="h-4 w-4 mr-2" />
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  )
}

export default NavbarRoutes