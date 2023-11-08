import { ListItem, Separator, YGroup } from 'tamagui'

interface SListItem {
  title?: string
  description?: string
  icon?: any
  onPress?: () => void
}

interface Props {
  data?: SListItem[]
  pressTheme?: boolean
  separator?: boolean
  scaleIcon?: number
}

export default function SListItemGroup(props: Props) {
  const scaleIcon = props.scaleIcon ?? 1.5
  if (!props.data || props.data.length === 0) return null
  return (
    <YGroup
      alignSelf="center"
      bordered
      width="100%"
      size="$4"
      separator={props.separator ? <Separator /> : null}
    >
      {props.data?.map((item, index) => (
        <YGroup.Item key={index}>
          <ListItem
            size="$4"
            scaleIcon={scaleIcon}
            pressTheme={props.pressTheme}
            icon={item.icon}
            title={item.title}
            subTitle={item.description}
          />
        </YGroup.Item>
      ))}
    </YGroup>
  )
}
