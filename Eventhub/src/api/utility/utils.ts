import { generateURI } from "otplib";
import qrcode from "qrcode";

export const getEnvVariable = (varName: string) => {
    const value = process.env[varName];

    if (!value) throw new Error(`Environment Variable not found: ${varName}`);

    return value;
}

export const extractToken = (cookies: string): string | null => {
    const token = cookies["jwt"];

    return token ?? null
}

export const generateQrCode = (username: string, secret: string) => {
    const appName = getEnvVariable("APP_NAME");
    const uri = generateURI({
        issuer: appName,
        label: username,
        secret
    })

    return qrcode.toDataURL(uri);
}