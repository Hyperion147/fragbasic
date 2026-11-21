import Form from "next/form";
import { ChevronDown, Crosshair, Gauge, SlidersHorizontal, Waves } from "lucide-react";
import { feels, games, sensitivities, surfaces, textures, type FinderPreferences } from "@/lib/mousepads/finder";
import { FinderReset } from "./finder-navigation";
import styles from "./finder.module.css";

const feelIcons = { control: Crosshair, balanced: Waves, speed: Gauge };
const feelHints = { control: "Steady stops", balanced: "Mixed aim", speed: "Free glide" };

function SelectField({ label, name, options, selected }: {
  label: string; name: string; options: Record<string, string>; selected: string;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <span className={styles.selectWrap}>
        <select name={name} defaultValue={selected}>
          {Object.entries(options).map(([value, text]) => <option value={value} key={value}>{text}</option>)}
        </select>
        <ChevronDown aria-hidden="true" size={17} />
      </span>
    </label>
  );
}

export function FinderForm({ prefs }: { prefs: FinderPreferences }) {
  const advanced = prefs.surface !== "any" || prefs.texture !== "any" || prefs.sensitivity !== "any";
  return (
    <section aria-labelledby="preferences" className={styles.panel}>
      <div className={styles.panelHeading}>
        <h2 id="preferences" tabIndex={-1}><SlidersHorizontal size={19} aria-hidden="true" /> Your preferences</h2>
        <FinderReset />
      </div>
      <Form id="finder-preferences" action="/mousepads/finder#matches" className={styles.form}>
        <fieldset>
          <legend>Glide preference</legend>
          <div className={styles.feels}>
            {(Object.keys(feels) as (keyof typeof feels)[]).map((feel) => {
              const Icon = feelIcons[feel];
              return (
                <label key={feel} className={styles.feel}>
                  <input type="radio" name="feel" value={feel} defaultChecked={prefs.feel === feel} />
                  <Icon size={19} aria-hidden="true" />
                  <strong>{feels[feel]}</strong>
                  <span>{feelHints[feel]}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend>Games you play <span className={styles.optional}>Optional</span></legend>
          <div className={styles.games}>
            {(Object.keys(games) as (keyof typeof games)[]).map((game) => (
              <label key={game}>
                <input type="checkbox" name="game" value={game} defaultChecked={prefs.games.includes(game)} />
                {games[game]}
              </label>
            ))}
          </div>
        </fieldset>

        <label className={styles.field}>
          <span>Maximum budget <span className={styles.optional}>INR</span></span>
          <span className={styles.budget}>
            <span aria-hidden="true">₹</span>
            <input type="number" name="budget" inputMode="numeric" min="1" step="1" placeholder="No limit"
              defaultValue={prefs.invalidBudget ? "" : prefs.budget ?? ""} aria-invalid={prefs.invalidBudget || undefined}
              aria-describedby={prefs.invalidBudget ? "budget-error" : undefined} />
          </span>
        </label>
        {prefs.invalidBudget && <p id="budget-error">Enter a positive whole number or leave the budget empty.</p>}

        <div className={styles.checks}>
          <label><input type="checkbox" name="available" defaultChecked={prefs.available} /> Available in India only</label>
          <label><input type="checkbox" name="humid" defaultChecked={prefs.humid} /> Prioritize humidity resistance</label>
        </div>

        <details className={styles.more} open={advanced}>
          <summary>Surface, texture &amp; sensitivity <ChevronDown aria-hidden="true" size={17} /></summary>
          <div className={styles.extraFields}>
            <SelectField label="Surface material" name="surface" options={surfaces} selected={prefs.surface} />
            <SelectField label="Preferred texture" name="texture" options={textures} selected={prefs.texture} />
            <SelectField label="Mouse sensitivity" name="sensitivity" options={sensitivities} selected={prefs.sensitivity} />
          </div>
        </details>
        <button className={styles.primary} type="submit"><Crosshair size={18} aria-hidden="true" /> Find my matches</button>
      </Form>
    </section>
  );
}
