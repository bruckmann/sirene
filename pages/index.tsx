import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '../components/Container'
import Image from '../components/Image'
import Form from '../components/Form'

const Home: NextPage = () => {
  return (
    <>
    <Head>
      <title>Keratoconus Detection</title>
    </Head>
    <div>
      <Container>
        <Image />
        <Form />
      </Container>
    </div>
    </>
  )
}

export default Home
