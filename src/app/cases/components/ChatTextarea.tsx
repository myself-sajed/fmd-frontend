import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Mic } from "lucide-react";

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




    return (
        <div className="relative max-w-6xl sm:max-w-4xl mx-auto">
            <Textarea
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell me, are you feeling alright today?"
                className="placeholder:text-gray-700 text-gray-900 placeholder:italic placeholder:tracking-wide tracking-wide placeholder:text-sm placeholder:sm:text-base text-sm md:text-base 
        bg-primary/10 border-primary border-2 focus-visible:border-4 sm:rounded-[45px] rounded-4xl px-5 py-3 sm:px-7 sm:py-5 min-h-36 hover:border-4 outline-none focus-visible:ring-0 ring-0 resize-none overflow-hidden transition-all duration-300 ease-in-out"
            />

            <div className="bottom-4 right-8 absolute flex items-center gap-3">
                <Button
                    type="button"
                    className="cursor-pointer rounded-full p-3 h-10 w-10 border-none hover:bg-primary hover:text-primary-foreground"
                    variant="outline"
                    size="sm"
                >
                    <Mic />
                </Button>
                <Button
                    type="submit"
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
