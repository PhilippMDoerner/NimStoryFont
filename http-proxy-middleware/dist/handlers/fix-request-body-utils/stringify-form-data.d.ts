/**
 * HPM_ERR_INVALID_MULTIPART prefixed error code will be used in
 * [status-code.ts]({@link ../../status-code.ts}) to return status code 400.
 */
export declare const HPM_ERR_INVALID_MULTIPART = "HPM_ERR_INVALID_MULTIPART";
/**
 * stringify FormData data
 * @param contentType
 * @param data
 * @returns
 */
export declare function stringifyFormData(contentType: string, data: object): string;
