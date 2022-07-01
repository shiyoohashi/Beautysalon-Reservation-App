// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { reservation, menu, stylist, customer } = initSchema(schema);

export {
  reservation,
  menu,
  stylist,
  customer
};