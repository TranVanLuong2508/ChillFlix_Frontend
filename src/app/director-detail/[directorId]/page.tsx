"use client";


import FilmActor from "@/components/custom/FilmActor";
import DirectorInfo from "@/components/custom/DirectorInfo";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDirectorStore } from "@/stores/directorStore";
import FilmDirector from "@/components/custom/FilmDirector";

export default function DirectorDetail() {
    const directorId = useParams().directorId as string;
    const {
        isLoadingDirector,
        isLoadingFilmDirector,
        fetchDirectorDetail,
        fetchFilmDirector,
        director,
        filmDirectorData,
        error,
    } = useDirectorStore();

    useEffect(() => {
        if (!directorId) return;
        fetchDirectorDetail(directorId);
        fetchFilmDirector(directorId);
    }, [directorId]);

    if (isLoadingDirector || isLoadingFilmDirector)
        return <div className="text-center py-20">Đang tải thông tin đạo diễn...</div>;

    if (error)
        return <div className="text-center py-20 text-red-500">{error}</div>;

    if (!director)
        return <div className="text-center py-20">Không tìm thấy thông tin đạo diễn.</div>;

    if (!filmDirectorData) {
        return (
            <div className="text-center py-20">Đạo diễn này chưa tham gia bộ phim nào.</div>
        );
    }
    console.log("filmDirectorData", filmDirectorData);

    return (
        <main className="flex flex-col min-h-screen bg-[#191B24] text-white overflow-x-hidden">
            <section className="relative flex-1 w-full">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-16 gap-8 lg:gap-12 items-start justify-center">
                        <div className="lg:col-span-4 flex justify-center border-b lg:border-b-0 lg:border-r border-zinc-800 pb-6 lg:pb-0 lg:pr-6">
                            <DirectorInfo />
                        </div>
                        <div className="lg:col-span-12 flex flex-col gap-8 mt-8 lg:mt-0">
                            <FilmDirector />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
