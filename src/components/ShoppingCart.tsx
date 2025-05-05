import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet"
import { useAppSelector } from "@/store"
import { selectCartItems, selectCartTotal } from "@/store/cartSlice"
import { ShoppingCartItem } from "@/components/ShoppingCartItem"

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ShoppingCart({ isOpen, onOpenChange }: Props) {
  const cart = useAppSelector(selectCartItems)
  const cartTotal = useAppSelector(selectCartTotal)

  const handleCheckoutClick = () => {
    // Implement checkout logic here
    console.log("Checkout clicked")
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-2xl font-bold">Your Cart</SheetTitle>
          <SheetDescription className="sr-only">View your shopping cart and checkout</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <p className="text-muted-foreground">Your cart is empty</p>
              <SheetClose asChild>
                <Button variant="outline" className="mt-4">
                  Continue Shopping
                </Button>
              </SheetClose>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cart.map(item => (
                <li key={item.product.id} className="py-6 first:pt-0 last:pb-0">
                  <ShoppingCartItem item={item} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t pt-4">
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between pt-4 text-xl font-bold">
                <span>Total</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
            </div>
            <Button className="mt-6 w-full" size="lg" onClick={handleCheckoutClick}>
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
