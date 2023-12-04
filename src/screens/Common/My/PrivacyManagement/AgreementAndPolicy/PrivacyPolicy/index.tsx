import { useState } from 'react'
import Pdf from 'react-native-pdf'
import { View } from 'tamagui'

import { LoadingProgress } from '@/components'

export default function Screen() {
  const [loadingPercent, setLoadingPercent] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  return (
    <>
      {isLoading && (
        <View
          position="absolute"
          top={0}
          bottom={150}
          left={0}
          right={0}
          alignItems="center"
          justifyContent="center"
        >
          <LoadingProgress value={loadingPercent} />
        </View>
      )}
      <Pdf
        /**
         * Facing ReactNativeBlobUtil request error in React Native
         * @see https://stackoverflow.com/questions/72674863/facing-reactnativeblobutil-request-error-in-react-native
         */
        trustAllCerts={false}
        source={{
          uri: 'https://soya-inner-test.s3.eu-central-2.amazonaws.com/Polyfilling_the_Web_Forward__compressed.pdf',
          // uri: 'https://soya-inner-test.s3.eu-central-2.amazonaws.com/optimizing-for-cwv.pdf',
          cache: true
        }}
        onLoadProgress={(percent) => {
          setLoadingPercent(percent * 100)
        }}
        onLoadComplete={() => {
          setLoadingPercent(100)
          setIsLoading(false)
        }}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          opacity: isLoading ? 0 : 100
        }}
      />
    </>
  )
}
