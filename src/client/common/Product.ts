export type ProductJson = {
    name: string;
    description: string;
    price: bigint;
};

export type ProductConstructorPayload = {
    _name: string;
    _description: string;
    _price: bigint;
};

export type Product = {
    name(): string;
    description(): string;
    price(): bigint;
    pack(): ProductJson;
};
export function Product({
    _name,
    _description,
    _price}: ProductConstructorPayload): Product {
    /***/ {
        return {
            name,
            description,
            price,
            pack
        };
    }
    function name(): string {
        return _name;
    }
    function description(): string {
        return _description;
    }
    function price(): bigint {
        return _price;
    }
    function pack(): ProductJson {
        return {
            name: _name,
            description: _description,
            price: _price
        };
    }
}