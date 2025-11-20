// 多语言联系我们页面
import Navbar from '../components/Navbar';
import { useTranslation } from '@/app/lib/useTranslation';
import { useLocale } from '../layout';

export default function ContactPage() {
  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* 导航栏 */}
      <Navbar />
      
      <main className="flex-grow">
        {/* 页面标题区域 */}
        <section className="bg-gradient-to-r from-blue-50 to-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-[#0D47A1] mb-4">{t('contact.pageTitle')}</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('contact.pageDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* 联系信息和表单区域 */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* 联系信息 */}
              <div className="bg-white p-8 rounded-xl shadow-md border border-blue-100">
                <h2 className="text-2xl font-semibold text-[#0D47A1] mb-6">{t('contact.contactInformation')}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#1976D2]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0D47A1]">{t('contact.addressTitle')}</h3>
                      <p className="text-gray-600">{t('contact.address')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#1976D2]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0D47A1]">{t('contact.emailTitle')}</h3>
                      <p className="text-gray-600">{t('contact.email')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#1976D2]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#0D47A1]">{t('contact.phoneTitle')}</h3>
                      <p className="text-gray-600">{t('contact.phone')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 联系表单 */}
              <div className="bg-white p-8 rounded-xl shadow-md border border-blue-100">
                <h2 className="text-2xl font-semibold text-[#0D47A1] mb-6">{t('contact.contactFormTitle')}</h2>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.formName')}</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all"
                      placeholder={t('contact.formNamePlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.formEmail')}</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all"
                      placeholder={t('contact.formEmailPlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.formMessage')}</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-all"
                      placeholder={t('contact.formMessagePlaceholder')}
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#1976D2] hover:bg-[#0D47A1] text-white py-3 px-6 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    {t('contact.submitButton')}
                  </button>
                </form>
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