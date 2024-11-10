import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { CircleArrowLeft, Settings } from 'lucide-react';
import Link from 'next/link';

import React from 'react'

type Props = {
  imageurl?: string;
  name: string;
  options?: {
    label: string;
    destructive: boolean;
    onClick: ()=> void;
  }[]
}

const Header = ({imageurl, name, options}: Props) => {
  return (
    <Card className='w-full flex rounded-lg items-center p-2 justify-between'>
      <div className="flex item-center gap-2">
         <Link href= "/conversations" className='block lg:hidden'>
           <CircleArrowLeft/>
         </Link>
         <Avatar className='h-8 w-8'>
            <AvatarImage src ={imageurl}/>
              <AvatarFallback>{name.substring(0,1)}</AvatarFallback>
         </Avatar>
         <h2 className='font-semibold'>{name}</h2>
      </div>
      <div className='flex gap-2'>
          {options ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size="icon" variant="secondary">
                  <Settings/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {options.map((option, id)=>{
                  return (
                    <DropdownMenuItem key={id} onClick={option.onClick} className= {cn("font-semibold", {
                      "text-destructive": option.destructive,
                    })}>
                      {option.label}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          ): null}
      </div>
    </Card>
  )
}

export default Header

// 2:55:00