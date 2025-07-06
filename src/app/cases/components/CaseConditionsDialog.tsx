import ShowDialog from "@/components/custom/ShowDialog"
import type { ICaseClientPreferences } from "../types/case-types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

type Props = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    prefs: ICaseClientPreferences | undefined
    setPrefs: React.Dispatch<React.SetStateAction<ICaseClientPreferences | undefined>>
}

const CaseConditionsDialog = ({ open, setOpen, prefs, setPrefs }: Props) => {
    const conditions = prefs?.previous_conditions ?? [""]

    const updateConditions = (newConditions: string[]) => {
        setPrefs((prev) => ({
            ...(prev || {}),
            previous_conditions: newConditions,
        }))
    }

    const handleConditionChange = (value: string, index: number) => {
        const updated = [...conditions]
        updated[index] = value
        updateConditions(updated)
    }

    const addCondition = () => {
        const hasEmpty = conditions.some((cond) => cond.trim() === "")
        if (hasEmpty) {
            toast.info("Please fill in the current condition before adding a new one.")
            return
        }
        updateConditions([...conditions, ""])
    }

    const deleteCondition = (index: number) => {
        const value = conditions[index]

        if (value.trim() !== "") {
            // Clear first
            const updated = [...conditions]
            updated[index] = ""
            updateConditions(updated)
            return
        }

        if (conditions.length === 1) return // Prevent deleting the last input

        const updated = conditions.filter((_, i) => i !== index)
        updateConditions(updated)
    }

    return (
        <ShowDialog
            open={open}
            setOpen={setOpen}
            title="Your past health issues"
            desc="Tell me, what health issues or symptoms you faced in the past."
        >
            <div className="space-y-5 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2">
                    {conditions.map((condition, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <Input
                                autoFocus
                                value={condition}
                                placeholder="Enter here..."
                                onChange={(e) => handleConditionChange(e.target.value, index)}
                                className="flex-1 bg-transparent focus-visible:ring-0 focus-visible:border-gray-300 border-gray-200 rounded-md"
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                onClick={() => deleteCondition(index)}
                            >
                                <Trash2 className="h-4 w-4 hover:text-destructive" />
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={addCondition}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Issue
                    </Button>
                    <Button type="button" onClick={() => setOpen(false)}>
                        Done
                    </Button>
                </div>
            </div>
        </ShowDialog>
    )
}

export default CaseConditionsDialog
