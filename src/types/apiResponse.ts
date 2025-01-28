
import { Message } from '@/models/User.model'
export interface ApiResponse {
    success : boolean,
    message : string,
    isAcceptingMesage? : boolean,
    messages? : Array <Message>
}