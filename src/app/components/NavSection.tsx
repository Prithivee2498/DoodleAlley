import React from 'react'
import MainLogo from '../../assets/mainlogo'

export default function NavSection() {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
          <div className="flex items-center justify-between w-full max-w-[960px] bg-white/90 dark:bg-[#3d2b1f]/90 backdrop-blur-md border border-[#e6e1df] dark:border-[#524034] shadow-lg rounded-full px-6 py-3 transition-all">
            <a className="flex items-center gap-4 group" href="#">
              <div className="size-8 text-navy dark:text-primary transition-transform group-hover:rotate-[-12deg]">
                <MainLogo />
              </div>
              <h1 className="text-lg font-bold tracking-tight hidden sm:block">
                Doodle Alley
              </h1>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a
                className="text-sm font-semibold hover:text-primary transition-colors"
                href="/artists"
              >
                Our Makers
              </a>
              <a
                className="text-sm font-semibold hover:text-primary transition-colors"
                href="/about"
              >
                About
              </a>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center size-10 rounded-full hover:bg-background-light dark:hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  search
                </span>
              </button>
              <button className="relative flex items-center justify-center size-10 rounded-full bg-primary text-navy hover:bg-primary/80 transition-transform active:scale-95">
                <span className="material-symbols-outlined text-[20px]">
                  shopping_cart
                </span>
                <span className="absolute top-2 right-2 size-2 bg-white rounded-full"></span>
              </button>
            </div>
          </div>
        </nav>
  )
}
