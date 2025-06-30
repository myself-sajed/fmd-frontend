import { useAuthStore } from '@/store/auth-store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getOneCase } from '../api/case-api'
import Loading from '@/components/custom/Loading'
import ErrorState from '@/components/custom/ErrorState'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Clock3 } from 'lucide-react'
import { formatDate, getStatusColor, getUrgencyColor } from '../types/case-utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert'
import RenderDoctorCards from '../components/RenderDoctorCards'


const CaseDetails = () => {

    const { user } = useAuthStore()
    const { caseId } = useParams()
    const { data: caseDetails, isLoading, isError } = useQuery({
        queryKey: ["GET_ONE_CASE", caseId],
        queryFn: () => getOneCase(caseId!).then((res) => res?.data?.data),
        enabled: !!user && !!caseId,
        refetchOnWindowFocus: false
    })

    console.log(caseDetails)

    return (
        <div>
            <div className="mt-5 p-5">
                {
                    isLoading
                        ? <Loading className='mt-10' title='Fetching case details' />
                        : isError
                            ? <ErrorState className='mt-10' title='Failed to fetch case details' />
                            : caseDetails
                            && <div>
                                <div className="max-w-7xl mx-auto">
                                    {/* Header */}
                                    <div className="mb-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                            <div className='space-y-4'>
                                                <div>
                                                    <h1 className="text-3xl font-bold">
                                                        {caseDetails.ai_case_name || 'Medical Case'}
                                                    </h1>
                                                    <p className='text-muted-foreground text-sm'>{caseDetails.client_raw_query}</p>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <Badge className='font-semibold text-xs' variant={getUrgencyColor(caseDetails.urgency_level)}>
                                                        {caseDetails.urgency_level?.toUpperCase() || 'UNKNOWN'} Priority
                                                    </Badge>
                                                    <Badge className='font-semibold text-xs' variant={getStatusColor(caseDetails.status)}>
                                                        {caseDetails.status?.toUpperCase() || 'PENDING'}
                                                    </Badge>
                                                    <Badge variant="secondary" className="flex items-center text-xs text-gray-600">
                                                        <Clock3 className="h-4 w-4 mr-1" />
                                                        Created {formatDate(caseDetails.createdAt)}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className='space-y-6'>
                                            <Card className='shadow-none rounded-md'>
                                                <CardHeader>
                                                    <CardTitle className="text-lg">Patient Query</CardTitle>
                                                </CardHeader>
                                                <CardContent className='-mt-5'>
                                                    <p className="text-gray-700 leading-relaxed text-sm">
                                                        {caseDetails.client_raw_query || 'No query provided'}
                                                    </p>
                                                </CardContent>
                                            </Card>

                                            <Card className='shadow-none rounded-md'>
                                                <CardHeader>
                                                    <CardTitle className="text-lg">AI Analysis</CardTitle>
                                                </CardHeader>
                                                <CardContent className='-mt-5'>
                                                    <p className="text-gray-700 leading-relaxed text-sm">
                                                        {caseDetails.ai_summary || 'No analysis available'}
                                                    </p>
                                                </CardContent>
                                            </Card>

                                            <Card className='shadow-none rounded-md'>
                                                <CardHeader>
                                                    <CardTitle className="text-lg">Care Recommendations</CardTitle>
                                                </CardHeader>
                                                <CardContent className='-mt-5 space-y-1'>
                                                    {caseDetails.tips?.length > 0 ? (
                                                        caseDetails.tips.map((tip: string, index: number) => (
                                                            <p key={index} className="text-sm">- {tip}</p>
                                                        ))
                                                    ) : (
                                                        <Alert>
                                                            <AlertCircle className="h-4 w-4" />
                                                            <AlertDescription>
                                                                No care tips are available for this case.
                                                            </AlertDescription>
                                                        </Alert>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <div>
                                            <RenderDoctorCards caseData={caseDetails} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                }
            </div>
        </div>
    )
}

export default CaseDetails
