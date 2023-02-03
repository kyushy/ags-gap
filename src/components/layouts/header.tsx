import { SearchBar } from "../form/searchbar"
import back_arrow from '../../assets/back_arrow.png'
import  logo  from '../../assets/logo.png'
import { useRouter } from "next/router"

type HeaderProps = {
    title: string
}

export const Header = ({ title } : HeaderProps) => {
    const router = useRouter();

    const handleClickArrow = () => {
        router.replace('/')
    }

    return(
        <header className="z-20 top-0 left-0 px-16 pt-2 h-20 mb-20">
            <div className="flex w-full justify-between items-center">
                <div className="flex items-center">
                    <img src={back_arrow.src} className="h-16 pr-4 cursor-pointer" onClick={() => handleClickArrow()}/>
                    <h1 className="text-[#18275B] text-5xl">{title.toUpperCase()}</h1>
                </div>
                <SearchBar />
                <img src={logo.src} className="h-20"/>
            </div>
            <div className="border-b-2 border-[#18275B] pt-4 w-10/12 mr-auto ml-auto"></div>
        </header>
    )
}