interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string[]
}

export const FormInput = ({
  label,
  error,
  className,
  ...props
}: FormInputProps) => {
  return (
    <div className="w-full">
      <label className="mb-1 block text-sm font-semibold text-gray-600">
        {label}
      </label>
      <input
        {...props}
        className={`w-full rounded-xl border bg-gray-50 p-3 transition-all outline-none ${
          error
            ? 'border-red-500 ring-1 ring-red-200'
            : 'border-gray-200 focus:border-orange-500'
        } ${className}`}
      />
      {error && (
        <p className="animate-in fade-in slide-in-from-top-1 mt-1 text-xs text-red-500">
          {error[0]}
        </p>
      )}
    </div>
  )
}
