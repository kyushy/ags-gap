import type { Product } from "@prisma/client";
import type { FormEvent } from "react";
import { useEffect, useState } from "react"


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
    const [refEq, setRefEq] = useState<string | undefined>('')

    useEffect(() => {
        if(product) {
            setReference(product.reference)
            setName(product.name)
            setBuyingPrice(Number(product.buyingPrice))
            setSellingPrice(Number(product.sellingPrice))
            setQuantity(Number(product.quantity))
            setRefEq(product.refEq)
        }
    }, [product])

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()
        onSubmit({
            id: product?.id as string,
            reference: reference as string,
            name: name as string,
            buyingPrice: buyingPrice,
            sellingPrice: sellingPrice,
            quantity: quantity,
            refEq: refEq as string
        })
    }

    return(
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label htmlFor="reference" className="mb-2 block text-sm font-medium text-white">Référence</label>
                <input type="text" name="reference" value={reference} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setReference(e.target.value)} />
            </div>
            <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">Nom</label>
                <input type="text" name="name" value={name} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="buying" className="mb-2 block text-sm font-medium text-white">Prix d&apos;achat</label>
                <input type="number" name="buying" value={buyingPrice} step="0.01" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setBuyingPrice(Number(e.target.value))} />
            </div>
            <div>
                <label htmlFor="selling" className="mb-2 block text-sm font-medium text-white">Prix de vente</label>
                <input type="number" name="selling" value={sellingPrice} step="0.01" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setSellingPrice(Number(e.target.value))} />
            </div>
            <div>
                <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-white">Quantité</label>
                <input type="number" name="quantity" value={quantity} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
            <div>
                <label htmlFor="refEq" className="mb-2 block text-sm font-medium text-white">Références équivalentes</label>
                <textarea name="refEq" value={refEq} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setRefEq(e.target.value)} />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="rounded-lg bg-[#18275B] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300">Valider</button>
            </div>
        </form>
    )
}