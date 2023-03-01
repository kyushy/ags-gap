import type { NextPage } from "next";
import { getServerAuthSession } from "../server/auth";
import type { GetServerSideProps } from "next/types"
import { api } from "../utils/api";
import { ProductTable } from "../components/tables/productTable";
import { Spinner } from "../components/ui/spinner";
import { useRouter } from "next/router";
import { Header } from "../components/layouts/header";
import { useState } from "react";
import { ProductCreateModal } from "../components/modal/product/product-create";
import { ProductUpdateModal } from "../components/modal/product/product-update";
import { ProductDeleteModal } from "../components/modal/product/product-delete";


const Stock : NextPage = () => {
  const { search } = useRouter().query
  const { data: products, isLoading: loadingProducts } = search ? api.product.search.useQuery({ searchInput: search as string }) : api.product.getAll.useQuery()
  const { data: totalValue, isLoading: loadingPrices } = api.product.stockValue.useQuery();

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const handleAddClick = () => {
    setShowCreateModal(true)
  }

  const handleEditClick = (productId: string) => {
    setSelectedProduct(productId)
    setShowUpdateModal(true)
  }

  const handleDeleteClick = (productId: string) => {
    setSelectedProduct(productId)
    setShowDeleteModal(true)
  }

    return(
      <>
        <Header title="gestion stock"/>
        <main className="flex flex-col justify-center px-16">
          {showCreateModal ? <ProductCreateModal onValidate={() => setShowCreateModal(false)} onClose={() => setShowCreateModal(false)} /> : <></>}
          {showUpdateModal ? <ProductUpdateModal id={selectedProduct} onValidate={() => setShowUpdateModal(false)} onClose={() => setShowUpdateModal(false)} /> : <></>}
          {showDeleteModal ? <ProductDeleteModal id={selectedProduct} onValidate={() => setShowDeleteModal(false)} onClose={() => setShowDeleteModal(false)} /> : <></>}
          {!loadingProducts ? 
            <ProductTable 
              data={products}
              onClickAdd={() => handleAddClick()}
              onClickEdit={(productId) => handleEditClick(productId)}
              onClickDelete={(productId) => handleDeleteClick(productId)}
            /> 
            : 
            <Spinner />
          }
          <div className="flex justify-around bg-[#7B899F] rounded-md w-3/12 2xl:w-2/12 py-2 mt-4 border border-black text-lg italic">
            <div>Valeur totale du stock : </div>
            <div>{!loadingPrices && totalValue?.toPrecision(4)}€</div>
          </div>
        </main>
      </>
    )
}

export default Stock

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