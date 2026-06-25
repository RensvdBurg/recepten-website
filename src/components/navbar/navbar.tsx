"use client";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <nav className="bg-white px-6 md:px-16 lg:px-24 xl:px-32 py-4 flex items-center justify-between relative">
        <div className="flex items-center gap-20">
          <a href="/">
            <svg
              width="260"
              height="80"
              viewBox="0 0 260 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(10,10)">
                <circle
                  cx="30"
                  cy="30"
                  r="24"
                  stroke="#111827"
                  strokeWidth="3"
                />

                <circle
                  cx="30"
                  cy="30"
                  r="16"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />

                <path
                  d="M10 10 v12 M7 10 v12 M13 10 v12 M10 22 v20"
                  stroke="#111827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <path
                  d="M50 10 C47 20,47 30,50 38 L50 50"
                  stroke="#111827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <path
                  d="M30 22 C38 26,40 32,30 42 C20 32,22 26,30 22 Z"
                  fill="#22C55E"
                />
                <path
                  d="M30 22 C30 28,30 34,30 42"
                  stroke="#16A34A"
                  strokeWidth="1.5"
                />
              </g>

              <text
                x="90"
                y="50"
                fontSize="28"
                fontFamily="Arial, sans-serif"
                fontWeight="600"
                fill="#111827"
              >
                Recipea
              </text>
            </svg>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-sm text-zinc-800 cursor-pointer bg-transparent border-0 py-2">
                Recepten
                <svg
                  className="transition-transform group-hover:rotate-180"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m1 1 4 4 4-4"
                    stroke="#71717b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-zinc-200 rounded-xl shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a
                  href="/recepten"
                  className="block px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
                >
                  Alle recepten
                </a>
                <a
                  href="/recepten/nieuw"
                  className="block px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
                >
                  Recepten aanmaken
                </a>
              </div>
            </div>
            <a href="/" className="text-sm text-zinc-500 hover:text-zinc-800">
              Home
            </a>
            <a
              href="/favorieten"
              className="text-sm text-zinc-500 hover:text-zinc-800"
            >
              Favorieten
            </a>
            <a
              href="/contact"
              className="text-sm text-zinc-500 hover:text-zinc-800"
            >
              Contact
            </a>
          </div>
        </div>
        <a href="/about">
          <button className="hidden md:flex items-center gap-2.5 bg-linear-to-r from-zinc-950 to-zinc-500 text-zinc-50 hover:text-zinc-200 text-sm font-medium pl-5 pr-2 py-2 rounded-full cursor-pointer border-0">
            Over ons
            <span className="size-7 rounded-full bg-white flex items-center justify-center">
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M.6 4.602h10m-4-4 4 4-4 4"
                  stroke="#3f3f47"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </a>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1"
        >
          <span
            className={`block w-6 h-0.5 bg-zinc-800 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-zinc-800 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-zinc-800 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-zinc-200 flex flex-col p-5 gap-1 md:hidden z-50">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm text-zinc-800 hover:bg-zinc-50 bg-transparent border-0 cursor-pointer"
            >
              Recepten
              <svg
                className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m1 1 4 4 4-4"
                  stroke="#71717b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="flex flex-col pl-4">
                <a
                  href="/recepten"
                  className="px-4 py-2 rounded-lg text-sm text-zinc-500 hover:bg-zinc-50"
                >
                  Alle recepten
                </a>
                <a
                  href="/recepten/nieuw"
                  className="px-4 py-2 rounded-lg text-sm text-zinc-500 hover:bg-zinc-50"
                >
                  Recepten aanmaken
                </a>
                <a
                  href="/favorieten"
                  className="px-4 py-2 rounded-lg text-sm text-zinc-500 hover:bg-zinc-50"
                >
                  Favorieten
                </a>
              </div>
            )}
            <a
              href="/"
              className="px-4 py-2.5 rounded-lg text-sm text-zinc-500 hover:bg-zinc-50"
            >
              Home
            </a>
            <a
              href="/contact"
              className="px-4 py-2.5 rounded-lg text-sm text-zinc-500 hover:bg-zinc-50"
            >
              Contact
            </a>
            <a href="/about">
              <button className="flex items-center justify-center gap-2.5 bg-linear-to-r from-zinc-950 to-zinc-500 text-zinc-50 text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer border-0 mt-3 w-fit">
                Over ons
                <span className="size-7 rounded-full bg-white flex items-center justify-center">
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.6 4.602h10m-4-4 4 4-4 4"
                      stroke="#3f3f47"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
