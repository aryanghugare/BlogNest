import { forwardRef, useId } from 'react'
const Input = forwardRef(function Input({ label, type = 'text', className = '', error, hint, id: suppliedId, ...props }, ref) {
  const generatedId = useId()
  const id = suppliedId || generatedId
  return <div className={`form-field ${className}`}>
    {label && <label htmlFor={id}>{label}</label>}
    <input type={type} className={`input ${error ? 'input-error' : ''}`} ref={ref} id={id} aria-invalid={!!error} aria-describedby={error || hint ? `${id}-help` : undefined} {...props} />
    {(error || hint) && <p id={`${id}-help`} className={error ? 'field-error' : 'field-hint'}>{error || hint}</p>}
  </div>
})
export default Input
