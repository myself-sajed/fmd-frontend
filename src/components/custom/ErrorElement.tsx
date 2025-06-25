import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { HeartCrack } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const ErrorElement = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-[85vh] p-4">
            <Alert className="max-w-md mx-auto bg-white border-none h-1/2 flex flex-col items-center">
                <div>
                    <AlertTitle className="text-red-600 flex flex-col text-center items-center justify-center gap-2 font-bold text-xl sm:text-3xl">
                        <HeartCrack size={50} className="text-red-500" />
                        An Error Occurred
                    </AlertTitle>
                    <AlertDescription className="text-gray-600 text-center mt-2 text-xs sm:text-sm">
                        Unknown error occurred. Please try again.
                    </AlertDescription>
                </div>
                <div className="flex items-center justify-center mt-10">
                    <Button onClick={() => navigate(-1)} variant="secondary" className="border">
                        Go Back
                    </Button>
                    <Button onClick={() => window.location.reload()} variant="outline" className="ml-2">
                        Refesh
                    </Button>
                </div>
            </Alert>
        </div>
    );
};

export default ErrorElement;
