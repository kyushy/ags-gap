import { Customer } from "@prisma/client";
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
        <div className="relative overflow-x-auto shadow-md rounded-lg border border-gray-900">
            <table className="w-full text-lg text-center text-gray-900">
                <thead className="uppercase bg-[#18275B] text-white">
                    <tr>
                        <th scope="col" className="px-6 py-2 ">Nom</th>
                        <th scope="col" className="px-6 py-2 ">Téléphone</th>
                        <th scope="col" className="px-6 py-2">Immatriculation(s)</th>
                        <th scope="col" className="px-6 py-2 flex justify-end">
                            <img src={add_client.src} className="h-8 cursor-pointer" onClick={() => onClickAdd()}/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        return (
                            <tr className={index % 2 == 0 ? "bg-[#7B899F] border-gray-700" : "bg-[#909FB3] border-gray-700"} key={index}>
                                <td scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                                    {`${item.lastname.toUpperCase()}  ${item.firstname}`}
                                </td>
                                <td className="px-6 py-2">
                                    {item.phoneNumber}
                                </td>
                                <td className="px-6 py-2">
                                    {item.imats}
                                </td>
                                <td className="px-6 py-2 flex justify-end items-center">
                                    <img src={edit_icon.src} className="h-8 cursor-pointer mr-2" onClick={() => onClickEdit(item.id)}/>
                                    <img src={delete_icon.src} className="h-7 cursor-pointer" onClick={() => onClickDelete(item.id)}/>
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