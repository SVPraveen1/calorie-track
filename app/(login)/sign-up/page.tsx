import { Login } from '../login';

export default function SignUpPage() {
  return (
    <div className="dark:bg-gray-900 min-h-screen">
      <Login mode="signup" />
    </div>
  );
}
