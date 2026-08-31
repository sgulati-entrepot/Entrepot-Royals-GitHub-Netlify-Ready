import Link from "next/link";

export default function TeamMenu({ active = false }: { active?: boolean }) {
  return (
    <details className={`teamMenu${active ? " active" : ""}`}>
      <summary>
        Team members <span aria-hidden="true">⌄</span>
      </summary>
      <div className="teamDropdown">
        <Link href="/team/2025">Team of 2025</Link>
        <Link href="/team/2026">Team of 2026</Link>
      </div>
    </details>
  );
}
