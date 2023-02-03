import { Client } from "@prisma/client";
import { useState } from "react";
import { ClientDetails } from "../modal/clientdetails";
import add_client from '../../assets/add_client.png'

type ClientTableProps = {
    data: Client[];
}

export const ClientTable = ({ data } : ClientTableProps) => {
    const [showModal, setShowModal] = useState<Boolean>(false)
    const [selectedClient, setSelectedClient] = useState<string>('');

    const toggleModal = (clientId : string) => {
        setSelectedClient(clientId)
        setShowModal(true)
    }

    return(
        <>
        {showModal ? <ClientDetails id={selectedClient} toggleModal={setShowModal} /> : <></>}
        <div className="relative overflow-x-auto shadow-md rounded-lg border border-gray-900">
            <table className="w-full text-lg text-center text-gray-900">
                <thead className="uppercase bg-[#18275B] text-white">
                    <tr>
                        <th scope="col" className="px-6 py-2 ">Nom</th>
                        <th scope="col" className="px-6 py-2 ">Téléphone</th>
                        <th scope="col" className="px-6 py-2">Immatriculation(s)</th>
                        <th scope="col" className="px-6 py-2 flex justify-end">
                        <img src={add_client.src} className="h-8 cursor-pointer"/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        return index % 2 == 0 ? 
                        (
                            <tr className="bg-[#7B899F] border-gray-700" key={index}>
                                <td scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                                    {`${item.lastname.toUpperCase()}  ${item.firstname}`}
                                </td>
                                <td className="px-6 py-2">
                                    {item.phoneNumber}
                                </td>
                                <td className="px-6 py-2">
                                    {item.imats}
                                </td>
                                <td className="px-6 py-2 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => toggleModal(item.id)}>Edit</a>
                                </td>
                            </tr>
                        ) :
                        (
                            <tr className="bg-[#909FB3] border-gray-700" key={index}>
                                <td scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                                    {`${item.lastname.toUpperCase()}  ${item.firstname}`}
                                </td>
                                <td className="px-6 py-2">
                                    {item.phoneNumber}
                                </td>
                                <td className="px-6 py-2">
                                    {item.imats}
                                </td>
                                <td className="px-6 py-2 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => toggleModal(item.id)}>Edit</a>
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