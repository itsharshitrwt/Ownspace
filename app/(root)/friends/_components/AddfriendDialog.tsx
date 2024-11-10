"use client";
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from 'react-hook-form'; // Import FormProvider
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutationState } from '@/hooks/useMutationState';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';


const addFriendFormSchema = z.object({
    email: z.string().min(1, { message: "Field can't be empty" }).email("Please enter a valid email"),
});

const AddfriendDialog = () => {
    const {mutate: createRequest, pending} = useMutationState(api.request.create);

    const form = useForm<z.infer<typeof addFriendFormSchema>>({
        resolver: zodResolver(addFriendFormSchema),
        defaultValues: {
            email: "",
        },
    });

    const handleSubmit = async(values: z.infer<typeof addFriendFormSchema>) => {
        await createRequest({email: values.email}).then(()=>{
            form.reset();
            toast.success("Friend request sent!!")
        }).catch(error =>{
            toast.error(error instanceof ConvexError? error.data : "Unexpected error occured")
        })
    };

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger>
                    <Button size="icon" variant="outline">
                        <DialogTrigger>
                            <UserPlus />
                        </DialogTrigger>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p className='text-[8px]'>Add Friend</p>
                </TooltipContent>
            </Tooltip>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Friend</DialogTitle>
                    <DialogDescription>
                        Send request to connect with your friends!
                    </DialogDescription>
                </DialogHeader>
                <FormProvider {...form}> {/* Wrap with FormProvider */}
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
                        <FormField control={form.control} name='email' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='Email...' {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />
                        <DialogFooter>
                            <Button disabled = {pending} type='submit'>Send</Button>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default AddfriendDialog;

//1:40:00