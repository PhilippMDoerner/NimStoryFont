var DigestAlgorithmIdentifiers_1;
import { __decorate } from "tslib";
import { AsnProp, AsnPropTypes, AsnArray, AsnType, AsnTypeTypes, } from "@peculiar/asn1-schema";
import { CertificateSet } from "./certificate_choices.js";
import { CMSVersion, DigestAlgorithmIdentifier } from "./types.js";
import { EncapsulatedContentInfo } from "./encapsulated_content_info.js";
import { RevocationInfoChoices } from "./revocation_info_choice.js";
import { SignerInfos } from "./signer_info.js";
let DigestAlgorithmIdentifiers = DigestAlgorithmIdentifiers_1 = class DigestAlgorithmIdentifiers extends AsnArray {
    constructor(items) {
        super(items);
        Object.setPrototypeOf(this, DigestAlgorithmIdentifiers_1.prototype);
    }
};
DigestAlgorithmIdentifiers = DigestAlgorithmIdentifiers_1 = __decorate([
    AsnType({
        type: AsnTypeTypes.Set, itemType: DigestAlgorithmIdentifier,
    })
], DigestAlgorithmIdentifiers);
export { DigestAlgorithmIdentifiers };
export class SignedData {
    version = CMSVersion.v0;
    digestAlgorithms = new DigestAlgorithmIdentifiers();
    encapContentInfo = new EncapsulatedContentInfo();
    certificates;
    crls;
    signerInfos = new SignerInfos();
    constructor(params = {}) {
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], SignedData.prototype, "version", void 0);
__decorate([
    AsnProp({ type: DigestAlgorithmIdentifiers })
], SignedData.prototype, "digestAlgorithms", void 0);
__decorate([
    AsnProp({ type: EncapsulatedContentInfo })
], SignedData.prototype, "encapContentInfo", void 0);
__decorate([
    AsnProp({
        type: CertificateSet, context: 0, implicit: true, optional: true,
    })
], SignedData.prototype, "certificates", void 0);
__decorate([
    AsnProp({
        type: RevocationInfoChoices, context: 1, implicit: true, optional: true,
    })
], SignedData.prototype, "crls", void 0);
__decorate([
    AsnProp({ type: SignerInfos })
], SignedData.prototype, "signerInfos", void 0);
