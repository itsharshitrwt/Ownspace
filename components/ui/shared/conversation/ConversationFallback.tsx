import React from 'react'
import { Card } from '@/components/ui/card'

const ConversationFallback = () => {
  return (
    <Card className='hidden lg:flex h-full w-full p-2 items-center justify-center bg-secondary text-secondary-foreground'>Select/Start Conversation to get Started!</Card>
  )
}

export default ConversationFallback