import type { NextPage } from "next";
import { api } from "../utils/api";
import { usePDF, Margin } from "react-to-pdf";



const ExportProducts : NextPage = () => {
    const { data } = api.product.getZeroQuantity.useQuery();
    const { toPDF, targetRef } = usePDF({ filename: 'restock.pdf', method: 'open', page: { margin: Margin.SMALL } })

    return(
        <>
            <main className="flex flex-col justify-center">
                <h1 className=" text-2xl text-center">Produit absent du stock</h1>
                <div>
                    <button onClick={() => toPDF()} type="button" className="float-right rounded-lg bg-[#18275B] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300">Telecharger</button>
                </div>   
                <div ref={targetRef} className="grid grid-cols-4 gap-8">
                    {data?.map((item, index) => {
                        return(
                            <div key={index} className="text-lg py-2">{item.reference}  -  {item.name}</div>
                        )
                    })}
                </div>
            </main>
        </>
    )
}

export default ExportProducts