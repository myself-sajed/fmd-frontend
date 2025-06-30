import type { ICase } from "../types/case-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Stethoscope, Clock, User, MapPin, Mail, Calendar, Languages, GraduationCap, Star, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { IDoctor } from "@/app/authentication/types/doctor-types";

const RenderDoctorCards = ({ caseData }: { caseData: ICase }) => {

    const getSuitabilityColor = (score: number): string => {
        if (score >= 80) return 'bg-green-100 text-green-800';
        if (score >= 70) return 'bg-blue-100 text-blue-800';
        if (score >= 60) return 'bg-yellow-100 text-yellow-800';
        return 'bg-gray-100 text-gray-800';
    };

    const renderDoctorCard = (doctor: IDoctor) => {
        const doctorSummary = caseData.ai_doctor_summary?.[doctor._id];

        return (
            <Card key={doctor._id} className="mb-4 shadow-none rounded-md">
                <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={doctor.user?.photoURL} alt={doctor.user?.name || 'Doctor'} />
                                <AvatarFallback>
                                    {doctor.user?.name?.split(' ').map(n => n[0]).join('') || 'DR'}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-xl text-gray-900">
                                    {doctor.user?.name || 'Unknown Doctor'}
                                </CardTitle>
                                <CardDescription className="flex items-center space-x-2 mt-1">
                                    <Stethoscope className="h-4 w-4" />
                                    <span>{doctor.specialization?.join(', ') || 'General Practice'}</span>
                                </CardDescription>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{doctor.experience || 0} years</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <User className="h-4 w-4" />
                                        <span>{doctor.user?.gender || 'Not specified'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {doctorSummary?.suitability_score && (
                            <Badge className={`${getSuitabilityColor(doctorSummary.suitability_score)} text-xs font-medium`}>
                                <Star className="h-3 w-3 mr-1" />
                                {doctorSummary.suitability_score}% Match
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {doctor.bio || 'No bio available'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div className="text-sm">
                                    <div className="font-medium text-gray-900">
                                        {doctor.location?.address || 'Address not available'}
                                    </div>
                                    <div className="text-gray-600">
                                        {[doctor.location?.city, doctor.location?.state, doctor.location?.country]
                                            .filter(Boolean).join(', ')}
                                        {doctor.location?.pincode && ` - ${doctor.location.pincode}`}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-700">
                                    {doctor.user?.email || 'Email not available'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                                <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div className="text-sm">
                                    <div className="font-medium text-gray-900">Available</div>
                                    <div className="text-gray-600">
                                        {doctor.availability?.days?.join(', ') || 'Schedule not available'}
                                    </div>
                                    {doctor.availability?.from && doctor.availability?.to && (
                                        <div className="text-gray-600">
                                            {doctor.availability.from} - {doctor.availability.to}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Languages className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-700">
                                    {doctor.languages?.join(', ') || 'Languages not specified'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                        <div className="flex items-center space-x-1">
                            <GraduationCap className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Qualifications:</span>
                        </div>
                        {doctor.degree?.map((deg, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                {deg}
                            </Badge>
                        )) || <span className="text-sm text-gray-500">Not specified</span>}
                    </div>

                    {doctorSummary && (
                        <Accordion type="single" collapsible className="mt-4">
                            <AccordionItem value="summary" className="border-t">
                                <AccordionTrigger className="text-sm font-medium py-3">
                                    AI Assessment & Recommendations
                                </AccordionTrigger>
                                <AccordionContent className="space-y-3 pb-4">
                                    <Alert>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription className="text-sm">
                                            <strong>Why this doctor:</strong> {doctorSummary.reason}
                                        </AlertDescription>
                                    </Alert>

                                    <div>
                                        <h5 className="font-medium text-sm mb-2">Recommended next steps:</h5>
                                        <ul className="space-y-1">
                                            {doctorSummary.next_steps?.map((step, index) => (
                                                <li key={index} className="flex items-start space-x-2 text-sm">
                                                    <CheckCircle2 className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-700">{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {doctorSummary.follow_up_recommendation && (
                                        <Alert>
                                            <AlertDescription className="text-sm">
                                                <strong>Follow-up:</strong> {doctorSummary.follow_up_recommendation}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )}
                </CardContent>
            </Card>
        );
    };


    return <div>
        {(caseData?.suggested_doctors ?? []).length > 0 ?
            (caseData.suggested_doctors ?? []).map(renderDoctorCard) :
            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    No doctors have been suggested for this case yet.
                </AlertDescription>
            </Alert>
        }
    </div>
}

export default RenderDoctorCards
