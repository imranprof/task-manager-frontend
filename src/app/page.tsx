import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gray-50">
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 text-center">
        Welcome to Task Manager
      </h1>

      <p className="text-gray-600 text-center max-w-xl">
        Keep track of your tasks efficiently! Login or signup to start managing
        your tasks, toggle their status, and stay organized.
      </p>

    </div>
  );
}
