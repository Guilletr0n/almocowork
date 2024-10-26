import { defineAction } from "astro:actions";
import { z } from "astro:schema";

const accept = () => {
  return true;
};

export const server = {
  getGreeting: defineAction({
    input: z.object({
      name: z.string().nonempty(),
    }),
    handler: async (input: string) => {
      const images = [
        "anis",
        "beach1",
        "beach2",
        "beach3",
        "beach4",
        "bellota",
        "building",
        "city1",
        "gallipiernos",
        "guarros",
        "mezquita",
        "trafficjam",
        "trafficjam2",
        "trafficjam3",
        "trafficjam4",
      ];
      const solution = [
        "anis",
        "bellota",
        "gallipiernos",
        "guarros",
        "mezquita",
      ];
      const compareSolution = solution.toString();
      const userTry = input.name.split(",").sort().join(",");
      let response = "Nope";
      if (compareSolution === userTry) {
        response = "ANBOLO21350";
      }
      return {
        //message: `${userTry} ${compareSolution === userTry}!`,
        message: response,
      };
    },
  }),
};
