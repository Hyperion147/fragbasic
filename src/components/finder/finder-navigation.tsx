"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./finder.module.css";

export function FinderReset() {
  return (
    <Link href="/mousepads/finder#preferences" className={styles.textLink}
      onNavigate={() => {
        // The route and hash may already match while the form has unsent edits.
        const form = document.getElementById("finder-preferences");
        if (form instanceof HTMLFormElement) form.reset();
      }}>
      Reset
    </Link>
  );
}

export function MatchesHeading({ criteria }: { criteria: string }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (window.location.hash === "#matches") {
      heading.current?.focus({ preventScroll: true });
    }
  }, [criteria]);
  return <h2 ref={heading} id="matches" tabIndex={-1}>Your matches</h2>;
}
