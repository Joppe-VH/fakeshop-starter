import { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { useAppDispatch } from "@/store"
import { addToCart } from "@/store/cartSlice"
import { Link } from "react-router"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()

  return (
    <Card className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-lg border">
      <CardHeader className="p-0">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square w-full overflow-hidden bg-gray-100">
            <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="grid grid-rows-[auto_auto_1fr] gap-2 p-4">
        <h3 className="truncate text-lg font-semibold">{product.title}</h3>
        <div className="text-xl font-bold">{formatCurrency(product.price)}</div>
        <p className="line-clamp-2 text-sm text-gray-600">{product.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 p-4 pt-0">
        <Link to={`/product/${product.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Button className="w-full" onClick={() => dispatch(addToCart({ product }))}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
