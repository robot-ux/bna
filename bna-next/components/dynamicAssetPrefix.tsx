import React from 'react'

const AssetPreifxContext = React.createContext('')

export const AssetPrefixProvider = ({
  children,
  value,
}: {
  children: any
  value: string
}) => {
  const Provider = AssetPreifxContext.Provider
  return <Provider value={value || ''}>{children}</Provider>
}

export const useAssetPrefix = () => {
  return React.useContext(AssetPreifxContext)
}
