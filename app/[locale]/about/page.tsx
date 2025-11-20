// 多语言关于我们页面
import Navbar from '../components/Navbar';
import { useTranslation } from '@/app/lib/useTranslation';
import { useLocale } from '../layout';

export default function AboutPage() {
  const { t } = useTranslation();
  const locale = useLocale();

  // 专家团队数据
  const specialists = [
    {
      name: t('about.specialist1Name'),
      title: t('about.specialist1Title'),
      description: t('about.specialist1Description')
    },
    {
      name: t('about.specialist2Name'),
      title: t('about.specialist2Title'),
      description: t('about.specialist2Description')
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* 导航栏 */}
      <Navbar />
      
      <main className="flex-grow">
        {/* 页面标题区域 */}
        <section className="bg-gradient-to-r from-blue-50 to-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-[#0D47A1] mb-4">{t('about.pageTitle')}</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('about.pageDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* 我们的故事 */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-blue-100 rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-[#0D47A1] mb-4">{t('about.ourStory')}</h2>
                <p className="text-gray-700 mb-4">
                  {t('about.storyContent1')}
                </p>
                <p className="text-gray-700">
                  {t('about.storyContent2')}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-8 border border-blue-100">
                <h2 className="text-2xl font-semibold text-[#0D47A1] mb-4">{t('about.ourMission')}</h2>
                <p className="text-gray-700 mb-4">
                  {t('about.missionContent1')}
                </p>
                <p className="text-gray-700">
                  {t('about.missionContent2')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 专家团队 */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0D47A1] mb-4">{t('about.ourTeam')}</h2>
              <div className="w-24 h-1 bg-[#1976D2] mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('about.teamDescription')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {specialists.map((specialist, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-8 border border-blue-100 text-center">
                  <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-[#1976D2]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0D47A1] mb-2">{specialist.name}</h3>
                  <p className="text-[#1976D2] font-medium mb-4">{specialist.title}</p>
                  <p className="text-gray-600">
                    {specialist.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 患者评价 */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0D47A1] mb-4">{t('about.patientTestimonials')}</h2>
              <div className="w-24 h-1 bg-[#1976D2] mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-8 border border-blue-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">
                  {t('about.testimonial1')}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#1976D2] mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#0D47A1]">{t('about.testimonial1Author')}</h4>
                    <p className="text-sm text-gray-500">{t('about.testimonial1Date')}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-8 border border-blue-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">
                  {t('about.testimonial2')}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#1976D2] mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#0D47A1]">{t('about.testimonial2Author')}</h4>
                    <p className="text-sm text-gray-500">{t('about.testimonial2Date')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-[#0D47A1] text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">{t('footer.companyName')}</p>
            <p className="text-blue-200">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}