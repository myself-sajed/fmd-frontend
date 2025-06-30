import { useAuthStore } from '@/store/auth-store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getOneCase } from '../api/case-api'
import Loading from '@/components/custom/Loading'
import ErrorState from '@/components/custom/ErrorState'
import { Badge } from '@/components/ui/badge'
import { Clock3 } from 'lucide-react'
import { formatDate, getStatusColor, getUrgencyColor } from '../types/case-utils'
import RenderDoctorCards from '../components/RenderDoctorCards'
import CaseSummary from '../components/CaseSummary'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'


const CaseDetails = () => {

    const { user } = useAuthStore()
    const { caseId } = useParams()
    const { data: caseDetails, isLoading, isError } = useQuery({
        queryKey: ["GET_ONE_CASE", caseId],
        queryFn: () => getOneCase(caseId!).then((res) => res?.data?.data),
        enabled: !!user && !!caseId,
        refetchOnWindowFocus: false
    })

    return (
        <div>
            <div className="p-5">
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
                                            <div className='space-y-2'>
                                                <h1 className="text-3xl font-bold">
                                                    {caseDetails.ai_case_name || 'Medical Case'}
                                                </h1>
                                                <div className="flex items-center space-x-2">
                                                    <Badge className={cn('font-semibold text-xs', getUrgencyColor(caseDetails.urgency_level))} variant="secondary">
                                                        {caseDetails.urgency_level || 'UNKNOWN'} priority
                                                    </Badge>
                                                    <Badge className={cn('font-semibold text-xs', getStatusColor(caseDetails.status))} variant="secondary">
                                                        {caseDetails.status || 'PENDING'}
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
                                        <div>
                                            <CaseSummary caseDetails={caseDetails} />
                                        </div>

                                        <div>
                                            <RenderDoctorCards caseData={caseDetails} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                }
            </div>
            {/* Footer */}
            <div className="text-center py-6">
                <Separator className="mb-4" />
                <p className="text-xs text-gray-500">
                    This summary is generated for informational purposes. Always consult with healthcare professionals for medical
                    decisions.
                </p>
            </div>
        </div>
    )
}

export default CaseDetails
