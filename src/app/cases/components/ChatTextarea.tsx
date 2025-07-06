import type React from "react"
import { useEffect, useRef, useState } from "react"
import useCreateCaseHandler from "../hooks/useCreateCaseHandler"
import {
    FMD_CLIENT_QUERY_LOCAL_STORAGE_KEY,
    type ICaseClientPreferences,
    type ICase,
} from "../types/case-types"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/auth-store"
import siteLinks from "@/lib/sitelinks"
import { useNavigate } from "react-router-dom"
import ChatTools from "./ChatTools"
import { Textarea } from "@/components/ui/textarea"

interface ChatTextareaProps {
    initialValue?: string
    className?: string
}

const ChatTextarea: React.FC<ChatTextareaProps> = ({
    initialValue = "",
    className,
}) => {
    const { user } = useAuthStore()
    const navigate = useNavigate()
    const [prefs, setPrefs] = useState<ICaseClientPreferences>()

    const [input, setInput] = useState<string>(() => {
        try {
            return localStorage.getItem(FMD_CLIENT_QUERY_LOCAL_STORAGE_KEY) ?? initialValue
        } catch {
            return initialValue
        }
    })

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (initialValue && initialValue !== input) {
            setInput(initialValue)
        }
    }, [initialValue, input])

    useEffect(() => {
        try {
            localStorage.setItem(FMD_CLIENT_QUERY_LOCAL_STORAGE_KEY, input)
        } catch (error) {
            console.error("Failed to save input to localStorage", error)
        }
    }, [input])

    const { createCaseMutate, isPending } = useCreateCaseHandler({})

    const handleSubmit = () => {
        if (!input.trim()) {
            toast.error("Please provide a query.")
            return
        }

        if (!user) {
            navigate(siteLinks.login.link)
            toast.info("Your query will be saved, please login to continue.")
            return
        }

        const previous_conditions = prefs?.previous_conditions?.filter(
            (condition) => condition.trim() !== ""
        ) || []

        const client_preferences = {
            ...prefs,
            previous_conditions
        }

        const formData: Partial<ICase> = {
            client_raw_query: input,
            client_preferences,
        }

        createCaseMutate(formData)
        setInput("")
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className={cn("relative pb-6", className)}>
            <div className="relative rounded-t-[40px] rounded-b-4xl border drop-shadow-xs overflow-hidden bg-white">
                {/* Scrollable Text Area */}
                <div className="px-4 pt-4 pb-20">
                    <Textarea
                        autoFocus
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={cn(
                            "w-full min-h-[70px] max-h-[200px] resize-none border-none outline-none",
                            "text-gray-900 text-base leading-relaxed placeholder-gray-400",
                            "placeholder:italic bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                            "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                        )}
                        placeholder="Tell me, I will help you..."
                    />
                </div>

                {/* Sticky Bottom Section */}
                <ChatTools handleSubmit={handleSubmit} input={input} isPending={isPending} prefs={prefs} setPrefs={setPrefs} />

                {/* Custom Scrollbar Styles */}
                <style>{`
          .scrollbar-thin::-webkit-scrollbar {
            width: 6px;
          }
          .scrollbar-track-gray-100::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 3px;
          }
          .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 3px;
          }
          .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
        `}</style>
            </div>
        </div>
    )
}

export default ChatTextarea
