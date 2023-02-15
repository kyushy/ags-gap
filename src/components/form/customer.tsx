import { Customer } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react"


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
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Nom</label>
                <input type="text" name="name" value={lastname} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Prénom</label>
                <input type="text" name="name" value={firstname} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white">Téléphone</label>
                <input type="phone" name="phone" value={phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => setPhone(e.target.value)} />
            </div> 
            <div>
                <label htmlFor="immat" className="block mb-2 text-sm font-medium text-white">Immat(s)</label>
                <input type="text" name="immat" value={immat} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => setImmat(e.target.value)} />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="text-white bg-[#18275B] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Valider</button>
            </div>
        </form>
    )
}