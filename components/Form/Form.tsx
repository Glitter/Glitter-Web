import React, { useState, useMemo } from 'react';
import FormInputText, {
  FormInputTextPropsInterface,
} from '@/components/FormInputText/FormInputText';
import FormInputDropdown, {
  FormInputDropdownPropsInterface,
} from '@/components/FormInputDropdown/FormInputDropdown';
import FormInputColor, {
  FormInputColorPropsInterface,
} from '@/components/FormInputColor/FormInputColor';
import Button, { ButtonPropsInterface } from '@/components/Button/Button';
import styles from './Form.module.css';

export type FormFieldsType = (
  | Omit<
      FormInputTextPropsInterface,
      | 'formId'
      | 'formState'
      | 'setFormState'
      | 'onShouldValidate'
      | 'error'
      | 'onShouldClearValidation'
    >
  | Omit<
      FormInputColorPropsInterface,
      | 'formId'
      | 'formState'
      | 'setFormState'
      | 'onShouldValidate'
      | 'error'
      | 'onShouldClearValidation'
    >
  | Omit<
      FormInputDropdownPropsInterface,
      | 'formId'
      | 'formState'
      | 'setFormState'
      | 'onShouldValidate'
      | 'error'
      | 'onShouldClearValidation'
    >
)[];

const getFieldByType = (
  type: FormFieldsType[number]['type'],
): React.FC<any> | null => {
  if (type === 'text') {
    return FormInputText;
  }

  if (type === 'dropdown') {
    return FormInputDropdown;
  }

  if (type === 'color') {
    return FormInputColor;
  }

  return null;
};

export interface FormPropsInterface {
  id: string;
  fields: FormFieldsType;
  defaultState?: { [key: string]: any };
  submitButtonProps?: Partial<ButtonPropsInterface>;
  submitButtonText?: string;
  handleSubmit: ({
    formState,
  }: {
    formState: { [key: string]: any };
  }) => Promise<{
    error: string;
    willUnmount?: boolean;
  }>;
  loading?: boolean;
  AdditionalButton?: any;
}

const Form: React.FC<FormPropsInterface> = (props) => {
  const {
    id: formId,
    fields,
    defaultState = {},
    submitButtonProps = {},
    submitButtonText = 'Submit',
    handleSubmit,
    loading = false,
    AdditionalButton = null,
  } = props;

  const [formState, setFormState] = useState<{ [key: string]: any }>(
    defaultState,
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formGlobalError, setFormGlobalError] = useState('');
  const [formIsLoading, setFormIsLoading] = useState(false);

  const formHasErrors = useMemo<boolean>(() => {
    return (
      Object.values(errors).find(
        (error) => error !== undefined && error !== '',
      ) !== undefined
    );
  }, [errors]);

  const clearValidation = (id: string) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [id]: '',
    }));
  };

  const validateField = (id: string): boolean => {
    const field = fields.find((formField) => formField.id === id);

    if (field === undefined) {
      return true;
    }

    if (field.required === false) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [id]: '',
      }));
      return true;
    }

    if (['text', 'color'].includes(field.type)) {
      if (formState[id] === undefined || formState[id] === '') {
        setErrors((currentErrors) => ({
          ...currentErrors,
          [id]: 'This field is required',
        }));
        return false;
      }
    }

    setErrors((currentErrors) => ({
      ...currentErrors,
      [id]: '',
    }));
    return true;
  };

  const validateForm = () => {
    let formIsValid = true;

    fields.forEach((field) => {
      if (field.isShown !== undefined && field.isShown(formState) === false) {
        setErrors((currentErrors) => ({
          ...currentErrors,
          [field.id]: '',
        }));
        return;
      }

      const fieldIsValid = validateField(field.id);

      if (fieldIsValid === false) {
        formIsValid = false;
      }
    });

    return formIsValid;
  };

  const onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    setFormGlobalError('');

    const formIsValid = validateForm();

    if (formIsValid === false) {
      return;
    }

    setFormIsLoading(true);

    const { error: submissionError, willUnmount = false } = await handleSubmit({
      formState,
    });

    if (willUnmount === true) {
      return;
    }

    setFormIsLoading(false);

    if (submissionError !== '') {
      setFormGlobalError(submissionError);
      return;
    }
  };

  const renderField = (field: FormFieldsType[number]): any => {
    const Field = getFieldByType(field.type);

    if (Field === null) {
      return null;
    }

    return (
      <div key={field.id} className="mb-4">
        <Field
          formId={formId}
          formState={formState}
          setFormState={setFormState}
          error={errors[field.id] || ''}
          onShouldValidate={validateField}
          onShouldClearValidation={clearValidation}
          {...field}
        />
      </div>
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`${formIsLoading || loading ? 'opacity-50' : ''}`}
    >
      {fields.map((field) => renderField(field))}
      {formGlobalError && <p className="mb-2 text-sm">{formGlobalError}</p>}
      {formHasErrors && (
        <p className="mb-2 text-sm">
          There was an issue with one of the fields, we marked it in red
        </p>
      )}
      <div className={`${styles.buttonsGrid} grid gap-1`}>
        <Button type="submit" {...submitButtonProps}>
          {submitButtonText}
        </Button>
        {AdditionalButton}
      </div>
    </form>
  );
};

export default Form;
