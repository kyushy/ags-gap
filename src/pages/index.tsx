import { type NextPage } from "next";
import { type GetServerSideProps } from "next/types"
import Link from "next/link";
import  Image from "next/image"
import { signOut } from "next-auth/react";
import { getServerAuthSession } from "../server/auth";
import  logo  from '../assets/logo.png'
import stock from '../assets/stocker2.png'
import customer from '../assets/client.png'


const Home: NextPage = () => {

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16 min-h-screen">
          <Image src={logo} alt="logo" width={200}/>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-16 my-16">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-[1rem] bg-[#656F92] p-4 text-white hover:bg-white/20 border-[#211D58] border-4"
              href="/customers"
            >
              <Image src={customer} alt="to_customer" width={180} className="p-6" />
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-[1rem] bg-[#656F92] p-4 text-white hover:bg-white/20 border-[#211D58] border-4"
              href="/stock"
            >
              <Image src={stock} alt="to_stock" width={180} className="p-6" />
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <button
                className="rounded-full bg-white/10 px-10 py-3 italic text-black no-underline transition hover:bg-white/20 border-[#211D58] border-2"
                onClick={() => signOut()}
              >
                Se déconnecter
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
