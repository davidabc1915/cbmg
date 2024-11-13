import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          © Todos os direitos reservados {currentYear} - Instituto Cubo Mágico | Desenvolvimento <a
            href="https://instagram.com/leadbits"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            @leadbits
          </a>
        </p>
      </div>
    </footer>
  );
}