import { NextPage } from "next";
import { getServerAuthSession } from "../server/auth";
import { GetServerSideProps } from "next/types"
import { api } from "../utils/api";
import { ClientTable } from "../components/tables/clientTable";
import { Spinner } from "../components/ui/spinner";
import { useRouter } from "next/router";
import { Header } from "../components/layouts/header";


const Clients : NextPage = () => {
  const { search } = useRouter().query
  const { data: clients, isLoading } = search ? api.client.search.useQuery({ searchInput: search }) : api.client.getAll.useQuery()

    return(
      <>
        <Header title="fichier client"/>
        <main className="flex flex-col justify-center px-16">
          {!isLoading ? <ClientTable data={clients} /> : <Spinner />}
        </main>
      </>
    )
}

export default Clients

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