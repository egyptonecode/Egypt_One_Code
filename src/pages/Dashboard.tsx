import { Trophy, FileText, Bell, BarChart, Award, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from '../components/DashboardHeader';

export default function Dashboard() {
  const { profile } = useAuth();

  const cards = [
    {
      title: 'المسابقات',
      description: 'استعرض المسابقات المتاحة وشارك فيها',
      icon: Trophy,
      color: 'from-purple-500 to-pink-500',
      count: '3 مسابقات جديدة',
    },
    {
      title: 'سيرتي الذاتية',
      description: 'قم بإنشاء وتحديث سيرتك الذاتية',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      count: '60% مكتمل',
    },
    {
      title: 'الإشعارات',
      description: 'تحديثات مهمة من وزارة التربية والتعليم',
      icon: Bell,
      color: 'from-orange-500 to-red-500',
      count: '5 إشعارات جديدة',
    },
    {
      title: 'الإحصائيات',
      description: 'تتبع تقدمك وإنجازاتك',
      icon: BarChart,
      color: 'from-green-500 to-teal-500',
      count: 'عرض التقارير',
    },
    {
      title: 'الشهادات',
      description: 'شهاداتك وإنجازاتك المحققة',
      icon: Award,
      color: 'from-yellow-500 to-orange-500',
      count: '2 شهادات جديدة',
    },
    {
      title: 'الفعاليات',
      description: 'فعاليات وأنشطة قادمة',
      icon: Calendar,
      color: 'from-indigo-500 to-purple-500',
      count: 'فعالية قريبة',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-blue-900 to-cyan-600 rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-4 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">مرحباً، {profile?.full_name}</h2>
              <p className="text-cyan-100 text-lg">
                {profile?.school_year}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <p className="text-cyan-100 text-sm mb-1">الكود الوطني</p>
              <p className="text-white text-2xl font-bold tracking-wider">{profile?.student_code}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
              >
                <div className={`h-2 bg-gradient-to-r ${card.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {card.count}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Bell className="w-5 h-5 ml-2 text-cyan-600" />
            آخر الإشعارات
          </h3>
          <div className="space-y-3">
            <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 ml-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">مسابقة جديدة: البرمجة الإبداعية</p>
                <p className="text-xs text-gray-600 mt-1">منذ ساعتين</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 ml-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">تم قبول طلبك للمشاركة في ورشة العمل</p>
                <p className="text-xs text-gray-600 mt-1">منذ 5 ساعات</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 ml-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">تذكير: آخر موعد لتسليم المشروع 30 نوفمبر</p>
                <p className="text-xs text-gray-600 mt-1">منذ يوم</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            محافظة مطروح - وزارة التربية والتعليم والتعليم الفني © 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
