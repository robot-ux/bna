interface IGtag {
  id: string
  disabled?: boolean
}

export const Gtag = ({ id, disabled }: IGtag) => {
  if (disabled) return null

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', ${id});
              `,
        }}
      />
    </>
  )
}
