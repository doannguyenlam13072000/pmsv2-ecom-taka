import { useAuth } from "@/composables/useAuth";
import { type SignInFormValues, signInSchema } from "@/schemas/signIn.shema";

export function useSignIn() {
  const { handleSignIn } = useAuth();
  const initialValues: SignInFormValues = {
    email: "admin@gmail.com",
    password: "123456",
    rememberMe: false,
  };

  const handleSignInForm = async (values: SignInFormValues) => {
    console.log("handleSignInForm", values);
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
    await handleSignIn();
  };

  return {
    handleSignInForm,
    schema: signInSchema,
    initialValues,
  };
}
