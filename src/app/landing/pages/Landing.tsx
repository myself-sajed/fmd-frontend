import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

const Landing = () => {
    return (
        <div>
            <div className="relative h-full w-full">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,theme(colors.white)_50%,theme(colors.primary.DEFAULT)_100%)]" >
                </div>
                <div className="max-h-screen min-h-screen">
                    <Navbar />
                    <Hero />
                </div>
            </div>
        </div>

    )
}

export default Landing
