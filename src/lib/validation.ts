import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

//for companyLogo check file Logic
const companyLogoSchema = z
  .custom<File | undefined>()
  .refine((file) => {
    !file || (file instanceof File && file.type.startsWith("image/")); //if the file is undefined that's fine else check if file is an Image
    return false;
  }, "file must be an Image")
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "file size must be less than 2MB"); //re-checks if the first condition is met if file is less that 2MB

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type; should be either remote, on-site, hybrid...",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "remote" || data.location,
    {
      message: "location required for jobs not Remote",
    },
  ); //should pass if the location is remote or if its undefined

export const createJobsSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid Job Type; should be either Full-time, Part-time, Contract, Temporary, Internship, Volunteer...",
    ),
    comapanyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(9, "Number can't be longer than 9 digit"),
  })
  .and(applicationSchema)
  .and(locationSchema);

  export type CreateJobValues = z.infer<typeof createJobsSchema>

export const jobFilterSchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;

