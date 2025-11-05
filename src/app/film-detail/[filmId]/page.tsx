"use client";

import { useEffect, useState } from "react";
import filmServices from "@/services/filmService";
import Background from "@/components/custom/Background";
import FilmInfo from "@/components/custom/FilmInfo";
import TabsSection from "@/components/custom/Tabs";
import CommentRatingTabs from "@/components/custom/CommentRatingTabs";
import { useParams } from "next/navigation";
import { partServices } from "@/services/partService";
import { RatingData } from "@/types/ratingData";

import { PartData } from "@/types/partData";
import { useFilmStore } from "@/stores/filmStore";
import PlayBar from "@/components/film/detail/playbar";

export default function FilmDetailPage() {
  const { filmId }: { filmId: string } = useParams();

  const { loading, error, filmData, getDetailFilm } = useFilmStore();

  const [activeTab, setActiveTab] = useState<"comments" | "ratings">(
    "comments"
  );

  const [filmRatingData, setFilmRatingData] = useState<RatingData | null>();
  const [filmPartData, setFilmPartData] = useState<{
    parts: PartData[];
  } | null>(null);

  console.log("Check filmId: ", filmId);

  const fetchFilm = async () => {
    try {
      const ratingRes = await filmServices.getRatingsByFilmId(filmId as string);
      const partRes = await partServices.getPartsByFilmId(filmId as string);

      setFilmRatingData(ratingRes.data.result);
      setFilmPartData({
        parts: Array.isArray(partRes.data) ? partRes.data : [],
      });
    } catch (error) {
      console.error("Failed to fetch film:", error);
    }
  };

  useEffect(() => {
    if (!filmId) return;
    // fetchFilm();
    getDetailFilm(filmId);
  }, [filmId]);

  if (loading || !filmData) {
    return <div className="text-center py-20">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-center py-20">Has error !</div>;
  }

  console.log("Check data film: ", filmData);

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
            <CommentRatingTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
