import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Product } from "@/lib/types"

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      transformResponse: (response: { products: Product[] }) => response.products,
    }),
    getProductById: builder.query<Product, string>({
      query: id => `products/${id}`,
    }),
  }),
})

// Export the auto-generated hooks
export const { useGetProductsQuery, useGetProductByIdQuery } = apiSlice

export default apiSlice
