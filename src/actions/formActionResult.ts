export interface ActionResult {
  message: string;
  isSuccess: boolean;
}
export interface FormActionResult<T> extends ActionResult {
  errors: Record<keyof T, string> | undefined;
  fieldValues: T;
}
