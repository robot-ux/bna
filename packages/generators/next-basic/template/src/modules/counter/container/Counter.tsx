import { Button } from '@binance-chain/honeycomb'
import shallow from 'zustand/shallow'

import { useCountStore } from '../store'

const Counter = () => {
  const bears = useCountStore((state) => state.bears)
  const [increasePopulation, asyncIncrese] = useCountStore(
    (state) => [state.increasePopulation, state.asyncIncrease],
    shallow,
  )

  return (
    <div>
      <h1>{bears} around here ...</h1>
      <Button variant="primary" shape="fit" onClick={increasePopulation}>
        one up
      </Button>
      <h3>Async</h3>
      <Button variant="secondary" shape="fit" onClick={() => asyncIncrese(6)}>
        async increase
      </Button>
    </div>
  )
}

export default Counter
