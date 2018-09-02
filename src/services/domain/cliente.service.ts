import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClientDTO } from "../../models/Cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClientService {
    constructor(public http: HttpClient, public storage: StorageService){
    }

    findByEmail(email: String) : Observable<ClientDTO>{       
        return this.http.get<ClientDTO>(`${API_CONFIG.baseUrl}/clients/email?value=${email}`);
    }
}