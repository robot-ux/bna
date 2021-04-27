import Counter from './container/Counter'
import Anime from './container/Animes'
import { useCountStore } from './store'

const Container = () => {
  return (
    <>
      <Counter />
      <Anime />
    </>
  )
}

export { useCountStore, Container }
