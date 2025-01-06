"use client";

import Link from "next/link";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition-colors"
  >
    {children}
  </Link>
);

export default function Navbar() {
  return (
    <nav className="bg-white/30 backdrop-blur-md w-full top-0 left-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="md:block">
            <div className="flex items-center space-x-4">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/components">Components</NavLink>
            </div>
          </div>
          {/* <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div> */}
        </div>
      </div>

      {/* {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/components">Components</NavLink>
          </div>
        </div>
      )} */}
    </nav>
  );
}
