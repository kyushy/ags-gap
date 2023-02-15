import { Product } from "@prisma/client";
import { api } from "../../../utils/api"
import { ProductForm } from "../../form/product";

type ProductCreateProps = {
    reference: string;
    onValidate: () => void;
    onClose: () => void;
}

export const ProductUpdateModal = ({ reference, onValidate, onClose } : ProductCreateProps) => {
    const utils = api.useContext()
    const { data: product, isFetched } = api.product.get.useQuery({ reference })

    const { mutateAsync } = api.product.update.useMutation({
        onSuccess: () => {
            utils.product.getAll.invalidate()
            utils.product.stockValue.invalidate()
        }
    })

    const handleSubmit = (p : Product) => {
        mutateAsync({
            reference: p.reference,
            name: p.name,
            buyingPrice: p.buyingPrice || 0,
            sellingPrice: p.sellingPrice || 0,
            quantity: p.quantity || 0
        })
        onValidate()
    }

    return(
        <div tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-black bg-opacity-40">
            <div className="relative w-full h-full max-w-md md:h-auto m-auto">
                <div className="relative rounded-lg shadow bg-[#535D82]">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => onClose()}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        {isFetched && <ProductForm product={product} onSubmit={(p) => handleSubmit(p)}/>}
                    </div>
                </div>
            </div>
        </div> 
    )
}