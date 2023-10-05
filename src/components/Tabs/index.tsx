import { useState } from 'react'
import type { StackProps, TabLayout, TabsTabProps } from 'tamagui'
import {
  AnimatePresence,
  H5,
  SizableText,
  Stack,
  styled,
  Tabs,
  YStack
} from 'tamagui'

const AnimatedYStack = styled(YStack, {
  variants: {
    isLeft: { true: { x: -25, opacity: 0 } },

    isRight: { true: { x: 25, opacity: 0 } },

    defaultFade: { true: { opacity: 0 } }
  } as const
})

export default function TabsAdvancedBackground() {
  const [tabState, setTabState] = useState<{
    currentTab: string
    /**
     * Layout of the Tab user might intend to select (hovering / focusing)
     */
    intentAt: TabLayout | null
    /**
     * Layout of the Tab user selected
     */
    activeAt: TabLayout | null
    /**
     * Used to get the direction of activation for animating the active indicator
     */
    prevActiveAt: TabLayout | null
  }>({
    activeAt: null,

    currentTab: 'tab1',

    intentAt: null,

    prevActiveAt: null
  })
  const setCurrentTab = (currentTab: string) =>
    setTabState({ ...tabState, currentTab })

  const setIntentIndicator = (intentAt: any) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    setTabState({ ...tabState, intentAt })

  const setActiveIndicator = (activeAt: any) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt })

  const { activeAt, intentAt, prevActiveAt, currentTab } = tabState

  const direction = (() => {
    if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
      return 0
    }

    return activeAt.x > prevActiveAt.x ? -1 : 1
  })()
  const enterVariant =
    // eslint-disable-next-line no-nested-ternary
    direction === 1 ? 'isLeft' : direction === -1 ? 'isRight' : 'defaultFade'

  const exitVariant =
    // eslint-disable-next-line no-nested-ternary
    direction === 1 ? 'isRight' : direction === -1 ? 'isLeft' : 'defaultFade'

  const handleOnInteraction: TabsTabProps['onInteraction'] = (type, layout) => {
    if (type === 'select') {
      setActiveIndicator(layout)
    } else {
      setIntentIndicator(layout)
    }
  }
  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      orientation="horizontal"
      size="$4"
      padding="$2"
      height={150}
      flexDirection="column"
      activationMode="manual"
      backgroundColor="$background"
      borderRadius="$4"
      position="relative"
    >
      <YStack>
        <AnimatePresence>
          {intentAt && (
            <TabsRovingIndicator
              borderRadius="$4"
              width={intentAt.width}
              height={intentAt.height}
              x={intentAt.x}
              y={intentAt.y}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeAt && (
            <TabsRovingIndicator
              borderRadius="$4"
              theme="active"
              width={activeAt.width}
              height={activeAt.height}
              x={activeAt.x}
              y={activeAt.y}
            />
          )}
        </AnimatePresence>
        <Tabs.List
          disablePassBorderRadius
          loop={false}
          aria-label="Manage your account"
          space="$2"
          backgroundColor="transparent"
        >
          <Tabs.Tab
            unstyled
            value="tab1"
            onInteraction={handleOnInteraction}
          >
            <SizableText>Profile</SizableText>
          </Tabs.Tab>

          <Tabs.Tab
            unstyled
            value="tab2"
            onInteraction={handleOnInteraction}
          >
            <SizableText>Connections</SizableText>
          </Tabs.Tab>

          <Tabs.Tab
            unstyled
            value="tab3"
            onInteraction={handleOnInteraction}
          >
            <SizableText>Notifications</SizableText>
          </Tabs.Tab>
        </Tabs.List>
      </YStack>
      <AnimatePresence
        exitBeforeEnter
        enterVariant={enterVariant}
        exitVariant={exitVariant}
      >
        <AnimatedYStack
          key={currentTab}
          animation="100ms"
          x={0}
          opacity={1}
          flex={1}
        >
          <Tabs.Content
            value={currentTab}
            forceMount
            flex={1}
            justifyContent="center"
          >
            <H5 textAlign="center">{currentTab}</H5>
          </Tabs.Content>
        </AnimatedYStack>
      </AnimatePresence>
    </Tabs>
  )
}

function TabsRovingIndicator({
  active,
  ...props
}: { active?: boolean } & StackProps) {
  return (
    <Stack
      position="absolute"
      backgroundColor="$color5"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0
      }}
      exitStyle={{
        opacity: 0
      }}
      {...(active && {
        backgroundColor: '$color8',
        opacity: 0.6
      })}
      {...props}
    />
  )
}
