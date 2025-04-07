export class LogHelper {
  private static SENSITIVE_FIELDS: string[] = [
    'password',
    'token',
    'accessToken',
    'refreshToken',
  ];

  public static sanitize(obj: any) {
    if (!obj || typeof obj !== 'object') return obj;
    const clone = { ...obj };
    for (const field of this.SENSITIVE_FIELDS) {
      if (field in clone) {
        clone[field] = '[REDACTED]';
      }
    }
    return clone;
  }
}
