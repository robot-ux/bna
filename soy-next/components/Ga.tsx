interface IGtag {
  id: string
  disabled?: boolean
}

export const Ga = ({ id, disabled }: IGtag) => {
  if (disabled) return null

  return (
    <>
      <script
        async
        src="https://www.google-analytics.com/analytics.js"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', ${id}, 'auto');
          ga('send', 'pageview');
              `,
        }}
      />
    </>
  )
}
