import React from 'react';
import { FormInputInterface } from '@/components/FormInput/FormInput';

export interface FormInputColorPropsInterface extends FormInputInterface {
  type: 'color';
  formatValue?: (value: string) => string;
}

const FormInputColor: React.FC<FormInputColorPropsInterface> = (props) => {
  const {
    formId,
    id,
    label,
    required = false,
    isShown = () => true,
    formState,
    setFormState,
    formatValue = (value) => value,
    error,
    onShouldValidate,
    onShouldClearValidation,
  } = props;

  if (isShown(formState) === false) {
    return null;
  }

  const isError = error !== '';

  return (
    <div>
      <label
        htmlFor={`form-${formId}-field-${id}`}
        className="block mb-1 font-medium"
      >
        {label}
        {required === true && <span> *</span>}
      </label>

      <input
        className={`appearance-none rounded-lg border bg-white w-full leading-loose px-2 text-gray-900 focus:border-indigo-300 ${
          error ? 'border-red-400' : ''
        }`}
        id={`form-${formId}-field-${id}`}
        name={id}
        type="color"
        onChange={(event) => {
          setFormState({
            ...(formState as object),
            [id]: formatValue(event.target.value),
          });
          onShouldClearValidation(id);
        }}
        value={formatValue(formState[id]) || ''}
        onBlur={() => {
          onShouldValidate(id);
        }}
      />
      {isError && <p className="mt-2 text-red-600 text-sm">{error}</p>}
    </div>
  );
};

export default FormInputColor;
