import { SearchBar } from "../form/searchbar"
import back_arrow from '../../assets/back_arrow.png'
import  logo  from '../../assets/logo.png'
import { useRouter } from "next/router"
import  Image from "next/image"

type HeaderProps = {
    title: string
}

export const Header = ({ title } : HeaderProps) => {
    const router = useRouter();

    const handleClickArrow = () => {
        router.replace('/')
    }

    return(
        <header className="top-0 left-0 z-20 mb-20 h-20 pt-2">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                    <Image src={back_arrow} width={74} alt="return" className="h-16 cursor-pointer pr-4" onClick={() => handleClickArrow()}/>
                    <h1 className="text-5xl text-[#18275B]">{title.toUpperCase()}</h1>
                </div>
                <SearchBar />
                <Image src={logo} alt="logo" className="h-20"/>
            </div>
            <div className="mx-auto w-10/12 border-b-2 border-[#18275B] pt-4"></div>
        </header>
    )
}