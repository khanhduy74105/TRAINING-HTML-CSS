import ClientService from "@/apis/ClientService";
import HomeLayout from "@/layouts/home/HomeLayout";
import MainActivities from "@/modules/main-activities/MainActivities";
import { Suspense } from "react";

export default async function Home() {
  const {products} = await ClientService.getProducts()
  return (
    <HomeLayout>
        <MainActivities products={products}/>
    </HomeLayout>
  )
}
