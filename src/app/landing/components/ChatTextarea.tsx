import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUp, Mic } from "lucide-react"

const ChatTextarea = () => {
    return (
        <div className="relative max-w-6xl sm:max-w-4xl mx-auto">
            <Textarea
                autoFocus
                placeholder="Tell me, are you feeling alright today?"
                className="placeholder:text-gray-700 text-gray-900 placeholder:italic placeholder:tracking-wide tracking-wide placeholder:text-sm placeholder:sm:text-base text-sm md:text-base 
                bg-primary/10 border-primary border-2 focus-visible:border-4 sm:rounded-[45px] rounded-4xl px-5 py-3 sm:px-7 sm:py-5 min-h-36 hover:border-4 outline-none focus-visible:ring-0 ring-0 resize-none overflow-hidden transition-all duration-300 ease-in-out"
            />

            <div className="bottom-4 right-8 absolute flex items-center gap-3">
                <Button className="cursor-pointer rounded-full p-3 h-10 w-10 border-none hover:bg-primary hover:text-primary-foreground" variant="outline" size="sm"><Mic /></Button>
                <Button className="cursor-pointer rounded-full p-3 h-10 w-10 border-none hover:bg-primary hover:text-primary-foreground" variant="outline" size="sm"><ArrowUp /></Button>
            </div>
        </div>
    )
}

export default ChatTextarea
