import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Mail } from 'lucide-react'
import AuthLayout from './AuthLayout'
import useLoginHandler from '../hooks/use-login-handler'
import { PasswordInput } from '@/components/custom/PasswordInput'


const LoginForm = () => {

    const {
        formData,
        isPending,
        handleChange,
        handleLogin,
    } = useLoginHandler()

    return (
        <AuthLayout>
            <form onSubmit={handleLogin} className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            placeholder="m@example.com"
                            className="pl-10"
                            onChange={(e) => handleChange("name", e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto text-xs underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <PasswordInput
                            id="password"
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            required
                            className="pl-10"
                        />
                    </div>
                </div>
                <Button isLoading={isPending} loadingText='Loggin in...' type="submit" className="w-full">
                    Login
                </Button>
            </form>
        </AuthLayout>
    )
}


export default LoginForm