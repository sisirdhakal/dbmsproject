import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../states/store'
import { useRouter } from 'next/router'
import NextJSProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const getLayout = Component.getLayout || ((page) => page);

  return <>
    <Provider store={store}>
      <div key={router.pathname} className='h-screen'>
        <NextJSProgress
          color="red"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <div className=' h-full relative'>
          {getLayout(<Component {...pageProps} />)}
          {/* <div className='bottom-0 absolute w-full'>
            <Footer />
          </div> */}
        </div>
      </div>
    </Provider>
  </>
}

export default MyApp
