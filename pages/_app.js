import '../styles/globals.css'
import { ProvideAuth } from "../libs/auth";

function MyApp({ Component, pageProps }) {
  return <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
}

export default MyApp
