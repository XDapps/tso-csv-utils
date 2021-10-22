
import { getRowsFromCSVFile } from '..';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


export const getBaseTokens = async (): Promise<string[]> => {
  return await getRowsFromCSVFile('./data/base_tokens.csv');
}
export const getQuotedTokens = async (): Promise<string[]> => {
  return await getRowsFromCSVFile('./data/quoted_tokens.csv');
}