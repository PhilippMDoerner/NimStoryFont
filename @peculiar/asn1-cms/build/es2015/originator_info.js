import { __decorate } from "tslib";
import { AsnProp } from "@peculiar/asn1-schema";
import { CertificateSet } from "./certificate_choices.js";
import { RevocationInfoChoices } from "./revocation_info_choice.js";
export class OriginatorInfo {
    certs;
    crls;
    constructor(params = {}) {
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({
        type: CertificateSet, context: 0, implicit: true, optional: true,
    })
], OriginatorInfo.prototype, "certs", void 0);
__decorate([
    AsnProp({
        type: RevocationInfoChoices, context: 1, implicit: true, optional: true,
    })
], OriginatorInfo.prototype, "crls", void 0);
