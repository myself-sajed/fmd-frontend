import { cn } from '@/lib/utils'
import { User, UserPlus } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import siteLinks from '@/lib/sitelinks'

type Props = {
    className?: string;
    children: ReactNode
}

const AuthLayout = ({ className, children }: Props) => {

    const isReg = useLocation().pathname.includes("sign-up")


    return (
        <div className={cn("flex flex-col gap-6 -mt-10", className)}>
            <div className='flex items-center justify-center border-t rounded-full h-24 w-24 mx-auto'>
                <div className='rounded-full border drop-shadow-xs p-3 h-15 w-15 flex items-center justify-center'>

                    {
                        isReg
                            ? <UserPlus size={30} />
                            : <User size={30} />
                    }
                </div>
            </div>
            <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                    {
                        isReg
                            ? "Create a new account"
                            : "Login to your account"
                    }
                </h1>
                <p className="text-balance text-sm text-muted-foreground">
                    {
                        isReg
                            ? "Provide your following details"
                            : "Enter your credentials to login"
                    }
                </p>
            </div>
            {
                children
            }
            {
                !isReg
                    ? <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to={siteLinks.signup.link} className="underline underline-offset-4">
                            Sign up
                        </Link>
                    </div>
                    : <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to={siteLinks.login.link} className="underline underline-offset-4">
                            Log in
                        </Link>
                    </div>
            }
        </div>
    )
}


export default AuthLayout