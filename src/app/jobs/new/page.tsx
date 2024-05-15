import { Metadata } from "next"
import JobForm from "./jobForm"

export const metadata: Metadata={
    title: "Post a new job"
}

export default function Page(){
return <JobForm/>
}