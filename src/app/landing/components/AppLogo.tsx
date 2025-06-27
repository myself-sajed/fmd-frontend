import { Link } from 'react-router-dom'
import Logo from './Logo'
import siteLinks from '@/lib/sitelinks'

const AppLogo = () => {
    return (
        <Link to={siteLinks.landing.link} className="text-primary hover:text-primary/90 flex items-center gap-5">
            <Logo />
            <span className="hidden sm:block sm:text-2xl md:text-xl lg:text-2xl">Find My Doctor</span>
        </Link>
    )
}

export default AppLogo
