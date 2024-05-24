import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iinventory, InventoryBrand, InventoryCategory, InventoryPagination, InventoryProduct, InventoryTag, InventoryVendor } from 'app/modules/admin/apps/ecommerce/inventory/inventory.types';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class InventoryService
{
    // Private
    private _brands: BehaviorSubject<InventoryBrand[] | null> = new BehaviorSubject(null);
    private _categories: BehaviorSubject<InventoryCategory[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _product: BehaviorSubject<Iinventory | null> = new BehaviorSubject(null);
    private _products: BehaviorSubject<Iinventory[] | null> = new BehaviorSubject(null);
    private _tags: BehaviorSubject<InventoryTag[] | null> = new BehaviorSubject(null);
    private _vendors: BehaviorSubject<InventoryVendor[] | null> = new BehaviorSubject(null);
    private _id: BehaviorSubject<any | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for brands
     */
    get brands$(): Observable<InventoryBrand[]>
    {
        return this._brands.asObservable();
    }
    get get_ID(): Observable<any>
    {
        return this._id.asObservable();
    }

    /**
     * Getter for categories
     */
    get categories$(): Observable<InventoryCategory[]>
    {
        return this._categories.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<InventoryPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for product
     */
    get product$(): Observable<Iinventory>
    {
        return this._product.asObservable();
    }

    /**
     * Getter for products
     */
    get products$(): Observable<Iinventory[]>
    {
        return this._products.asObservable();
    }

    /**
     * Getter for tags
     */
    get tags$(): Observable<InventoryTag[]>
    {
        return this._tags.asObservable();
    }

    /**
     * Getter for vendors
     */
    get vendors$(): Observable<InventoryVendor[]>
    {
        return this._vendors.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get brands
     */
    getBrands(): Observable<InventoryBrand[]>
    {
        return this._httpClient.get<InventoryBrand[]>('api/apps/ecommerce/inventory/brands').pipe(
            tap((brands) =>
            {
                this._brands.next(brands);
            }),
        );
    }

    /**
     * Get categories
     */
    getCategories(): Observable<InventoryCategory[]>
    {
        return this._httpClient.get<InventoryCategory[]>('api/apps/ecommerce/inventory/categories').pipe(
            tap((categories) =>
            {
                this._categories.next(categories);
            }),
        );
    }

    /**
     * Get products
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getProducts(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pagination: InventoryPagination; products: Iinventory[] }>
    {
        return this._httpClient.get<{ pagination: InventoryPagination; products: Iinventory[] }>('api/apps/ecommerce/inventory/products', {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search,
            },
        }).pipe(
            tap((response) =>
            {
                this._pagination.next(response.pagination);
                this._products.next(response.products);
            }),
        );
    }

    /**
     * Get product by id
     */

    setId(id:string){
        this._id.next(id)
    }
    getProductById(id: string): Observable<Iinventory>
    {
       if (id != "add") {
        return this._products.pipe(
            take(1),
            map((products) =>
            {
                // Find the product
                const product = products.find(item => item.id === id) || null;

                // Update the product
                this._product.next(product);

                // Return the product
                return product;
            }),
            switchMap((product) =>
            {
                if ( !product )
                {
                    return throwError('Could not found product with id of ' + id + '!');
                }

                return of(product);
            }),
        );
       } else {
        this._product.next(null)
        return of(null);
       }
    }

    /**
     * Create product
     */
    createProduct(rt:Iinventory): Observable<Iinventory>
    {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.post<Iinventory>('api/apps/ecommerce/inventory/product', {}).pipe(
                map(() =>
                {
                    this._products.next([rt, ...products]);
                    return rt;
                }),
            )),
        );
    }

    /**
     * Update product
     *
     * @param id
     * @param product
     */
    updateProduct(id: string, product: Iinventory): Observable<Iinventory>
    {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.patch<Iinventory>('api/apps/ecommerce/inventory/product', {
                id,
                product,
            }).pipe(
                map((updatedProduct) =>
                {
                    const index = products.findIndex(item => item.id === id);
                    products[index] = updatedProduct;
                    this._products.next(products);
                    return updatedProduct;
                }),
                switchMap(updatedProduct => this.product$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() =>
                    {
                        this._product.next(updatedProduct);
                        return updatedProduct;
                    }),
                )),
            )),
        );
    }

    /**
     * Delete the product
     *
     * @param id
     */
    deleteProduct(id: string): Observable<boolean>
    {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.delete('api/apps/ecommerce/inventory/product', {params: {id}}).pipe(
                map((isDeleted: boolean) =>
                {
                    // Find the index of the deleted product
                    const index = products.findIndex(item => item.id === id);

                    // Delete the product
                    products.splice(index, 1);

                    // Update the products
                    this._products.next(products);

                    // Return the deleted status
                    return isDeleted;
                }),
            )),
        );
    }

      /**
     * Get tags
     */
      getTags(): Observable<InventoryTag[]>
      {
          return this._httpClient.get<InventoryTag[]>('api/apps/ecommerce/inventory/tags').pipe(
              tap((tags) =>
              {
                  this._tags.next(tags);
              }),
          );
      }
  
      /**
       * Create tag
       *
       * @param tag
       */
      createTag(tag: InventoryTag): Observable<InventoryTag>
      {
          return this.tags$.pipe(
              take(1),
              switchMap(tags => this._httpClient.post<InventoryTag>('api/apps/ecommerce/inventory/tag', {tag}).pipe(
                  map((newTag) =>
                  {
                      // Update the tags with the new tag
                      this._tags.next([...tags, newTag]);
  
                      // Return new tag from observable
                      return newTag;
                  }),
              )),
          );
      }
  
      /**
       * Update the tag
       *
       * @param id
       * @param tag
       */
      updateTag(id: string, tag: InventoryTag): Observable<InventoryTag>
      {
          return this.tags$.pipe(
              take(1),
              switchMap(tags => this._httpClient.patch<InventoryTag>('api/apps/ecommerce/inventory/tag', {
                  id,
                  tag,
              }).pipe(
                  map((updatedTag) =>
                  {
                      // Find the index of the updated tag
                      const index = tags.findIndex(item => item.id === id);
  
                      // Update the tag
                      tags[index] = updatedTag;
  
                      // Update the tags
                      this._tags.next(tags);
  
                      // Return the updated tag
                      return updatedTag;
                  }),
              )),
          );
      }
  
      /**
       * Delete the tag
       *
       * @param id
       */
      deleteTag(id: string)
      {
          
      }
  
      /**
       * Get vendors
       */
      getVendors(): Observable<InventoryVendor[]>
      {
          return this._httpClient.get<InventoryVendor[]>('api/apps/ecommerce/inventory/vendors').pipe(
              tap((vendors) =>
              {
                  this._vendors.next(vendors);
              }),
          );
      }
}
