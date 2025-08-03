import { Reader } from "@maxmind/geoip2-node";

export const geoReaderPromise = Reader.open("./data/GeoLite2-City.mmdb");
