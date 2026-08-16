var SubjectDirectoryAttributes_1;
import { __decorate } from "tslib";
import { AsnArray, AsnType, AsnTypeTypes, } from "@peculiar/asn1-schema";
import { Attribute } from "../attribute.js";
import { id_ce } from "../object_identifiers.js";
export const id_ce_subjectDirectoryAttributes = `${id_ce}.9`;
let SubjectDirectoryAttributes = SubjectDirectoryAttributes_1 = class SubjectDirectoryAttributes extends AsnArray {
    constructor(items) {
        super(items);
        Object.setPrototypeOf(this, SubjectDirectoryAttributes_1.prototype);
    }
};
SubjectDirectoryAttributes = SubjectDirectoryAttributes_1 = __decorate([
    AsnType({
        type: AsnTypeTypes.Sequence, itemType: Attribute,
    })
], SubjectDirectoryAttributes);
export { SubjectDirectoryAttributes };
