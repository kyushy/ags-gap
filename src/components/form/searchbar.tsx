import { useRouter } from "next/router";
import { useState } from "react"
import type { FormEvent } from "react";

export const SearchBar = () => {
    const router = useRouter();
    const { search } = router.query
    const [searchInput, setSearchInput] = useState<string>(search ? String(search) : '');

    const handleSubmit = (e: FormEvent) => {
        if(!searchInput.trim())
            e.preventDefault()
    }

    const handleClickCross = () => {
        setSearchInput('')
        router.replace(router.pathname, undefined);
    }

    return(
        <form onSubmit={(e) => handleSubmit(e)}>   
            <label htmlFor="default-search" className="sr-only mb-2 text-sm font-medium text-gray-900">recherche</label>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg aria-hidden="true" className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input type="search" name="search" id="default-search" value={searchInput} className="text-md rounded-lg p-2 pr-20 pl-10 italic outline-none placeholder:text-gray-400" placeholder="Rechercher..." onChange={(e) => setSearchInput(e.target.value)}/>
                <button type="button" aria-label="reset" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => handleClickCross()}>
                    <svg aria-hidden="true" className="h-5 w-5 text-gray-600 hover:text-black " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </form>
    )
}