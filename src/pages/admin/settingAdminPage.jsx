import { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaImage } from 'react-icons/fa';
import TitleHeaderDashboard from '../../components/TitleHeader';
import { getUserById, updateUserById } from '../../services/userService';
import uploadFile from '../../utils/mediaUpload';

export default function SettingAdminPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: ""
  });
  const [originalData, setOriginalData] = useState({});
  const defaultImage = "https://xaezbcwztkcrkmtakkfg.supabase.co/storage/v1/object/public/skyrek-img/icon-5404125_1920.png";

  useEffect(() => {
    async function fetchAdminData() {
      const userData = await getUserById();
      setAdminData(userData);
      setOriginalData(userData);
      console.log(adminData);

      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        image: userData.image ? userData.image : "",
      });
    }
    fetchAdminData();
  }, []);


const handleChange = async (e) => {
  const { name, type, files, value } = e.target;

  // Handle IMAGE upload
  if (type === "file") {
    const file = files?.[0];
    if (!file) return;

    try {
      setIsUploading(true); 
      const imageUrl = await uploadFile(file);
      console.log("Uploaded image URL:", imageUrl);

      setFormData(prev => ({
        ...prev,
        image: imageUrl || "" 
      }));
      
    } catch (error) {
      console.error("Failed to upload:", error);
    } finally {
      setIsUploading(false); 
    }

    return;
  }

  // Handle normal text inputs
  setFormData(prev => ({
    ...prev,
    [name]: value || ""    
  }));
};

  const handleSave = async () => {
    console.log('Saving data:', formData);
    const updatedData = await updateUserById(formData);

    setOriginalData(updatedData);
    setFormData(prev => ({...prev, ...updatedData})); // Merge updates safely
    setIsEditing(false);

    console.log('Saving:', formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData(originalData);
  };

  return (
    <div className="p-6">
      
      <TitleHeaderDashboard title="Admin Settings" subtitle="Manage your account information and preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Image Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile Picture</h2>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 mb-4 relative">
              <img 
                src={formData.image || defaultImage} 
                alt="Profile"
                className={`w-full h-full object-cover ${isUploading ? 'opacity-50' : ''}`}
              />
              {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-black">
                      Uploading...
                  </div>
              )}
            </div>
            {isEditing && (
              <div className="w-full">
                <label className="text-sm text-gray-600 mb-2 block">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  disabled={isUploading} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover cursor-pointer"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isUploading}
                  className={`px-4 py-2 text-white rounded-lg ${
                    isUploading 
                      ? "bg-gray-400 cursor-not-allowed"  
                      : "bg-green-500 hover:bg-green-600" 
                  }`}
                >
                  {isUploading ? "Uploading..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaUser className="text-gray-400" />
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaUser className="text-gray-400" />
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaPhone className="text-gray-400" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>
          </div>
        </div>
      </div>
      {/*
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaLock className="text-gray-400" />
          Change Password
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current password"
            />
          </div>

          <div>
             <label className="text-sm font-medium text-gray-700 mb-2 block">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <button
          className="mt-4 px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover cursor-pointer"
        >
          Update Password
        </button> 
      </div>*/}
    </div>
  );
}