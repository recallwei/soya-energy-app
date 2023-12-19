import React, { memo, useEffect, useRef, useState } from 'react'
import type { SizableTextProps } from 'tamagui'
import { SizableText } from 'tamagui'

interface Props extends SizableTextProps {
  value?: number
  duration?: number
  delay?: number
}

const AnimationNumber = memo((props: Props) => {
  const { value = 0, duration = 2000, delay = 500, ...rest } = props
  const lastValue = useRef(value)
  const [currentValue, setCurrentValue] = useState(0)
  let interval: NodeJS.Timeout

  const start = () => {
    setTimeout(() => {
      clearInterval(interval)
      let increment = Math.floor(((value - lastValue.current) / duration) * 5)
      lastValue.current = value
      increment = increment < 1 ? 1 : increment
      interval = setInterval(() => {
        setCurrentValue((prev: number) => {
          const nextValue = prev + increment
          if (nextValue >= value) {
            clearInterval(interval)
            return value
          }
          return nextValue
        })
      }, 5)
    }, delay)
  }

  useEffect(() => {
    start()
    return () => clearInterval(interval)
  }, [value])

  return <SizableText {...rest}>{currentValue}</SizableText>
})
export default AnimationNumber
