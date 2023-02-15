import withTwindDocument from "@twind/next/shim/document";
import { default as twindConfig } from "../twind.config";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-[#282b2e]">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default withTwindDocument(twindConfig, Document);
