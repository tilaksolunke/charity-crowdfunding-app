import { handleNewUserRegistration } from "@/actions/users";

export default async function Home() {
  await handleNewUserRegistration();
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
