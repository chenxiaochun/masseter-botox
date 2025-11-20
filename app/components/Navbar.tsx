"use client";
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 导航链接数据
  const navLinks = [
    { title: '首页', href: '/' },
    { title: '关于治疗', href: '/about' },
    { title: '治疗流程', href: '/process' },
    { title: '效果展示', href: '/results' },
    { title: '常见问题', href: '/faq' },
    { title: '医生团队', href: '/doctors' },
    { title: '联系预约', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-[#1976D2] font-bold text-2xl">Masseter Botox</span>
          </div>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-[#0D47A1] hover:text-[#1976D2] font-medium transition-colors py-2 border-b-2 border-transparent hover:border-[#1976D2]"
              >
                {link.title}
              </a>
            ))}
            {/* 预约按钮 - 突出显示 */}
            <a
              href="/contact"
              className="bg-[#1976D2] hover:bg-[#0D47A1] text-white px-6 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg"
            >
              立即预约
            </a>
          </nav>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-[#0D47A1] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
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

        {/* 移动端导航菜单 */}
        <nav className={`md:hidden mt-4 pb-4 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col space-y-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-[#0D47A1] hover:text-[#1976D2] font-medium transition-colors py-3 px-4 rounded-lg hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </a>
            ))}
            {/* 移动端预约按钮 */}
            <a
              href="/contact"
              className="bg-[#1976D2] hover:bg-[#0D47A1] text-white px-6 py-3 rounded-lg font-medium transition-all text-center mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              立即预约
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;