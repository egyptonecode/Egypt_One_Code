import { useState } from 'react';
import { UserPlus, User, CreditCard, Mail, Lock, MapPin, Building2, School, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignUp({ onNavigateToLogin }: { onNavigateToLogin: () => void }) {
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [governorate] = useState('20');
  const [administration, setAdministration] = useState('');
  const [school, setSchool] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!fullName.trim()) {
      setError('يرجى إدخال الاسم الرباعي');
      setLoading(false);
      return;
    }

    if (nationalId.length !== 14) {
      setError('يجب أن يكون الرقم القومي 14 رقماً');
      setLoading(false);
      return;
    }

    if (!phoneNumber.trim()) {
      setError('يرجى إدخال رقم الهاتف');
      setLoading(false);
      return;
    }

    if (!administration) {
      setError('يرجى اختيار الإدارة التعليمية');
      setLoading(false);
      return;
    }

    if (!school) {
      setError('يرجى اختيار المدرسة');
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setError('يرجى إدخال البريد الإلكتروني');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('يجب أن تكون كلمة المرور 6 أحرف على الأقل');
      setLoading(false);
      return;
    }

    const studentCode = `EG${governorate}${administration}${school}${nationalId.slice(-2)}`;

    const { error } = await signUp(
      email,
      password,
      fullName,
      studentCode,
      phoneNumber,
      governorate,
      administration,
      school,
      schoolYear
    );

    setLoading(false);

    if (error) {
      if (error.message.includes('duplicate') || error.message.includes('unique')) {
        setError('الكود الوطني موجود بالفعل. قد يكون لديك حساب مسجل من قبل');
      } else if (error.message.includes('email')) {
        setError('البريد الإلكتروني موجود بالفعل');
      } else {
        setError('حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى');
      }
    } else {
      alert(`تم إنشاء الحساب بنجاح! الكود الخاص بك هو: ${studentCode}`);
      onNavigateToLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-900 rounded-full flex items-center justify-center">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-blue-900">الكود الوطني المصري</h1>
              <p className="text-cyan-600 mt-1">إنشاء حساب طالب جديد</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الاسم الرباعي
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                  placeholder="محمد أحمد علي حسن"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الرقم القومي
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value.replace(/\D/g, '').slice(0, 14))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                  placeholder="30012345678901"
                  required
                  disabled={loading}
                  maxLength={14}
                />
              </div>
              <p className="text-xs text-gray-500">أدخل الرقم القومي المكون من 14 رقماً</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                رقم الهاتف
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                  placeholder="01012345678"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500">أدخل رقم هاتفك المحمول</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                المحافظة
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={governorate}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition appearance-none bg-gray-50"
                  disabled
                >
                  <option value="20">مرسى مطروح</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الإدارة التعليمية
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={administration}
                  onChange={(e) => setAdministration(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition appearance-none bg-white"
                  required
                  disabled={loading}
                >
                  <option value="">اختر الإدارة التعليمية</option>
                  <option value="01">مرسى مطروح</option>
                  <option value="05">الضبعة</option>
                  <option value="06">العالمين</option>
                  <option value="07">الحمام</option>
                  <option value="08">سيوة</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                المدرسة
              </label>
              <div className="relative">
                <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition appearance-none bg-white"
                  required
                  disabled={loading}
                >
                  <option value="">اختر المدرسة</option>
                  <option value="01">مدرسة الضبعة النووية</option>
                  <option value="02">مدرسة الضبعة الثانوية بنين</option>
                  <option value="03">مدرسة الضبعة الثانوية بنات</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                السنة الدراسية
              </label>
              <div className="relative">
                <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={schoolYear}
                  onChange={(e) => setSchoolYear(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                  placeholder="مثال: الصف الثالث الثانوي"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                  placeholder="example@email.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
              <p className="text-xs text-gray-500">يجب أن تكون 6 أحرف على الأقل</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'جاري الإنشاء...' : 'إنشاء حساب'}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              لديك حساب بالفعل؟{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-cyan-600 hover:text-cyan-700 font-medium hover:underline"
              >
                تسجيل دخول
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>محافظة مطروح - وزارة التربية والتعليم</p>
        </div>
      </div>
    </div>
  );
}
