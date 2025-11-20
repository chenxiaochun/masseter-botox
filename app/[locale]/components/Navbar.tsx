"use client";
import React, { useState } from 'react';
import { useLocale, supportedLocales } from '../layout';
import { useTranslation } from '@/app/lib/useTranslation';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locale = useLocale();
  const { t } = useTranslation();
  const router = useRouter();

  // 处理语言切换
  const handleLanguageChange = (newLocale: string) => {
    // 获取当前路径，不包含语言前缀
    const currentPath = window.location.pathname.replace(`/${locale}`, '') || '/';
    // 导航到新语言版本的相同路径
    router.push(`/${newLocale}${currentPath}`);
  };

  // 导航链接数据
  const navLinks = [
    { key: 'navigation.home', href: '/' },
    { key: 'navigation.about', href: '/about' },
    { key: 'navigation.contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div>
              <span className="text-[#1976D2] font-bold text-2xl">{t('common.appName')}</span>
            </div>
          </div>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={`/${locale}${link.href}`}
                className="text-[#0D47A1] hover:text-[#1976D2] font-medium transition-colors py-2 border-b-2 border-transparent hover:border-[#1976D2]"
              >
                {t(link.key)}
              </a>
            ))}
            {/* 预约按钮 - 突出显示 */}
            <a
              href={`/${locale}/contact`}
              className="bg-[#1976D2] hover:bg-[#0D47A1] text-white px-6 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg"
            >
              {t('common.bookNow')}
            </a>
          </nav>

          {/* 移动端菜单按钮和语言切换 */}
          <div className="flex items-center gap-2">
            {/* 语言切换器 - 移动端 */}
            <div className="flex items-center bg-blue-50 rounded-lg overflow-hidden">
              {supportedLocales.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-2 py-1 text-xs transition-colors ${lang === locale ? 'bg-[#1976D2] text-white' : 'text-[#0D47A1] hover:bg-blue-100'}`}
                >
                  {lang === 'zh' ? '中' : 'EN'}
                </button>
              ))}
            </div>
            
            <button
              className="text-[#0D47A1] p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t(isMenuOpen ? 'navigation.closeMenu' : 'navigation.openMenu')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0)' }}
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 移动端导航菜单 */}
        <nav className={`md:hidden mt-4 pb-4 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col space-y-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={`/${locale}${link.href}`}
                className="text-[#0D47A1] hover:text-[#1976D2] font-medium transition-colors py-3 px-4 rounded-lg hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(link.key)}
              </a>
            ))}
            {/* 移动端预约按钮 */}
            <a
              href={`/${locale}/contact`}
              className="bg-[#1976D2] hover:bg-[#0D47A1] text-white px-6 py-3 rounded-lg font-medium transition-all text-center mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.bookNow')}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;