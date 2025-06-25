import { useEffect, useId, useMemo, useState } from "react"
import { CheckIcon, EyeIcon, EyeOffIcon, Lock, XIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

interface PasswordStrengthInputProps {
    value: string
    onChange: (value: string) => void
    error?: string;
    setIsPasswordStrong: React.Dispatch<React.SetStateAction<boolean>>
}

const PasswordStrengthInput: React.FC<PasswordStrengthInputProps> = ({ value, onChange, error, setIsPasswordStrong }) => {
    const id = useId()
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const toggleVisibility = () => setIsVisible((prevState) => !prevState)

    const requirements = [
        { regex: /.{8,}/, text: "At least 8 characters" },
        { regex: /[0-9]/, text: "At least 1 number" },
        { regex: /[a-z]/, text: "At least 1 lowercase letter" },
        { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ]

    const strength = requirements.map((req) => ({ met: req.regex.test(value), text: req.text }))
    const strengthScore = useMemo(() => strength.filter((req) => req.met).length, [strength])

    const getStrengthColor = (score: number) => {
        if (score === 0) return "bg-border"
        if (score <= 1) return "bg-red-500"
        if (score <= 2) return "bg-orange-500"
        if (score === 3) return "bg-amber-500"
        return "bg-emerald-500"
    }

    const getStrengthText = (score: number) => {
        if (score === 0) return "Enter a password"
        if (score <= 2) return "Weak password"
        if (score === 3) return "Medium password"
        return "Strong password"
    }

    useEffect(() => {
        const isStrong = strength?.filter((req) => !req.met).length === 0
        setIsPasswordStrong(isStrong)
    }, [strength])

    return (
        <div>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                    id={id}
                    className="pe-9 pl-10"
                    placeholder="Password"
                    type={isVisible ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                />
                <button
                    className="text-muted-foreground/80 cursor-pointer hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px]"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={isVisible ? "Hide password" : "Show password"}
                >
                    {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                </button>
            </div>

            <div
                className="bg-border mt-3 h-1 w-full overflow-hidden rounded-full"
                role="progressbar"
                aria-valuenow={strengthScore}
                aria-valuemin={0}
                aria-valuemax={4}
                aria-label="Password strength"
            >
                <div
                    className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                    style={{ width: `${(strengthScore / 4) * 100}%` }}
                />
            </div>

            <p id={`${id}-description`} className="text-foreground mt-2 text-sm font-medium">
                {getStrengthText(strengthScore)}
            </p>

            <ul className="space-y-1.5 mt-1.5" aria-label="Password requirements">
                {strength.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {req.met ? (
                            <CheckIcon size={16} className="text-emerald-500" />
                        ) : (
                            <XIcon size={16} className="text-muted-foreground/80" />
                        )}
                        <span className={req.met ? "text-emerald-600 text-xs" : "text-muted-foreground text-xs"}>
                            {req.text}
                        </span>
                    </li>
                ))}
            </ul>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}


export default PasswordStrengthInput