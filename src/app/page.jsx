import Link from "next/link";

const Home = () => {
  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome to My App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/login"
            className="block bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-4 px-6 text-center transition duration-300"
          >
            Go to Login
          </Link>
          <Link
            href="/regist"
            className="block bg-green-500 hover:bg-green-600 text-white rounded-lg py-4 px-6 text-center transition duration-300"
          >
            Go to Register
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
