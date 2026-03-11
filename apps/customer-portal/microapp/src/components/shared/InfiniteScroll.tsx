import type React from "react";
import { useCallback, useRef } from "react";
import type { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { Stack } from "@wso2/oxygen-ui";

interface InfiniteScrollProps<TPage, TError>
  extends Pick<
    UseInfiniteQueryResult<InfiniteData<TPage>, TError>,
    "data" | "hasNextPage" | "isFetchingNextPage" | "fetchNextPage"
  > {
  children: (data: InfiniteData<TPage>) => React.ReactNode;
  sentinel: React.ReactNode;
  tail?: React.ReactNode;
}

export function InfiniteScroll<TPage, TError>(props: InfiniteScrollProps<TPage, TError>) {
  const { children, sentinel, tail, data, hasNextPage, isFetchingNextPage, fetchNextPage } = props;
  const observer = useRef<IntersectionObserver | null>(null);

  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        {
          root: null,
          threshold: 0.1,
        },
      );

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  return (
    <>
      {data && children(data)}

      {(!data || hasNextPage) && (
        <Stack ref={sentinelRef} gap={2}>
          {sentinel}
        </Stack>
      )}

      {data && !hasNextPage && tail}
    </>
  );
}
