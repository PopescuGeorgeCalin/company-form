import { QueryHookOptions } from 'react-apollo';
export interface Data {
    documents: Document[];
}
export interface Document {
    id: string;
    fields: Field[];
}
export interface Field {
    key: string;
    value: string;
}
export declare const useCompaniesQuery: (options: QueryHookOptions<any, Record<string, any>>) => import("react-apollo").QueryResult<Data, Record<string, any>>;
