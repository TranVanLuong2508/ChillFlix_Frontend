"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import FilmInfo from "@/components/custom/FilmInfo";
import CommentRatingTabs from "@/components/custom/CommentRatingTabs";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useFilmStore } from "@/stores/filmStore";
import PlayBar from "@/components/film/detail/playbar";
import Background from "@/components/film/detail/Background";
import TabsSection from "@/components/film/detail/Tabs";

export default function FilmDetailPage() {
  const { filmSlug }: { filmSlug: string } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const commentId = searchParams.get("commentId");

  const { loading, error, filmData, getDetailFilm } = useFilmStore();

  const [activeTab, setActiveTab] = useState<"comments" | "ratings">(
    "comments"
  );
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!filmSlug) return;
    getDetailFilm(filmSlug);
  }, [filmSlug]);

  useEffect(() => {
    if (!commentId || loading || !filmData || hasScrolled) return;
    const scrollTimer = setTimeout(() => {
      const commentElement = document.getElementById(`comment-${commentId}`);
      if (commentElement) {
        const elementPosition =
          commentElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 100;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        setTimeout(() => {
          const contentDiv = commentElement.querySelector(
            ":scope > .flex.items-start"
          ) as HTMLElement;
          const target = contentDiv || commentElement;
          target.style.backgroundColor = "rgba(251, 191, 36, 0.15)";
          target.style.borderRadius = "8px";
          target.style.transition = "background-color 0.3s ease";

          setTimeout(() => {
            target.style.backgroundColor = "transparent";
            setTimeout(() => {
              target.style.transition = "";
              target.style.borderRadius = "";
            }, 300);
          }, 2000);
        }, 800);
        setHasScrolled(true);
        router.replace(`/film-detail/${filmSlug}`, { scroll: false });
      } else {
        console.log(
          "[SCROLL] Comment element not found:",
          `comment-${commentId}`
        );
      }
    }, 500);
    return () => clearTimeout(scrollTimer);
  }, [commentId, loading, filmData, hasScrolled, filmSlug, router]);
  if (loading || !filmData) {
    return <div className="text-center py-20">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-center py-20">Has error !</div>;
  }

  const filmTitle = filmData.film.title;
  const filmDescription = filmData.film.description;
  const filmImage = filmData.filmImages?.poster || "";
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Head>
        <meta property="og:title" content={filmTitle} />
        <meta property="og:description" content={filmDescription} />
        <meta property="og:image" content={filmImage} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <main className="bg-[#191B24] min-h-screen">
        <Background />
        <div className="relative z-20 mx-auto mt-[-280px] px-2 sm:px-4 md:px-6 lg:px-8 max-w-full md:max-w-[95vw] lg:max-w-[1990px]">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
            <div className="col-span-1 lg:col-span-3">
              <div className="flex justify-center lg:block">
                <div className="rounded-3xl p-0 bg-[rgba(25,27,36,0.3)] backdrop-blur-[15px] mb-4 lg:mb-0 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none">
                  <FilmInfo />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-7 md:gap-8 rounded-3xl p-2 sm:p-4 md:p-5 bg-[rgba(25,27,36,0.3)] backdrop-blur-[15px]">
              <PlayBar activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabsSection />
              <CommentRatingTabs />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
