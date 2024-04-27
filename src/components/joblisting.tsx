import { Job } from "@prisma/client";
import CompanyLogoPlacholder from "../../public/web-development-macbook-pro-mockup-mockup-d3d1beb04e77e50573ee78334345462a.png";
import Image from "next/image";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { toDollar, relDate } from "@/lib/utils";

interface JoblistingProps {
  job: Job;
}

export default function Joblisting({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JoblistingProps) {
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-muted/60 ">
      <Image
        src={companyLogoUrl || CompanyLogoPlacholder}
        alt={`${companyName} logo`}
        width={125}
        height={125}
        className="self-center rounded-lg bg-neutral-200"
      ></Image>
      <div className="flex-grow space-y-3 ">
        <div>
          <h2 className="font-serif text-lg">{title}</h2>
          <p className="font-serif text-muted-foreground">{companyName}</p>
        </div>
        <div className="gap-2 text-muted-foreground">
          <p className="flex gap-0.5 align-middle text-sm sm:hidden ">
            <Briefcase size={20} className="shrink-0 " />
            {type}
          </p>
          <p className="flex gap-0.5 align-middle text-sm ">
            <MapPin size={20} className="shrink-0 " />
            {locationType}
          </p>
          <p className="flex gap-0.5 align-middle text-sm ">
            <Globe2 size={20} className="shrink-0 " />
            {location || "Worldwide"}
          </p>
          <p className="flex gap-0.5 align-middle text-sm ">
            <Banknote size={20} className="shrink-0 " />
            {toDollar(salary)}
          </p>
          <p className="flex gap-0.5 align-middle text-sm sm:hidden ">
            <Clock size={20} className="shrink-0 " />
            {relDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        {type}
      </div>
    </article>
  );
}
