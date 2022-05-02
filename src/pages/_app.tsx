import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { supabase } from '../utils/supabase'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter()
  // ログイン状態に応じてページを遷移させる
  const validateSesstion = async () => {
    // ログインのuser情報をuserに格納
    const user = supabase.auth.user()
    if (user && pathname === '/') {
      push('/notes')
    } else if (!user && pathname !== '/') {
      await push('/')
    }
  }
  // ログイン情報の変化を検知(onAuthStateChanged)
  supabase.auth.onAuthStateChange((event, _) => {
    if (event === 'SIGNED_IN' && pathname === '/') {
      push('/notes')
    }
    if (event === 'SIGNED_OUT') {
      push('/')
    }
  })
  // 画面がリロードされてもvalidateSesstionが実行れるようにする
  useEffect(() => {
    validateSesstion()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
