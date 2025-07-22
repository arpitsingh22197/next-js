// app/profile/[id]/page.tsx
type Props = { params: Promise<{ id: string }> };

export default async function UserProfile({ params }: Props) {
  const { id } = await params;

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">Profile Page {id}</p>
    </div>
  );
}



