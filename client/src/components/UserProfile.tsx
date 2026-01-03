// client/src/components/UserProfile.tsx
import { useAuth } from "../contexts/AuthContext";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const UserProfile: React.FC = () => {
  const { user, isGuest, logout } = useAuth();

  if (isGuest) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <UserCircleIcon className="w-5 h-5" />
        <span>Guest</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-medium text-dark">{user?.name}</p>
        <p className="text-xs text-gray-500">{user?.email}</p>
      </div>
      <button
        onClick={logout}
        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
