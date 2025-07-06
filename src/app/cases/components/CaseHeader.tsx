import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle, Calendar, RefreshCcw } from 'lucide-react';
import { formatDate, getStatusColor, getUrgencyColor } from '../types/case-utils';
import type { ICase } from '../types/case-types';


type Props = {
    refetch: () => void;
    user: { _id: string } | null;
    caseDetails: ICase;
    isRefetching: boolean;
    isCaseBeingAnalysed: boolean;
    isCaseError: boolean;
    errorMessage?: string | string[];
}

const CaseHeader = ({ refetch, caseDetails, isRefetching, isCaseBeingAnalysed, isCaseError, errorMessage }: Props) => {

    return (
        <div className="mb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className='space-y-2 w-full'>
                    <div className='flex items-end justify-between flex-wrap gap-2 w-full'>
                        <h1 className="text-3xl font-bold">
                            {caseDetails.ai_case_name || 'Medical Case'}
                        </h1>
                        {
                            isCaseBeingAnalysed && <Button disabled={isRefetching} onClick={() => { refetch() }} variant="secondary">
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
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(caseDetails.createdAt)}
                        </Badge>
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
        </div>
    )
}

export default CaseHeader
