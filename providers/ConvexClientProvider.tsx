'use client'
import React from 'react'
import {ClerkProvider, useAuth} from "@clerk/nextjs"
import {Authenticated, AuthLoading, ConvexReactClient} from "convex/react"
import {ConvexProviderWithClerk} from "convex/react-clerk"
import LoadingLogo from '@/components/ui/shared/LoadingLogo'
type Props = {
    children: React.ReactNode;
};

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || ""
const convex = new ConvexReactClient(CONVEX_URL)

const convexClientProvider = ({children}: Props) => {
  return  <ClerkProvider dynamic>
    <ConvexProviderWithClerk useAuth = {useAuth} client = {convex}>
      <Authenticated>{children}</Authenticated>
      <AuthLoading><LoadingLogo/></AuthLoading>

    </ConvexProviderWithClerk>
  </ClerkProvider>
}

export default convexClientProvider