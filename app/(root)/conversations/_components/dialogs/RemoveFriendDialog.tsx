"use client"
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import { useMutationState } from '@/hooks/useMutationState';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { ConvexError } from 'convex/values';
import React, { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner';

type Props = {
    conversationId: Id<"conversations">;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

const RemoveFriendDialog = ({conversationId, open, setOpen}: Props) => {
    const {mutate: removeFriend, pending} = useMutationState(api.friend.remove)

    const handleRemoveFriend = async()=>{
        removeFriend({conversationId}).then(()=>{
            toast.success("remove friend");
        }).catch((error)=>{
            toast.error(
                error instanceof ConvexError ? error.data : "Unexpected error occurred"
            )
        })
    }
  return <AlertDialog open = {open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
            </AlertDialogHeader>
        </AlertDialogContent>
  </AlertDialog>
}

export default RemoveFriendDialog

// 3:02:20