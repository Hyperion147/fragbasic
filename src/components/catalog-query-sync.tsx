"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function QueryObserver({ onChange }: { onChange: (params: URLSearchParams) => void }) {
  const params = useSearchParams();
  useEffect(() => {
    onChange(new URLSearchParams(params.toString()));
  }, [onChange, params]);
  return null;
}

/** Keep URL-dependent work out of the prerendered catalog content. */
export function CatalogQuerySync(props: { onChange: (params: URLSearchParams) => void }) {
  return <Suspense fallback={null}><QueryObserver {...props} /></Suspense>;
}

/** Filters use data already on the page; changing them needs no server render. */
export function replaceCatalogUrl(url: string) {
  window.history.replaceState(null, "", url);
}
