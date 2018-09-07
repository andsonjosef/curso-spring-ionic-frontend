import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClientDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClientService {
    constructor(public http: HttpClient, public storage: StorageService){
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clients/${id}`);
    }

    findByEmail(email: String) {       
        return this.http.get(`${API_CONFIG.baseUrl}/clients/email?value=${email}`);
    }

    insert(obj : ClientDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clients`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}