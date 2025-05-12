
import AuthLayout from "../components/auth/AuthLayout";
import SignupForm from "../components/auth/SignupForm";

const Signup = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start analyzing legal documents with LegaLens"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
