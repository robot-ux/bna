interface IUmami {
  id: string
  disabled?: boolean
  reportUri?: string
  assetPrefix: string
}

export const Umami = ({ id, disabled, reportUri, assetPrefix }: IUmami) => {
  if (disabled) return null

  return (
    <>
      <script async src={`${assetPrefix}/analytics.min.js`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          var c=function(n,fns){var _n=(window[n]=window[n]||{});for(var i=0;i<fns.length;i++){(function(_i){var fn=fns[_i];_n[fn]||(_n[fn]=function(){(_n[fn].q=_n[fn].q||[]).push(arguments)})})(i)}};c("_analytics",["init","track","page"]);
          _analytics.init({
            id: "${id}",
            reportUri: "${reportUri || 'https://report.binance.org'}",
          });
          _analytics.page();
          `,
        }}
      />
    </>
  )
}
