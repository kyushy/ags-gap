import type { Product } from "@prisma/client";
import  Image from "next/image"
import add_product from '../../assets/add_product.png'
import edit_icon from '../../assets/edit.png'
import delete_icon from '../../assets/trash.png'
import import_icon from '../../assets/import.png'

type ProductTableProps = {
    data: Product[] | undefined;
    onClickAdd: () => void;
    onClickEdit: (productId: string) => void;
    onClickDelete: (productId: string) => void;
}

export const ProductTable = ({ data, onClickAdd, onClickEdit, onClickDelete } : ProductTableProps) => {

    return(
        <div className="relative max-h-[34rem] overflow-auto rounded-lg border border-gray-900 shadow-md 2xl:max-h-[42rem]">
            <table className="w-full text-center text-lg text-gray-900">
                <thead className="sticky top-0 bg-[#18275B] uppercase text-white">
                    <tr>
                        <th scope="col" className="px-6 py-2">Référence</th>
                        <th scope="col" className="px-6 py-2">Nom</th>
                        <th scope="col" className="px-6 py-2">Prix d&apos;achat</th>
                        <th scope="col" className="px-6 py-2">Prix de vente</th>
                        <th scope="col" className="px-6 py-2">Quantité</th>
                        <th scope="col" className="px-6 py-2">
                            <div className="flex justify-end gap-4">
                                <a href="/exportProducts" target="_blank">
                                    <Image src={import_icon} width={32} className="h-8 cursor-pointer" alt="imports" />
                                </a>
                                <Image src={add_product} width={32} className="h-8 cursor-pointer" alt="add_product" onClick={() => onClickAdd()}/>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        return  (
                            <tr className={index % 2 == 0 ? "border-gray-700 bg-[#7B899F]" : "border-gray-700 bg-[#909FB3]"} key={index}>
                                <td scope="row" className="whitespace-nowrap px-6 py-2 font-medium">
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
                                <td className="px-6 py-2">
                                    <div className="flex items-center justify-end">
                                        <Image src={edit_icon} width={32} alt="edit_product" className="mr-2 h-8 cursor-pointer" onClick={() => onClickEdit(item.id)}/>
                                        <Image src={delete_icon} width={32} alt="delete-product" className="h-7 cursor-pointer" onClick={() => onClickDelete(item.id)}/>
                                    </div>
                                </td>
                            </tr>
                        ) 
                    })}
                </tbody>
            </table>
        </div>
    )
}