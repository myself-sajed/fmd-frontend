import { useAuthStore } from '@/store/auth-store'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getOneCase } from '../api/case-api'
import Loading from '@/components/custom/Loading'
import ErrorState from '@/components/custom/ErrorState'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, ChevronLeft, Clock3, RefreshCcw } from 'lucide-react'
import { formatDate, getStatusColor, getUrgencyColor, shouldShowError, shouldShowLoading } from '../types/case-utils'
import RenderDoctorCards from '../components/RenderDoctorCards'
import CaseSummary from '../components/CaseSummary'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import type { ICase } from '../types/case-types'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Button } from '@/components/ui/button'
import siteLinks from '@/lib/sitelinks'


const CaseDetails = () => {

    const queryClient = useQueryClient();

    const { user } = useAuthStore()
    const { caseId } = useParams()
    const { data: caseDetails, isLoading, isError, refetch, isRefetching } = useQuery({
        queryKey: ["GET_ONE_CASE", caseId],
        queryFn: () => getOneCase(caseId!).then((res) => res?.data?.data as ICase),
        enabled: !!user && !!caseId,
        refetchOnWindowFocus: false
    })

    const { isCaseError, errorMessage } = shouldShowError((caseDetails || {}) as ICase)
    const { isCaseBeingAnalysed, loadingMessage } = shouldShowLoading((caseDetails || {}) as ICase)


    const handleRefetch = () => {
        refetch();
        queryClient.invalidateQueries({
            queryKey: ["GET_ALL_TICKETS", user?._id],
        });
    }

    return (
        <div>
            <div className="p-5">
                {
                    isLoading
                        ? <Loading className='mt-10' title='Fetching case details' />
                        : isError
                            ? <div className='mt-10 flex items-center flex-col gap-10'>
                                <ErrorState title='Failed to fetch case details' />
                                <Link to={siteLinks.cases.link}>
                                    <Button variant="outline"> <ChevronLeft className='opacity-50 w-4 h-4' /> Go back</Button>
                                </Link>
                            </div>
                            : caseDetails
                            && <div>
                                <div className="max-w-7xl mx-auto animate-fade-up">
                                    {/* Header */}
                                    <div className="mb-3">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                            <div className='space-y-2 w-full'>
                                                <div className='flex items-end justify-between gap-2 w-full'>
                                                    <h1 className="text-3xl font-bold">
                                                        {caseDetails.ai_case_name || 'Medical Case'}
                                                    </h1>
                                                    {
                                                        isCaseBeingAnalysed && <Button disabled={isRefetching} onClick={handleRefetch} variant="secondary">
                                                            <RefreshCcw className={
                                                                cn('w-4 h-4 mr-2 opacity-50', isRefetching && "animate-spin")
                                                            } />
                                                            {isRefetching ? 'Refreshing...' : 'Refresh Case'}
                                                        </Button>
                                                    }
                                                </div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {
                                                        !(isCaseError || isCaseBeingAnalysed)
                                                        && <Badge className={cn('font-semibold text-xs', getUrgencyColor(caseDetails.urgency_level))} variant="secondary">
                                                            {caseDetails.urgency_level || 'Unknown'} priority
                                                        </Badge>
                                                    }

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

                                    {
                                        (isCaseError || isCaseBeingAnalysed)
                                        && <p className="text-sm text-gray-500 pb-2 border-b">{caseDetails.client_raw_query || "No query provided"}</p>
                                    }

                                    {
                                        (isCaseError && errorMessage)
                                        && <div className='bg-red-50 mt-5 flex items-center gap-2 border border-red-200 text-red-800 py-2 px-4 rounded-md mb-6 text-sm'>
                                            <AlertCircle className='mr-2 w-4 h-4' /><span>{errorMessage}</span>
                                        </div>
                                    }



                                    {isCaseBeingAnalysed
                                        ? <div className='animate-fade'>
                                            <div className="p-5">
                                                <DotLottieReact
                                                    src="/assets/caseloading.lottie"
                                                    loop
                                                    autoplay
                                                />
                                                <p className="text-center my-5">
                                                    {loadingMessage}...
                                                </p>
                                            </div>
                                        </div>
                                        : <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up">

                                            {
                                                !isCaseError && <>
                                                    <div>
                                                        <CaseSummary caseDetails={caseDetails} />
                                                    </div>

                                                    <div>
                                                        <RenderDoctorCards caseData={caseDetails} />
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    }
                                </div>
                                {
                                    !isCaseError && <div className="text-center py-6">
                                        <Separator className="mb-4" />
                                        <p className="text-xs text-gray-500">
                                            This summary is generated for informational purposes. Always consult with healthcare professionals for medical
                                            decisions.
                                        </p>
                                    </div>
                                }
                            </div>
                }
            </div>

        </div>
    )
}

export default CaseDetails
