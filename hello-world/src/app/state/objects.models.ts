/**
 * ApiObject
 * ---------
 * Represents the shape of a single item returned by the sample RESTful API.
 */
export interface ApiObject {
  id: number | string;
  name: string;
  data?: any;
} 