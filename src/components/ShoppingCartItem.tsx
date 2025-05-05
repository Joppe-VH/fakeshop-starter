import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Trash2, Minus, Plus } from "lucide-react"
import { useAppDispatch } from "@/store"
import { removeFromCart, decrementQuantity, incrementQuantity } from "@/store/cartSlice"
import { CartItem } from "@/lib/types"

interface Props {
  item: CartItem & { subtotal: number }
}

export function ShoppingCartItem({ item }: Props) {
  const dispatch = useAppDispatch()

  return (
    <div className="flex">
      {/* Square image with fixed dimensions */}
      <div className="aspect-square h-24 flex-shrink-0 overflow-hidden rounded bg-gray-100">
        <img src={item.product.images[0]} alt={item.product.title} className="h-full w-full object-cover" />
      </div>

      {/* Content column */}
      <div className="flex flex-1 flex-col justify-between gap-1.5 px-3 py-1">
        {/* Title and remove button */}
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 font-medium">{item.product.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => dispatch(removeFromCart(item.product.id))}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>

        {/* Description */}
        <p className="line-clamp-1 text-sm text-gray-500">{item.product.description}</p>

        {/* Quantity controls and price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded border">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none"
              onClick={() => dispatch(decrementQuantity(item.product.id))}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="w-7 text-center">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none"
              onClick={() => dispatch(incrementQuantity(item.product.id))}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
          <div className="text-sm font-medium">{formatCurrency(item.subtotal)}</div>
        </div>
      </div>
    </div>
  )
}
