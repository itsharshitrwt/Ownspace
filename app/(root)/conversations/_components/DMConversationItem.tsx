
import { Card } from '@/components/ui/card';
import { Id } from '@/convex/_generated/dataModel';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
    id: Id<"conversations">;
    imageUrl: string;
    username: string;
    lastMessageSender?: string;
    lastMessageContent?: string; 
    onClick?: () => void; 
}

const DMConversationItem = ({ id, imageUrl, username, lastMessageSender, lastMessageContent, onClick }: Props) => {
  return (
    <Link href={`/conversations/${id}`} className='w-full' onClick={onClick}>
      <Card className='p-2 flex flex-row items-center gap-4 truncate'>
        <div className='flex flex-row items-center gap-4 truncate'>
          <Avatar>
            <AvatarImage src={imageUrl} className='h-10' />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className='truncate'>{username}</h4>
            {lastMessageSender && lastMessageContent ? (
              <span className='text-sm text-muted-foreground flex truncate overflow-ellipsis'>
                <p className='font-semibold'>{lastMessageSender}:{' '}</p>
                <p className='truncate overflow-ellipsis'>{lastMessageContent}</p>
              </span>
            ) : (
              <p className='text-sm text-muted-foreground truncate'>Start the conversation!</p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default DMConversationItem;