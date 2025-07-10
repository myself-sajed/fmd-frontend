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
        text: "I've been having a constant headache since this morning. The pain is mostly around my temples and behind my eyes. It's affecting my focus and making me feel tired. No painkillers seem to be helping so far.",
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
        text: "I'm experiencing a high fever with body aches and chills. The fever started last night and has persisted throughout the day. I've also been sweating a lot and feeling fatigued. Even after taking medicine, my temperature hasn't come down much.",
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
        text: "I've been feeling a sharp pain in my chest for the past few hours. It usually gets worse when I take deep breaths or move suddenly. I also feel slightly short of breath at times. It's making me anxious and uncomfortable.",
        classes: {
            bgColor: "bg-yellow-50",
            textColor: "text-yellow-700",
            borderColor: "border-yellow-200",
            hoverColor: "hover:bg-yellow-100",
        },
    },
    {
        label: "Back Pain",
        Icon: Bone,
        text: "My lower back has been hurting consistently for the last few days. It gets worse after sitting or standing for a long time. Sometimes the pain radiates down my legs slightly. Stretching doesn't seem to help much anymore.",
        classes: {
            bgColor: "bg-teal-50",
            textColor: "text-teal-700",
            borderColor: "border-teal-200",
            hoverColor: "hover:bg-teal-100",
        },
    },
];


