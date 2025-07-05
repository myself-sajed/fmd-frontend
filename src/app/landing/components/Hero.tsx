import ChatTextarea from "../../cases/components/ChatTextarea"

const Hero = () => {
    return (
        <div className="h-full space-y-20">
            <div className="sm:max-w-[96%] relative mx-auto rounded-xl px-2.5 sm:px-5 h-[70vh]">
                <p className="py-1 px-4 top-10 left-0 right-0 absolute bg-primary rounded-full w-fit mx-auto text-xs font-semibold">Trusted by 100+ patients</p>
                <div>
                    <p className="animate duration-300 text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-10 pt-20 text-center font-extrabold h-full">
                        Your Trusted <span className="whitespace-nowrap" >AI-Powered</span>
                    </p>
                    <p className="animate duration-300 text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 text-center font-extrabold h-full">
                        Health Analyser
                    </p>
                </div>
                <div className="mt-20">
                    <ChatTextarea className="sm:max-w-4xl mx-auto" />
                    <p className="text-xs text-muted-foreground text-center">Try to write detailed query for better analysis.</p>
                </div>
            </div>
        </div>
    )
}

export default Hero
