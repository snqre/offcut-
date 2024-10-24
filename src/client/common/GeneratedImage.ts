import * as Common from "@common";

export type GeneratedImageConstructorPayload = {
    src: string;
    tags: string[];
    products: Common.Product[];
};

export type GeneratedImage = {
    src(): string;
    tags(): string[];
    products(): Common.Product[];
};
export function GeneratedImage(_payload: GeneratedImageConstructorPayload): GeneratedImage {
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