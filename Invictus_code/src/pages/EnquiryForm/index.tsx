
import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

import { PageBanner } from '@/components/common/PageBanner'
import { Container } from '@/components/common/Container'
import { FormField,  FormSection} from '@/components/forms/FormField'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)

    // Replace this with your enquiry API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      })
    }, 1000)
  }

  return (
    <>
      <PageBanner
        title="Enquiry Form"
        breadcrumbs={[
          { label: 'Admissions', href: '/admissions' },
          { label: 'Enquiry Form' },
        ]}
        image="/images/admissions-banner.jpg"
      />

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-2xl">
          {submitted ? (
            <div
              role="status"
              className="rounded-lg border border-success/30 bg-success-subtle p-8 text-center sm:p-12"
            >
              <CheckCircle2
                aria-hidden
                className="mx-auto size-16 text-success"
              />

              <h2 className="mt-5 font-display text-2xl font-bold text-primary-900">
                Enquiry submitted successfully
              </h2>

              <p className="mt-3 text-muted-foreground">
                Thank you for your enquiry. Our team will get in touch with
                you shortly.
              </p>

              <Button
                type="button"
                size="lg"
                className="mt-8"
                onClick={() => setSubmitted(false)}
              >
                Submit another enquiry
              </Button>
            </div>
          ) : (
            <FormSection title='Send Us Enquiry' nogrid >
                <div className="rounded-lg width-full">

                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* Name */}
                    <FormField
                    label="Name"
                    fieldId="name"
                    isRequired
                    >
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    </FormField>

                    {/* Email - Optional */}
                    <FormField
                    label="Email"
                    fieldId="email"
                    hint="Optional"
                    >
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    </FormField>

                    {/* Phone */}
                    <FormField
                    label="Phone Number"
                    fieldId="phone"
                    isRequired
                    >
                    <div className="flex">
                        <span className="flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 font-semibold text-muted-foreground">
                        +91
                        </span>

                        <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        autoComplete="tel-national"
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="rounded-l-none"
                        required
                        />
                    </div>
                    </FormField>

                    {/* Message */}
                    <FormField
                    label="Message"
                    fieldId="message"
                    isRequired
                    >
                    <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Enter your enquiry..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    </FormField>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="sm:min-w-44"
                    >
                        {isSubmitting && (
                        <Loader2 className="size-4 animate-spin" />
                        )}

                        {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                    </Button>

                    <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        onClick={() =>
                        setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            message: '',
                        })
                        }
                    >
                        Clear Form
                    </Button>
                    </div>
                </form>
                </div>
            </FormSection>
          )}
        </div>
      </Container>
    </>
  )
}

export default EnquiryForm
