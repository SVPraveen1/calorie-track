import { Login } from '../login';

export default function SignInPage() {
  return (
    <div className="dark:bg-gray-900 min-h-screen">
      <Login mode="signin" />
    </div>
  );
}
