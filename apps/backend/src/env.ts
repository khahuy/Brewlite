import * as dns from 'dns';
import { config } from 'dotenv';
import { resolve } from 'path';

dns.setServers(['8.8.8.8', '1.1.1.1']);
config({ path: resolve(__dirname, '../.env') });
config({ path: resolve(__dirname, '../../../.env') });
