import { pool } from './pool';

/**
 * Main query function
 * @param {String} queryString 
 * @param {Array} values 
 */
export const query = async (queryString: string, values?: any): Promise<any[]> => {
  try {
    const { rows } = await pool.query(queryString, values);
    return rows;
  } catch (err) {
    throw err;
  }
};