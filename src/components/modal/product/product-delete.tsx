import { api } from "../../../utils/api";

type ProductDeleteProps = {
    id: string;
    onValidate: () => void;
    onClose: () => void;
}

export const ProductDeleteModal = ({ id, onValidate, onClose } : ProductDeleteProps) => {
    const utils = api.useContext()
    
    const { mutateAsync } = api.product.delete.useMutation({
        onSuccess: () => {
            utils.product.getAll.invalidate()
            utils.product.stockValue.invalidate()
        }
    })

    const handleSubmit = () => {
        mutateAsync({ id })
        onValidate()
    }

    return(
        <div tabIndex={-1} aria-hidden="true" className="h-modal fixed inset-x-0 top-0 z-50 w-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-40 p-4 md:inset-0 md:h-full">
            <div className="relative m-auto h-full w-full max-w-md md:h-auto">
                <div className="relative rounded-lg bg-[#535D82] shadow">
                    <button type="button" className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => onClose()}>
                        <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-white lg:px-8">
                        Voulez-vous supprimer le produit ?
                        <div className="mt-8">
                            <div className="flex justify-around">
                                <button className="rounded-lg bg-[#8394b1] px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-300" onClick={() => onClose()}>Annuler</button>
                                <button className="rounded-lg bg-[#18275B] px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-300" onClick={() => handleSubmit()}>Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}