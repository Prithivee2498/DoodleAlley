import React, { useEffect, useRef } from "react";
import MainLogo from "../../assets/mainlogo";

type View = "catalog" | "about" | "artists";
interface NavProps {
  onNavigate: (view: View) => void;

  // Search control from parent (PublicCatalog)
  searchQuery: string;
  onSearchChange: (value: string) => void;

  // Optional: only show search in catalog
  showSearch?: boolean;
}

export default function NavSection({
  onNavigate,
  searchQuery,
  onSearchChange,
  showSearch = true,
}: NavProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="flex items-center justify-between w-full max-w-[960px] bg-white/90 dark:bg-[#3d2b1f]/90 backdrop-blur-md border border-[#e6e1df] dark:border-[#524034] shadow-lg rounded-full px-6 py-3 transition-all">
        <button
          className="flex items-center gap-4 group"
          onClick={() => onNavigate("catalog")}
        >
          <div className="size-8 text-navy dark:text-primary transition-transform group-hover:rotate-[-12deg]">
            <MainLogo />
          </div>
          <h1 className="text-lg font-bold tracking-tight hidden sm:block">
            Doodle Alley
          </h1>
        </button>
        <div className="hidden md:flex items-center gap-8">
          {showSearch && open ? (
            <div className="w-full max-w-[420px] flex items-center gap-2 bg-white/70 dark:bg-white/10 border border-[#e6e1df] dark:border-white/10 rounded-full px-3 py-2">
              <span className="material-symbols-outlined text-[18px] opacity-70">
                search
              </span>
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search artworks..."
                className="w-full bg-transparent outline-none text-sm font-semibold text-navy dark:text-white placeholder:text-navy/40 dark:placeholder:text-white/40"
              />
              <button
                type="button"
                onClick={() => {
                  onSearchChange("");
                  setOpen(false);
                }}
                className="flex items-center justify-center size-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Close search"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>
          ) : (
            <>
              <button
                className="text-sm font-semibold hover:text-primary transition-colors"
                onClick={() => onNavigate("artists")}
              >
                Our Makers
              </button>
              <button
                className="text-sm font-semibold hover:text-primary transition-colors"
                onClick={() => onNavigate("about")}
              >
                About
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showSearch && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center justify-center size-10 rounded-full hover:bg-background-light dark:hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-[20px]">
                search
              </span>
            </button>
          )}
          {/* <button className="relative flex items-center justify-center size-10 rounded-full bg-primary text-navy hover:bg-primary/80 transition-transform active:scale-95">
                <span className="material-symbols-outlined text-[20px]">
                  shopping_cart
                </span>
                <span className="absolute top-2 right-2 size-2 bg-white rounded-full"></span>
              </button> */}
        </div>
      </div>
    </nav>
  );
}
