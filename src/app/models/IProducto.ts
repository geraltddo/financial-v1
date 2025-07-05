export interface IProducto {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
}

export interface IRespuesta {
    message: string;
    data: IProducto;
}

export interface IErrorRespuesta {
    name: string;
    message: string;
    stack: string;
}