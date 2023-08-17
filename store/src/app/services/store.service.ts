import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Product } from "../models/product.model"

//API for products
const STORE_URL = "https://fakestoreapi.com"

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  //get product
  getAllProducts(
    limit = "12",
    sort = "desc",
    category?: string
  ): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${STORE_URL}/products${
        category ? "/category/" + category : ""
      }?sort=${sort}&limit=${limit}`
    )
  }

  // get category product
  getAllCategory(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_URL}/products/categories`
    )
  }
}
