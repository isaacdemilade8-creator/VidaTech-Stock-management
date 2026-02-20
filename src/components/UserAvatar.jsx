import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function UserAvatar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center text-center p-4 border-b">

      {/* Avatar */}
      <img
        src={user?.avatar || "/default-avatar.png"}
        alt="User Avatar"
        className="w-20 h-20 rounded-full object-cover border-2 border-purple-600 mb-3"
      />

      {/* Name */}
      <h3 className="font-bold text-lg">
        {user?.storeName || "My Store"}
      </h3>

      {/* Email */}
      <p className="text-sm text-gray-500">
        {user?.email}
      </p>

    </div>
  );
}
