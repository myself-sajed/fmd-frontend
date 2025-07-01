import { cn } from "@/lib/utils"
import { ON_PAGE_LOAD_ANIMATION } from "@/types/animation-types"
import SignupForm from "../components/SignupForm"
import AppLogo from "@/app/landing/components/AppLogo"


const Signup = () => {
    return (
        <div className={cn(ON_PAGE_LOAD_ANIMATION, "grid min-h-svh")}>
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

        </div>
    )
}

export default Signup
