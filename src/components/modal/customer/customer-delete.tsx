import { api } from "../../../utils/api";

type CustomerDeleteProps = {
    id: string;
    onValidate: () => void;
    onClose: () => void;
}

export const CustomerDeleteModal = ({ id, onValidate, onClose } : CustomerDeleteProps) => {
    const utils = api.useContext()
    
    const { mutateAsync } = api.customer.delete.useMutation({
        onSuccess: async () => {
            await utils.customer.search.invalidate()
            await utils.customer.getAll.invalidate()
        }
    })

    const handleSubmit = () => {
        mutateAsync({ id })
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
                    <div className="px-6 py-6 lg:px-8 text-white">
                        Voulez-vous supprimer le client ?
                        <div className="mt-8">
                            <div className="flex justify-around">
                                <button className="bg-[#8394b1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => onClose()}>Annuler</button>
                                <button className="bg-[#18275B] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => handleSubmit()}>Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}