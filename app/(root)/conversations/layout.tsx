
"use client"
import ItemList from '@/components/ui/shared/item-list/ItemList';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import DMConversationItem from './_components/DMConversationItem';
import CreateGroupDialog from './_components/CreateGroupDialog';
import { useRouter, usePathname } from 'next/navigation'; 

type Props = React.PropsWithChildren<{}>;

const ConversationsLayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);
  const [isSidebarVisible, setSidebarVisible] = useState(true); 
  const router = useRouter(); 
  const pathname = usePathname(); 

  
  const handleConversationClick = (id: string) => {
    if (window.innerWidth < 768) { 
      setSidebarVisible(false); 
    }
    router.push(`/conversations/${id}`); 
  };

  
  useEffect(() => {
    if (pathname === '/conversations') {
      setSidebarVisible(true); 
    }
  }, [pathname]); 

  return (
    <>
      {isSidebarVisible && (
        <ItemList title='Conversation' action={<CreateGroupDialog />}>
          {conversations ? (
            conversations.length === 0 ? (
              <p className='w-full h-full flex items-center justify-center'>No Conversations found</p>
            ) : conversations.map(conversation => (
              conversation.conversation.isGroup ? null : (
                <DMConversationItem
                  key={conversation.conversation._id}
                  id={conversation.conversation._id}
                  username={conversation.otherMember?.username || ""}
                  imageUrl={conversation.otherMember?.imageUrl || ""}
                  lastMessageContent={conversation.lastMessage?.content}
                  lastMessageSender={conversation.lastMessage?.sender}
                  onClick={() => handleConversationClick(conversation.conversation._id)} 
                />
              )
            ))
          ) : (
            <Loader2 />
          )}
        </ItemList>
      )}
      {children}
    </>
  );
}

export default ConversationsLayout;