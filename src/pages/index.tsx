import { type NextPage } from "next";
import { GetServerSideProps } from "next/types"
import Link from "next/link";
import { signOut } from "next-auth/react";
import { getServerAuthSession } from "../server/auth";


const Home: NextPage = () => {

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/customers"
            >
              <h3 className="text-2xl font-bold">Clients →</h3>
              <div className="text-lg">
                Gérer vos clients
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/stock"
            >
              <h3 className="text-2xl font-bold">Stock →</h3>
              <div className="text-lg">
                Gérer votre stock
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <button
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                onClick={() => signOut()}
              >
                Se deconnecter
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;


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
