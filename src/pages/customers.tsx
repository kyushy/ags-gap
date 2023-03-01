import type { NextPage } from "next";
import { getServerAuthSession } from "../server/auth";
import type { GetServerSideProps } from "next/types"
import { api } from "../utils/api";
import { CustomerTable } from "../components/tables/customerTable";
import { Spinner } from "../components/ui/spinner";
import { useRouter } from "next/router";
import { Header } from "../components/layouts/header";
import { CustomerUpdateModal } from "../components/modal/customer/customer-update";
import { useState } from "react";
import { CustomerCreateModal } from "../components/modal/customer/customer-create";
import { CustomerDeleteModal } from "../components/modal/customer/customer-delete";


const Customers : NextPage = () => {
  const { search } = useRouter().query

  const { data: customers, isLoading } = search ? api.customer.search.useQuery({ searchInput: search as string }) : api.customer.getAll.useQuery()

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedClient, setSelectedClient] = useState<string>('');

  const handleAddClick = () => {
    setShowCreateModal(true)
  }

  const handleEditClick = (clientId: string) => {
    setSelectedClient(clientId)
    setShowUpdateModal(true)
  }

  const handleDeleteClick = (clientId: string) => {
    setSelectedClient(clientId)
    setShowDeleteModal(true)
  }


    return(
      <>
        <Header title="fichier client"/>
        <main className="flex flex-col justify-center">
          {showCreateModal ? <CustomerCreateModal onValidate={() => setShowCreateModal(false)} onClose={() => setShowCreateModal(false)} /> : <></>}
          {showUpdateModal ? <CustomerUpdateModal id={selectedClient} onValidate={() => setShowUpdateModal(false)} onClose={() => setShowUpdateModal(false)} /> : <></>}
          {showDeleteModal ? <CustomerDeleteModal id={selectedClient} onValidate={() => setShowDeleteModal(false)} onClose={() => setShowDeleteModal(false)} /> : <></>}
          {!isLoading ? 
            <CustomerTable 
              data={customers}
              onClickAdd={() => handleAddClick()}
              onClickEdit={(customerId) => handleEditClick(customerId)}
              onClickDelete={(customerId) => handleDeleteClick(customerId)}
            /> 
            : 
            <Spinner />
          }
        </main>
      </>
    )
}

export default Customers

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerAuthSession(context);
  
    if(!session?.user) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false
        }
      }
    }
  
    return {
      props: { session },
    }
  }