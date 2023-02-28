import type { Provider } from "next-auth/providers"
import { getProviders, signIn, useSession } from "next-auth/react"
import type { GetServerSideProps } from "next/types"
import { getServerAuthSession } from "../../server/auth"


export default function SignIn({ providers } : { providers : Provider[] }) {
  const session = useSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div>{session.status}</div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Se connecter
          </button>
        </div>
      ))}
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  const session = await getServerAuthSession(context);

  if(session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  return {
    props: { providers },
  }
}