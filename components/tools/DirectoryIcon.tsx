import type { DirectoryIcon } from "@/lib/tools/directory";

const paths: Record<DirectoryIcon, string> = {
  compass:
    "M12 3.5A8.5 8.5 0 1 0 20.5 12 8.5 8.5 0 0 0 12 3.5Zm0 2a6.5 6.5 0 1 1-6.5 6.5A6.5 6.5 0 0 1 12 5.5Zm1.8 3.2-1.2 4.1-4.1 1.2 1.2-4.1 4.1-1.2Z",
  wallet:
    "M4 7.5h16v11H4v-11Zm2 2v7h12v-2h-4.5a2 2 0 1 1 0-4H18V9.5H6Zm9.5 3a1 1 0 1 0 0 2H18v-2h-2.5Z",
  split:
    "M6.5 5.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm11 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM6.5 14.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm5.5-6v2.2L8.8 13H11.5v2H6.5v-2l3.8-3.3V8.5H12Zm5.5 6H14v2h3.2L14 18.8V20.5h2l4-4v-2h-2.5Z",
  clock:
    "M12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8Zm.7 4h-1.5v5l3.8 2.2.8-1.3-3.1-1.8V8Z",
  fuel:
    "M7 4h8v12H7V4Zm9 3h1.5A1.5 1.5 0 0 1 19 8.5V16a2 2 0 1 0 2 2h1.5v-9.2L19.8 6.2 18.7 7.3 20.5 9V8.5a3 3 0 0 0-3-3H16V7ZM8.5 17H13.5v3H8.5v-3Z",
  bike:
    "M6.5 13.5a3.5 3.5 0 1 0 3.4 4.2L12 14.2l2.1 3.5a3.5 3.5 0 1 0 1.3-1L13.2 13l2.3-3.5H18V8h-3.8L12.6 11H10L8.6 8.4 7.3 9.2 8.8 11.5H7v1.5h2.2l-1.1 1.8a3.5 3.5 0 0 0-1.6-.3Z",
  gauge:
    "M12 4a8 8 0 1 0 8 8h-1.6A6.4 6.4 0 1 1 12 5.6V4Zm6.2 3.1-1.1 1.1A6.4 6.4 0 0 1 18.4 12H20a8 8 0 0 0-1.8-4.9ZM11.2 12.8 16 8.6l-1.1-1.1-4.8 4.2A1.6 1.6 0 1 0 11.2 12.8Z",
  bag:
    "M9 6V5a3 3 0 0 1 6 0v1h4v13H5V6h4Zm1.5 0h3V5a1.5 1.5 0 0 0-3 0v1Z",
  calendar:
    "M7 4h2v2h6V4h2v2h3v14H4V6h3V4Zm12 6H5v10h14V10Z",
};

export function DirectoryIconMark({
  name,
  className,
}: {
  name: DirectoryIcon;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d={paths[name]} />
    </svg>
  );
}
