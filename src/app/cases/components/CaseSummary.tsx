import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Brain, Heart, AlertCircle, CheckCircle2, Stethoscope } from "lucide-react"

import type { ICase } from "../types/case-types"

const CaseSummary = ({ caseDetails }: { caseDetails: ICase }) => {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Patient Query Section */}
            <Card className="shadow-none">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                            <CardTitle className="font-semibold text-gray-900">Patient Query</CardTitle>
                            <p className="text-xs text-gray-500 mt-0.5">Initial patient concern and symptoms</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-0 -mt-4">
                    <p className="text-gray-800 text-sm">{caseDetails.client_raw_query || "No query provided"}</p>
                </CardContent>
            </Card>

            {/* AI Analysis Section */}
            <Card className="shadow-none">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Brain className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <CardTitle className="font-semibold text-gray-900">AI Analysis</CardTitle>
                            <p className="text-xs text-gray-500 mt-1">Intelligent assessment and insights</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-0 -mt-4">
                    <p className="text-gray-800 text-sm leading-relaxed">{caseDetails.ai_summary || "No analysis available"}</p>
                </CardContent>
            </Card>

            {/* Care Recommendations Section */}
            <Card className="shadow-none">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Heart className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                            <CardTitle className="font-semibold text-gray-900">Care Recommendations</CardTitle>
                            <p className="text-xs text-gray-500 mt-0.5">Personalized care guidance and next steps</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-0 -mt-4">
                    {caseDetails.tips?.length > 0 ? (
                        <div className="space-y-1">
                            {caseDetails.tips.map((tip: string, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <div className="flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    </div>
                                    <p className="text-gray-800 text-sm leading-relaxed flex-1">{tip}</p>
                                </div>
                            ))}

                            {/* Summary Badge */}
                            <div className="flex justify-center mt-10">
                                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                                    <Stethoscope className="h-3 w-3 mr-1" />
                                    {caseDetails.tips.length} Recommendation{caseDetails.tips.length !== 1 ? "s" : ""}
                                </Badge>
                            </div>
                        </div>
                    ) : (
                        <Alert className="border-amber-200 bg-amber-50">
                            <AlertCircle className="h-4 w-4 text-amber-600" />
                            <AlertDescription className="text-amber-800">
                                No care recommendations are available for this case at this time.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default CaseSummary
