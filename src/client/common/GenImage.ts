import * as Common from "@common";

export type GenImageConstructorPayload = {
    src: string;
    tags: string[];
    products: Common.Product[];
};

export type GenImage = {
    src(): string;
    tags(): string[];
    products(): Common.Product[];
};
export function GenImage(_payload: GenImageConstructorPayload): GenImage {
    let _src: string;
    let _tags: string[];
    let _products: Common.Product[];
    /***/ {
        _src = _payload.src;
        _tags = [];
        _products = [];
        return {
            src,
            tags,
            products
        };
    }
    function src(): string {
        return _src;
    }
    function tags(): string[] {
        return _tags;
    }
    function products(): Common.Product[] {
        return _products;
    }
}