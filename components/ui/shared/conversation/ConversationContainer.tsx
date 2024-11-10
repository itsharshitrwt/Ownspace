import React from 'react'
import { Card } from '@/components/ui/card'


type Props = React.PropsWithChildren<{}>
const ConversationContainer = ({children}:Props) => {
  return (
    <Card className='w-full h-[calc(100svh-32px)] lg:h-full flex flex-col  p-2 gap-2'>{children}</Card>
  )
}

export default ConversationContainer