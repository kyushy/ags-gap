import type { Customer } from "@prisma/client";
import type { FormEvent } from "react";
import { useEffect, useState } from "react"


type customerFormProps = {
    customer: Customer | undefined | null;
    onSubmit: (customer : Customer) => void;
}

export const CustomerForm = ({ customer, onSubmit }: customerFormProps) => {

    const [firstname, setFirstName] = useState<string | undefined>('')
    const [lastname, setLastName] = useState<string | undefined>('')
    const [phone, setPhone] = useState<string | undefined>('')
    const [immat, setImmat] = useState<string | undefined>('')

    useEffect(() => {
        if(customer) {
            setFirstName(customer?.firstname)
            setLastName(customer?.lastname)
            setPhone(customer?.phoneNumber)
            setImmat(customer?.imats)
        }
    }, [customer])

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()
        onSubmit({
            id: customer?.id as string,
            firstname: firstname as string, 
            lastname: lastname as string, 
            phoneNumber: phone as string, 
            imats: immat as string 
        })
    }

    return(
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">Nom</label>
                <input type="text" name="name" value={lastname} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">Prénom</label>
                <input type="text" name="name" value={firstname} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 " onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white">Téléphone</label>
                <input type="phone" name="phone" value={phone} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 " onChange={(e) => setPhone(e.target.value)} />
            </div> 
            <div>
                <label htmlFor="immat" className="mb-2 block text-sm font-medium text-white">Immat(s)</label>
                <input type="text" name="immat" value={immat} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 " onChange={(e) => setImmat(e.target.value)} />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="rounded-lg bg-[#18275B] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300">Valider</button>
            </div>
        </form>
    )
}