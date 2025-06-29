import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Mic } from "lucide-react";
import useCreateCaseHandler from "../hooks/useCreateCaseHandler";
import type { ICase } from "../types/case-types";
import { toast } from "sonner";

interface ChatTextareaProps {
    initialValue?: string;
}

const LOCAL_STORAGE_KEY = "FMD_CLIENT_QUERY";

const ChatTextarea: React.FC<ChatTextareaProps> = ({ initialValue = "" }) => {
    const [input, setInput] = useState<string>(() => {
        try {
            return localStorage.getItem(LOCAL_STORAGE_KEY) ?? initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, input);
        } catch (error) {
            console.error("Failed to save input to localStorage", error);
        }
    }, [input]);

    const { createCaseMutate, isPending } = useCreateCaseHandler()


    const handleSubmit = () => {
        if (!input) {
            toast.error("Please provide a query.")
        }

        const formData: Partial<ICase> = {
            client_raw_query: input,
            client_preferences: {
                language: "English"
            }
        }

        createCaseMutate(formData)
        setInput("")

    }


    return (
        <div className="relative max-w-6xl sm:max-w-4xl mx-auto">
            <Textarea
                disabled={isPending}
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell me, are you feeling alright today?"
                className="placeholder:text-gray-700 text-gray-900 placeholder:italic placeholder:tracking-wide tracking-wide placeholder:text-sm placeholder:sm:text-base text-sm md:text-base 
        bg-primary/10 border-primary border-2 sm:rounded-[45px] rounded-4xl px-5 py-3 sm:px-7 sm:py-5 min-h-36 outline-none focus-visible:ring-0 ring-0 resize-none overflow-hidden transition-all duration-300 ease-in-out"
            />

            <div className="bottom-4 right-8 absolute flex items-center gap-3">
                <Button
                    type="button"
                    className="cursor-pointer rounded-full p-3 h-10 w-10 border-none hover:bg-primary hover:text-primary-foreground"
                    variant="outline"
                    size="sm"
                    disabled={!input || isPending}
                >
                    <Mic />
                </Button>
                <Button
                    isLoading={isPending}
                    type="submit"
                    disabled={!input || isPending}
                    onClick={handleSubmit}
                    className="cursor-pointer rounded-full p-3 h-10 w-10 border-none hover:bg-primary hover:text-primary-foreground"
                    variant="outline"
                    size="sm"
                >
                    <ArrowUp />
                </Button>
            </div>
        </div>
    );
};

export default ChatTextarea;
