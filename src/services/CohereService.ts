import { CohereClientV2 } from "cohere-ai";

const cohere_ai = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export default cohere_ai;
