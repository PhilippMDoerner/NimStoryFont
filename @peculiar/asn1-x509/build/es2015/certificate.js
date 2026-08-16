import { __decorate } from "tslib";
import { AsnProp, AsnPropTypes } from "@peculiar/asn1-schema";
import { AlgorithmIdentifier } from "./algorithm_identifier.js";
import { TBSCertificate } from "./tbs_certificate.js";
export class Certificate {
    tbsCertificate = new TBSCertificate();
    tbsCertificateRaw;
    signatureAlgorithm = new AlgorithmIdentifier();
    signatureValue = new ArrayBuffer(0);
    constructor(params = {}) {
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({
        type: TBSCertificate, raw: true,
    })
], Certificate.prototype, "tbsCertificate", void 0);
__decorate([
    AsnProp({ type: AlgorithmIdentifier })
], Certificate.prototype, "signatureAlgorithm", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString })
], Certificate.prototype, "signatureValue", void 0);
