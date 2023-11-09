"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const core_1 = require("@mikro-orm/core");
let Product = class Product {
    SKU;
    onhand;
    constructor(SKU, onhand) {
        this.SKU = SKU;
        this.onhand = onhand;
    }
    addOnhand(toAdd) {
        if (toAdd < 0) {
            throw new Error("Cannot add negative onhand");
        }
        this.onhand += toAdd;
    }
    removeOnhand(toRemove) {
        if (!(this.onhand > toRemove)) {
            throw new Error("Not enough onhand");
        }
        this.onhand -= toRemove;
    }
};
exports.Product = Product;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], Product.prototype, "SKU", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Product.prototype, "onhand", void 0);
exports.Product = Product = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [String, Number])
], Product);
