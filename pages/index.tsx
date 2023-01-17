import Head from 'next/head'
import Signin from '@/components/auth/Signin'
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()

  useEffect(() => {

    const getUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/auth/showMe", { withCredentials: true })
        if (data) {
          localStorage.setItem("isPresent", "true")
          //   localStorage.setItem("user", JSON.stringify(data))
        }
      }
      catch (error) {
        router.push("/")
      }
    }
    getUser()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Signin />
      </div>
    </>
  )
}
