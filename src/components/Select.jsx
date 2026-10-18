import { forwardRef, useId } from 'react'
const Select = forwardRef(function Select({ options = [], label, className = '', ...props }, ref) {
  const id = useId()
  return <div className={`form-field ${className}`}>
    {label && <label htmlFor={id}>{label}</label>}
    <select {...props} id={id} ref={ref} className="input">{options.map((option) => <option key={option.value ?? option} value={option.value ?? option}>{option.label ?? option}</option>)}</select>
  </div>
})
export default Select
