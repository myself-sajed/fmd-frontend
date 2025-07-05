import ChatTextarea from '@/app/cases/components/ChatTextarea'
import { titleSetter } from '@/lib/title';
import { cn } from '@/lib/utils';
import { Brain, HeartPulse, Bone, Thermometer } from 'lucide-react';
import { useState } from 'react';

const NewCase = () => {

    titleSetter("Create a case")

    const [commonIssue, setCommonIssue] = useState("")

    return (
        <div className='flex items-center justify-center h-full p-2 sm:p-5'>

            <div className='space-y-15 w-full'>
                <div className='space-y-4'>
                    <p className="transition-all text-center duration-300 text-3xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900">
                        How are you feeling today?
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mx-auto max-w-xl">
                        {commonIssues.map((issue) => (
                            <button
                                onClick={() => {
                                    setCommonIssue(() => issue.text)
                                    setTimeout(() => {
                                        setCommonIssue(() => "")
                                    }, 0)
                                }}
                                key={issue.label}
                                className={cn(
                                    "flex items-center cursor-pointer text-xs sm:text-sm border-1 rounded-full px-5 py-0.5 transition",
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
                <div className="px-0 sm:px-5 pt-2">
                    <ChatTextarea initialValue={commonIssue} className="max-w-4xl mx-auto" />
                    <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-1">
                        Write a detailed query for better results. This will create a new case.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NewCase

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

