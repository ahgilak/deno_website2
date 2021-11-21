/* Copyright 2020 the Deno authors. All rights reserved. MIT license. */

import React from "react";
import Head from "next/head";
import Link from "next/link";
import CodeBlock from "../components/CodeBlock";
import Footer from "../components/Footer";
import versions from "../versions.json";
import { GetStaticProps, NextPage } from "next";
import InlineCode from "../components/InlineCode";
import Header from "../components/Header";
import { CookieBanner } from "../components/CookieBanner";

interface HomeProps {
  latestStd: string;
}

const Home: NextPage<HomeProps> = ({ latestStd }) => {
  const complexExampleProgram =
    `import { serve } from "https://deno.land/std@${latestStd}/http/server.ts";

console.log("http://localhost:8000/");
serve((req) => new Response("Hello World\\n"), { addr: ":8000" });
`;

  return (
    <>
      <Head>
        <title>دینو - محیطی مدرن برای اجرای جاوااسکریپت و تایپ‌اسکریپت</title>
      </Head>
      <CookieBanner />
      {
        /* <div className="bg-blue-500 p-4 text-white flex justify-center text-center">
        <div className="max-w-screen-xl">
          <span className="inline">Deno 1.9 is out.</span>
          <span className="block sm:ml-2 sm:inline-block font-semibold">
            <a href="https://deno.com/blog/v1.9">
              Read the release notes <span aria-hidden="true">&rarr;</span>
            </a>
          </span>
        </div>
      </div> */
      }
      <div className="bg-white" dir="rtl">
        <div className="bg-gray-50 border-b border-gray-200">
          <Header main />
          <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col items-center">
            <h1 className="font-extrabold text-5xl leading-10 tracking-tight text-gray-900">
              دینو
            </h1>
            <h2 className="mt-4 sm:mt-5 font-light text-2xl text-center leading-tight text-gray-900">
              محیطی <strong className="font-semibold">مدرن</strong> برای اجرای
              {" "}
              <strong className="font-semibold">جاوااسکریپت</strong> و{" "}
              <strong className="font-semibold">تایپ‌اسکریپت</strong>.
            </h2>
            <a
              href="/#installation"
              className="rounded-full mt-8 px-8 py-2 transition-colors duration-75 ease-in-out bg-blue-500 hover:bg-blue-400 text-white text-lg shadow-lg"
            >
              نصب
            </a>
            <a
              href="https://github.com/denoland/deno/releases/latest"
              className="mt-4"
            >
              {versions.cli[0]}
            </a>
          </div>
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <p className="my-4 text-gray-700">
            دینو یک محیط اجرایی ساده و مدرن برای جاوااسکریپت و تایپ‌اسکریپت است
            که با استفاده از V8 به زبان Rust نوشته شده.
          </p>
          <ol className="ml-8 list-disc text-gray-700">
            <li>
              ایمن به صورت پیش‌فرض،‌ امکان تنظیم دسترسی به فایل‌ها، شبکه و محیط
              اجرا.
            </li>
            <li>پشتیبانی از تایپ اسکریپت.</li>
            <li>امکان کامپایل به یک فایل اجرایی.</li>
            <li>
              دارای ابزار های داخلی مانند کنترل‌ کننده‌ی وابستگی‌ها (
              <InlineCode>deno info</InlineCode>) و فرمت‌گر کد (
              <InlineCode>deno fmt</InlineCode>).
            </li>
            <li>
              دارای مجموعه‌ای از ماژول‌های استاندارد که تضمین شده‌اند به خوبی با
              دینو کار کنند:{" "}
              <a href="https://deno.land/std" className="link">
                deno.land/std
              </a>
            </li>
            <li>
              مجموعه‌ای از{" "}
              <a
                href="https://github.com/denoland/deno/wiki#companies-interested-in-deno"
                className="link"
              >
                شرکت‌ها که به دینو علاقه‌مند‌ند.
              </a>
            </li>
          </ol>
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <Link href="#installation">
            <a className="hover:underline">
              <h3 className="font-bold text-xl" id="installation">
                نصب
              </h3>
            </a>
          </Link>
          <InstallSection />
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <Link href="#getting-started">
            <a className="hover:underline">
              <h3 className="font-bold text-xl" id="getting-started">
                شروع
              </h3>
            </a>
          </Link>
          <p className="my-4 text-gray-700">اجرای یک برنامه‌ی ساده:</p>
          <CodeBlock
            code="deno run https://deno.land/std/examples/welcome.ts"
            language="bash"
          />
          <p className="my-4 text-gray-700">مثال پیچیده‌تر:</p>
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8">
          <CodeBlock
            code={complexExampleProgram}
            language="typescript"
            disablePrefixes
          />
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8">
          <p className="my-4 text-gray-700">
            می‌توانید معرفی دقیق‌تر، مثال‌ها و راهنمایی راه‌اندازی محیط را در
            {" "}
            <Link href="/manual">
              <a className="link">راهنما</a>
            </Link>{" "}
            بخوانید.
          </p>
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <Link href="#runtime-documentation">
            <a className="hover:underline">
              <h3 className="font-bold text-xl" id="runtime-documentation">
                مستندات محیط اجرایی
              </h3>
            </a>
          </Link>
          <p className="my-4 text-gray-700">
            مستندات ابتدایی را میتوانید در{" "}
            <a href="https://doc.deno.land/builtin/stable" className="link">
              doc.deno.land
            </a>{" "}
            بخوانید.
          </p>
          <p className="my-4 text-gray-700">
            دینو دارای یک{"  "}
            <Link href="/manual">
              <a className="link">راهنما</a>
            </Link>{" "}
            شامل توضیحات عمیق‌تری در مورد عملکردهای پیچیده‌تر زمان اجرا،
            مقدمه‌ای بر مفاهیمی که دینو بر پایه آن‌ها شکل گرفته، جزئیاتی در مورد
            بخش‌های داخلی دینو، نحوه استفاده از دینو در اپلیکیشن خود و استفاده
            از افزونه‌های Rust برای افزایش کاریی دینو است.
          </p>
          <p className="my-4 text-gray-700">
            این راهنما همچنین شامل توضیحاتی در مورد ابزار‌های داخلی دینو است.
          </p>
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <Link href="#standard-modules">
            <a className="hover:underline">
              <h3 className="font-bold text-xl" id="standard-modules">
                ماژول‌های استاندارد
              </h3>
            </a>
          </Link>
          <p className="my-4 text-gray-700">
            در کنار محیط اجرایی، دینو دارای مجموعه‌ای از ماژول‌های استاندارد است
            توسط تیم دینو توسعه و ارزیابی می‌شوند و تضمین شده‌اند که به خوبی با
            دینو کار کنند. این ماژول‌ها در{" "}
            <a href="https://github.com/denoland/denoـstd" className="link">
              denoland/deno_std
            </a>{" "}
            قابل مشاهده هستند.
          </p>
          <p className="my-4 text-gray-700">
            این ماژول‌های استاندارد در{" "}
            <Link href="/std">
              <a className="link">deno.land/std</a>
            </Link>{" "}
            میزبانی می‌شوند و مانند سایر ماژول‌های اکمااسکریپت که با دینو سازگار
            هستند از طریق آدرس‌های اینترنتی توزیع می‌شوند.{" "}
          </p>
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <Link href="#third-party-modules">
            <a className="hover:underline">
              <h3 className="font-bold text-xl" id="third-party-modules">
                ماژول‌های متفرقه
              </h3>
            </a>
          </Link>
          <p className="my-4 text-gray-700">
            شما می‌توانید از هر آدرس اینترنتی مانند گیت‌هاب، سرور شخصی یا CDN
            هایی مثل{" "}
            <a href="https://www.skypack.dev" className="link">
              Skypack
            </a>{" "}
            ،
            <a href="https://jspm.io" className="link">
              jspm.io
            </a>{" "}
            ،
            <a href="https://www.jsdelivr.com/" className="link">
              jsDelivr
            </a>{" "}
            یا{" "}
            <a href="https://esm.sh/" className="link">
              esm.sh
            </a>{" "}
            ماژول های خود را وارد کنید.
          </p>
          <p className="my-4 text-gray-700">
            برای راحت‌تر کردن استفاده از ماژول ها، دینو در داخل خود ابزارهایی
            مانند
            <InlineCode>deno info</InlineCode> و{" "}
            <InlineCode>deno doc</InlineCode>{" "}
            را ارائه می‌دهد. وب‌سایت دینو یک محیط گرافیکی تحت وب نیز برای مشاهده
            مستندات ماژول‌ها ارائه می‌دهد که در{"  "}
            <a href="https://doc.deno.land" className="link">
              doc.deno.land
            </a>{" "}
            قابل مشاهده است.
          </p>
          <p className="my-4 text-gray-700">
            همچنین وب‌سایت دینو دارای یک سرویس عمومی برای میزبانی از ماژول‌های
            اکمااسکریپت است که از طریق{" "}
            <Link href="/x">
              <a className="link">deno.land/x</a>
            </Link>{" "}
            در دسترس است.
          </p>
        </div>
        <div className="mt-20">
          <Footer simple />
        </div>
      </div>
    </>
  );
};

const InstallSection = () => {
  const shell = (
    <div key="shell" className="my-4 text-gray-700">
      <p className="py-2">Shell (مک, لینوکس):</p>
      <CodeBlock
        language="bash"
        code={`curl -fsSL https://deno.land/x/install/install.sh | sh`}
      />
    </div>
  );
  const homebrew = (
    <div key="homebrew" className="my-4 text-gray-700">
      <p className="mb-2">
        <a href="https://formulae.brew.sh/formula/deno" className="link">
          Homebrew
        </a>{" "}
        (مک):
      </p>
      <CodeBlock language="bash" code={`brew install deno`} />
    </div>
  );
  const powershell = (
    <div key="powershell" className="my-4 text-gray-700">
      <p className="mb-2">PowerShell (ویندوز):</p>
      <CodeBlock
        language="bash"
        code={`iwr https://deno.land/x/install/install.ps1 -useb | iex`}
      />
    </div>
  );
  const chocolatey = (
    <div key="chocolatey" className="my-4 text-gray-700">
      <p className="mb-2">
        <a href="https://chocolatey.org/packages/deno" className="link">
          Chocolatey
        </a>{" "}
        (ویندوز):
      </p>
      <CodeBlock language="bash" code={`choco install deno`} />
    </div>
  );
  const scoop = (
    <div key="scoop" className="my-4 text-gray-700">
      <p className="mb-2">
        <a href="https://scoop.sh/" className="link">
          Scoop
        </a>{" "}
        (ویندوز):
      </p>
      <CodeBlock language="bash" code={`scoop install deno`} />
    </div>
  );
  const cargo = (
    <div key="cargo" className="my-4 text-gray-700">
      <p className="py-2">
        نصب از سورس{" "}
        <a href="https://crates.io/crates/deno" className="link">
          Cargo
        </a>
        :
      </p>
      <CodeBlock language="bash" code={`cargo install deno --locked`} />
    </div>
  );

  return (
    <>
      <p className="my-4 text-gray-700">
        دینو یک فایل قابل اجرا بدون هیچگونه وابستگی است. می‌توانید از روش های
        زیر برای نصب استفاده کنید یا به طور مستقیم از{" "}
        <a href="https://github.com/denoland/deno/releases" className="link">
          این صفحه
        </a>{" "}
        دانلود کنید.
      </p>
      {shell}
      {powershell}
      {homebrew}
      {chocolatey}
      {scoop}
      {cargo}
      <p className="my-4 text-gray-700">
        برای دیدن روش های بیشتر به{" "}
        <a className="link" href="https://github.com/denoland/deno_install">
          نصب دینو
        </a>{" "}
        .بروید
      </p>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      latestStd: versions.std[0],
    },
  };
};

export default Home;
