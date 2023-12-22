import Logo from '@/app/ui/logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
// import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-gray-700 p-4 md:h-52">
        <Logo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-700 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-white md:text-3xl md:leading-normal`}>
            <strong>Welcome to Good Deed application.</strong> Here you can write your list of good deeds.
          </p>
          <div className='flex gap-5'>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Login</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
            <Link
              href="/"
              className="flex items-center gap-5 self-start rounded-lg bg-gray-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-600 md:text-base"
            >
              <span>Registration</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <p className='w-64 text-center bg-gray-600 p-10 text-white rounded-lg'>
            There will be screenshots of the application on different devices
          </p>
          {/* <Image 
            src='/hero-desktop.png' 
            width={1000} 
            height={760} 
            className='hidden md:block' 
            alt='Снимки экрана проекта панели мониторинга, показывающие настольную версию' 
          />
          <Image 
            src='/hero-mobile.png' 
            width={560} 
            height={620}
            className='block md:hidden'
            alt='Снимки экрана проекта панели мониторинга, показывающие мобильную версию'
          /> */}
        </div>
      </div>
    </main>
  );
}
