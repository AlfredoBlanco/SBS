interface Data{
    id: string;
}

export interface PaymentBody {
    id: number;
    live_mode: boolean;
    type: string;
    date_created: Date;
    user_id: number;
    api_version: string;
    action: string;
    data: Data;
    topic?: string;
}

export interface Payment {
    data_id: string;
    type: string;
    date_created: Date;
    action: string;
    mp_userId: Number;
}
