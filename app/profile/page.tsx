"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ✅ Loading Component
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-pink-600 rounded-full animate-spin"></div>
    </div>
  );
};

const ProfilePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return <Loading />; // ✅ Now using the custom Loading component
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-gray-900 shadow-lg rounded-xl p-8 w-full max-w-lg h-auto min-h-[300px] border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Profile</h2>
        <p className="text-gray-400 text-center text-lg">Your personal account details.</p>

        <div className="mt-8 space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg text-lg break-words w-full border border-gray-700">
            <p className="text-center text-gray-300">
              <span className="font-semibold text-white">User:</span> {user?.username}
            </p>
            <p className="text-center text-gray-300 mt-3">
              <span className="font-semibold text-white">Email:</span> {user?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
