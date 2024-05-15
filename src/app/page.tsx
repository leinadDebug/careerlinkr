import H1 from "@/components/ui/h1";
import JobFilterSidebar from "@/components/jobFilterSidebar";
import JobResults from "@/components/jobResult";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";
import { title } from "process";

interface PageProps {
  searchParams: {
    search?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

function getTitle({ search, type, location, remote }: JobFilterValues) {
  const titlePrefix = search
    ? `${search} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? `${remote && "remote"} developer jobs`
        : "All developer jobs";
  const titleSuffix = location ? ` at ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { search, type, location, remote },
}: PageProps): Metadata {
  return {
    title: ` ${getTitle({
      search,
      type,
      location,
      remote: remote === "true",
    })} | CareerLinkr`,
  };
}

export default async function Home({
  searchParams: { search, type, location, remote },
}: PageProps) {
  const filterValues: JobFilterValues = {
    search,
    type,
    location,
    remote: remote === "true",
  };
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">
          Find the perfect developer job for you.
        </p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
