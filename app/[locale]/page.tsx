"use client";
// 多语言首页
import Navbar from './components/Navbar';
import { useTranslation } from '@/app/lib/useTranslation';
import { useLocale } from './layout';

export default function HomePage() {
  const { t } = useTranslation();
  const locale = useLocale();

  // 定义核心优势数据
  const advantages = [
    {
      titleKey: 'home.advantageTitle1',
      descriptionKey: 'home.advantageDescription1',
      number: 1
    },
    {
      titleKey: 'home.advantageTitle2',
      descriptionKey: 'home.advantageDescription2',
      number: 2
    },
    {
      titleKey: 'home.advantageTitle3',
      descriptionKey: 'home.advantageDescription3',
      number: 3
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* 导航栏 */}
      <Navbar />
      
      <main className="flex-grow">
        {/* 首屏区域 */}
        <section className="relative bg-gradient-to-r from-blue-50 to-white py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D47A1] mb-6 leading-tight">
                  {t('home.heroTitle')}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                  {t('home.heroDescription')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a
                    href={`/${locale}/contact`}
                    className="bg-[#1976D2] hover:bg-[#0D47A1] text-white px-8 py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg text-center"
                  >
                    {t('common.bookNow')}
                  </a>
                  <a
                    href={`/${locale}/about`}
                    className="border-2 border-[#1976D2] text-[#1976D2] hover:bg-[#E3F2FD] px-8 py-3 rounded-full font-medium transition-all text-center"
                  >
                    {t('common.learnMore')}
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-64 bg-blue-100 flex items-center justify-center">
                  <div className="text-[#1976D2] text-center p-6">
                    <p className="text-lg font-medium">{t('home.advantageTitle1')}</p>
                    <p className="mt-2 text-sm">{t('home.advantageDescription1')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 核心优势区域 */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0D47A1] mb-4">{t('home.coreAdvantages')}</h2>
              <div className="w-24 h-1 bg-[#1976D2] mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 优势卡片 */}
              {advantages.map((advantage) => (
                <div key={advantage.number} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-blue-100">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 text-[#1976D2] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold">{advantage.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#0D47A1] mb-2">{t(advantage.titleKey)}</h3>
                    <p className="text-gray-600">
                      {t(advantage.descriptionKey)}
                    </p>
                  </div>
                </div>
              ))}
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