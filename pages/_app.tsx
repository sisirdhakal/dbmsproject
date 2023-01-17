import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../states/store'
import { useRouter } from 'next/router'
import NextJSProgress from 'nextjs-progressbar';
import EditTaskState from '@/contexts/EditTaskState';
import SetActiveState from '@/contexts/SetActiveState';
import { Toaster } from 'react-hot-toast';

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
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={6}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: '',
            duration: 1000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
              duration: 3000
            }
          }}
        />
        <div className=' h-full relative'>
          <EditTaskState>
            <SetActiveState>
              {getLayout(<Component {...pageProps} />)}
              {/* <div className='bottom-0 absolute w-full'>
            <Footer />
          </div> */}
            </SetActiveState>
          </EditTaskState>
        </div>
      </div>
    </Provider>
  </>
}

export default MyApp
