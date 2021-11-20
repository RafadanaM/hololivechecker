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
exports.Generation = void 0;
const channel_entity_1 = require("../channels/channel.entity");
const typeorm_1 = require("typeorm");
let Generation = class Generation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Generation.prototype, "id_generation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Generation.prototype, "generation_name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => channel_entity_1.Channel, (channel) => channel.id, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Generation.prototype, "channels", void 0);
Generation = __decorate([
    (0, typeorm_1.Entity)()
], Generation);
exports.Generation = Generation;
//# sourceMappingURL=generation.entity.js.map