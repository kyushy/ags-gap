import { Product } from "@prisma/client";
import add_product from '../../assets/add_product.png'

type ProductTableProps = {
    data: Product[];
}

export const ProductTable = ({ data } : ProductTableProps) => {
    
    return(
        <div className="relative overflow-x-auto shadow-md rounded-lg border border-gray-900">
            <table className="w-full text-lg text-center text-gray-900">
                <thead className="uppercase bg-[#18275B] text-white">
                    <tr>
                        <th scope="col" className="px-6 py-2">Référence</th>
                        <th scope="col" className="px-6 py-2">Nom</th>
                        <th scope="col" className="px-6 py-2">Prix d'achat</th>
                        <th scope="col" className="px-6 py-2">Prix de vente</th>
                        <th scope="col" className="px-6 py-2">Quantité</th>
                        <th scope="col" className="px-6 py-2 flex justify-end">
                            <img src={add_product.src} className="h-8 cursor-pointer"/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        return index % 2 == 0 ? (
                            <tr className="bg-[#7B899F] border-gray-700" key={index}>
                                <td scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                                    {item.reference}
                                </td>
                                <td scope="row" className="px-6 py-2">
                                    {item.name}
                                </td>
                                <td className="px-6 py-2">
                                    {String(item.buyingPrice)}
                                </td>
                                <td className="px-6 py-2">
                                    {String(item.sellingPrice)}
                                </td>
                                <td className="px-6 py-2">
                                    {item.quantity}
                                </td>
                                <td className="px-6 py-2 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        ) : (
                            <tr className="bg-[#909FB3] border-gray-700" key={index}>
                                <td scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                                    {item.reference}
                                </td>
                                <td scope="row" className="px-6 py-2">
                                    {item.name}
                                </td>
                                <td className="px-6 py-2">
                                    {String(item.buyingPrice)}
                                </td>
                                <td className="px-6 py-2">
                                    {String(item.sellingPrice)}
                                </td>
                                <td className="px-6 py-2">
                                    {item.quantity}
                                </td>
                                <td className="px-6 py-2 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}