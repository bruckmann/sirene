import type { NextPage } from 'next'
import Container from '../components/Container'
import Image from '../components/Image'
import Form from '../components/Form'

const Home: NextPage = () => {
  return (
    <div>
      <Container>
        <Image />
        <Form />
      </Container>
    </div>
  )
}

export default Home
