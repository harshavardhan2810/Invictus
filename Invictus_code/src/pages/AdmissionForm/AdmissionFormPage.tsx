import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, FileText, Info, Loader2, Phone } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { Link } from 'react-router'

import { submitAdmissionApplication } from '@/api/admissions'
import { getApiErrorMessage } from '@/api/errors'
import { images } from '@/assets/images'
import { Container } from '@/components/common/Container'
import { PageBanner } from '@/components/common/PageBanner'
import { FormField, FormSection } from '@/components/forms/FormField'
import { getFieldProps } from '@/components/forms/getFieldProps'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NativeSelect } from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'
import { importantDates, requiredDocuments } from '@/data/admissions'
import { indianStatesAndUnionTerritories } from '@/data/indianStates'
import { siteConfig } from '@/data/site'
import { isApiConfigured } from '@/lib/axios'
import { formatIndianDate } from '@/lib/format'
import {
  admissionFormDefaults,
  admissionFormSchema,
  boardOptions,
  classOptions,
  genderOptions,
  isSeniorSecondaryClass,
  relationshipOptions,
  streamOptions,
  type AdmissionFormValues,
} from './admissionFormSchema'

interface Submission {
  referenceId: string
  isStoredLocally: boolean
}

const lastDateToApply = importantDates.find((importantDate) => importantDate.label === 'Last date to apply')

export function AdmissionFormPage() {
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const pageTopRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionFormSchema),
    defaultValues: admissionFormDefaults,
  })

  const isSeniorSecondary = isSeniorSecondaryClass(useWatch({ control, name: 'classApplying' }))

  useEffect(() => {
    if (submission) pageTopRef.current?.scrollIntoView()
  }, [submission])

  async function handleValidSubmit(values: AdmissionFormValues) {
    setSubmitError(null)
    const { declaration: _declaration, ...application } = values
    const payload = { ...application, stream: isSeniorSecondary ? application.stream : undefined }

    try {
      const savedApplication = await submitAdmissionApplication(payload)
      setSubmission({ referenceId: savedApplication.referenceId, isStoredLocally: !isApiConfigured })
    } catch (error) {
      setSubmitError(getApiErrorMessage(error))
    }
  }

  function startNewApplication() {
    reset(admissionFormDefaults)
    setSubmission(null)
  }

  return (
    <>
      <PageBanner
        title="Online Admission Form"
        description={`Apply for admission to Invictus for the academic year ${siteConfig.academicYear}. Fields marked * are mandatory.`}
        breadcrumbs={[{ label: 'Admissions', href: '/admissions' }, { label: 'Apply Online' }]}
        image={images.heroHeritage}
      />

      <div ref={pageTopRef} className="scroll-mt-20">
        <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {submission ? (
              <div role="status" className="rounded-lg border border-success/30 bg-success-subtle p-8 text-center sm:p-12">
                <CheckCircle2 aria-hidden className="mx-auto size-16 text-success" />
                <h2 className="mt-5 font-display text-2xl font-bold text-primary-900">
                  Application submitted successfully
                </h2>
                <p className="mt-3 text-lg">
                  Application reference number:{' '}
                  <strong className="font-display text-accent">{submission.referenceId}</strong>
                </p>
                <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                  Please note this number for future reference. Our admissions team will call you within two working
                  days to schedule the entrance test.
                </p>
                {submission.isStoredLocally && (
                  <p className="mx-auto mt-6 flex max-w-md items-start gap-2 rounded-md bg-background p-3 text-left text-sm text-muted-foreground">
                    <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
                    Demo mode: the application is saved in this browser’s local storage and appears in the admin
                    panel on this device only. Connect a backend (VITE_API_BASE_URL) to receive applications centrally.
                  </p>
                )}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button type="button" variant="outline" size="lg" onClick={startNewApplication}>
                    Submit another application
                  </Button>
                  <Button asChild size="lg">
                    <Link to="/">Back to home</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit(handleValidSubmit)} className="space-y-6">
                <FormSection title="1. Student details">
                  <FormField
                    label="Student’s full name"
                    fieldId="studentName"
                    error={errors.studentName?.message}
                    hint="As per birth certificate / previous school records"
                    isRequired
                    className="sm:col-span-2"
                  >
                    <Input autoComplete="name" {...getFieldProps('studentName', errors.studentName?.message)} {...register('studentName')} />
                  </FormField>

                  <FormField label="Date of birth" fieldId="dateOfBirth" error={errors.dateOfBirth?.message} isRequired>
                    <Input type="date" {...getFieldProps('dateOfBirth', errors.dateOfBirth?.message)} {...register('dateOfBirth')} />
                  </FormField>

                  <div className="space-y-1.5">
                    <fieldset
                      aria-invalid={errors.gender ? true : undefined}
                      aria-describedby={errors.gender ? 'gender-error' : undefined}
                    >
                      <legend className="flex items-center gap-1 text-sm font-semibold">
                        Gender
                        <span aria-hidden className="text-destructive">
                          *
                        </span>
                      </legend>
                      <div className="mt-2.5 flex flex-wrap gap-x-6 gap-y-2">
                        {genderOptions.map((gender) => (
                          <label key={gender} className="flex cursor-pointer items-center gap-2">
                            <input type="radio" value={gender} className="size-4 accent-primary" {...register('gender')} />
                            {gender}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    {errors.gender && (
                      <p id="gender-error" className="text-sm font-medium text-destructive">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>

                  <FormField label="Class applying for" fieldId="classApplying" error={errors.classApplying?.message} isRequired>
                    <NativeSelect {...getFieldProps('classApplying', errors.classApplying?.message)} {...register('classApplying')}>
                      <option value="">Select class</option>
                      {classOptions.map((classOption) => (
                        <option key={classOption.value} value={classOption.value}>
                          {classOption.label}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormField>

                  {isSeniorSecondary && (
                    <FormField label="Preferred stream" fieldId="stream" error={errors.stream?.message} isRequired>
                      <NativeSelect {...getFieldProps('stream', errors.stream?.message)} {...register('stream')}>
                        <option value="">Select stream</option>
                        {streamOptions.map((stream) => (
                          <option key={stream} value={stream}>
                            {stream}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormField>
                  )}
                </FormSection>

                <FormSection title="2. Previous school">
                  <FormField
                    label="Name of previous school"
                    fieldId="previousSchool"
                    error={errors.previousSchool?.message}
                    isRequired
                    className="sm:col-span-2"
                  >
                    <Input {...getFieldProps('previousSchool', errors.previousSchool?.message)} {...register('previousSchool')} />
                  </FormField>

                  <FormField label="Board" fieldId="previousBoard" error={errors.previousBoard?.message} isRequired>
                    <NativeSelect {...getFieldProps('previousBoard', errors.previousBoard?.message)} {...register('previousBoard')}>
                      <option value="">Select board</option>
                      {boardOptions.map((board) => (
                        <option key={board} value={board}>
                          {board}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormField>

                  <FormField
                    label="Percentage in last exam"
                    fieldId="previousPercentage"
                    error={errors.previousPercentage?.message}
                    hint="Optional — e.g. 86.5"
                  >
                    <Input
                      inputMode="decimal"
                      {...getFieldProps('previousPercentage', errors.previousPercentage?.message)}
                      {...register('previousPercentage')}
                    />
                  </FormField>
                </FormSection>

                <FormSection title="3. Parent / guardian details">
                  <FormField label="Parent / guardian name" fieldId="parentName" error={errors.parentName?.message} isRequired>
                    <Input {...getFieldProps('parentName', errors.parentName?.message)} {...register('parentName')} />
                  </FormField>

                  <FormField label="Relationship" fieldId="relationship" error={errors.relationship?.message} isRequired>
                    <NativeSelect {...getFieldProps('relationship', errors.relationship?.message)} {...register('relationship')}>
                      <option value="">Select relationship</option>
                      {relationshipOptions.map((relationship) => (
                        <option key={relationship} value={relationship}>
                          {relationship}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormField>

                  <FormField label="Mobile number" fieldId="mobile" error={errors.mobile?.message} isRequired>
                    <div className="flex">
                      <span className="flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 font-semibold text-muted-foreground">
                        +91
                      </span>
                      <Input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        autoComplete="tel-national"
                        placeholder="98765 43210"
                        className="rounded-l-none"
                        {...getFieldProps('mobile', errors.mobile?.message)}
                        {...register('mobile')}
                      />
                    </div>
                  </FormField>

                  <FormField label="Email address" fieldId="email" error={errors.email?.message} isRequired>
                    <Input type="email" autoComplete="email" {...getFieldProps('email', errors.email?.message)} {...register('email')} />
                  </FormField>
                </FormSection>

                <FormSection title="4. Residential address">
                  <FormField label="Address" fieldId="address" error={errors.address?.message} isRequired className="sm:col-span-2">
                    <Textarea
                      rows={3}
                      autoComplete="street-address"
                      placeholder="House no., street, locality"
                      {...getFieldProps('address', errors.address?.message)}
                      {...register('address')}
                    />
                  </FormField>

                  <FormField label="City / Town" fieldId="city" error={errors.city?.message} isRequired>
                    <Input autoComplete="address-level2" {...getFieldProps('city', errors.city?.message)} {...register('city')} />
                  </FormField>

                  <FormField label="State / UT" fieldId="state" error={errors.state?.message} isRequired>
                    <NativeSelect {...getFieldProps('state', errors.state?.message)} {...register('state')}>
                      <option value="">Select state</option>
                      {indianStatesAndUnionTerritories.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormField>

                  <FormField label="PIN code" fieldId="pincode" error={errors.pincode?.message} isRequired>
                    <Input
                      inputMode="numeric"
                      maxLength={6}
                      autoComplete="postal-code"
                      {...getFieldProps('pincode', errors.pincode?.message)}
                      {...register('pincode')}
                    />
                  </FormField>
                </FormSection>

                <div className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 size-4 shrink-0 accent-primary"
                      aria-invalid={errors.declaration ? true : undefined}
                      aria-describedby={errors.declaration ? 'declaration-error' : undefined}
                      {...register('declaration')}
                    />
                    <span>
                      I declare that the information given above is true to the best of my knowledge, and I agree to
                      abide by the rules and regulations of the school.
                    </span>
                  </label>
                  {errors.declaration && (
                    <p id="declaration-error" className="mt-2 text-sm font-medium text-destructive">
                      {errors.declaration.message}
                    </p>
                  )}
                </div>

                {submitError && (
                  <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 p-4 font-medium text-destructive">
                    {submitError}
                  </p>
                )}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" size="lg" variant="secondary" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="animate-spin" />}
                    Save &amp; Submit Application
                  </Button>
                  <Button type="button" size="lg" variant="outline" onClick={() => reset(admissionFormDefaults)}>
                    Clear form
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside className="space-y-6 lg:col-span-4">
            {lastDateToApply && (
              <div className="rounded-lg bg-accent p-5 text-white shadow-sm">
                <p className="font-display text-sm font-semibold tracking-wider text-secondary-200 uppercase">
                  Last date to apply
                </p>
                <p className="mt-1 font-display text-2xl font-bold">{formatIndianDate(lastDateToApply.date)}</p>
              </div>
            )}

            <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
              <h2 className="flex items-center gap-2 bg-primary px-5 py-3.5 font-display font-semibold text-white">
                <FileText aria-hidden className="size-5 text-secondary-300" />
                Keep these documents ready
              </h2>
              <ul className="space-y-2.5 p-5 text-[15px]">
                {requiredDocuments.map((document) => (
                  <li key={document} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-secondary" />
                    {document}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border bg-background-subtle p-5">
              <h2 className="font-display font-semibold text-primary-900">Need help?</h2>
              <p className="mt-2 text-muted-foreground">
                Call the admissions office ({siteConfig.contact.officeHours}).
              </p>
              <a
                href={siteConfig.contact.phoneHref}
                className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-accent hover:underline"
              >
                <Phone aria-hidden className="size-4" />
                {siteConfig.contact.phone}
              </a>
            </div>
          </aside>
        </Container>
      </div>
    </>
  )
}
