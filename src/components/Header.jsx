export default function Header({view, setView}) {
    return (
        <header className="border-b border-[#2B3533] bg-[#211D1A]">
            <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-[#C4432B] text-2xl">●</span>
                    <h1 className="font-Bebas text-2xl tracking-wide uppercase text-[#ede6d6]">
                        Reel<span className="text-[#C9A227]">Rate</span>
                    </h1>
                </div>

                <nav className="flex gap-1 bg-[#1A1714] rounded-full p-1 border border-[#2B3533]">
                    <button
                        onClick={() => setView('search')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${view === 'search' ? 'bg-[#C4432B] text-[#EDE6D6]' : 'text-[#EDE6D6]/60 hover:text-[#EDE6D6]'}`}
                    >
                        Search
                    </button>

                     <button
                        onClick={() => setView('favorites')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${view === 'favorites' ? 'bg-[#C4432B] text-[#EDE6D6]' : 'text-[#EDE6D6]/60 hover:text-[#EDE6D6]'}`}
                    >
                        My List
                    </button>

                </nav>
            </div>
        </header>
    )
}