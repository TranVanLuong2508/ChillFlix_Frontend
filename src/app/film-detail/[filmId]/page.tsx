"use client";

import { useEffect, useState } from "react";
import filmServices from "@/services/filmService";
import Poster from "@/components/custom/Poster";
import FilmInfo from "@/components/custom/FilmInfo";
import Playbar from "@/components/custom/Playbar";
import TabsSection from "@/components/custom/Tabs";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CommentRatingTabs from "@/components/custom/CommentRatingTabs";
import { useParams } from "next/navigation";
import { FilmDirectorData } from "@/types/filmDirectorData";
import { FilmActorData } from "@/types/filmActorData";
import { partServices } from "@/services/partService";
import { RatingData } from "@/types/ratingData";

import { PartData } from "@/types/partData";
import { FilmDetail } from "@/types/film.type";
import { useFilmStore } from "@/stores/filmStore";
import ErrorPage from "@/app/error";

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
    <main className="flex flex-col min-h-screen bg-[#191B24] text-white overflow-x-hidden">
      <section className="relative min-h-screen">
        <Poster posterUrl={filmData.filmImages.backdrop} />
        <div className="relative z-20 max-w-10xl mx-auto px-4 sm:px-6 md:px-8 py-8 bg-zinc-900/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-3 flex flex-col bg-[#191B24] gap-8 border border-zinc-800 rounded-[20px] p-5 md:p-6 shadow-md">
              {/* <FilmInfo
                film={filmData}
                director={filmData.directors}
                actor={filmData.actors}
                rating={filmRatingData as any}
              /> */}
            </div>

            <div className="lg:col-span-7 flex flex-col gap-8 bg-[#191B24] border border-zinc-800 rounded-[20px] p-5 md:p-6 shadow-md">
              {/* <Playbar activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabsSection
                actor={filmActorData as any}
                film={filmData}
                part={filmPartData as any}
              />
              <CommentRatingTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              /> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
