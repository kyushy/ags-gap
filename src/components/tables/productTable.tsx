import { Product } from "@prisma/client";
import add_product from '../../assets/add_product.png'
import edit_icon from '../../assets/edit.png'
import delete_icon from '../../assets/trash.png'

type ProductTableProps = {
    data: Product[] | undefined;
    onClickAdd: () => void;
    onClickEdit: (productId: string) => void;
    onClickDelete: (productId: string) => void;
}

export const ProductTable = ({ data, onClickAdd, onClickEdit, onClickDelete } : ProductTableProps) => {

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
                            <img src={add_product.src} className="h-8 cursor-pointer" onClick={() => onClickAdd()}/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        return  (
                            <tr className={index % 2 == 0 ? "bg-[#7B899F] border-gray-700" : "bg-[#909FB3] border-gray-700"} key={index}>
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
                                <td className="px-6 py-2 flex justify-end items-center">
                                    <img src={edit_icon.src} className="h-8 cursor-pointer mr-2" onClick={() => onClickEdit(item.reference)}/>
                                    <img src={delete_icon.src} className="h-7 cursor-pointer" onClick={() => onClickDelete(item.reference)}/>
                                </td>
                            </tr>
                        ) 
                    })}
                </tbody>
            </table>
        </div>
    )
}