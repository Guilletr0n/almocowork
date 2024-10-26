import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  getGreeting: defineAction({
    input: z.object({
      name: z.string().nonempty(),
    }),
    handler: async (input) => {
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
      return {
        message: `${userTry} ${compareSolution === userTry}!`,
      };
    },
  }),
};
