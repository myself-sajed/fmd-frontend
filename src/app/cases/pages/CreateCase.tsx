import ChatTextarea from '@/app/landing/components/ChatTextarea'
import { titleSetter } from '@/lib/title';
import { cn } from '@/lib/utils';
import { Brain, HeartPulse, Bone, Thermometer } from 'lucide-react';

const CreateCase = () => {

    titleSetter("Create a case")

    return (
        <div className="p-2 sm:p-5 h-full my-auto flex-1 overflow-hidden relative">
            {/* Scrollable content area */}
            <div className="overflow-y-auto h-full pb-40">
                <div className="flex flex-col gap-5 justify-center items-center h-full text-center">
                    <p className="transition-all duration-300 text-3xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold">
                        How are you feeling today?
                    </p>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-2 justify-center max-w-xl">
                        {commonIssues.map((issue) => (
                            <button
                                key={issue.label}
                                className={cn(
                                    "flex items-center cursor-pointer text-sm border-1 rounded-full px-5 py-0.5 transition",
                                    issue.classes.bgColor,
                                    issue.classes.textColor,
                                    issue.classes.hoverColor,
                                    issue.classes.borderColor,
                                )}
                            >
                                {<issue.Icon className='h-3 w-3 mr-2 opacity-80' />}
                                {issue.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Chat Box */}
            <div className="sticky bottom-0 bg-white z-10 px-2 sm:px-5 pt-2">
                <ChatTextarea />
                <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-1">
                    Write a detailed query for better results. This will create a new case.
                </p>
            </div>
        </div>
    )
}

export default CreateCase

const commonIssues = [
    {
        label: "Headache",
        Icon: Brain,
        text: "I'm having a headache",
        classes: {
            bgColor: "bg-blue-50",
            textColor: "text-blue-700",
            borderColor: "border-blue-200",
            hoverColor: "hover:bg-blue-100",
        },
    },
    {
        label: "Fever",
        Icon: Thermometer,
        text: "I'm running a fever",
        classes: {
            bgColor: "bg-violet-50",
            textColor: "text-violet-700",
            borderColor: "border-violet-200",
            hoverColor: "hover:bg-violet-100",
        },
    },
    {
        label: "Chest Pain",
        Icon: HeartPulse,
        text: "I'm experiencing chest pain",
        classes: {
            bgColor: "bg-yellow-50",
            textColor: "text-yellow-700",
            borderColor: "border-yellow-200",
            hoverColor: "hover:bg-yellow-100",
        },
    },
    {
        label: "Back pain",
        Icon: Bone,
        text: "I'm having major back pain lately",
        classes: {
            bgColor: "bg-teal-50",
            textColor: "text-teal-700",
            borderColor: "border-teal-200",
            hoverColor: "hover:bg-teal-100",
        },
    },
];

