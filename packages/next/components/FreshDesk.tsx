interface IFreshDesk {
  id: string
  disabled?: boolean
}

export const FreshDesk = ({ id, disabled }: IFreshDesk) => {
  if (disabled) return null

  return (
    <>
      <script
        async
        src={`https://widget.freshworks.com/widgets/${id}.js`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.fwSettings={
            'widget_id': ${id},
          };
          !function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()
              `,
        }}
      />
    </>
  )
}
