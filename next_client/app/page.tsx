import ProductApi from "@/apis/ProductApi";
import HomeLayout from "@/layouts/home/HomeLayout";
import CartList from "@/modules/cart/CartList";
import ProductsLayout from "@/modules/products-list/ProductsList";
export default async function Home() {
  const { products } = await ProductApi.getProducts()
  return (
    <HomeLayout>
      <div className="" style={{ width: '100%', backgroundColor: 'whitesmoke' }}>
        <ProductsLayout products={products} />
        <CartList />
      </div>
    </HomeLayout>
  )
}
