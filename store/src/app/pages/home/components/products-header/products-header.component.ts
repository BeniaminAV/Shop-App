import { Component, OnInit, Output, EventEmitter } from "@angular/core"

@Component({
  selector: "app-products-header",
  templateUrl: "./product-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>()
  @Output() itemCountChange = new EventEmitter<number>()
  @Output() sortChange = new EventEmitter<string>()

  sort = "desc"
  itemsShowCount = 12

  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    this.sort = newSort
    this.sortChange.emit(newSort)
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count
    this.itemCountChange.emit(count)
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum)
  }
}
