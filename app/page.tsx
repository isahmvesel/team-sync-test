export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <main className="w-80 p-6 bg-gray-100 rounded-lg shadow-md">

        {/* Username Section */}

        <label className="block text-gray-700 font-medium">Username</label>
        <input
          type="text"
          className="w-full p-2 mt-1 border rounded-md text-gray-900"
          placeholder="Enter your username"
        />

        {/* Password Section */}

        <label className="block text-gray-700 font-medium">Password</label>
        <input
          type="text"
          className="w-full p-2 mt-1 border rounded-md text-gray-900"
          placeholder="Enter your password"
        />

        <div className="flex justify-between mt-6">
          <button className="px-4 py-2 bg-gray-700 text-white rounded-md">Register</button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-md">Log in</button>
        </div>
        

      </main>
    </div>
  );
}
