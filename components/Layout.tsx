/* A Next.js layout component */

import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const NavLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      className="font-semibold transition transform duration-200 ease-in hover:bg-gray-200 p-3 rounded-md"
      href={href}
    >
      {text}
    </Link>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Maslow GPT-3 Demo</title>
      </Head>

      <header className="bg-primary w-full px-10 py-4 flex items-center justify-between">
        <Link className="flex flex-row justify-center items-center space-x-4" href="/">
          <Image
            src="/images/maslow.png"
            alt="Maslow Logo"
            width={50}
            height={50}
            className='rounded-full'
          />
          {/* <h1 className="text-2xl font-extrabold">MASLOW</h1> */}
        </Link>
        <nav className="flex space-x-8">
          <NavLink href="/about/domains" text="Domains" />
          <NavLink href="/about/questions" text="Questions" />
        </nav>
      </header>

      <main className="bg-secondary w-full pt-8 pb-52">
        <div className=" mx-auto py-10 max-w-xl">{children}</div>
      </main>

      <footer className="bg-dark text-dark w-full px-10 pt-14 pb-8 flex flex-row items-center justify-start">
        <div className='inline-flex grow space-x-5'>
          <Link href="/">
            <Image
              src="/images/maslow-no-text.png"
              alt="Maslow Logo"
              width={50}
              height={50}
            />
          </Link>
          <h1 className="text-lg font-extrabold">MASLOW &copy; 2023</h1>
        </div>
        <Link href='/playground' className="underline">Playground Zone</Link>
      </footer>

    </>
  );
};

export default Layout;
