export interface FormInputInterface {
  formId: string;
  id: string;
  label: string;
  required?: boolean;
  formState: { [key: string]: any };
  isShown?: (formState: FormInputInterface['formState']) => boolean;
  error: string;
  setFormState: React.Dispatch<
    React.SetStateAction<{
      [key: string]: any;
    }>
  >;
  onShouldValidate: (id: string) => void;
  onShouldClearValidation: (id: string) => void;
}
