/* Copyright 2020 the Deno authors. All rights reserved. MIT license. */

import React, { ChangeEvent } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import twas from "twas";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InlineCode from "../../components/InlineCode";
import { getStats, listModules } from "../../util/registry_utils";
import * as pageutils from "../../util/pagination_utils";
import RegistryInstructions from "../../components/RegistryInstructions";
import { replaceEmojis } from "../../util/emoji_util";

const PER_PAGE = 20;

function ThirdPartyRegistryList(): React.ReactElement {
  const { asPath, query: routerQuery, replace } = useRouter();
  const [overlayOpen, setOverlayOpen] = React.useState(asPath.endsWith("#add"));

  const page = parseInt(
    (Array.isArray(routerQuery.page)
      ? routerQuery.page[0]
      : routerQuery.page) || "1",
  );
  const query =
    (Array.isArray(routerQuery.query)
      ? routerQuery.query[0]
      : routerQuery.query) || "";

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
      ? { query: event.target.value }
      : undefined;
    replace({
      pathname: "/x",
      query,
    });
  }

  function setPage(page: number) {
    const query = page !== 1 ? { page: page.toFixed(0) } : undefined;
    replace({
      pathname: "/x",
      query,
    });
  }

  const { data: resp } = useSWR(
    [query, page],
    async (query, page) => {
      return listModules(page, PER_PAGE, query).then((resp) =>
        resp
          ? {
            results: resp.results,
            totalCount: query ? PER_PAGE : resp.totalCount,
          }
          : null
      );
    },
    { dedupingInterval: 300, refreshInterval: 0, initialData: undefined },
  );

  const { data: stats } = useSWR("dummy", () => getStats());

  return (
    <>
      <Head>
        <title>ماژول‌های متفرقه | دینو</title>
      </Head>
      <div className="bg-gray">
        <Header subtitle="ماژول‌های متفرقه" widerContent={true} />
        <RegistryInstructions
          isOpen={overlayOpen}
          close={() => setOverlayOpen(false)}
        />
        <div>
          <div
            className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 mt-8"
            dir="rtl"
          >
            <dt className="text-lg leading-6 font-medium text-gray-900">
              deno.land/x چیست؟
            </dt>
            <dd className="mt-2">
              <p className="text-base leading-6 text-gray-500">
                <span className="font-semibold">deno.land/x</span>{" "}
                یک سرویس برای میزبانی از اسکریپت‌های دینو است که ماژول‌های موجود
                در گیت‌هاب را ذخیره می‌کند تا به راحتی در یک آدرس در دسترس
                باشند.
              </p>
            </dd>

            <div className="mt-2">
              <a href="#info" className="link">
                اطلاعات بیشتر
              </a>
            </div>

            <div className="mt-6">
              <button
                className="
                  py-2 px-8 border border-gray-300 text-md font-medium rounded-md
                  text-gray-700 bg-gray-100 hover:text-gray-500 hover:bg-gray-50
                  focus:outline-none focus:shadow-outline-blue focus:border-blue-300
                  active:bg-gray-100 active:text-gray-700 transition duration-150 ease-in-out
                "
                onClick={() => setOverlayOpen(true)}
              >
                انتشار ماژول
              </button>
            </div>

            {
              /* <div className="mt-8">
              <ErrorMessage
                title="Ongoing incident"
                body="We are currently seeing delays and timeouts during module publishing and search. Serving of already published modules and `std` is not affected. We are working on resolving the problem."
              />
            </div> */
            }
          </div>
          <div
            className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 mt-8"
            dir="rtl"
          >
            <label htmlFor="query" className="font-medium sr-only">
              جستجو
            </label>
            <input
              id="query"
              className="block w-full px-4 py-2 leading-normal bg-white border border-gray-200 rounded-lg outline-none shadow hover:shadow-sm focus:shadow-sm appearance-none focus:border-gray-300 hover:border-gray-300 mt-1"
              type="text"
              placeholder={!resp ? "جستجو" : `جستجو در${resp.totalCount} ماژول`}
              value={query}
              onChange={handleSearchInput}
            />
          </div>
          <div className="sm:max-w-screen-lg sm:mx-auto sm:px-6 md:px-8 pb-4 sm:pb-12">
            {resp === undefined
              ? (
                <div className="bg-white sm:shadow border border-gray-200 overflow-hidden sm:rounded-md mt-4">
                  <ul>
                    {Array(20)
                      .fill(null)
                      .map((_, i) => (
                        <li
                          className={i !== 0
                            ? "border-t border-gray-200"
                            : ""}
                          key={i}
                        >
                          <div className="flex items-center px-4 sm:px-6 py-4">
                            <div className="min-w-0 flex-1 flex items-center">
                              <div className="min-w-0 flex-1">
                                <div className="text-sm leading-5">
                                  <div className="h-3 bg-blue-100 w-1/3 sm:w-1/5 md:w-1/6">
                                  </div>
                                </div>
                                <div className="mt-1 flex items-center">
                                  <div className="h-3 bg-gray-100 w-5/6 sm:w-4/5 md:w-3/4">
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="ml-6 mr-4 flex items-center">
                              <div className="h-3 bg-gray-100 w-4"></div>
                              <svg
                                className="ml-1 text-gray-100 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <title>star</title>
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                              </svg>
                            </div>
                            <div>
                              <svg
                                className="h-5 w-5 text-gray-100"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between items-center sm:hidden">
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-gray-100 text-sm leading-5 font-medium rounded-md bg-white">
                        Previous
                      </button>
                      <div className="text-base leading-6 text-gray-500">
                        <div className="h-3 w-4 bg-gray-100 inline-block mr-1" />/
                        <div className="h-3 w-4 bg-gray-100 inline-block ml-1" />
                      </div>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-gray-100 text-sm leading-5 font-medium rounded-md bg-white ml-4">
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="h-3 w-32 bg-gray-100" />
                      <div>
                        <nav className="relative z-0 inline-flex shadow-sm text-gray-200 leading-5">
                          <div className="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white rounded-l-md">
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="-ml-px relative items-center px-4 py-2 border border-gray-300 bg-white hidden md:inline-flex">
                            &nbsp;&nbsp;
                          </div>
                          <div className="-ml-px relative items-center px-4 py-2 border border-gray-300 bg-white hidden md:inline-flex">
                            &nbsp;&nbsp;
                          </div>
                          <div className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white">
                            &nbsp;&nbsp;
                          </div>
                          <div className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white">
                            &nbsp;&nbsp;
                          </div>
                          <div className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white">
                            &nbsp;&nbsp;
                          </div>
                          <div className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white">
                            &nbsp;&nbsp;
                          </div>
                          <div className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white">
                            &nbsp;&nbsp;
                          </div>
                          <div className="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white rounded-r-md">
                            <svg
                              className="h-5 w-5 text-gray-200"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              )
              : resp === null
              ? (
                <div className="p-4 text-center sm:text-left text-sm leading-5 font-medium text-gray-500 truncate">
                  Failed to load modules
                </div>
              )
              : (
                <div className="bg-white sm:shadow border border-gray-200 overflow-hidden sm:rounded-md mt-4">
                  {resp.results.length == 0
                    ? (
                      <div className="p-4 text-center sm:text-left text-sm leading-5 font-medium text-gray-500 truncate">
                        No modules found
                      </div>
                    )
                    : (
                      <ModuleList
                        modules={resp.results.map((v) => ({
                          ...v,
                          starCount: v.star_count,
                        }))}
                      />
                    )}
                  {!query
                    ? (() => {
                      const pageCount = pageutils.pageCount({
                        totalCount: resp.totalCount,
                        perPage: PER_PAGE,
                      });
                      const hasPrevious = pageutils.hasPrevious({ page });
                      const hasNext = pageutils.hasNext({
                        page,
                        totalCount: resp.totalCount,
                        perPage: PER_PAGE,
                      });
                      const centerPage = Math.max(
                        4,
                        Math.min(page, pageCount - 3),
                      );

                      return (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                          <div className="flex-1 flex justify-between items-center sm:hidden">
                            <button
                              disabled={!hasPrevious}
                              onClick={() => setPage(page - 1)}
                              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md bg-white ${
                                hasPrevious
                                  ? "text-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
                                  : "text-gray-500 cursor-default"
                              } transition ease-in-out duration-150`}
                            >
                              Previous
                            </button>
                            <div className="text-base leading-6 text-gray-500">
                              {page}/{pageCount}
                            </div>
                            <button
                              disabled={!hasNext}
                              onClick={() => setPage(page + 1)}
                              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md bg-white ml-4 ${
                                hasNext
                                  ? "text-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
                                  : "text-gray-500 cursor-default"
                              } transition ease-in-out duration-150`}
                            >
                              Next
                            </button>
                          </div>
                          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm leading-5 text-gray-700">
                                Showing{" "}
                                <span className="font-medium">
                                  {(page - 1) * PER_PAGE + 1}
                                </span>{" "}
                                to{" "}
                                <span className="font-medium">
                                  {(page - 1) * PER_PAGE + resp.results.length}
                                </span>{" "}
                                of{" "}
                                <span className="font-medium">
                                  {resp.totalCount}
                                </span>{" "}
                                results
                              </p>
                            </div>
                            <div>
                              <nav className="relative z-0 inline-flex shadow-sm">
                                <button
                                  disabled={!hasPrevious}
                                  onClick={() => setPage(page - 1)}
                                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium ${
                                    hasPrevious
                                      ? "text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
                                      : "text-gray-300 cursor-default"
                                  } transition ease-in-out duration-150`}
                                  aria-label="Previous"
                                >
                                  <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => setPage(1)}
                                  className={`inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                    page === 1
                                      ? "bg-gray-100 font-semibold text-gray-800"
                                      : "bg-white font-medium text-gray-700"
                                  } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                >
                                  1
                                </button>
                                {centerPage === 4
                                  ? (
                                    <>
                                      <button
                                        onClick={() => setPage(2)}
                                        className={`hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                          page === 2
                                            ? "bg-gray-100 font-semibold text-gray-800"
                                            : "bg-white font-medium text-gray-700"
                                        } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                      >
                                        2
                                      </button>
                                      <span className="inline-flex md:hidden -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
                                        ...
                                      </span>
                                    </>
                                  )
                                  : (
                                    <span className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
                                      ...
                                    </span>
                                  )}
                                <button
                                  onClick={() => setPage(centerPage - 1)}
                                  className={`hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                    page === centerPage - 1
                                      ? "bg-gray-100 font-semibold text-gray-800"
                                      : "bg-white font-medium text-gray-700"
                                  } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                >
                                  {centerPage - 1}
                                </button>
                                <button
                                  onClick={() => setPage(centerPage)}
                                  className={`inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                    page === centerPage
                                      ? "bg-gray-100 font-semibold text-gray-800"
                                      : "bg-white font-medium text-gray-700"
                                  } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                >
                                  {centerPage}
                                </button>
                                <button
                                  onClick={() => setPage(centerPage + 1)}
                                  className={`hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                    page === centerPage + 1
                                      ? "bg-gray-100 font-semibold text-gray-800"
                                      : "bg-white font-medium text-gray-700"
                                  } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                >
                                  {centerPage + 1}
                                </button>
                                {centerPage === pageCount - 3
                                  ? (
                                    <>
                                      <button
                                        onClick={() => setPage(pageCount - 1)}
                                        className={`hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                          page === pageCount - 1
                                            ? "bg-gray-100 font-semibold text-gray-800"
                                            : "bg-white font-medium text-gray-700"
                                        } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                      >
                                        {pageCount - 1}
                                      </button>
                                      <span className="inline-flex md:hidden -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
                                        ...
                                      </span>
                                    </>
                                  )
                                  : (
                                    <span className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
                                      ...
                                    </span>
                                  )}
                                <button
                                  onClick={() => setPage(pageCount)}
                                  className={`inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                    page === pageCount
                                      ? "bg-gray-100 font-semibold text-gray-800"
                                      : "bg-white font-medium text-gray-700"
                                  } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                >
                                  {pageCount}
                                </button>
                                <button
                                  disabled={!hasNext}
                                  onClick={() => setPage(page + 1)}
                                  className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium ${
                                    hasNext
                                      ? "text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
                                      : "text-gray-300 cursor-default"
                                  } transition ease-in-out duration-150`}
                                  aria-label="Previous"
                                >
                                  <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </nav>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                    : null}
                </div>
              )}
          </div>
          <div
            id="info"
            className="max-w-screen-xl mx-auto pt-4 pb-8 sm:pt-8 px-4 sm:px-6 lg:pt-12 lg:px-8"
          >
            <dl className="md:grid md:grid-cols-2 md:gap-8" dir="rtl">
              <div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    چگونه از ماژول‌های موجود در deno.land/x استفاده کنم؟
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6 text-gray-500 break-words">
                      فرمت ساده استفاده از کد به صورت
                      <InlineCode>
                        https://deno.land/x/IDENTIFIER@VERSION/FILE_PATH
                      </InlineCode>
                      است که اگر VERSION را خالی بگذارید به صورت پیش‌فرض از
                      آخرین نسخه استفاده خواهد شد.
                    </p>
                  </dd>
                </div>
                <div className="mt-12">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    آیا می‌توانم توابع داخلی دینو را اینجا پیدا کنم؟
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6 text-gray-500">
                      خیر، مستندات داخلی دینو در{" "}
                      <a className="link" href="https://doc.deno.land/">
                        deno doc
                      </a>{" "}
                      و در راهنما یافت می‌شوند. برای مشاهده ماژول‌های استاندارد
                      به{" "}
                      <Link href="/std">
                        <a className="link">/std</a>
                      </Link>{" "}
                      بروید.
                    </p>
                  </dd>
                </div>
                <div className="mt-12">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    چگونه یک ماژول به deno.land/x اضافه کنم؟
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6 text-gray-500 break-words">
                      روی کلید زیر کلیک کنید و اسلاید‌های راهنما را دنبال کنید:
                    </p>
                    <span className="block w-full rounded-md shadow-sm mt-4">
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 text-md font-medium rounded-md text-gray-700 bg-gray-100 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition duration-150 ease-in-out"
                        onClick={() => setOverlayOpen(true)}
                      >
                        اضافه کردن ماژول
                      </button>
                    </span>
                  </dd>
                </div>
              </div>
              <div className="mt-12 md:mt-0">
                <div>
                  <dt
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="warning"
                  >
                    هنگام استفاده از ‌deno.land/x اخطار دریافت می‌کنم!
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6 text-gray-500">
                      هنگامی که از آخرین نسخه‌ی ماژول (بدون مشخص کردن شماره
                      نسخه) استفاده می کنید، deno.land/x به شما اخطار می‌دهد.
                      این کار می‌تواند باعث{" "}
                      <a
                        href="https://github.com/denoland/deno_website2/issues/997"
                        className="link"
                      >
                        بروز مشکل
                      </a>{" "}
                      شود. برای برطرف کردن اخطار شماره نسخه را مشخص کنید.
                    </p>
                  </dd>
                </div>
                <div className="mt-12">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    آیا می‌توانم ماژول‌هایی را که در deno.land/x انتشار داده‌ام
                    حذف یا ویرایش کنم؟
                  </dt>
                  <dd className="mt-2">
                    <p className="text-base leading-6 text-gray-500">
                      نسخه های ماژول مداوم و تغییر ناپذیر هستند. برای جلوگیری از
                      بروز باگ امکان ویرایش یا حذف یک ماژول (یا یک نسخه) وجود
                      ندارد. ماژول‌ها ممکن است به‌خاطر دلایل قانونی (مانند حق
                      نشر) حذف شوند.
                    </p>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
          <div className="max-w-screen-lg mx-auto pt-4 pb-8 sm:pt-8 sm:pb-12 px-4 sm:px-6 lg:pt-12 lg:pb-16 lg:px-8">
            <h4 className="font-semibold text-2xl" id="stats" dir="rtl">
              آمار
            </h4>
            {stats
              ? (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-medium text-lg" dir="rtl">
                      ماژول‌های جدید
                    </h5>
                    <div className="bg-white sm:shadow border border-gray-200 overflow-hidden rounded-md mt-2">
                      <ModuleList
                        modules={stats.recently_added_modules.map((v) => ({
                          name: v.name,
                          description: v.description,
                          date: v.created_at,
                          starCount: v.star_count,
                        }))}
                      />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-lg" dir="rtl">
                      به‌تازگی آپدیت شده
                    </h5>
                    <div className="bg-white sm:shadow border border-gray-200 overflow-hidden rounded-md mt-2">
                      <ModuleList
                        modules={stats.recently_uploaded_versions.map((v) => ({
                          name: v.name,
                          description: v.version,
                          date: v.created_at,
                          starCount: undefined,
                        }))}
                      />
                    </div>
                  </div>
                </div>
              )
              : null}
          </div>
        </div>
        <Footer simple />
      </div>
    </>
  );
}

function ModuleList({
  modules,
}: {
  modules: Array<{
    name: string;
    description: string;
    date?: string;
    starCount?: string;
  }>;
}) {
  return (
    <ul>
      {modules.map((meta, i) => {
        const link = `/x/${meta.name}`;
        return (
          <li className={i !== 0 ? "border-t border-gray-200" : ""} key={i}>
            <Link href={link}>
              <a className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                <div className="flex items-center px-4 sm:px-6 py-2">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm leading-5 font-medium text-blue-500 truncate">
                        {meta.name}
                      </div>
                      <div className="mt-1 flex items-center text-sm leading-5 text-gray-500">
                        <span className="truncate">
                          {meta.description
                            ? (
                              replaceEmojis(meta.description)
                            )
                            : (
                              <span className="italic text-gray-400">
                                بدون توضیحات
                              </span>
                            )}
                        </span>
                      </div>
                      {meta.date
                        ? (
                          <div className="mt-1 flex items-center text-sm leading-5 text-gray-400">
                            <span
                              className="truncate"
                              title={new Date(meta.date).toLocaleString()}
                            >
                              <time dateTime={meta.date}>
                                {twas(new Date(meta.date).getTime())}
                              </time>
                            </span>
                          </div>
                        )
                        : null}
                    </div>
                  </div>
                  {meta.starCount !== undefined
                    ? (
                      <div className="ml-6 mr-4 flex items-center">
                        <div className="text-gray-400">
                          {meta.starCount}
                        </div>
                        <svg
                          className="ml-1 text-gray-400 w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <title>
                            star
                          </title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                          </path>
                        </svg>
                      </div>
                    )
                    : null}
                  <div>
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default ThirdPartyRegistryList;
