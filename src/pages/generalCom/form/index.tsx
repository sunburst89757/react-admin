import { MainLayout } from "components/MainLayout/MainLayout";
import { useAuthButtons } from "hooks/useAuthButtons";

export default function Form() {
  const { auth } = useAuthButtons();
  console.log(auth.includes("download"));
  return <MainLayout>form</MainLayout>;
}
