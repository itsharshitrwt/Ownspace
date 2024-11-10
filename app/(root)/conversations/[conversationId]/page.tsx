"use client"
import ConversationContainer from '@/components/ui/shared/conversation/ConversationContainer'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import Body from './_components/body/Body'
import ChatInput from './_components/input/ChatInput'
import Header from './_components/Header'
import RemoveFriendDialog from '../_components/dialogs/RemoveFriendDialog'

type Props = {
  params:{
    conversationId: Id<"conversations">;
  }
}

const ConversationsPage = ({params:{conversationId}}: Props) => {
  const conversation = useQuery(api.conversation.get, {id: conversationId});
  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);

  return  conversation === undefined ? 
  <div className="w-full h-full flex item-center 
  justify-center"><Loader2 className='h-8 w-8'/></div> : conversation === null ? <p className='w-full h-full flex item-center 
  justify-center'>
     Conversation not found
  </p> : <ConversationContainer>
    <RemoveFriendDialog conversationId={conversationId} open = {removeFriendDialogOpen} setOpen={setRemoveFriendDialogOpen}/>
    <Header
      name = {
        (conversation.isGroup ? conversation.name
          : conversation.otherMember?.username) || ""
      }
      imageurl={
        conversation.isGroup ?
        undefined : conversation.
        otherMember?.imageUrl
      }
      options={conversation.isGroup ? [
        {
          label: "Leave Group",
          destructive: false,
          onClick: () => setLeaveGroupDialogOpen(true),
        },
        {
          label: "Delete Group",
          destructive: true,
          onClick: () => setDeleteGroupDialogOpen(true),
        },
        {
          label: "Remove Friend",
          destructive: true,
          onClick: () => setRemoveFriendDialogOpen(true),
        },
      ] : []}
    />
    <Body/>
    <ChatInput/>
  </ConversationContainer>
}

export default ConversationsPage