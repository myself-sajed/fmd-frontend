import { ShieldAlertIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const UnauthorizedError = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-center items-center h-[87vh] p-4 bg-destructive/10 rounded-md">
            <Alert className="max-w-md mx-auto border-none h-1/2 flex flex-col items-center bg-transparent">
                <div>
                    <AlertTitle className="text-red-600 flex flex-col items-center justify-center gap-2 font-bold text-3xl">
                        <ShieldAlertIcon size={50} className="text-red-500" />
                        Access Denied
                    </AlertTitle>
                    <AlertDescription className="text-gray-600 text-center mt-2">
                        You're not authorized to access this page
                    </AlertDescription>
                </div>
                <div className="flex items-center justify-center mt-10">
                    <Button onClick={() => navigate(-1)} variant="secondary" className="border">
                        Go Back
                    </Button>
                </div>
            </Alert>
        </div>
    );
};

export default UnauthorizedError;
