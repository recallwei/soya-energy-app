import React, { memo, useEffect, useRef, useState } from 'react'
import type { SizableTextProps } from 'tamagui'
import { SizableText } from 'tamagui'

interface Props extends SizableTextProps {
  value?: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
}

const AnimationNumber = memo((props: Props) => {
  const { value = 0, duration = 2000, delay = 300, prefix, suffix, ...rest } = props
  const lastValue = useRef(value)
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    setTimeout(() => {
      clearInterval(interval)
      const currentLastValue = lastValue.current
      let increment = Math.floor(((value - currentLastValue) / duration) * 5)
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
    return () => clearInterval(interval)
  }, [value, delay, duration])

  return (
    <SizableText {...rest}>
      {prefix}
      {currentValue}
      {suffix}
    </SizableText>
  )
})
export default AnimationNumber
