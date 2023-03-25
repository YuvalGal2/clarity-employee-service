import { DataSource } from 'typeorm';
import typeormConfig from './typeorm.config';
//

const datasource = new DataSource(typeormConfig()); // config is one that is defined in datasource.config.ts file
console.log(typeormConfig());
datasource.initialize();
export default datasource;
