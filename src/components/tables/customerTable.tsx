import type { Customer } from "@prisma/client";
import  Image from "next/image"
import add_client from '../../assets/add_client.png'
import edit_icon from '../../assets/edit.png'
import delete_icon from '../../assets/trash.png'

type CustomerTableProps = {
    data: Customer[] | undefined;
    onClickAdd: () => void;
    onClickEdit: (customerId: string) => void;
    onClickDelete: (customerId: string) => void;
}

export const CustomerTable = ({ data, onClickAdd, onClickEdit, onClickDelete } : CustomerTableProps) => {

    return(
        <>
        <div className="relative max-h-[34rem] overflow-auto rounded-lg border border-gray-900 shadow-md 2xl:max-h-[42rem]">
            <table className="w-full text-center text-lg text-gray-900">
                <thead className="sticky top-0 bg-[#18275B] uppercase text-white">
                    <tr>
                        <th scope="col" className="px-6 py-2 ">Nom</th>
                        <th scope="col" className="px-6 py-2 ">Téléphone</th>
                        <th scope="col" className="px-6 py-2">Immatriculation(s)</th>
                        <th scope="col" className="px-6 py-2">
                            <div className="flex justify-end">
                                <Image src={add_client} width={32} className="h-8 cursor-pointer" alt="add_customer" onClick={() => onClickAdd()}/>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        return (
                            <tr className={index % 2 == 0 ? "border-gray-700 bg-[#7B899F]" : "border-gray-700 bg-[#909FB3]"} key={index}>
                                <td scope="row" className="whitespace-nowrap px-6 py-2 font-medium">
                                    {`${item.lastname.toUpperCase()}  ${item.firstname}`}
                                </td>
                                <td className="px-6 py-2">
                                    {item.phoneNumber}
                                </td>
                                <td className="px-6 py-2">
                                    {item.imats}
                                </td>
                                <td className="px-6 py-2">
                                    <div className="flex items-center justify-end">
                                        <Image src={edit_icon} width={32} alt="edit_customer" className="mr-2 h-8 cursor-pointer" onClick={() => onClickEdit(item.id)}/>
                                        <Image src={delete_icon} width={32} alt="delete_customer" className="h-7 cursor-pointer" onClick={() => onClickDelete(item.id)}/>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </>
    )
}