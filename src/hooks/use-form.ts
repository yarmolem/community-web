import { useRef, useState, useCallback, useEffect } from 'react'
import type { FormEvent, FocusEvent, ChangeEvent } from 'react'

export type FormTouched<T> = Partial<Record<keyof T, boolean>>
export type FormError<T> = Partial<Record<keyof T, string | undefined>>
export type FormElements =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement

interface Props<T> {
  initialValues: T
  validate?: (values: T) => Partial<FormError<T>>
}

const useForm = <T extends object>({ validate, initialValues }: Props<T>) => {
  const touched = useRef<FormTouched<T>>({})

  const [isDirty, setIsDirty] = useState(false)
  const [state, setState] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormError<T>>({})

  // Settings values
  const clear = useCallback(() => {
    setErrors({})
    setIsDirty(false)
    setState(initialValues)
    touched.current = {}
  }, [])

  const setField = useCallback(<K extends keyof T>(name: K, value: T[K]) => {
    setState((prev) => ({ ...prev, [name]: value }))
  }, [])

  const setFields = useCallback((values?: Partial<T>) => {
    setState((prev) => ({ ...prev, ...values }))
  }, [])

  const handleChange = useCallback((e: ChangeEvent<FormElements>) => {
    const name = e.target.name as keyof T
    const value = e.target.value

    setState((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleBlur = useCallback((e: FocusEvent<FormElements, Element>) => {
    const name = e.target.name as keyof T
    touched.current = { ...touched.current, [name]: true }
  }, [])

  const toggleDirty = useCallback((isDirty?: boolean) => {
    setIsDirty((prev) => (typeof isDirty === 'boolean' ? isDirty : !prev))
  }, [])

  // Validate Errors
  const hasErrors = useCallback((errors: Partial<FormError<T>>) => {
    return Object.keys(errors).length !== 0
  }, [])

  // Inputs default props
  const inputProps = (name: keyof T) => {
    return {
      name,
      error: errors[name],
      value: state[name]!,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }

  // OnSubmit middleware
  const onSubmit = useCallback(
    (cb: () => void) => {
      return (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toggleDirty(true)

        if (typeof validate !== 'function') return cb()
        const newErrors = validate(state)
        if (!hasErrors(newErrors)) return cb()
        setErrors(newErrors)
      }
    },
    [state]
  )

  useEffect(() => {
    if (isDirty) {
      if (typeof validate === 'function') {
        const newErrors = validate(state)
        setErrors(newErrors)
      }
    }
  }, [state, isDirty])

  return {
    isDirty,
    errors,
    values: state,
    clear,
    hasErrors,
    onSubmit,
    setField,
    setFields,
    setErrors,
    handleBlur,
    inputProps,
    toggleDirty,
    handleChange
  }
}

export default useForm
