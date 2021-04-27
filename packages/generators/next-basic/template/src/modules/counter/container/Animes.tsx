import { Button, Table, Space, Loading } from '@binance-chain/honeycomb'
import { useMemo } from 'react'
import shallow from 'zustand/shallow'
import styled from 'styled-components'

import { useAnimeStore } from '../store'

const Header = styled.div`
  display: flex;
  align-items: center;
  color: #000000;
`

const StyledImg = styled.img`
  width: 100px;
  height: 100px;
`

const columns = [
  {
    accessor: 'col1',
  },
]

const Counter = () => {
  const [animes, loading, fetchAnimes] = useAnimeStore(
    (state) => [state.animes, state.loading, state.fetchAnimes],
    shallow,
  )
  const tableData = useMemo(
    () =>
      animes.map((item: any) => ({
        col1: (
          <Header>
            <StyledImg src={item.image_url} />
            <Space size="small" />
            <span>{item.title}</span>
          </Header>
        ),
      })),
    [animes],
  )

  return (
    <>
      <h3>Animes</h3>
      <Button variant="success" shape="fit" onClick={fetchAnimes}>
        fetchAnimes
      </Button>
      {loading && <Loading fillViewport />}
      <Table data={tableData} columns={columns} />
    </>
  )
}

export default Counter
