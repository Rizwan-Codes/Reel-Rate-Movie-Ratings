import { useEffect, useRef } from "react"


export default function SearchBar({ query, setQuery }) {
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EDE6D6]/40">⌕</span>
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a movie title... e.g. Inception"
                className="w-full bg-[#211D1A] border border-[#3A5A57]/40 rounded-lg
                   px-5 py-3 pl-11 text-[#EDE6D6] placeholder-[#EDE6D6]/40
                   focus:outline-none focus:border-[#C9A227] transition-colors"
            />
        </div>
    )
};