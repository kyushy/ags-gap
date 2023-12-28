import type { NextPage } from "next";
import { api } from "../utils/api";
import { usePDF, Margin } from "react-to-pdf";
import { useState } from "react";
import { Spinner } from "../components/ui/spinner";



const ExportProducts : NextPage = () => {
    const [displayFull, setDisplayFull] = useState<boolean>(false);

    const { data, isLoading } = !displayFull ? api.product.getZeroQuantity.useQuery() : api.product.getFullList.useQuery();
    const { toPDF, targetRef } = usePDF({ filename: 'restock.pdf', method: 'open', page: { margin: Margin.SMALL } })

    const handleSwitch = (e : EventTarget) => {
        const isChecked = (e as HTMLInputElement).checked
        setDisplayFull(isChecked)
    }

    return(
        <>
            <main className="flex flex-col justify-center">
                <h1 className=" text-2xl text-center">Export des produits</h1>
                <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" onClick={(e) => handleSwitch(e.target)} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 pl-2 font-medium">Afficher tout le stock</span>
                    </label>
                    <button onClick={() => toPDF()} type="button" disabled={isLoading} className="float-right rounded-lg bg-[#18275B] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300">Telecharger</button>
                </div>
                {isLoading ?
                    <Spinner />
                    :
                    <div ref={targetRef} className="grid grid-cols-4 gap-8">
                        {data?.map((item, index) => {
                            return(
                                <div key={index} className="text-lg py-2">{item.reference}  -  {item.name} {displayFull ? " - " + item.quantity : "" }</div>
                            )
                        })}
                    </div>
                }   
            </main>
        </>
    )
}

export default ExportProducts