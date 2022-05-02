import { useState } from 'react'
import { supabase } from '../utils/supabase'
import { useMutation } from 'react-query'

export const useMutateAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const reset = () => {
    setEmail('')
    setPassword('')
  }
  //   ログインボタンが押された時に実行
  const loginMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn({ email, password })
      if (error) throw new Error(error.message)
    },
    // 成功した場合はonSuccess,失敗した場合はonErrorにて後処理が追加できる
    {
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )

  //   新規アカウントを作るときの処理
  const registerMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw new Error(error.message)
    },
    {
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  }
}
