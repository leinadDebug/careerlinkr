"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import H1 from "@/components/ui/h1";
import { CreateJobValues, createJobsSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/job-types";
export default function JobForm() {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobsSchema),
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateJobValues) {
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <main className="m-auto my-10 max-w-3xl">
      <div className="space-y-3 text-center">
        <H1>Find your perfect developer job</H1>
        <p className="text-muted-foreground">
          Get your posting seen by thousands of jobseekers.
        </p>
        <div className="space-y-6 rounded-xl border p-3 text-left ">
          <div>
            <h2 className="font-semibold">Job details</h2>
            <p className="text-muted-foreground">
              provide the job description and details
            </p>
          </div>
          <Form {...form}>
            <form
              className="space-y-4 "
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job title</FormLabel>
                    <FormControl>
                      <Input placeholder="eg.. frontend developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job type</FormLabel>
                    <FormControl>
                      <Select {...field} defaultValue="">
                        <option value="" hidden>
                          select an option
                        </option>
                        {jobTypes.map((jobtype) => (
                          <option key={jobtype} value={jobtype}>
                            {jobtype}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="comapanyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="companyLogo"
                render={({ field: { value, ...fieldValues } }) => (
                  <FormItem>
                    <FormLabel>Company logo</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldValues}
                        type="file"
                        accept="image/*"
                        //only accepts img file
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          fieldValues.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location type</FormLabel>
                    <FormControl>
                      <Select {...field} defaultValue="">
                        <option value="" hidden>
                          select an option
                        </option>
                        {locationTypes.map((locationtype) => (
                          <option key={locationtype} value={locationtype}>
                            {locationtype}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
