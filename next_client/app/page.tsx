import MainActivities from "../components/MainActivities/MainActivities";
import ClientService from "@/src/actions/ClientService";

export default async function Home() {
  const productRespones = await ClientService.getProducts()
  const { products } = productRespones
  
  return (
    <MainActivities products={products}/>
  )
}
