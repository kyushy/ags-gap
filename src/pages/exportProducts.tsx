import type { NextPage } from "next";
import { api } from "../utils/api";
import { Header } from "../components/layouts/header";


const ExportProducts : NextPage = () => {
    const { data } = api.product.getZeroQuantity.useQuery();

    return(
        <>
            <main className="flex flex-col justify-center">
                <h1 className=" text-2xl text-center">Produit absent du stock</h1>
                <div>
                    {data?.map((item, index) => {
                        return(
                            <div key={index}>{item.reference}  -  {item.name}</div>
                        )
                    })}
                </div>
            </main>
        </>
    )
}

export default ExportProducts