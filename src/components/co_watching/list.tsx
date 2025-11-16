"use client";

import { ListVideo } from "lucide-react"
import { Card } from "./card"
import { useEffect, useRef, useState } from "react";
import roomServices from "@/services/co-watching/roomService";
import { toast } from "sonner";
import { roomPaginate } from "@/types/co_watching.type";

interface ListProps {
  query: {
    isLive?: boolean;
    hostId?: number;
  };
}

export const List = ({ query }: ListProps) => {
  const [list, setList] = useState<roomPaginate[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef(null);

  const handleGetList = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const res = await roomServices.getAllStream(page, 8, query);
    if (res.EC === 0 && res.data && res.data.list.length > 0) {
      const newList = res.data.list
      setList((prev) => [...prev, ...newList]);

      const metaData = res.data.meta;
      if (metaData.current === metaData.pages) {
        setHasMore(false);
      }

    } else {
      toast.error("Had error when get list stream");
      console.log(">>> Error get list stream: ", res.EM);
    }
    setLoading(false);
  }

  useEffect(() => {
    handleGetList();
  }, [page]);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entities) => {
        if (entities[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      }, { threshold: 1 }
    )

    const currentRef = loadMoreRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    }
  }, [loading, hasMore]);

  return (
    <div className="grid grid-cols-4 gap-6 pt-4 pb-20">
      {
        list.map((item, i) => (
          <Card
            key={i}
            thumbUrl={item.thumbUrl}
            name={item.name}
            duration={item.duration}
            filmTitle={item.film.title}
            view={100}
            hostName={item.host.fullName}
          />
        ))
      }

      <div ref={loadMoreRef} className=""></div>
      {loading && (
        <div>Đang tải</div>
      )}
    </div>
  )
}