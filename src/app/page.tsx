import H1 from "@/components/ui/h1";
import JobFilterSidebar from "@/components/ui/jobFilterSidebar";
import JobResults from "@/components/ui/jobResult";
import { JobFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    search?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export default async function Home({
  searchParams: {search, type, location, remote},
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
        <H1>Developer Jobs</H1>
        <p className="text-muted-foreground">
          Find the perfect developer job for you.
        </p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
