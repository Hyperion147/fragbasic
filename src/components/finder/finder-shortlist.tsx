"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { Bookmark, Check, X } from "lucide-react";
import styles from "./finder.module.css";

const storageKey = "fragbasic_saved_pads";
const changeEvent = "fragbasic-saved-pads-change";
let memory: string | null = null;
let useMemory = false;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(changeEvent, callback);
  };
}

function readSaved() {
  try { return (useMemory ? memory : window.localStorage.getItem(storageKey)) ?? "[]"; }
  catch { return memory ?? "[]"; }
}

function persist(slugs: string[]) {
  memory = JSON.stringify(slugs);
  try { window.localStorage.setItem(storageKey, memory); useMemory = false; }
  catch { useMemory = true; }
  window.dispatchEvent(new Event(changeEvent));
}

function selectedPads(raw: string | null, products: { slug: string; name: string }[]) {
  try {
    const saved: unknown = JSON.parse(raw ?? "[]");
    if (!Array.isArray(saved)) return [];
    const known = new Map(products.map((p) => [p.slug, p]));
    return [...new Set(saved)].flatMap((slug) => known.get(slug) ?? []);
  } catch { return []; }
}

const Selection = createContext<{
  ready: boolean;
  slugs: string[];
  toggle: (slug: string) => void;
} | null>(null);

export function FinderShortlist({ products, children }: {
  products: { slug: string; name: string }[]; children: ReactNode;
}) {
  const raw = useSyncExternalStore(subscribe, readSaved, () => null);
  const saved = selectedPads(raw, products);
  const slugs = saved.map((p) => p.slug);
  const [message, setMessage] = useState("");
  function toggle(slug: string) {
    // Re-read at interaction time in case another open tab just changed the list.
    const current = selectedPads(readSaved(), products).map((p) => p.slug);
    const removing = current.includes(slug);
    if (!removing && current.length >= 3) {
      setMessage("Your shortlist is full. Remove a pad to add another.");
      return;
    }
    persist(removing ? current.filter((s) => s !== slug) : [...current, slug]);
    setMessage(`${products.find((p) => p.slug === slug)?.name} ${removing ? "removed from" : "added to"} your shortlist.`);
  }
  return (
    <Selection.Provider value={{ ready: raw !== null, slugs, toggle }}>
      {children}
      <p role="status" className="sr-only">{message}</p>
      {saved.length > 0 && (
        <section className={styles.shortlist} aria-labelledby="saved-heading">
          <h3 id="saved-heading">Saved pads <small>({saved.length})</small></h3>
          <ul>{saved.map((p) => (
            <li key={p.slug}>
              <Link href={`/mousepads/${p.slug}`}>{p.name}</Link>
              <button type="button" aria-label={`Remove ${p.name} from saved pads`} onClick={() => toggle(p.slug)}><X size={16} aria-hidden="true" /></button>
            </li>
          ))}</ul>
          {saved.length >= 2 && saved.length <= 3
            ? <Link className={styles.compare} href={`/mousepads/compare/universal?${new URLSearchParams({ pads: slugs.join(",") })}`}>Compare saved pads</Link>
            : <p>{saved.length > 3 ? "Choose up to three saved pads to compare." : "Save one more pad to compare your picks."}</p>}
        </section>
      )}
    </Selection.Provider>
  );
}

export function SavePad({ slug, name }: { slug: string; name: string }) {
  const selection = useContext(Selection);
  if (!selection?.ready) return null;
  const saved = selection.slugs.includes(slug);
  const full = !saved && selection.slugs.length >= 3;
  const Icon = saved ? Check : Bookmark;
  return (
    <button type="button" className={styles.save} aria-pressed={saved} disabled={full}
      aria-label={`Save ${name}`} onClick={() => selection.toggle(slug)}>
      <Icon aria-hidden="true" size={15} /> {saved ? "Saved" : full ? "Shortlist full" : "Save"}
    </button>
  );
}
