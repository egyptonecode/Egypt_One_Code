import { LogOut, User, Menu } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardHeader() {
  const { profile, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">EG</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-blue-900">الكود الوطني المصري</h1>
              <p className="text-xs text-gray-500">محافظة مطروح</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center space-x-3 space-x-reverse hover:bg-gray-50 rounded-lg px-3 py-2 transition"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{profile?.full_name}</p>
                <p className="text-xs text-gray-500">الطالب</p>
              </div>
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{profile?.full_name}</p>
                    <p className="text-xs text-gray-500 mt-1">الكود: {profile?.student_code}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      signOut();
                    }}
                    className="w-full px-4 py-3 text-right flex items-center space-x-3 space-x-reverse hover:bg-red-50 text-red-600 transition"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">تسجيل خروج</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
