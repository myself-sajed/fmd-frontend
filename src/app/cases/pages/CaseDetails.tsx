import { useAuthStore } from '@/store/auth-store'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getOneCase } from '../api/case-api'
import Loading from '@/components/custom/Loading'
import ErrorState from '@/components/custom/ErrorState'

const CaseDetails = () => {

    const { user } = useAuthStore()
    const { caseId } = useParams()
    const { data: caseDetails, isLoading, isError } = useQuery({
        queryKey: ["GET_ONE_CASE", caseId],
        queryFn: () => getOneCase(caseId!).then((res) => res?.data?.data),
        enabled: !!user && !!caseId
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
                                case details {caseId}
                            </div>
                }
            </div>
        </div>
    )
}

export default CaseDetails
