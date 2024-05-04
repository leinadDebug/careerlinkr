import prisma from "@/lib/prisma";
import { Input } from "./input";
import { Label } from "./label";
import Select from "./select";
import { jobTypes } from "@/lib/job-types";
import { Button } from "./button";
import { jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

async function filterJobs(formData: FormData) {
  "use server";
  //the filter server action
  console.log(formData.get("search") as string);
  //saves the form data in the form of object
  const values = Object.fromEntries(formData.entries());

  const { search, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(search && { search: search.trim() }),
    ...(type && { type: type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
}

export default async function JobFilterSidebar() {
  const allLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
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
              {allLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
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
