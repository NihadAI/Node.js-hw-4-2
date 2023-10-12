import convict from "convict";
import 'dotenv/config'

const definitions = {
  PORT: {
    env: "PORT",
    format: Number,
    default: 3000,
  },
  HOST: {
    env: "HOST",
    format: String,
    nullable: false,
    default: null,
  },
};

const config = convict(definitions);
config.validate({ allowed: "strict" });

export default config;
