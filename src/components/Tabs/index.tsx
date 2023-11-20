import { memo, useState } from 'react'
import type { StackProps, TabLayout, TabsTabProps } from 'tamagui'
import { AnimatePresence, Label, Stack, styled, Tabs as TTabs, YStack } from 'tamagui'

const AnimatedYStack = styled(YStack, {
  variants: {
    isLeft: { true: { x: -25, opacity: 0 } },

    isRight: { true: { x: 25, opacity: 0 } },

    defaultFade: { true: { opacity: 0 } }
  } as const
})

const TabsRovingIndicator = memo(({ active, ...props }: { active?: boolean } & StackProps) => (
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
))

const Tabs = memo(() => {
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

  const setCurrentTab = (currentTab: string) => setTabState({ ...tabState, currentTab })

  const setIntentIndicator = (intentAt: any) => setTabState({ ...tabState, intentAt })

  const setActiveIndicator = (activeAt: any) =>
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
    <TTabs
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
        <TTabs.List
          disablePassBorderRadius
          loop={false}
          aria-label="Manage your account"
          space="$2"
          backgroundColor="transparent"
        >
          <TTabs.Tab
            unstyled
            value="tab1"
            onInteraction={handleOnInteraction}
          >
            <Label>Profile</Label>
          </TTabs.Tab>

          <TTabs.Tab
            unstyled
            value="tab2"
            onInteraction={handleOnInteraction}
          >
            <Label>Connections</Label>
          </TTabs.Tab>

          <TTabs.Tab
            unstyled
            value="tab3"
            onInteraction={handleOnInteraction}
          >
            <Label>Notifications</Label>
          </TTabs.Tab>
        </TTabs.List>
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
          <TTabs.Content
            value={currentTab}
            forceMount
            flex={1}
            justifyContent="center"
          >
            <Label textAlign="center">{currentTab}</Label>
          </TTabs.Content>
        </AnimatedYStack>
      </AnimatePresence>
    </TTabs>
  )
})

export default Tabs
