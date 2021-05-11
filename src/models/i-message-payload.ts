import { IServiceDetailKeyValue } from "./i-service-detail-key-value";

export interface IMessagePayload extends IServiceDetailKeyValue{
    messageType: string;
    orderSource: string;
    atlasCompanyId: string;
    atlasOrderId: string;
    atlasServiceId: string;
    orderSrcDocId: string;
    orderSrcDocVersion?: string;
    orderStatus: string;
    orderStatusUpdtdBy: string;
    orderSrcCmpnyId: string;
    orderTxnId: string;
}