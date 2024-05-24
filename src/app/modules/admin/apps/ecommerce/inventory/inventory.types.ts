export interface InventoryProduct
{
    id: string;
    category?: string;
    name: string;
    description?: string;
    tags?: string[];
    sku?: string | null;
    barcode?: string | null;
    brand?: string | null;
    vendor: string | null;
    stock: number;
    reserved: number;
    cost: number;
    basePrice: number;
    taxPercent: number;
    price: number;
    weight: number;
    thumbnail: string;
    images: string[];
    active: boolean;
}
export interface Iinventory {
    id:string
    lodge?:string
    period?:string
    tripType?:string
    dateTime?:string
    name?:string
    pNumber?:string
    from?:string
    flightNo?:string
    airline?:string
    noOfPassenger?:string
    nationality?:string
    pVBeforeArrival?:string
    portPolioVaccination?:string
    yellowFeverCertification?:string
    yellowFeverCerNonComplaint?:string
    yellowFeverRecord?:string
    MeningitisVaccinaiton?:string
    portPreventionTreatment?:string
    expireMeningitisCertifate?:string
    MeningitisCertificationNotExist?:string
  }
export interface InventoryPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

export interface InventoryCategory
{
    id: string;
    parentId: string;
    name: string;
    slug: string;
}

export interface InventoryBrand
{
    id: string;
    name: string;
    slug: string;
}

export interface InventoryTag
{
    id?: string;
    title?: string;
}

export interface InventoryVendor
{
    id: string;
    name: string;
    slug: string;
}
