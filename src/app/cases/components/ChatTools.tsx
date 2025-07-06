import React, { useState } from 'react'
import { LANGUAGES, type ICaseClientPreferences } from '../types/case-types'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import { PersonStanding, ArrowUp, Languages, VenusAndMars, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CaseConditionsDialog from './CaseConditionsDialog'
import { toast } from 'sonner'

type Props = {
    setPrefs: React.Dispatch<React.SetStateAction<ICaseClientPreferences | undefined>>
    prefs: ICaseClientPreferences | undefined
    isPending: boolean
    input: string
    handleSubmit: () => void
}

const ChatTools = ({ setPrefs, isPending, handleSubmit, input, prefs }: Props) => {
    const [open, setOpen] = useState(false)

    const handleChange = (dataKey: string, value: string) => {
        setPrefs((prev) => ({
            ...prev,
            [dataKey]: value === 'null' ? null : value
        }))
    }

    const handleClearIssues = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setPrefs((prev) => ({
            ...prev,
            previous_conditions: [""]
        }))
        toast.success("Previous conditions / issues cleared.")
    }

    const hasPrevConditions = prefs?.previous_conditions?.length &&
        prefs.previous_conditions.some(condition => condition.trim() !== "")

    return (
        <div className="absolute bottom-0 left-0 right-0 border-gray-200/60 px-4 py-3 border-t bg-gray-50/30 z-10">
            <div className="flex items-center gap-1">
                {/* Input box for conditions */}
                <div className='flex-1 flex items-center gap-0.5'>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(true)}
                        className='flex items-center justify-between rounded-full'>
                        <div className='flex items-center gap-2'>
                            {!hasPrevConditions && <PersonStanding className="text-muted-foreground w-4 h-4" />}
                            {!hasPrevConditions && <span className='text-sm font-normal sm:inline hidden text-muted-foreground'>Add past health issues</span>}
                            {hasPrevConditions && <span className='text-sm font-normal text-muted-foreground'>Issues</span>}
                        </div>
                    </Button>
                    {
                        hasPrevConditions
                            ? <Button className='rounded-full' variant="outline" onClick={handleClearIssues}>
                                <X
                                    className="cursor-pointer z-30 hover:text-black text-muted-foreground w-4 h-4"
                                />
                            </Button>
                            : null
                    }
                </div>

                {/* Gender Select - responsive icon */}
                <Select
                    onValueChange={(value) => handleChange("gender_preference", value)}
                >
                    <SelectTrigger className="w-auto h-10 px-3 flex items-center gap-2 rounded-full border cursor-pointer">
                        <VenusAndMars className="w-4 h-4" />
                        <span className="hidden sm:inline text-sm">{prefs?.gender_preference || "Gender"}</span>
                    </SelectTrigger>
                    <SelectContent className="animate-in fade-in zoom-in-95">
                        <SelectGroup>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Anyone">Anyone</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Language Select - responsive icon */}
                <Select
                    onValueChange={(value) =>
                        setPrefs((prev) => ({ ...prev, language: value }))
                    }
                >
                    <SelectTrigger className="w-auto h-10 px-3 flex items-center gap-2 rounded-full border cursor-pointer">
                        <Languages className="w-4 h-4" />
                        <span className="hidden sm:inline text-sm">{prefs?.language || "Language"}</span>
                    </SelectTrigger>
                    <SelectContent className="animate-in fade-in zoom-in-95">
                        <SelectGroup>
                            {LANGUAGES.map((lang) => (
                                <SelectItem key={lang} value={lang}>
                                    {lang}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Submit button */}
                <Button
                    isLoading={isPending}
                    type="submit"
                    disabled={!input || isPending}
                    onClick={handleSubmit}
                    className="cursor-pointer rounded-full p-3 h-9 w-9 border border-primary"
                    variant="default"
                    size="sm"
                >
                    <ArrowUp />
                </Button>
            </div>

            {/* Conditions Modal Dialog */}
            <CaseConditionsDialog
                open={open}
                setOpen={setOpen}
                prefs={prefs}
                setPrefs={setPrefs}
            />
        </div>
    )
}

export default ChatTools
