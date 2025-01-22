import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const GoogleTagManager = () => {
  const [isInjected, setIsInjected] = useState(false);

  useEffect(() => {
    if (!isInjected) {
      const noScriptWrapper = document.createElement("noscript");
      const gtmIFrame = document.createElement("iframe");

      gtmIFrame.src = `https://www.googletagmanager.com/ns.html?id=${import.meta.env.VITE_GTM_ID}`;
      gtmIFrame.setAttribute(
        "style",
        "display:none;visibility:hidden;height:0;width:0;",
      );
      noScriptWrapper.appendChild(gtmIFrame);
      document.body.appendChild(noScriptWrapper);
      setIsInjected(true);
    }
  }, [isInjected]);

  return (
    <>
      <Helmet>
        {/* {`<!-- Google Tag Manager --> */}
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${import.meta.env.VITE_GTM_ID}');`}
        </script>
        {/* <!-- End Google Tag Manager -->`} */}
      </Helmet>
    </>
  );
};

export default GoogleTagManager;
