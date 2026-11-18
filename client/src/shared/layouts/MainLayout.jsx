import { useProfile } from "../../features/auth/hooks/useAuth";

function MainLayout({ children }) {
  const { data: user, isLoading, isError } = useProfile();
  console.log({ user, isLoading, isError });

  return (
    <>
      <div> {children}</div>
    </>
  );
}

export default MainLayout;
