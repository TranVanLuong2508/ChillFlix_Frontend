"use client";

import { useEffect, useState } from "react";
import FilmInfo from "@/components/custom/FilmInfo"
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
  const commentId = searchParams.get('commentId');

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
        const elementPosition = commentElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 100; 
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        setTimeout(() => {
          const contentDiv = commentElement.querySelector(':scope > .flex.items-start') as HTMLElement;
          const target = contentDiv || commentElement;
          target.style.backgroundColor = 'rgba(251, 191, 36, 0.15)';
          target.style.borderRadius = '8px';
          target.style.transition = 'background-color 0.3s ease';

          setTimeout(() => {
            target.style.backgroundColor = 'transparent';
            setTimeout(() => {
              target.style.transition = '';
              target.style.borderRadius = '';
            }, 300);
          }, 2000);
        }, 800); 
        setHasScrolled(true);
        router.replace(`/film-detail/${filmSlug}`, { scroll: false });
      } else {
        console.log('[SCROLL] Comment element not found:', `comment-${commentId}`);
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
  return (
    <main className="bg-[#191B24]">
      <Background backdropUrl={filmData.filmImages.backdrop} />
      <div className="relative z-20 mx-auto mt-[-200px] px-5 ">
        <div className="grid grid-cols-10">
          <div className="lg:col-span-3 rounded-4xl p-5 bg-[rgba(25,27,36,0.3)] backdrop-blur-[20px]">
            <FilmInfo />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8 rounded-4xl p-5 bg-[rgba(25,27,36,0.3)] backdrop-blur-[20px]">
            <PlayBar activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabsSection />
            <CommentRatingTabs />
          </div>
        </div>
      </div>
    </main>
  );
}
