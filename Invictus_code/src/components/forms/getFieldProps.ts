/** Accessibility wiring for a control rendered inside <FormField>. */
export function getFieldProps(fieldId: string, error?: string) {
  return {
    id: fieldId,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${fieldId}-error` : undefined,
  }
}
