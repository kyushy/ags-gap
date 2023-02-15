import { NextPage } from "next";
import { getServerAuthSession } from "../server/auth";
import { GetServerSideProps } from "next/types"
import { api } from "../utils/api";
import { ProductTable } from "../components/tables/productTable";
import { Spinner } from "../components/ui/spinner";
import { useRouter } from "next/router";
import { Header } from "../components/layouts/header";


const Stock : NextPage = () => {
  const { search } = useRouter().query
  const { data: products, isLoading } = search ? api.product.getAll.useQuery() : api.product.getAll.useQuery()

    return(
      <>
        <Header title="gestion stock"/>
        <main className="flex flex-col justify-center px-16">
          {!isLoading ? <ProductTable data={products} /> : <Spinner />}
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