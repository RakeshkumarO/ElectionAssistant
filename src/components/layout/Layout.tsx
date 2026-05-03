import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-indigo-500/30">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              E
            </div>
            <span className="text-xl font-semibold tracking-tight">VoteSmart</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-neutral-400">
            <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
            <a href="#assistant" className="hover:text-white transition-colors">AI Assistant</a>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {children}
      </main>

      <footer className="border-t border-white/10 py-8 mt-20 text-center text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} VoteSmart Education. Open source and accessible.</p>
      </footer>
    </div>
  );
}
