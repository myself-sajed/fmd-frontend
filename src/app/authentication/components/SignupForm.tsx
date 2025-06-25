import { Label } from "@/components/ui/label"
import AuthLayout from "./AuthLayout"
import { LetterText, Lock, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useSignupHandler from "../hooks/use-signup-handler"
import { PasswordInput } from "@/components/custom/PasswordInput"
import PasswordStrengthInput from "@/components/custom/PasswordStrengthInput"

const SignupForm = () => {

    const {
        formData, setStep, step,
        handleChange, handleStep1Next, handleFinalSubmit,
        setIsPasswordStrong, isPending
    } = useSignupHandler()

    return (
        <div>
            <AuthLayout>
                <div>
                    {step === 1 && (
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <div className="relative">
                                    <LetterText className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        className="pl-10"
                                        value={formData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="pl-10"
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <Button type="button" onClick={handleStep1Next} className="w-full">
                                Continue
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="create-password">Create Password</Label>
                                <div className="relative">
                                    <PasswordStrengthInput
                                        value={formData.password}
                                        setIsPasswordStrong={setIsPasswordStrong}
                                        onChange={(val) => handleChange("password", val)}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password">Password, Again</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <PasswordInput
                                        id="confirm-password"
                                        placeholder="Re-enter your password"
                                        value={formData.cPassword}
                                        onChange={(e) => handleChange("cPassword", e.target.value)}
                                        required
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isPending}
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </Button>
                                <Button
                                    className="flex-1"
                                    type="button"
                                    isLoading={isPending}
                                    loadingText="Creating account..."
                                    onClick={handleFinalSubmit}
                                    disabled={isPending}
                                >
                                    Create Account
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </AuthLayout>
        </div>
    )
}

export default SignupForm