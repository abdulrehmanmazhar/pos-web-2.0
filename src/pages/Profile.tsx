import React, { useState, useEffect } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  routes: string[];
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<Partial<User>>({});
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const mockUser: User = {
        _id: "123456",
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: {
          public_id: "avatar123",
          url: "https://via.placeholder.com/150",
        },
        role: "user",
        isVerified: true,
        routes: ["/dashboard", "/settings"],
      };
      setUser(mockUser);
    };
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleAvatarUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarUrl(e.target.value);
    setAvatarFile(null); // Reset file input if URL is used
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      setAvatarUrl(""); // Reset URL input if file is used
    }
  };

  const saveProfile = async () => {
    console.log("Updated User:", updatedUser);
    console.log("Avatar File:", avatarFile);
    console.log("Avatar URL:", avatarUrl);
    setIsEditing(false);
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : prev));
  };

  const updatePassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("New Password:", password);
    setPassword("");
    setConfirmPassword("");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          User Profile
        </h1>

        <div className="flex flex-wrap gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-center gap-6 w-full md:w-1/3">
            <img
              src={user.avatar.url}
              alt={`${user.name}'s Avatar`}
              className="w-28 h-28 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-500">
                <strong>Role:</strong> {user.role}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}
              </p>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="w-full md:w-2/3 flex flex-wrap gap-6">
            {!isEditing ? (
              <div className="flex flex-wrap gap-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600 transition-all focus:ring focus:ring-blue-300"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4 w-full">
                <input
                  type="text"
                  name="name"
                  placeholder="Update Name"
                  defaultValue={user.name}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Update Email"
                  defaultValue={user.email}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                />
                <div className="flex flex-col w-full gap-2">
                  <input
                    type="text"
                    placeholder="Avatar URL"
                    value={avatarUrl}
                    onChange={handleAvatarUrlChange}
                    className="p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileChange}
                    className="p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={saveProfile}
                    className="bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600 transition-all focus:ring focus:ring-green-300"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-600 transition-all focus:ring focus:ring-red-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Password and Routes */}
        <div className="flex flex-wrap gap-6 mt-8">
          {/* Password Update */}
          <div className="w-full md:w-1/2">
            <h3 className="text-lg font-semibold">Change Password</h3>
            <input
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 mt-4 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-2 mt-4 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
            <button
              onClick={updatePassword}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600 transition-all focus:ring focus:ring-blue-300"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
