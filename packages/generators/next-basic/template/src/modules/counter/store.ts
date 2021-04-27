import create, { SetState } from 'zustand'

import { get } from 'utils/request'

type ICounterStore = {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void
  asyncIncrease: (n: number) => Promise<void>
}

export const useCountStore = create((set: SetState<ICounterStore>) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  asyncIncrease: async (n: number) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    set((state) => ({ bears: state.bears + n }))
  },
}))

type IAnimeStore = {
  animes: never[] & object[]
  loading: boolean
  fetchAnimes: () => Promise<void>
}

export const useAnimeStore = create((set: SetState<IAnimeStore>) => ({
  animes: [],
  loading: false,
  fetchAnimes: async () => {
    set({ loading: true })
    const json = await get(
      `https://api.jikan.moe/v3/search/anime?q=naruto&limit=5`,
    ).finally(() => set({ loading: false }))

    set({ animes: json.results })
  },
}))
