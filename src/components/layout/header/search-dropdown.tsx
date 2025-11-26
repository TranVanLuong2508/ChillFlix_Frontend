import { Input } from "@/components/ui/input";
import { SearchMessage } from "@/constants/messages/search.message";
import { useFilmRouter } from "@/hooks/filmRouter";
import { searchService } from "@/services/searchService";
import { IFilmSearch } from "@/types/search.type";
import { Loader, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function SearchDropdown({ isScrolled }: { isScrolled: boolean }) {
  const [filmResult, setFilmResult] = useState<IFilmSearch[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { goFilmDetail } = useFilmRouter();

  useEffect(() => {
    if (keyword.trim() === "") {
      setShowDropdown(false);
      setFilmResult([]);
      return;
    }
    const searchHander = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(searchHander);
  }, [keyword]);

  useEffect(() => {
    if (debouncedKeyword.trim() === "") return;
    fetchSearchFilmResult();
  }, [debouncedKeyword]);

  const fetchSearchFilmResult = async () => {
    if (debouncedKeyword.trim() === "") {
      setFilmResult([]);
      setShowDropdown(false);
      return;
    }
    setIsSearching(true);
    setShowDropdown(true);
    try {
      const res = await searchService.callSearchFilm(debouncedKeyword);
      await new Promise((r) => setTimeout(r, 500));
      if (res && res.EC === 1) {
        if (
          res.data?.films.length !== undefined &&
          res.data?.films.length > 0
        ) {
          setFilmResult(res.data.films);
        } else {
          setFilmResult([]);
        }
      }
    } catch (error) {
      console.log("Error from search film fetch function: ", error);
      toast.error(SearchMessage.error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleChangSeachValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeyword(event.target.value);
    setFilmResult([]);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <div className="flex-1 max-w-md" ref={wrapperRef}>
        <div className="relative ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" />
          <Input
            value={keyword}
            onChange={handleChangSeachValue}
            type="text"
            placeholder="Tìm kiếm phim"
            className={`pl-10 border-2 text-white placeholder:text-gray-400 transition-all duration-500
             focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
             ${isScrolled
                ? "bg-[#1a1f2e] border-[#2a3040] focus-visible:border-[#2a3040] focus:shadow-[0_0_12px_2px_rgba(234,179,8,0.3)]"
                : "bg-white/30 border-none focus-visible:border-[#2a3040] border-[#2a3040]"
              }
             `}
          />
          {keyword.trim() !== "" && showDropdown && (
            <div className="absolute mt-2 left-0 w-full bg-[#1a1f2e] border border-[#2a3040] rounded-xl shadow-xl p-3 z-50">
              {/* Loading */}
              {isSearching && (
                <div className="flex items-center justify-center py-6 text-gray-400">
                  <Loader
                    className="animate-spin"
                    size={20}
                    style={{ animationDuration: "1.5s" }}
                  />{" "}
                  <span className="ml-1.5">Đang tìm phim</span>
                </div>
              )}

              {/* Không có kết quả */}
              {!isSearching && filmResult.length === 0 && (
                <div className="text-gray-400 text-center py-4">
                  Không tìm thấy kết quả nào
                </div>
              )}

              {/* Có kết quả */}
              {!isSearching && filmResult.length > 0 && (
                <>
                  <p className="text-gray-300 text-sm mb-2">Danh sách phim</p>

                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {filmResult.map((film) => (
                      <div
                        key={film.filmId}
                        onClick={() => {
                          goFilmDetail(film.slug);
                          setKeyword("");
                          setDebouncedKeyword("");
                          setShowDropdown(false);
                          setFilmResult([]);
                        }}
                        className="flex items-center gap-3 cursor-pointer p-2 hover:bg-[#2a3040] rounded-lg transition"
                      >
                        <img
                          src={film.thumbUrl}
                          className="w-12 h-16 object-cover rounded-md"
                        />
                        <div className="flex flex-col">
                          <span className="text-white font-semibold text-sm">
                            {film.title}
                          </span>
                          <span className="text-gray-400 text-xs italic">
                            {film.originalTitle}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-3 py-2 text-sm text-yellow-400 bg-[#2a3040] rounded-md hover:bg-[#3a4050] transition">
                    Toàn bộ kết quả
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
