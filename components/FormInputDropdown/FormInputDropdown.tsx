import React from 'react';
import { FormInputInterface } from '@/components/FormInput/FormInput';

interface DropdownChoiceInterface {
  value: string;
  label: string;
}

export interface FormInputDropdownPropsInterface extends FormInputInterface {
  type: 'dropdown';
  choices: DropdownChoiceInterface[];
  emptyText?: string;
}

const FormInputDropdown: React.FC<FormInputDropdownPropsInterface> = (
  props,
) => {
  const {
    formId,
    id,
    label,
    choices,
    emptyText = 'Select...',
    required = false,
    isShown = () => true,
    formState,
    setFormState,
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

      <select
        className={`appearance-none rounded-lg border bg-white w-full leading-loose px-2 text-gray-900 focus:border-indigo-300 ${
          error ? 'border-red-400' : ''
        }`}
        id={`form-${formId}-field-${id}`}
        name={id}
        onChange={(event) => {
          setFormState({
            ...(formState as object),
            [id]: event.currentTarget.value,
          });
          onShouldClearValidation(id);
        }}
        value={formState[id]}
        onBlur={() => {
          onShouldValidate(id);
        }}
      >
        <option value="">{emptyText}</option>
        {choices.map((choice) => (
          <option value={choice.value} key={choice.value}>
            {choice.label}
          </option>
        ))}
      </select>
      {isError && <p className="mt-2 text-red-600 text-sm">{error}</p>}
    </div>
  );
};

export default FormInputDropdown;
