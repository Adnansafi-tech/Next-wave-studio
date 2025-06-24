import NoSSRReduxProvider from "@/features/NoSSRReduxProvider";
import { AuthLayout } from "@/layouts/auth-layout";
export default function AuthXLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NoSSRReduxProvider>
        <AuthLayout>
          <div className="flex h-full min-h-screen w-full">{children}</div>
        </AuthLayout>
      </NoSSRReduxProvider>
    </>
  );
}
