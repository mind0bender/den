import { ActionFunction, ActionFunctionArgs, redirect } from "react-router-dom";

export const action: ActionFunction = ({
  request,
}: ActionFunctionArgs): Promise<Response> => {
  return new Promise(
    (
      resolve: (value: Response) => void,
      reject: (reason?: any) => void
    ): void => {
      request
        .formData()
        .then((data: FormData): void => {
          const denId: FormDataEntryValue | null = data.get("denId");
          resolve(redirect(`../den/${denId}`));
        })
        .catch(reject);
    }
  );
};
