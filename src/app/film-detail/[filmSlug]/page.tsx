"use client";

import { useEffect, useState } from "react";
import FilmInfo from "@/components/custom/FilmInfo"
import CommentRatingTabs from "@/components/custom/CommentRatingTabs";
import { useParams } from "next/navigation";
import { useFilmStore } from "@/stores/filmStore";
import PlayBar from "@/components/film/detail/playbar";
import Background from "@/components/film/detail/Background";
import TabsSection from "@/components/film/detail/Tabs";

export default function FilmDetailPage() {
  const { filmSlug }: { filmSlug: string } = useParams();

  const { loading, error, filmData, getDetailFilm } = useFilmStore();

  const [activeTab, setActiveTab] = useState<"comments" | "ratings">(
    "comments"
  );

  useEffect(() => {
    if (!filmSlug) return;
    getDetailFilm(filmSlug);
  }, [filmSlug]);


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
