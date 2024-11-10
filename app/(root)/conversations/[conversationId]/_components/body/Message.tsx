
import React from 'react'
import {format} from "date-fns"
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
type Props = {
    fromCurrentuser: boolean;
    senderImage: string;
    senderName: string;
    lastByUser: boolean;
    content: string[];
    createdAt: number;
    type: string;
}

const Message = ({
    fromCurrentuser, 
    senderImage,
    senderName,
    lastByUser,
    content,
    createdAt,
    type
}: Props) => {
    const formatTime = (timestamp:number)=>{
        return format(timestamp, "HH:mm")
    }
  return (
    <div className={cn("flex items-end",{
        "justify-end": fromCurrentuser
    })}>
        <div className={cn("flex mx-2 w-full flex-col", {
            "order-1 items-end": fromCurrentuser,
            "order-2 items-start": !fromCurrentuser
        })}>
            <div className= {cn("px-4 py-2 rounded-lg max-w-[70%]",
                {"bg-primary text-primary-foreground": fromCurrentuser,
                    "bg-secondary text-secondary-foreground": !fromCurrentuser,
                    "rounded-br-none": !lastByUser && fromCurrentuser,
                    "rounded-bl-none": !lastByUser && !fromCurrentuser,
                })}>
                    {type === "text" ? <p className='text-wrap break-words whitespace-pre-wrap'>
                       {content}
                    </p>: null}
                    <p className={cn("text-xs flex w-full my-1", {
                        "text-primary-foreground justify-end": fromCurrentuser,
                        "text-secondary-foreground justify-start" : !fromCurrentuser,
                    })}> {formatTime(createdAt)}
                    </p>
                </div>
        </div>

        <Avatar className={cn("relative w-8 h-8", {
            "order-2": fromCurrentuser,
            "order-1": !fromCurrentuser,
            invisible: lastByUser,
        })}>
            <AvatarImage src={senderImage} className='rounded-2xl h-8 w-8'/>
            <AvatarFallback>{senderName.substring(0,1)}</AvatarFallback>
        </Avatar>
    </div>
  )
}

export default Message


//2:44:36