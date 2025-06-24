"use client"

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearFlashMessage, FlashState } from '@/features/flashMessages/flashMessageSlice'
import { Toaster as Sonner, toast } from 'sonner'
import { useTheme } from 'next-themes'

const Toaster = () => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as React.ComponentProps<typeof Sonner>["theme"]}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                },
            }}
        />
    )
}

function FlashMessage() {
    const dispatch = useDispatch()
    const { message, type } = useSelector<{ flashMessage: FlashState }, FlashState>(state => state.flashMessage)

    useEffect(() => {
        if (message) {
            toast(message, {
                description: type === "error" ? "An error occurred" : "Operation successful",
                action: {
                    label: "Close",
                    onClick: () => dispatch(clearFlashMessage())
                }
            })

            // Automatically clear the message after 5 seconds
            const timer = setTimeout(() => dispatch(clearFlashMessage()), 5000)
            return () => clearTimeout(timer)
        }
    }, [message, type, dispatch])

    return <Toaster />
}

export default FlashMessage