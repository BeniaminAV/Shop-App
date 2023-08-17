import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { Cart, CartItem } from "../models/cart.model"
import { MatSnackBar } from "@angular/material/snack-bar"

@Injectable({
  providedIn: "root",
})
  // Cart Logic
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] })

  constructor(private _snackBar: MatSnackBar) {}

  //add item to cart (quantity)
  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items]

    const itemInCart = items.find((_item) => _item.id === item.id)

    if (itemInCart) {
      itemInCart.quantity += 1
    } else {
      items.push(item)
    }

    this.cart.next({ items })
    this._snackBar.open("1 item added to cart.", "Ok", { duration: 3000 })
  }

  //remove item from cart  (quantity)
  removeQuantityCart(item: CartItem): void {
    const items = [...this.cart.value.items]

    const itemInCart = items.find((_item) => _item.id === item.id)

    if (itemInCart) {
      if (itemInCart.quantity > 1) {
        itemInCart.quantity -= 1
      } else {
        const index = items.indexOf(itemInCart)
        if (index !== -1) {
          items.splice(index, 1)
        }
      }
    }

    this.cart.next({ items })
    this._snackBar.open("1 item removed from cart.", "Ok", { duration: 3000 })
  }

  //get total price
  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0)
  }

  //clear all cart 
  clearCart(): void {
    this.cart.next({ items: [] })
    this._snackBar.open("Cart is clear.", "Ok", { duration: 3000 })
  }

  //remove item from cart
  removeFromCart(item: CartItem): void {
    const filteredItems = this.cart.value.items.filter((_item) => {
      _item.id !== item.id
    })

    this.cart.next({ items: filteredItems })
    this._snackBar.open("1 item remove", "Ok", { duration: 3000 })
  }
}
