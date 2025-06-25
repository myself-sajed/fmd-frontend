import { Command } from "lucide-react"
import { cn } from "@/lib/utils"
import { ON_PAGE_LOAD_ANIMATION } from "@/types/animation-types"
import SignupForm from "../components/SignupForm"
import AppLogo from "@/app/landing/components/AppLogo"


const Signup = () => {
    return (
        <div className={cn(ON_PAGE_LOAD_ANIMATION, "grid min-h-svh lg:grid-cols-5")}>
            <div className="flex flex-col gap-4 p-6 md:p-10 col-span-2">
                <div className="flex justify-center gap-2 md:justify-start">
                    <AppLogo />
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block w-full col-span-3">
                <div
                    className="absolute inset-0 max-h-[97vh] w-[97%] rounded-md bg-primary my-auto object-cover dark:brightness-[0.2] dark:grayscale flex items-center justify-center "
                >
                    <div className="p-5">
                        <Command className="h-44 w-44 absolute left-0 right-0 top-[15%] mx-auto text-primary-foreground opacity-40" />
                        <p className="text-3xl space-x-2 font-semibold max-w-lg">
                            <span className="text-primary-foreground line-clamp-2">
                                Experience the future of automated Quality Assurance.
                            </span>
                            <i className="text-primary-foreground/60">Start your incredible journey with us.</i>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
