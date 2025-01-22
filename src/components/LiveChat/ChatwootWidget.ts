// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect } from "react";

const ChatwootWidget = () => {
  useEffect(() => {
    //@ts-expect-error workaround for ts
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: "left",
      type: "expanded_bubble",
      launcherTitle: "Chat with us",
      id: "chatwoot-widget",
    };
  }, []);

  (function (d, t) {
    const BASE_URL = "https://app.chatwoot.com";
    const g = d.createElement(t),
      s = d.getElementsByTagName(t)[0];

    //@ts-expect-error workaround for ts
    g.src = BASE_URL + "/packs/js/sdk.js";
    g.defer = true;
    g.async = true;
    s.parentNode.insertBefore(g, s);
    g.onload = function () {
      window.chatwootSDK.run({
        websiteToken: "EqxBWMzHf1jKYYnaqQDWZNpY",
        baseUrl: BASE_URL,
      });
    };
  })(document, "script");

  return null;
};
export default ChatwootWidget;
