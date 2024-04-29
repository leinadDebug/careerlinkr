import Joblisting from "@/components/ui/joblisting";
import prisma from "@/lib/prisma";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-center text-2xl font-extrabold tracking-tight lg:text-4xl">
          Developer Jobs
        </h1>
        <p className="text-muted-foreground">
          Find the perfect developer job for you.
        </p>
      </div>
      <section>
        <div className="space-y-4">
          {jobs.map((job) => (
            <Joblisting job={job} key={job.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
