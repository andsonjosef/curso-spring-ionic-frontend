import { RefDTO } from "./ref.dto";
import { PaymentDTO } from "./payment.dto";
import { ItemOrderDTO } from "./item-order.dto";

export interface OrderDTO {
    client: RefDTO;
    deliveryAddress: RefDTO;
    payment: PaymentDTO;
    items: ItemOrderDTO[];
}