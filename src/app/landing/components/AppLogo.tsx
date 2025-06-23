import Logo from './Logo'

const AppLogo = () => {
    return (
        <a href="#" className="text-primary hover:text-primary/90 flex items-center gap-5">
            <Logo />
            <span className="hidden sm:block sm:text-2xl md:text-xl lg:text-2xl">Find My Doctor</span>
        </a>
    )
}

export default AppLogo
