// app/profile/[id]/page.tsx
type Props = { params: Promise<{ id: string }> };

export default async function UserProfile({ params }: Props) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-10 max-w-md w-full text-white text-center">
        <h1 className="text-4xl font-bold mb-4">User Profile</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-6 rounded-full" />
        <p className="text-xl font-medium">Welcome, user ID:</p>
        <p className="mt-2 text-2xl font-mono text-green-400 break-all">{id}</p>
      </div>
    </div>
  );
}
