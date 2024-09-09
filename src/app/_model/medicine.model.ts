export interface medicine {
    id?:number,
    mname: string,
    category: number,
    mdescription: string,
    measurement: number,
    needsprescription: boolean,
    price: number,
    stockin: number,
    stockout: number
}