"use client"
import ConversationFallback from '@/components/ui/shared/conversation/ConversationFallback'
import ItemList from '@/components/ui/shared/item-list/ItemList'
import React from 'react'
import AddfriendDialog from './_components/AddfriendDialog'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2 } from 'lucide-react'
import Request from './_components/Request'
type Props = {}

const Friendspage = (props: Props) => {
  const requests = useQuery(api.requests.get)
  return (
    <>
      <ItemList title='Friends' action = 
      {<AddfriendDialog/>}>
        {
          requests ? requests.length === 0 ? <p className='w-full h-full items-center justify-center flex'>No requests found</p>: requests.map((request)=>{
            return <Request key={request.request._id} id={request.request._id} imageUrl = {request.sender.imageUrl} username = {request.sender.username} email= {request.sender.email}/>
          }): <Loader2
          className='h-8 w-8'/>

        }
      </ItemList>
      <ConversationFallback/>
    </>
  )
}

export default Friendspage