import prisma from "@/lib/prisma";
import { Input } from "./input";
import { Label } from "./label";
import Select from "./select";
import { jobTypes } from "@/lib/job-types";
import { Button } from "./button";

async function filterJobs(formData: FormData) {
  "use server";

}

export default async function JobFilterSidebar() {
  const allLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map((loc) => loc.location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit rounded border bg-background p-4 md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Search</Label>
            <Input
              name="search"
              id="search"
              type="text"
              placeholder="title, company, etc."
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type">
              <option value="" className="text-muted-foreground">
                All type
              </option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location">
              <option value="">All location</option>
              {allLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="accent-black"
            />
            <Label htmlFor="remote">Remote work</Label>
          </div>
          <Button type="submit" className="w-full">
            Filter jobs
          </Button>
        </div>
      </form>
    </aside>
  );
}
