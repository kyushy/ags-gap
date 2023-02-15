import { Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { FormEvent, useEffect, useState } from "react"


type productFormProps = {
    product: Product | undefined | null;
    onSubmit: (product : Product) => void;
}

export const ProductForm = ({ product, onSubmit }: productFormProps) => {

    const [reference, setReference] = useState<string | undefined>('')
    const [name, setName] = useState<string | undefined>('')
    const [buyingPrice, setBuyingPrice] = useState<number>(0)
    const [sellingPrice, setSellingPrice] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(0)

    useEffect(() => {
        if(product) {
            setReference(product.reference)
            setName(product.name)
            setBuyingPrice(Number(product.buyingPrice))
            setSellingPrice(Number(product.sellingPrice))
            setQuantity(Number(product.quantity))
        }
    }, [product])

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()
        onSubmit({
            reference: reference as string,
            name: name as string,
            buyingPrice: buyingPrice,
            sellingPrice: sellingPrice,
            quantity: quantity
        })
    }

    return(
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label htmlFor="reference" className="block mb-2 text-sm font-medium text-white">Référence</label>
                <input type="text" name="reference" value={reference} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setReference(e.target.value)} />
            </div>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Nom</label>
                <input type="text" name="name" value={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="buying" className="block mb-2 text-sm font-medium text-white">Prix d'achat</label>
                <input type="number" name="buying" value={buyingPrice} step="0.01" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setBuyingPrice(Number(e.target.value))} />
            </div>
            <div>
                <label htmlFor="selling" className="block mb-2 text-sm font-medium text-white">Prix de vente</label>
                <input type="number" name="selling" value={sellingPrice} step="0.01" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setSellingPrice(Number(e.target.value))} />
            </div>
            <div>
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-white">Quantité</label>
                <input type="number" name="quantity" value={quantity} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="text-white bg-[#18275B] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Valider</button>
            </div>
        </form>
    )
}