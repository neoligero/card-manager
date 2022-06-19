import logger from 'jet-logger';


/**
 * Print an error object if it's truthy. Useful for testing.
 *
 * @param err
 */
export function pErr(err?: Error): void {
  if (!!err) {
    logger.err(err);
  }
}


/**
 * Get a random number between 1 and 1,000,000,000,000
 *
 * @returns
 */
export function getRandomInt(): number {
  return Math.floor(Math.random() * 1_000_000_000_000);
}

/**
 * Generates a random string of a given length.
 *
 * @param length
 * @returns
 */
export function getRandomString(length: number): string {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
