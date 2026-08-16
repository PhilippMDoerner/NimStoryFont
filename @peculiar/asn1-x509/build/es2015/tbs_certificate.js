import { __decorate } from "tslib";
import { AsnProp, AsnPropTypes, AsnIntegerArrayBufferConverter, } from "@peculiar/asn1-schema";
import { AlgorithmIdentifier } from "./algorithm_identifier.js";
import { Name } from "./name.js";
import { SubjectPublicKeyInfo } from "./subject_public_key_info.js";
import { Validity } from "./validity.js";
import { Extensions } from "./extension.js";
import { Version, } from "./types.js";
export class TBSCertificate {
    version = Version.v1;
    serialNumber = new ArrayBuffer(0);
    signature = new AlgorithmIdentifier();
    issuer = new Name();
    validity = new Validity();
    subject = new Name();
    subjectPublicKeyInfo = new SubjectPublicKeyInfo();
    issuerUniqueID;
    subjectUniqueID;
    extensions;
    constructor(params = {}) {
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({
        type: AsnPropTypes.Integer,
        context: 0,
        defaultValue: Version.v1,
    })
], TBSCertificate.prototype, "version", void 0);
__decorate([
    AsnProp({
        type: AsnPropTypes.Integer,
        converter: AsnIntegerArrayBufferConverter,
    })
], TBSCertificate.prototype, "serialNumber", void 0);
__decorate([
    AsnProp({ type: AlgorithmIdentifier })
], TBSCertificate.prototype, "signature", void 0);
__decorate([
    AsnProp({ type: Name })
], TBSCertificate.prototype, "issuer", void 0);
__decorate([
    AsnProp({ type: Validity })
], TBSCertificate.prototype, "validity", void 0);
__decorate([
    AsnProp({ type: Name })
], TBSCertificate.prototype, "subject", void 0);
__decorate([
    AsnProp({ type: SubjectPublicKeyInfo })
], TBSCertificate.prototype, "subjectPublicKeyInfo", void 0);
__decorate([
    AsnProp({
        type: AsnPropTypes.BitString,
        context: 1,
        implicit: true,
        optional: true,
    })
], TBSCertificate.prototype, "issuerUniqueID", void 0);
__decorate([
    AsnProp({
        type: AsnPropTypes.BitString, context: 2, implicit: true, optional: true,
    })
], TBSCertificate.prototype, "subjectUniqueID", void 0);
__decorate([
    AsnProp({
        type: Extensions, context: 3, optional: true,
    })
], TBSCertificate.prototype, "extensions", void 0);
