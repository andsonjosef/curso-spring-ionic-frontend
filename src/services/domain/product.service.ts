import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ProductDTO } from "../../models/Product.dto";

@Injectable()
export class ProductService{

    constructor(public http: HttpClient){

    }

    findById(product_id : string) {
        return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${product_id}`);
      }

    findByCategory(category_id : string){
        return this.http.get(`${API_CONFIG.baseUrl}/products/?categories=${category_id}`);
    }
}