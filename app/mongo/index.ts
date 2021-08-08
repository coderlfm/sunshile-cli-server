import Mongo from './db';
import { mongoDbUrl } from '../../config/db';

export default function mongo() {
  return new Mongo(mongoDbUrl, '');
}
