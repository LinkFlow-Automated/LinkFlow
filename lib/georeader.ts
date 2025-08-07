import { Reader } from "@maxmind/geoip2-node";
import path from "path";

export const geoReaderPromise = Reader.open(path.join(process.cwd(), "lib", "data", "GeoLite2-City.mmdb"));
