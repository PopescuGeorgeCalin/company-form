import { Document } from '../typings/masterdata';
interface Profile extends Record<string, string> {
    id: string;
    name: string;
    email: string;
}
export declare const normalizeCustomFields: (fields: Record<string, string>[]) => Record<string, string>;
export declare const documentToProfile: (document: Document) => Profile;
export {};
