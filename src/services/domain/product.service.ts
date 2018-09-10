import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ProductDTO } from "../../models/Product.dto";

@Injectable()
export class ProductService{

    constructor(public http: HttpClient){

    }

    findById(product_id : ByteString) {
        return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${product_id}`);
      }

    findByCategory(category_id : string, page : number = 0, linesPerPage : number = 24){
        return this.http.get(`${API_CONFIG.baseUrl}/products/?categories=${category_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }
}