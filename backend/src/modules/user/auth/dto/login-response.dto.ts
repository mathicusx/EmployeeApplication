export class LoginResponseDto{
    accessToken: string;
    tokenType? = 'bearer';
    expiresIn: number | string;
    refreshToken?: string;
    type?: string;
}