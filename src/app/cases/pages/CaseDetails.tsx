import { useAuthStore } from '@/store/auth-store'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getOneCase } from '../api/case-api'
import Loading from '@/components/custom/Loading'
import ErrorState from '@/components/custom/ErrorState'
import { shouldShowError, shouldShowLoading } from '../types/case-utils'
import RenderDoctorCards from '../components/RenderDoctorCards'
import CaseSummary from '../components/CaseSummary'
import { Separator } from '@/components/ui/separator'
import type { ICase } from '../types/case-types'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Button } from '@/components/ui/button'
import siteLinks from '@/lib/sitelinks'
import { useEffect, useRef } from 'react'
import CaseHeader from '../components/CaseHeader'
import { ChevronLeft } from 'lucide-react'


const CaseDetails = () => {

    const queryClient = useQueryClient();
    const { user } = useAuthStore()
    const { caseId } = useParams()

    const hasInvalidatedOnce = useRef(false)
    const prevIsBeingAnalysed = useRef(false)

    const {
        data: caseDetails,
        isLoading,
        isError,
        refetch,
        isRefetching,
    } = useQuery({
        queryKey: ["GET_ONE_CASE", caseId],
        queryFn: () => getOneCase(caseId!).then((res) => res?.data?.data as ICase),
        enabled: !!user && !!caseId,
        refetchOnWindowFocus: false,
    })

    const { isCaseError, errorMessage } = shouldShowError((caseDetails || {}) as ICase)
    const { isCaseBeingAnalysed, loadingMessage } = shouldShowLoading((caseDetails || {}) as ICase)

    // Auto refresh when being analysed
    useEffect(() => {
        if (!isCaseBeingAnalysed) return
        const interval = setInterval(() => {
            refetch()
        }, 6000)
        return () => clearInterval(interval)
    }, [isCaseBeingAnalysed, refetch])

    // One-time invalidation when analysis is complete
    useEffect(() => {
        // if it was being analysed previously and now it's not
        if (
            prevIsBeingAnalysed.current &&
            !isCaseBeingAnalysed &&
            !hasInvalidatedOnce.current
        ) {
            hasInvalidatedOnce.current = true
            queryClient.invalidateQueries({
                queryKey: ["GET_ALL_TICKETS", user?._id],
            })
        }

        // always update the previous state
        prevIsBeingAnalysed.current = isCaseBeingAnalysed
    }, [isCaseBeingAnalysed, queryClient, user?._id])

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
                                    <CaseHeader caseDetails={caseDetails} isCaseBeingAnalysed={isCaseBeingAnalysed} isCaseError={isCaseError} isRefetching={isRefetching} refetch={refetch} user={user} errorMessage={errorMessage} />


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
